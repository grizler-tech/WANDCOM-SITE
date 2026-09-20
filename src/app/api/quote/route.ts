import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { estimatorModifiers, estimatorRates } from '@/content/pricing';
import { fieldErrors, quoteSchema } from '@/lib/validation';
import { formatKes, roundToNearest } from '@/lib/utils';
import type { ApiResponse } from '@/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface QuoteLine {
  label: string;
  price: string;
}

interface QuoteResult {
  lines: QuoteLine[];
  subtotal: string;
  adjustments: QuoteLine[];
  total: string;
  low: string;
  high: string;
  note: string;
}

/**
 * POST /api/quote — instant estimate for the calculator on /pricing.
 *
 * Deliberately returns a *band*, not a single number: it is honest about being
 * an estimate and always routes the visitor to a human for a real quotation.
 */
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<QuoteResult>>> {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'We could not read that request. Please try again.' },
      { status: 400 },
    );
  }

  const parsed = quoteSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Please review your selections.', fields: fieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  const selected = estimatorRates.filter((rate) => parsed.data.services.includes(rate.id));

  if (selected.length === 0) {
    return NextResponse.json(
      { ok: false, error: 'Select at least one service to estimate.' },
      { status: 400 },
    );
  }

  const urgency =
    estimatorModifiers.urgency.find((option) => option.id === parsed.data.urgency) ??
    estimatorModifiers.urgency[0];
  const scale =
    estimatorModifiers.scale.find((option) => option.id === parsed.data.scale) ??
    estimatorModifiers.scale[1];

  const urgencyMultiplier = urgency?.multiplier ?? 1;
  const scaleMultiplier = scale?.multiplier ?? 1;

  const subtotal = selected.reduce((sum, rate) => sum + rate.price, 0);
  const adjustedLines = selected.map((rate) => ({
    label: rate.label,
    price: roundToNearest(rate.price * urgencyMultiplier * scaleMultiplier),
  }));

  const total = adjustedLines.reduce((sum, line) => sum + line.price, 0);
  const band = 0.18;

  return NextResponse.json(
    {
      ok: true,
      data: {
        lines: selected.map((rate) => ({ label: rate.label, price: formatKes(rate.price) })),
        subtotal: formatKes(subtotal),
        adjustments: [
          { label: `Timeline: ${urgency?.label ?? 'Standard'}`, price: `×${urgencyMultiplier}` },
          { label: `Scope: ${scale?.label ?? 'Standard'}`, price: `×${scaleMultiplier}` },
        ],
        total: formatKes(total),
        low: formatKes(roundToNearest(total * (1 - band))),
        high: formatKes(roundToNearest(total * (1 + band))),
        note: 'Planning estimate only. After Discovery you receive a fixed, line-item quotation.',
      },
    },
    { status: 200 },
  );
}
