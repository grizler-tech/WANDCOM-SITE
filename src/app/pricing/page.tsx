import type { Metadata } from 'next';

import { PageHero } from '@/components/layout/PageHero';
import { CTASection } from '@/components/sections/CTASection';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { PricingSection } from '@/components/sections/PricingSection';
import { QuoteCalculator } from '@/components/forms/QuoteCalculator';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Section, Shell } from '@/components/ui/Section';
import { divisions } from '@/content/services';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'WANDCOM pricing bands: Starter from KES 45,000, Growth from KES 150,000 and Custom solutions quoted in phases — plus an instant project estimate calculator.',
  alternates: { canonical: '/pricing' },
};

/** Honest notes that prevent the classic pricing misunderstandings. */
const pricingNotes: string[] = [
  'Prices exclude third-party costs such as domains, hosting and paid advertising — we pass those through at cost and set them up in your name.',
  'Payment is normally 50% to start and 50% on launch. Larger projects are billed per phase.',
  'Every quotation is fixed for the agreed scope. If you want to add work mid-build, we send a written change request before starting it.',
  'You own everything we produce: code, designs and accounts, transferred at final payment.',
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Know the number before the meeting."
        description="Clear bands, honest assumptions and a calculator for a planning figure in under a minute. Every project is still quoted line by line after Discovery."
      >
        <Button href="/contact" icon="arrow-right">
          Get a custom quote
        </Button>
        <Button href="#calculator" variant="secondary">
          Estimate my project
        </Button>
      </PageHero>

      <PricingSection showAddOns />

      <Section id="calculator" tone="dark" className="scroll-mt-28">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <p className="eyebrow mb-5">Calculator</p>
              <h2 className="text-[clamp(1.9rem,4vw,2.7rem)] font-semibold text-balance-tight">
                Build a planning estimate.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-fg-muted">
                Estimates use our current starting rates and adjust for timeline and scope. Treat the
                result as a planning band — the real quotation comes after Discovery, in writing.
              </p>

              <ul className="mt-9 flex flex-col gap-3 text-sm">
                {pricingNotes.map((note) => (
                  <li key={note} className="flex items-start gap-3 text-fg-muted">
                    <Icon name="check" className="mt-0.5 size-4 shrink-0 text-accent" />
                    {note}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <QuoteCalculator />
            </Reveal>
          </div>
        </Shell>
      </Section>

      <Section tone="deep">
        <Shell>
          <p className="eyebrow mb-8">Starting points by division</p>
          <RevealGroup className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {divisions.map((division) => (
              <RevealItem key={division.id} variant="fade">
                <div className="flex h-full flex-col gap-3 bg-ink-card p-6">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-accent">
                    {division.index}
                  </span>
                  <h3 className="text-base font-semibold tracking-tight">{division.name}</h3>
                  <p className="text-sm text-fg-muted">{division.tagline}</p>
                  <p className="mt-auto pt-4 text-sm font-medium">{division.startingFrom}</p>
                  <p className="text-xs text-fg-muted">Typical delivery · {division.timeline}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Shell>
      </Section>

      <FaqAccordion />

      <CTASection
        eyebrow="Budget talk"
        title="Not sure where you fit?"
        description="Tell us the outcome you need and the number you have in mind. We will tell you what is realistic at that budget — and what is not."
      />
    </>
  );
}
