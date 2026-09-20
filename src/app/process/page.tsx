import type { Metadata } from 'next';

import { PageHero } from '@/components/layout/PageHero';
import { CtaRow } from '@/components/sections/CtaRow';
import { CTASection } from '@/components/sections/CTASection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Section, Shell } from '@/components/ui/Section';
import { engagementModels, processSteps } from '@/content/process';

export const metadata: Metadata = {
  title: 'Process',
  description:
    'How WANDCOM takes a project from brief to launch: Discover, Plan, Design, Build, Launch and Grow — with the deliverable you receive at every phase.',
  alternates: { canonical: '/process' },
};

/** What the client needs to bring at each phase — reduces project friction. */
const responsibilities: { title: string; items: string[] }[] = [
  {
    title: 'What we need from you',
    items: [
      'One decision-maker for approvals',
      'Access to existing accounts and assets',
      'Feedback inside 48 hours where possible',
    ],
  },
  {
    title: 'What you get from us',
    items: [
      'A named contact and shared project board',
      'A dated schedule agreed in writing',
      'A fixed quotation before build starts',
    ],
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title="A process you can hold us to."
        description="Six phases, each with a defined deliverable. No phase starts until you have signed off the one before it."
      >
        <Button href="/contact" icon="arrow-right">
          Start a Project
        </Button>
        <Button href="/pricing" variant="secondary">
          See what it costs
        </Button>
      </PageHero>

      <Section tone="dark">
        <Shell>
          <RevealGroup className="grid gap-8 lg:grid-cols-2" stagger={0.08}>
            {responsibilities.map((block) => (
              <RevealItem key={block.title} variant="fade">
                <div className="card h-full p-7 sm:p-8">
                  <h2 className="text-lg font-semibold tracking-tight">{block.title}</h2>
                  <ul className="mt-5 flex flex-col gap-3 text-sm">
                    {block.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-fg-muted">
                        <Icon name="check" className="mt-0.5 size-4 shrink-0 text-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Shell>
      </Section>

      <ProcessSection tone="deep" />

      <Section tone="paper">
        <Shell>
          <h2 className="text-[clamp(1.9rem,4vw,2.6rem)] font-semibold text-balance-tight">
            How we charge for it
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-invert-muted">
            Scope decides the model. You will always know which one you are in, and what triggers a
            change request.
          </p>

          <div className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-paper-line bg-paper-line lg:grid-cols-3">
            {engagementModels.map((model) => (
              <div key={model.title} className="flex flex-col gap-4 bg-white p-7 sm:p-8">
                <h3 className="text-lg font-semibold tracking-tight">{model.title}</h3>
                <p className="text-sm leading-relaxed text-fg-invert-muted">{model.body}</p>
                <p className="mt-auto font-mono text-[11px] tracking-[0.14em] text-fg-invert-muted uppercase">
                  Best for · {model.bestFor}
                </p>
              </div>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-10">
            <ol className="flex flex-wrap gap-3">
              {processSteps.map((step) => (
                <li
                  key={step.index}
                  className="rounded-[var(--radius-pill)] border border-paper-line bg-white px-4 py-2 text-xs text-fg-invert-muted"
                >
                  <span className="font-mono text-fg-invert">{step.index}</span> · {step.title}
                </li>
              ))}
            </ol>
          </Reveal>
        </Shell>
      </Section>

      <CtaRow />

      <CTASection
        eyebrow="Phase 01"
        title="Start with a conversation."
        description="Discovery begins with a 30-minute call. No obligation, no pitch deck — just questions about your business."
      />
    </>
  );
}
