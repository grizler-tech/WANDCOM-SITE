import { Icon } from '@/components/ui/Icon';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Section, Shell } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { processSteps } from '@/content/process';

/**
 * The six-phase process. Structure matters more than adjectives here — this is
 * the section that makes a deposit feel safe.
 */
export function ProcessSection({ tone = 'dark' }: { tone?: 'dark' | 'deep' }) {
  return (
    <Section id="process" tone={tone}>
      <Shell>
        <SectionHeading
          eyebrow="How we work"
          title="Six phases, no mystery in between."
          description="Every project runs the same way: you always know what is happening, what is next and what you are paying for."
        />

        <RevealGroup className="mt-14" stagger={0.07}>
          <ol className="relative grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step) => (
              <RevealItem key={step.index} variant="fade">
                <li className="group flex h-full flex-col gap-4 bg-ink-card p-7 transition-colors duration-300 hover:bg-ink">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-[0.22em] text-accent">
                      {step.index}
                    </span>
                    <span className="grid size-8 place-items-center rounded-full border border-line text-fg-muted transition-colors group-hover:border-accent/60 group-hover:text-accent">
                      <Icon name="arrow-right" className="size-3.5" />
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-fg-muted">{step.body}</p>

                  <div className="mt-auto border-t border-line-soft pt-4">
                    <p className="text-[11px] tracking-[0.16em] text-fg-muted uppercase">
                      You leave with
                    </p>
                    <p className="mt-1.5 text-sm text-fg">{step.output}</p>
                  </div>
                </li>
              </RevealItem>
            ))}
          </ol>
        </RevealGroup>
      </Shell>
    </Section>
  );
}
