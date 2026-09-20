import type { Metadata } from 'next';

import { CapabilityStrip } from '@/components/sections/CapabilityStrip';
import { CTASection } from '@/components/sections/CTASection';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { FeaturedWork } from '@/components/sections/FeaturedWork';
import { Hero } from '@/components/sections/Hero';
import { PricingSection } from '@/components/sections/PricingSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ServicesPreview } from '@/components/sections/ServicesPreview';
import { Testimonials } from '@/components/sections/Testimonials';
import { WhyWandcom } from '@/components/sections/WhyWandcom';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Section, Shell } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: `${siteConfig.name} — Digital experiences, creative solutions`,
  description:
    'WANDCOM designs and builds websites, e-commerce experiences, brand systems, digital growth and business automation for ambitious businesses in Kenya and beyond.',
  alternates: { canonical: '/' },
};

/** Short, honest About teaser — the full story lives on /about. */
function AboutTeaser() {
  const pillars = [
    { title: 'Technology', body: 'Modern, fast, maintainable builds — not fragile templates.' },
    { title: 'Design', body: 'Clarity first: structure, hierarchy and typography that earn trust.' },
    { title: 'Strategy', body: 'Every decision tied to a business outcome we agreed on.' },
  ];

  return (
    <Section tone="paper">
      <Shell>
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionHeading
            eyebrow="About Wandcom"
            title="We’re building what comes next."
            description="WANDCOM is a digital-focused creative company combining technology, design and strategy. We are small on purpose: the people you meet are the people who build."
            action={
              <Button href="/about" variant="outline" icon="arrow-right">
                More about us
              </Button>
            }
          />

          <Reveal delay={0.1}>
            <div className="grid gap-px overflow-hidden rounded-card border border-paper-line bg-paper-line sm:grid-cols-3">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="bg-white p-6">
                  <h3 className="text-base font-semibold tracking-tight">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-invert-muted">{pillar.body}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-base leading-relaxed text-fg-invert-muted">
              We work with businesses that have outgrown “a friend who does websites” — and we
              measure ourselves on whether the work earns its keep.
            </p>
          </Reveal>
        </div>
      </Shell>
    </Section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilityStrip />
      <ServicesPreview />
      <WhyWandcom />
      <FeaturedWork />
      <AboutTeaser />
      <ProcessSection tone="deep" />
      <PricingSection />
      <Testimonials />
      <FaqAccordion />
      <CTASection />
    </>
  );
}
