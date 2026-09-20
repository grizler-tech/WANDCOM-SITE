'use client';

import { Icon } from '@/components/ui/Icon';
import { servicesInBriefForm } from '@/content/services';
import { cn } from '@/lib/utils';
import type { BudgetBand, TimelineBand } from '@/types';

/** Shared input chrome so every field in the brief looks related. */
export const fieldClass =
  'h-12 w-full rounded-2xl border border-line bg-white/[0.02] px-4 text-sm text-fg outline-none ' +
  'transition-colors placeholder:text-fg-muted/60 focus:border-accent/70';

interface SharedProps {
  values: {
    name: string;
    email: string;
    phone: string;
    company: string;
    services: string[];
    projectDetails: string;
    budget: '' | BudgetBand;
    timeline: '' | TimelineBand;
  };
}

function ErrorNote({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-2 text-xs text-red-400">
      {message}
    </p>
  );
}

/* ---------------------------------------------------------------- step 1 -- */

interface StepServicesProps {
  selected: string[];
  onToggle: (service: string) => void;
  error?: string;
}

export function StepServices({ selected, onToggle, error }: StepServicesProps) {
  return (
    <div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {servicesInBriefForm.map((service) => {
          const active = selected.includes(service);
          return (
            <button
              key={service}
              type="button"
              onClick={() => onToggle(service)}
              aria-pressed={active}
              className={cn(
                'flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm transition-colors',
                active
                  ? 'border-accent/70 bg-accent-soft text-fg'
                  : 'border-line bg-white/[0.02] text-fg-muted hover:border-line hover:text-fg',
              )}
            >
              <span
                className={cn(
                  'grid size-5 shrink-0 place-items-center rounded-md border',
                  active ? 'border-accent bg-accent text-ink' : 'border-line',
                )}
              >
                {active ? <Icon name="check" className="size-3" strokeWidth={3} /> : null}
              </span>
              {service}
            </button>
          );
        })}
      </div>
      <ErrorNote message={error} />
    </div>
  );
}

/* ---------------------------------------------------------------- step 2 -- */

interface StepDetailsProps {
  values: SharedProps['values'];
  onChange: (key: 'name' | 'email' | 'phone' | 'company' | 'projectDetails', value: string) => void;
  errors: Record<string, string>;
}

export function StepDetails({ values, onChange, errors }: StepDetailsProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="brief-name" className="mb-2 block text-xs tracking-[0.14em] uppercase">
          Your name *
        </label>
        <input
          id="brief-name"
          name="name"
          value={values.name}
          onChange={(event) => onChange('name', event.target.value)}
          autoComplete="name"
          placeholder="Jane Wanjiru"
          className={fieldClass}
        />
        <ErrorNote message={errors.name} />
      </div>

      <div>
        <label htmlFor="brief-email" className="mb-2 block text-xs tracking-[0.14em] uppercase">
          Email *
        </label>
        <input
          id="brief-email"
          name="email"
          type="email"
          value={values.email}
          onChange={(event) => onChange('email', event.target.value)}
          autoComplete="email"
          placeholder="jane@company.co.ke"
          className={fieldClass}
        />
        <ErrorNote message={errors.email} />
      </div>

      <div>
        <label htmlFor="brief-phone" className="mb-2 block text-xs tracking-[0.14em] uppercase">
          Phone / WhatsApp
        </label>
        <input
          id="brief-phone"
          name="phone"
          value={values.phone}
          onChange={(event) => onChange('phone', event.target.value)}
          autoComplete="tel"
          placeholder="+254 7xx xxx xxx"
          className={fieldClass}
        />
        <ErrorNote message={errors.phone} />
      </div>

      <div>
        <label htmlFor="brief-company" className="mb-2 block text-xs tracking-[0.14em] uppercase">
          Business name
        </label>
        <input
          id="brief-company"
          name="company"
          value={values.company}
          onChange={(event) => onChange('company', event.target.value)}
          autoComplete="organization"
          placeholder="Company or brand"
          className={fieldClass}
        />
        <ErrorNote message={errors.company} />
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="brief-details"
          className="mb-2 block text-xs tracking-[0.14em] uppercase"
        >
          Tell us about the project *
        </label>
        <textarea
          id="brief-details"
          name="projectDetails"
          rows={5}
          value={values.projectDetails}
          onChange={(event) => onChange('projectDetails', event.target.value)}
          placeholder="What are you building, who is it for, and what does success look like? Links to references help too."
          className="w-full rounded-2xl border border-line bg-white/[0.02] px-4 py-3.5 text-sm text-fg outline-none transition-colors placeholder:text-fg-muted/60 focus:border-accent/70"
        />
        <div className="mt-2 flex items-center justify-between">
          <ErrorNote message={errors.projectDetails} />
          <span className="ml-auto font-mono text-[10px] text-fg-muted">
            {values.projectDetails.length}/4000
          </span>
        </div>
      </div>
    </div>
  );
}
