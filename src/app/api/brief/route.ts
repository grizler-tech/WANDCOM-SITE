import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { captureBrief, getStoreDir, listBriefs } from '@/lib/brief-store';
import { briefSchema, fieldErrors } from '@/lib/validation';
import type { ApiResponse } from '@/types';

/** Lead capture needs Node APIs (fs) and must never be statically cached. */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface BriefResult {
  reference: string;
  stored: boolean;
  delivered: boolean;
}

/**
 * POST /api/brief — receives the "Start a Project" form.
 *
 * Returns 400 with field-level errors when validation fails, 429 when the same
 * IP submits too often, and 202 with a reference number on success.
 */
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<BriefResult>>> {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'We could not read that request. Please try again.' },
      { status: 400 },
    );
  }

  const parsed = briefSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Please check the highlighted fields and try again.',
        fields: fieldErrors(parsed.error),
      },
      { status: 400 },
    );
  }

  // Honeypot: silently accept so bots do not learn the field is a trap.
  if (parsed.data.website && parsed.data.website.trim().length > 0) {
    return NextResponse.json(
      {
        ok: true,
        data: { reference: 'filtered', stored: false, delivered: false },
        message: 'Thanks — your brief has been received.',
      },
      { status: 202 },
    );
  }

  // Lightweight in-memory throttle per IP (resets when the process restarts).
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many submissions from this connection. Please try again shortly.' },
      { status: 429 },
    );
  }

  const report = await captureBrief(parsed.data, {
    ip,
    userAgent: request.headers.get('user-agent') ?? undefined,
  });

  return NextResponse.json(
    {
      ok: true,
      data: {
        reference: report.id.slice(0, 8).toUpperCase(),
        stored: report.stored,
        delivered: report.webhook === 'delivered' || report.email === 'delivered',
      },
      message: 'Your brief is in. We will reply within one working day.',
    },
    { status: 202 },
  );
}

/** Simple sliding-window limiter: 5 briefs per IP per 10 minutes. */
const submissions = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const recent = (submissions.get(key) ?? []).filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    submissions.set(key, recent);
    return false;
  }

  recent.push(now);
  submissions.set(key, recent);
  return true;
}

interface BriefListResult {
  count: number;
  storeDir: string;
  briefs: Array<{
    id: string;
    receivedAt: string;
    name: string;
    email: string;
    services: string[];
    budget: string;
    timeline: string;
  }>;
}

/**
 * GET /api/brief — internal inbox for the team.
 *
 * Protected by `Authorization: Bearer $BRIEF_ADMIN_TOKEN`. When no token is
 * configured the route stays closed (404) so leads are never world-readable.
 *
 *   curl -H "Authorization: Bearer $BRIEF_ADMIN_TOKEN" https://wandcom.co.ke/api/brief
 */
export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<BriefListResult>>> {
  const token = process.env.BRIEF_ADMIN_TOKEN?.trim();

  if (!token) {
    return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  }

  if (request.headers.get('authorization') !== `Bearer ${token}`) {
    return NextResponse.json({ ok: false, error: 'Unauthorised' }, { status: 401 });
  }

  const limitParam = Number.parseInt(request.nextUrl.searchParams.get('limit') ?? '50', 10);
  const limit = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 200) : 50;

  const records = await listBriefs(limit);

  return NextResponse.json(
    {
      ok: true,
      data: {
        count: records.length,
        storeDir: getStoreDir(),
        briefs: records.map((record) => ({
          id: record.id,
          receivedAt: record.receivedAt,
          name: record.brief.name,
          email: record.brief.email,
          services: record.brief.services,
          budget: record.brief.budget,
          timeline: record.brief.timeline,
        })),
      },
    },
    { status: 200 },
  );
}
