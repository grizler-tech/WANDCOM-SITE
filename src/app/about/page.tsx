import type { Metadata } from 'next';

import { PageHero } from '@/components/layout/PageHero';
import { CTASection } from '@/components/sections/CTASection';
import { CtaRow } from '@/components/sections/CtaRow';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Section, Shell } from '@/components/ui/Section';
import { divisions } from '@/content/services';
import { siteConfig, trustStats } from '@/content/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'WANDCOM is a digital-focused creative company combining technology, design and strategy — structured to grow from a digital studio into a broader business group.',
  alternates: { canonical: '/about' },
};

const pillars = [
  {
    title: 'Technology',
    body: 'We build on modern foundations — fast front-ends, reliable hosting, real integrations. The goal is a digital asset you keep, not a dependency you rent.',
    icon: 'layers' as const,
  },
  {
    title: 'Design',
    body: 'Structure first, decoration later. Clear hierarchy, honest typography and interfaces that respect the person using them.',
    icon: 'palette' as const,
  },
  {
    title: 'Strategy',
    body: 'Every project starts with the question “what has to change for this to be worth it?” — and ends with a way to measure whether it did.',
    icon: 'target' as const,
  },
];

const principles = [
  {
    title: 'Say no early',
    body: 'If a project is not a fit, we say so in the first conversation rather than in month three.',
  },
  {
    title: 'Own the outcome',
    body: 'We are judged on enquiries, orders and hours saved — not on how the site looked in a mockup.',
  },
  {
    title: 'Explain the why',
    body: 'You should be able to defend every decision we made to your own board, without calling us.',
  },
  {
    title: 'Build to hand over',
    body: 'Documented, maintainable work. We would rather lose the maintenance retainer than lock you in.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Wandcom"
        title="We’re building what comes next."
        description="WANDCOM is a digital solutions and creative technology company. We combine technology, design and strategy to help businesses look better, work smarter and grow online."
      >
        <Button href="/contact" icon="arrow-right">
          Work with us
        </Button>
        <Button href="/work" variant="secondary">
          See the work
        </Button>
      </PageHero>

      <Section tone="deep" flush className="border-b border-line-soft py-10">
        <Shell>
          <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {trustStats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dd className="text-2xl font-semibold tracking-tight">{stat.value}</dd>
                <dt className="text-xs tracking-[0.14em] text-fg-muted uppercase">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </Shell>
      </Section>

      <Section tone="dark">
        <Shell>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <p className="eyebrow mb-5">Three disciplines</p>
              <h2 className="text-[clamp(1.9rem,4vw,2.7rem)] font-semibold text-balance-tight">
                Technology, design and strategy — deliberately in one team.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-fg-muted">
                Most businesses lose momentum in the gaps between a designer, a developer and a
                marketer. Keeping all three in-house is our structural advantage: fewer hand-offs,
                fewer excuses, one accountable partner.
              </p>
              <p className="mt-5 text-base leading-relaxed text-fg-muted">
                We are based in {siteConfig.location} and work with clients across Kenya and
                remotely beyond it.
              </p>
            </Reveal>

            <RevealGroup
              className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line"
              stagger={0.08}
            >
              {pillars.map((pillar) => (
                <RevealItem key={pillar.title} variant="fade">
                  <div className="flex gap-5 bg-ink-card p-7">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-accent">
                      <Icon name={pillar.icon} className="size-4" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">{pillar.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{pillar.body}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Shell>
      </Section>

      <Section tone="paper">
        <Shell>
          <h2 className="text-[clamp(1.9rem,4vw,2.6rem)] font-semibold text-balance-tight">
            Four principles we actually work by.
          </h2>

          <div className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-paper-line bg-paper-line sm:grid-cols-2">
            {principles.map((principle, index) => (
              <div key={principle.title} className="bg-white p-7 sm:p-8">
                <span className="font-mono text-xs tracking-[0.2em] text-fg-invert-muted">
                  0{index + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-invert-muted">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </Shell>
      </Section>

      <Section tone="deep">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <p className="eyebrow mb-5">Where we’re going</p>
              <h2 className="text-[clamp(1.8rem,3.8vw,2.5rem)] font-semibold text-balance-tight">
                Built to grow beyond a studio.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-fg-muted">
                The four divisions are not marketing categories; they are how WANDCOM is structured
                today. As clients ask for more, the structure expands — commerce operations, venture
                partnerships and products we build ourselves.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ol className="flex flex-col gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line">
                {divisions.map((division) => (
                  <li key={division.id} className="flex items-center gap-5 bg-ink-card p-5">
                    <span className="font-mono text-xs tracking-[0.2em] text-accent">
                      {division.index}
                    </span>
                    <span className="text-base font-medium tracking-tight">{division.name}</span>
                    <span className="ml-auto text-xs text-fg-muted">{division.timeline}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Shell>
      </Section>

      <CtaRow />
      <CTASection
        eyebrow="Introductions"
        title="Tell us what you’re building."
        description="The fastest way to understand how we work is to put a real problem in front of us."
      />
    </>
  );
}
