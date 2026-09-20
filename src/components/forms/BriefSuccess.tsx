'use client';

import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { whatsappLink } from '@/content/site';

/** Confirmation state shown after the brief is accepted by the API. */
export function BriefSuccess({ message, reference }: { message: string; reference: string }) {
  return (
    <div className="px-6 py-10 sm:px-10">
      <span className="grid size-12 place-items-center rounded-full bg-accent text-ink">
        <Icon name="check" className="size-5" strokeWidth={2.4} />
      </span>

      <h2 className="mt-7 text-3xl font-semibold tracking-tight">Your brief is in.</h2>

      <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted">
        {message || 'We will reply within one working day.'} You will get an honest read on approach,
        timeline and budget — not a sales sequence.
      </p>

      {reference ? (
        <p className="mt-6 font-mono text-xs tracking-[0.18em] text-fg-muted uppercase">
          Reference · {reference}
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/work" variant="secondary" icon="arrow-right">
          See our work while you wait
        </Button>
        <Button href={whatsappLink('Hi WANDCOM, I just sent a project brief.')} variant="ghost">
          WhatsApp us instead
        </Button>
      </div>
    </div>
  );
}
