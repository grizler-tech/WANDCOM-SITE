import { Icon, type IconName } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section, Shell } from '@/components/ui/Section';
import type { ServiceDivision } from '@/types';

/**
 * Full detail block for one division on /services.
 *
 * Anchored with `id={division.id}` so the footer and header links deep-link
 * straight to it, and rendered as a definition-style list so each service is
 * paired with what the client actually receives.
 */
export function DivisionBlock({
  division,
  reversed = false,
}: {
  division: ServiceDivision;
  reversed?: boolean;
}) {
  return (
    <article id={division.id} className="scroll-mt-28 border-t border-line-soft py-16 lg:py-20">
      <Shell>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className={reversed ? 'lg:order-2' : undefined}>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs tracking-[0.22em] text-accent">
                {division.index}
              </span>
              <span className="h-px flex-1 bg-line" aria-hidden />
              <span className="grid size-10 place-items-center rounded-full border border-line text-accent">
                <Icon name={division.icon as IconName} className="size-4" />
              </span>
            </div>

            <h2 className="mt-7 text-[clamp(1.9rem,4vw,2.9rem)] font-semibold text-balance-tight">
              {division.name}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-fg-muted">{division.summary}</p>

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-sm">
              <div>
                <dt className="text-[11px] tracking-[0.16em] text-fg-muted uppercase">Investment</dt>
                <dd className="mt-1 font-medium">{division.startingFrom}</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.16em] text-fg-muted uppercase">Timeline</dt>
                <dd className="mt-1 font-medium">{division.timeline}</dd>
              </div>
            </dl>

            <ul className="mt-8 flex flex-col gap-3">
              {division.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3 text-sm text-fg-muted">
                  <Icon name="check" className="mt-0.5 size-4 shrink-0 text-accent" />
                  {outcome}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className={reversed ? 'lg:order-1' : undefined}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {division.items.map((item) => (
                <li
                  key={item.title}
                  className="card card-hover flex flex-col gap-3 p-5 sm:p-6"
                >
                  <h3 className="text-base font-medium tracking-tight">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-fg-muted">{item.description}</p>
                  <ul className="mt-auto flex flex-col gap-1.5 border-t border-line-soft pt-4">
                    {item.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] text-fg-muted"
                      >
                        <span className="size-1 rounded-full bg-accent" aria-hidden />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Shell>
    </article>
  );
}
