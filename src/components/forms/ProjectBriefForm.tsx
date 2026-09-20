'use client';

import { useEffect, useState } from 'react';

import { BriefSummary } from '@/components/forms/BriefChoices';
import { BriefProgress } from '@/components/forms/BriefProgress';
import { BriefStepPanel } from '@/components/forms/BriefStepPanel';
import { BriefSuccess } from '@/components/forms/BriefSuccess';
import {
  briefStepMeta,
  briefStepSchemas,
  initialBriefState,
  type BriefFormState,
} from '@/components/forms/brief-config';
import { Button } from '@/components/ui/Button';
import { budgetBands, timelineBands } from '@/content/pricing';
import { briefSchema, fieldErrors } from '@/lib/validation';

type Status = 'idle' | 'submitting' | 'success';

/**
 * Deep links from /pricing (`/contact?tier=growth`) pre-fill step one so the
 * visitor never re-answers a question they already answered on the pricing page.
 */
const tierServices: Record<string, string[]> = {
  starter: ['Website'],
  growth: ['Website', 'E-commerce', 'Branding'],
  custom: ['Custom Digital Solution'],
};

/**
 * "Start a Project" brief — four steps, one API call.
 *
 * Design decisions:
 *  • One question per screen, so the form never looks like a tax return.
 *  • Every step validates with the same Zod schema the API route uses.
 *  • A live summary card shows what the visitor has chosen so far.
 *  • Success returns a reference number plus an alternative WhatsApp route.
 */
export function ProjectBriefForm() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<BriefFormState>(initialBriefState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');
  const [reference, setReference] = useState('');

  // Reads the `?tier=` deep link on the client so /contact stays prerendered.
  useEffect(() => {
    const tier = new URLSearchParams(window.location.search).get('tier');
    const preset = tier ? tierServices[tier] : undefined;
    if (!preset) return;
    setValues((previous) =>
      previous.services.length > 0 ? previous : { ...previous, services: preset },
    );
  }, []);

  function clearError(key: string) {
    setErrors((previous) => {
      if (!previous[key]) return previous;
      const next = { ...previous };
      delete next[key];
      return next;
    });
  }

  function onField<K extends keyof BriefFormState>(key: K, value: BriefFormState[K]) {
    setValues((previous) => ({ ...previous, [key]: value }));
    clearError(key);
  }

  function onToggleService(service: string) {
    setValues((previous) => ({
      ...previous,
      services: previous.services.includes(service)
        ? previous.services.filter((item) => item !== service)
        : [...previous.services, service],
    }));
    clearError('services');
  }

  function validateStep(index: number): boolean {
    const schema = briefStepSchemas[index];
    if (!schema) return true;

    const result = schema.safeParse(values);
    if (result.success) {
      setErrors({});
      return true;
    }

    setErrors(fieldErrors(result.error));
    return false;
  }

  function goNext() {
    if (!validateStep(step)) return;
    setStep((current) => Math.min(current + 1, briefStepMeta.length - 1));
  }

  function goBack() {
    setErrors({});
    setFeedback('');
    setStep((current) => Math.max(current - 1, 0));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateStep(briefStepMeta.length - 1)) return;

    const parsed = briefSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      setFeedback('Something needs a second look — check the highlighted fields.');
      return;
    }

    setStatus('submitting');
    setFeedback('');

    try {
      const response = await fetch('/api/brief', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...parsed.data,
          source: typeof window === 'undefined' ? undefined : window.location.pathname,
        }),
      });

      const payload = (await response.json()) as {
        ok: boolean;
        message?: string;
        error?: string;
        fields?: Record<string, string>;
        data?: { reference?: string };
      };

      if (!response.ok || !payload.ok) {
        setStatus('idle');
        setFeedback(payload.error ?? 'We could not send that. Please try again, or WhatsApp us.');
        if (payload.fields) setErrors(payload.fields);
        return;
      }

      setReference(payload.data?.reference ?? '');
      setFeedback(payload.message ?? '');
      setStatus('success');
      setValues(initialBriefState);
      setStep(0);
    } catch {
      setStatus('idle');
      setFeedback('Network problem — please check your connection, or WhatsApp us instead.');
    }
  }

  const budgetLabel = budgetBands.find((band) => band.id === values.budget)?.label;
  const timelineLabel = timelineBands.find((band) => band.id === values.timeline)?.label;
  const isLastStep = step === briefStepMeta.length - 1;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr] lg:items-start">
      <form onSubmit={submit} noValidate className="card overflow-hidden">
        {/* Honeypot: hidden from people, irresistible to bots. */}
        <input
          type="text"
          name="website"
          value={values.website}
          onChange={(event) => onField('website', event.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="hidden"
        />

        <BriefProgress step={step} />

        {status === 'success' ? (
          <BriefSuccess message={feedback} reference={reference} />
        ) : (
          <>
            <BriefStepPanel
              step={step}
              values={values}
              errors={errors}
              onField={onField}
              onToggleService={onToggleService}
            />

            {errors.form || feedback ? (
              <div className="px-6 pb-2 sm:px-8">
                <p
                  role="alert"
                  className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                >
                  {errors.form ?? feedback}
                </p>
              </div>
            ) : null}

            <div className="flex flex-col-reverse items-stretch gap-3 border-t border-line-soft px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              {step > 0 ? (
                <Button type="button" variant="ghost" onClick={goBack}>
                  Back
                </Button>
              ) : (
                <span className="hidden text-xs text-fg-muted sm:block">
                  Takes about two minutes.
                </span>
              )}

              {isLastStep ? (
                <Button
                  type="submit"
                  size="lg"
                  icon="arrow-right"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Sending…' : 'Let’s build something.'}
                </Button>
              ) : (
                <Button type="button" size="lg" icon="arrow-right" onClick={goNext}>
                  Continue
                </Button>
              )}
            </div>
          </>
        )}
      </form>

      <div className="lg:sticky lg:top-24">
        <BriefSummary
          services={values.services}
          budget={values.budget}
          timeline={values.timeline}
          budgetLabel={budgetLabel}
          timelineLabel={timelineLabel}
        />
      </div>
    </div>
  );
}
