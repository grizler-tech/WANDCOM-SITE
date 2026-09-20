import { promises as fs } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

import { siteConfig } from '@/content/site';
import type { BriefInput } from '@/lib/validation';

/**
 * Lead handling for the "Start a Project" brief.
 *
 * Deliberately dependency-free and resilient:
 *   1. Every brief is written to `data/briefs/*.json` when the filesystem is
 *      writable (local dev, VPS, Docker volume).
 *   2. Every brief is forwarded to BRIEF_WEBHOOK_URL when configured (Zapier,
 *      Make, n8n, Slack, a Cloudflare Worker…).
 *   3. Every brief is emailed through Resend when RESEND_API_KEY is configured.
 *
 * On read-only hosts (e.g. Vercel serverless) step 1 fails quietly and steps
 * 2–3 carry the lead, so a submission is never lost without a trace.
 */

export interface StoredBrief {
  id: string;
  receivedAt: string;
  brief: BriefInput;
  meta: {
    ip?: string;
    userAgent?: string;
  };
}

export interface DeliveryReport {
  id: string;
  stored: boolean;
  storedPath?: string;
  webhook: 'skipped' | 'delivered' | 'failed';
  email: 'skipped' | 'delivered' | 'failed';
  warnings: string[];
}

export function getStoreDir(): string {
  const override = process.env.BRIEF_STORE_DIR?.trim();
  if (override) return override;
  return path.join(process.cwd(), 'data', 'briefs');
}

/** Keeps filenames sortable and filesystem-safe. */
function buildFileName(id: string, receivedAt: string): string {
  return `${receivedAt.replace(/[:.]/g, '-')}__${id}.json`;
}

/** Strips control characters so stored/emailed leads cannot be malformed. */
export function sanitise(value: string): string {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Writes the brief to disk. Never throws — reports a flag instead. */
export async function storeBrief(record: StoredBrief): Promise<{
  stored: boolean;
  storedPath?: string;
  warning?: string;
}> {
  const dir = getStoreDir();
  try {
    await fs.mkdir(dir, { recursive: true });
    const file = path.join(dir, buildFileName(record.id, record.receivedAt));
    await fs.writeFile(file, `${JSON.stringify(record, null, 2)}\n`, 'utf8');
    return { stored: true, storedPath: file };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown error';
    return { stored: false, warning: `Could not persist brief to ${dir}: ${message}` };
  }
}

/** POSTs the brief to an external automation endpoint. */
async function sendWebhook(record: StoredBrief): Promise<'skipped' | 'delivered' | 'failed'> {
  const url = process.env.BRIEF_WEBHOOK_URL?.trim();
  if (!url) return 'skipped';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(process.env.BRIEF_WEBHOOK_SECRET
          ? { 'x-wandcom-secret': process.env.BRIEF_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify(record),
      cache: 'no-store',
    });
    return response.ok ? 'delivered' : 'failed';
  } catch {
    return 'failed';
  }
}

/** Sends a formatted notification email through Resend's HTTP API. */
async function sendEmail(record: StoredBrief): Promise<'skipped' | 'delivered' | 'failed'> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.BRIEF_FROM_EMAIL?.trim();
  const to = process.env.BRIEF_NOTIFY_EMAIL?.trim() || siteConfig.email;
  if (!apiKey || !from) return 'skipped';

  const { brief, id, receivedAt } = record;
  const rows: Array<[string, string]> = [
    ['Name', brief.name],
    ['Email', brief.email],
    ['Phone', brief.phone ?? '—'],
    ['Company', brief.company ?? '—'],
    ['Needs', brief.services.join(', ')],
    ['Budget', brief.budget],
    ['Timeline', brief.timeline],
    ['Source', brief.source ?? '—'],
    ['Reference', id],
    ['Received', receivedAt],
  ];

  const cells = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:600">${escapeHtml(
          label,
        )}</td><td style="padding:6px 12px;border:1px solid #ddd">${escapeHtml(value)}</td></tr>`,
    )
    .join('');

  const html = `<h2 style="font-family:sans-serif">New project brief — ${escapeHtml(
    brief.name,
  )}</h2><table style="font-family:sans-serif;border-collapse:collapse">${cells}</table>
    <h3 style="font-family:sans-serif">Project details</h3>
    <p style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(
      brief.projectDetails,
    )}</p>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: brief.email,
        subject: `New brief · ${brief.name} · ${brief.services.join(', ')}`,
        html,
      }),
      cache: 'no-store',
    });
    return response.ok ? 'delivered' : 'failed';
  } catch {
    return 'failed';
  }
}

/** Store + notify in one call, returning a per-channel report for the API. */
export async function captureBrief(
  brief: BriefInput,
  meta: StoredBrief['meta'] = {},
): Promise<DeliveryReport> {
  const record: StoredBrief = {
    id: randomUUID(),
    receivedAt: new Date().toISOString(),
    brief: {
      ...brief,
      name: sanitise(brief.name),
      email: sanitise(brief.email),
      projectDetails: sanitise(brief.projectDetails),
    },
    meta,
  };

  const storage = await storeBrief(record);
  const [webhook, email] = await Promise.all([sendWebhook(record), sendEmail(record)]);

  const warnings: string[] = [];
  if (storage.warning) warnings.push(storage.warning);
  if (webhook === 'failed') warnings.push('Webhook delivery failed — check BRIEF_WEBHOOK_URL.');
  if (email === 'failed') warnings.push('Email delivery failed — check RESEND_API_KEY.');

  return {
    id: record.id,
    stored: storage.stored,
    storedPath: storage.storedPath,
    webhook,
    email,
    warnings,
  };
}

/** Reads stored briefs newest-first — powers the protected GET /api/brief. */
export async function listBriefs(limit = 50): Promise<StoredBrief[]> {
  const dir = getStoreDir();

  // `turbopackIgnore` keeps the bundler from tracing the entire project into the
  // server output — this directory is runtime data, never a build input.
  const files = await fs.readdir(/* turbopackIgnore: true */ dir).catch(() => [] as string[]);

  const jsonFiles = files
    .filter((file) => file.endsWith('.json'))
    .sort()
    .reverse()
    .slice(0, limit);

  const records: StoredBrief[] = [];
  for (const file of jsonFiles) {
    try {
      const raw = await fs.readFile(
        /* turbopackIgnore: true */ path.join(/* turbopackIgnore: true */ dir, file),
        'utf8',
      );
      records.push(JSON.parse(raw) as StoredBrief);
    } catch {
      // Skip unreadable or corrupt files rather than failing the whole request.
    }
  }
  return records;
}
