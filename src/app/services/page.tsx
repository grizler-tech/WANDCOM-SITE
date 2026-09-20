import type { Metadata } from 'next';

import { PageHero } from '@/components/layout/PageHero';
import { CTASection } from '@/components/sections/CTASection';
import { DivisionBlock } from '@/components/sections/DivisionBlock';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Section, Shell } from '@/components/ui/Section';
import { engagementModels } from '@/content/process';
import { divisions } from '@/content/services';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Four digital divisions: Digital Experiences, Brand & Visual, Digital Growth and Digital Solutions — websites, branding, marketing and business automation from WANDCOM.',
  alternates: { canonical: '/services' },
};

/** Quick jump list so a visitor can land on the division they came for. */
function DivisionIndex() {
  return (
    <Section tone="deep" flush className="border-b border-line-soft py-10">
      <Shell>
        <Reveal>
          <ul className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {divisions.map((division) => (
              <li key={division.id}>
                <a
                  href={`#${division.id}`}
                  className="flex h-full flex-col gap-2 bg-ink-card p-5 transition-colors hover:bg-ink"
                >
                  <span className="font-mono text-[11px] tracking-[0.2em] text-accent">
                    {division.index}
                  </span>
                  <span className="text-base font-medium tracking-tight">{division.name}</span>
                  <span className="text-xs text-fg-muted">{division.startingFrom}</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Shell>
    </Section>
  );
}

function EngagementModels() {
  return (
    <Section tone="paper">
      <Shell>
        <h2 className="text-[clamp(1.9rem,4vw,2.6rem)] font-semibold text-balance-tight">
          Three ways to engage.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-invert-muted">
          Pick whichever matches how your business buys — a fixed deliverable, a monthly retainer, or
          an ongoing product partnership.
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
      </Shell>
    </Section>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything digital, organised into four divisions."
        description="Start with one division or combine several. Most clients begin with a website and end up with a system that runs part of their business."
      >
        <Button href="/contact" icon="arrow-right">
          Start a Project
        </Button>
        <Button href="/pricing" variant="secondary">
          See pricing bands
        </Button>
      </PageHero>

      <DivisionIndex />

      {divisions.map((division, index) => (
        <DivisionBlock key={division.id} division={division} reversed={index % 2 === 1} />
      ))}

      <EngagementModels />
      <ProcessSection tone="deep" />
      <CTASection
        eyebrow="Ready when you are"
        title="Tell us what you need."
        description="Send a brief and we will tell you which division fits, what it costs and how long it takes — before you commit to anything."
      />
    </>
  );
}
