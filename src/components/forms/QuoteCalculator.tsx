'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { estimatorModifiers, estimatorRates } from '@/content/pricing';
import { cn, formatKes } from '@/lib/utils';

interface QuoteResult {
  lines: { label: string; price: string }[];
  adjustments: { label: string; price: string }[];
  total: string;
  low: string;
  high: string;
  note: string;
}

/**
 * Instant estimate calculator.
 *
 * The first number is calculated locally for instant feedback, then confirmed
 * through `POST /api/quote` so rates and copy come from a single source of
 * truth. The result is always a band, never a fake-precise figure.
 */
export function QuoteCalculator() {
  const [selected, setSelected] = useState<string[]>(['website']);
  const [urgency, setUrgency] = useState(estimatorModifiers.urgency[0]?.id ?? 'relaxed');
  const [scale, setScale] = useState('standard');
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [loading, setLoading] = useState(false);

  function toggle(id: string) {
    setSelected((previous) =>
      previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id],
    );
    setResult(null);
  }

  async function estimate() {
    setLoading(true);
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ services: selected, urgency, scale }),
      });
      const payload = (await response.json()) as { ok: boolean; data?: QuoteResult };
      setResult(payload.ok && payload.data ? payload.data : null);
    } catch {
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  const localSubtotal = estimatorRates
    .filter((rate) => selected.includes(rate.id))
    .reduce((sum, rate) => sum + rate.price, 0);

  return (
    <div className="card overflow-hidden">
      <div className="border-b border-line-soft px-6 py-5 sm:px-8">
        <h3 className="text-lg font-semibold tracking-tight">Estimate your project</h3>
        <p className="mt-1 text-sm text-fg-muted">
          Pick what you need — from{' '}
          <span className="text-fg">{formatKes(localSubtotal)}</span> at current rates.
        </p>
      </div>

      <div className="px-6 py-6 sm:px-8">
        <fieldset>
          <legend className="mb-3 text-[11px] tracking-[0.16em] text-fg-muted uppercase">
            Services
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {estimatorRates.map((rate) => {
              const active = selected.includes(rate.id);
              return (
                <button
                  key={rate.id}
                  type="button"
                  onClick={() => toggle(rate.id)}
                  aria-pressed={active}
                  className={cn(
                    'flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-colors',
                    active ? 'border-accent/70 bg-accent-soft' : 'border-line hover:border-line',
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={cn(
                        'grid size-5 place-items-center rounded-md border',
                        active ? 'border-accent bg-accent text-ink' : 'border-line',
                      )}
                    >
                      {active ? <Icon name="check" className="size-3" strokeWidth={3} /> : null}
                    </span>
                    <span className={active ? 'text-fg' : 'text-fg-muted'}>{rate.label}</span>
                  </span>
                  <span className="shrink-0 font-mono text-[11px] text-fg-muted">
                    {formatKes(rate.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-xs tracking-[0.14em] uppercase">
            Timeline
            <select
              value={urgency}
              onChange={(event) => {
                setUrgency(event.target.value);
                setResult(null);
              }}
              className="h-11 rounded-2xl border border-line bg-ink px-3 text-sm tracking-normal text-fg normal-case focus:border-accent/70"
            >
              {estimatorModifiers.urgency.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-xs tracking-[0.14em] uppercase">
            Scope
            <select
              value={scale}
              onChange={(event) => {
                setScale(event.target.value);
                setResult(null);
              }}
              className="h-11 rounded-2xl border border-line bg-ink px-3 text-sm tracking-normal text-fg normal-case focus:border-accent/70"
            >
              {estimatorModifiers.scale.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="button" onClick={estimate} disabled={loading || selected.length === 0}>
            {loading ? 'Calculating…' : 'Calculate estimate'}
          </Button>
          <Button href="/contact" variant="secondary" icon="arrow-right">
            Get a custom quote
          </Button>
        </div>

        {result ? (
          <div className="mt-7 rounded-2xl border border-line-soft bg-white/[0.02] p-5">
            <p className="text-[11px] tracking-[0.16em] text-fg-muted uppercase">
              Planning estimate
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight">
              {result.low} – {result.high}
            </p>
            <p className="mt-2 text-sm text-fg-muted">{result.note}</p>

            <ul className="mt-5 flex flex-col gap-2 border-t border-line-soft pt-4 text-sm">
              {result.lines.map((line) => (
                <li key={line.label} className="flex items-center justify-between gap-4">
                  <span className="text-fg-muted">{line.label}</span>
                  <span className="font-mono text-xs">{line.price}</span>
                </li>
              ))}
              {result.adjustments.map((line) => (
                <li key={line.label} className="flex items-center justify-between gap-4">
                  <span className="text-fg-muted">{line.label}</span>
                  <span className="font-mono text-xs text-accent">{line.price}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
