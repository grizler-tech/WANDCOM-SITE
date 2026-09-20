'use client';

import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

/** Shared shape for the radio-style choice rows used in steps 1, 3 and 4. */
interface Choice {
  id: string;
  label: string;
  note?: string;
}

interface ChoiceListProps {
  name: string;
  choices: Choice[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

function ChoiceList({ name, choices, value, onChange, error }: ChoiceListProps) {
  return (
    <div>
      <div className="grid gap-2.5">
        {choices.map((choice) => {
          const active = value === choice.id;
          return (
            <label
              key={choice.id}
              className={cn(
                'flex cursor-pointer items-center gap-4 rounded-2xl border px-4 py-3.5 transition-colors',
                active
                  ? 'border-accent/70 bg-accent-soft'
                  : 'border-line bg-white/[0.02] hover:border-line',
              )}
            >
              <input
                type="radio"
                name={name}
                value={choice.id}
                checked={active}
                onChange={() => onChange(choice.id)}
                className="sr-only"
              />
              <span
                className={cn(
                  'grid size-5 shrink-0 place-items-center rounded-full border',
                  active ? 'border-accent' : 'border-line',
                )}
              >
                {active ? <span className="size-2.5 rounded-full bg-accent" /> : null}
              </span>
              <span className="flex flex-col">
                <span className={cn('text-sm', active ? 'text-fg' : 'text-fg-muted')}>
                  {choice.label}
                </span>
                {choice.note ? (
                  <span className="text-xs text-fg-muted/80">{choice.note}</span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>
      {error ? (
        <p role="alert" className="mt-2 text-xs text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export interface BriefStepChoiceProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  choices: Choice[];
  name: string;
}

export function StepChoices({ name, choices, value, onChange, error }: BriefStepChoiceProps) {
  return (
    <ChoiceList
      name={name}
      choices={choices}
      value={value}
      onChange={onChange}
      error={error}
    />
  );
}

/** Right-hand summary so the visitor can see what they have committed to. */
export function BriefSummary({
  services,
  budget,
  timeline,
  budgetLabel,
  timelineLabel,
}: {
  services: string[];
  budget: string;
  timeline: string;
  budgetLabel?: string;
  timelineLabel?: string;
}) {
  const rows: Array<[string, string]> = [
    ['Services', services.length ? services.join(', ') : 'Nothing selected yet'],
    ['Budget', budgetLabel ?? 'Not set'],
    ['Timeline', timelineLabel ?? 'Not set'],
  ];

  return (
    <div className="card p-6">
      <h3 className="flex items-center gap-2 text-sm font-medium">
        <Icon name="sparkles" className="size-4 text-accent" />
        Your brief so far
      </h3>

      <dl className="mt-5 flex flex-col gap-4 text-sm">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-[11px] tracking-[0.16em] text-fg-muted uppercase">{label}</dt>
            <dd className={cn('mt-1 leading-relaxed', value.includes('Not') || value.includes('Nothing') ? 'text-fg-muted/70' : 'text-fg')}>
              {value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 border-t border-line-soft pt-5 text-xs leading-relaxed text-fg-muted">
        Nothing is binding. This brief simply lets us prepare a useful first reply instead of a
        generic one.
      </p>
      <p className="mt-3 text-xs text-fg-muted">
        Prefer to talk it through first? Use{' '}
        <span className="text-fg">Chat with Wandcom</span> at the bottom of the screen.
      </p>
    </div>
  );
}
