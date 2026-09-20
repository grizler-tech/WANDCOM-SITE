import type { Metadata } from 'next';

import { ProjectBriefForm } from '@/components/forms/ProjectBriefForm';
import { PageHero } from '@/components/layout/PageHero';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section, Shell } from '@/components/ui/Section';
import { siteConfig, whatsappLink } from '@/content/site';

export const metadata: Metadata = {
  title: 'Start a Project',
  description:
    'Send a four-step project brief to WANDCOM: what you need, the details, your budget range and your launch timing. You get a considered reply within one working day.',
  alternates: { canonical: '/contact' },
};

/** Sets expectations so the first reply does not feel like a surprise. */
const nextSteps: { title: string; body: string }[] = [
  {
    title: 'We read it properly',
    body: 'Your brief lands with the people who would build the work — not a sales inbox.',
  },
  {
    title: 'One working day',
    body: 'You get an initial reply with questions, an approach and an honest read on budget and timeline.',
  },
  {
    title: 'Discovery call',
    body: 'A 30-minute conversation to pressure-test scope. No obligation, no pitch deck.',
  },
  {
    title: 'Written scope and quote',
    body: 'If we are a fit, you receive a fixed, line-item quotation and a dated schedule.',
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Start a Project"
        title="Let’s build something."
        description="Four quick questions. The more specific you are, the more useful our first reply will be — but do not overthink it."
      />

      <Section tone="dark" flush className="pt-12 pb-20">
        <Shell>
          <ProjectBriefForm />
        </Shell>
      </Section>

      <Section tone="deep">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <p className="eyebrow mb-5">What happens next</p>
              <ol className="flex flex-col gap-6">
                {nextSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-5">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line font-mono text-[11px] text-accent">
                      0{index + 1}
                    </span>
                    <div>
                      <h2 className="text-base font-medium tracking-tight">{step.title}</h2>
                      <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="card p-7 sm:p-8">
                <p className="eyebrow mb-5">Direct lines</p>

                <ul className="flex flex-col gap-5 text-sm">
                  <li className="flex items-start gap-4">
                    <Icon name="mail" className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span className="flex flex-col">
                      <span className="text-[11px] tracking-[0.14em] text-fg-muted uppercase">
                        Email
                      </span>
                      <a className="hover:text-accent" href={`mailto:${siteConfig.email}`}>
                        {siteConfig.email}
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Icon name="phone" className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span className="flex flex-col">
                      <span className="text-[11px] tracking-[0.14em] text-fg-muted uppercase">
                        Phone
                      </span>
                      <a
                        className="hover:text-accent"
                        href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                      >
                        {siteConfig.phone}
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Icon name="message-circle" className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span className="flex flex-col">
                      <span className="text-[11px] tracking-[0.14em] text-fg-muted uppercase">
                        WhatsApp
                      </span>
                      <a
                        className="hover:text-accent"
                        href={whatsappLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Chat with Wandcom
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Icon name="map-pin" className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span className="flex flex-col">
                      <span className="text-[11px] tracking-[0.14em] text-fg-muted uppercase">
                        Studio
                      </span>
                      <span>{siteConfig.location}</span>
                      <span className="text-fg-muted">{siteConfig.hours}</span>
                    </span>
                  </li>
                </ul>

                <p className="mt-7 border-t border-line-soft pt-6 text-xs leading-relaxed text-fg-muted">
                  We work with clients across Kenya and remotely. Meetings are usually online; we
                  travel for workshops and shoots when a project needs it.
                </p>
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>

      <FaqAccordion />
    </>
  );
}
