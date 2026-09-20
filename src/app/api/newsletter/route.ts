import { promises as fs } from 'node:fs';
import path from 'node:path';

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { newsletterSchema, fieldErrors } from '@/lib/validation';
import type { ApiResponse } from '@/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface NewsletterResult {
  email: string;
  stored: boolean;
}

/**
 * POST /api/newsletter — footer signup.
 *
 * Appends one JSON line per subscriber to `data/newsletter/subscribers.jsonl`
 * and forwards to BRIEF_WEBHOOK_URL when configured. Duplicate addresses are
 * accepted silently (idempotent from the visitor's point of view).
 */
export async function POST(
  request: NextRequest,
): Promise<NextResponse<ApiResponse<NewsletterResult>>> {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'We could not read that request. Please try again.' },
      { status: 400 },
    );
  }

  const parsed = newsletterSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Please enter a valid email address.',
        fields: fieldErrors(parsed.error),
      },
      { status: 400 },
    );
  }

  const email = parsed.data.email.toLowerCase();
  const record = {
    email,
    source: parsed.data.source ?? 'unknown',
    receivedAt: new Date().toISOString(),
  };

  const storeDir =
    process.env.BRIEF_STORE_DIR?.trim() ||
    path.join(process.cwd(), 'data', 'newsletter');

  let stored = false;
  try {
    await fs.mkdir(storeDir, { recursive: true });
    await fs.appendFile(
      path.join(storeDir, 'subscribers.jsonl'),
      `${JSON.stringify(record)}\n`,
      'utf8',
    );
    stored = true;
  } catch {
    // Read-only host: the webhook below is the remaining delivery channel.
  }

  const webhookUrl = process.env.BRIEF_WEBHOOK_URL?.trim();
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          ...(process.env.BRIEF_WEBHOOK_SECRET
            ? { 'x-wandcom-secret': process.env.BRIEF_WEBHOOK_SECRET }
            : {}),
        },
        body: JSON.stringify({ type: 'newsletter.subscribed', ...record }),
        cache: 'no-store',
      });
    } catch {
      // Non-fatal: the subscriber is already captured locally where possible.
    }
  }

  return NextResponse.json(
    {
      ok: true,
      data: { email, stored },
      message: 'You are on the list. We only send when there is something worth saying.',
    },
    { status: 202 },
  );
}
