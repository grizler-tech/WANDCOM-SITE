import type { Metadata } from 'next';

import { PageHero } from '@/components/layout/PageHero';
import { CTASection } from '@/components/sections/CTASection';
import { Button } from '@/components/ui/Button';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Section, Shell } from '@/components/ui/Section';
import { ProjectCard } from '@/components/work/ProjectCard';
import { projects } from '@/content/work';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected WANDCOM case studies: brand identity, e-commerce builds, business websites and digital campaigns — with the challenge, approach, build and measured result.',
  alternates: { canonical: '/work' },
};

/** Sector labels used as a lightweight visual filter legend. */
const sectors = Array.from(new Set(projects.map((project) => project.sector)));

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="Case studies, not screenshots."
        description="Each project is documented the same way: the challenge, our approach, the design, the development and the result that followed."
      >
        <Button href="/contact" icon="arrow-right">
          Start a Project
        </Button>
      </PageHero>

      <Section tone="deep" flush className="border-b border-line-soft py-8">
        <Shell>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-fg-muted">
            <span className="font-mono tracking-[0.16em] uppercase">
              {projects.length} case studies
            </span>
            <span className="h-px w-8 bg-line" aria-hidden />
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {sectors.map((sector) => (
                <li key={sector} className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-accent" aria-hidden />
                  {sector}
                </li>
              ))}
            </ul>
          </div>
        </Shell>
      </Section>

      <Section tone="dark">
        <Shell>
          <RevealGroup className="grid gap-6 md:grid-cols-2" stagger={0.09}>
            {projects.map((project, index) => (
              <RevealItem
                key={project.slug}
                // The first project gets a full-width card on desktop.
                className={index === 0 ? 'md:col-span-2' : undefined}
              >
                <ProjectCard project={project} index={index} size={index === 0 ? 'wide' : 'default'} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Shell>
      </Section>

      <CTASection
        eyebrow="Your project next"
        title="Let’s make the next case study yours."
        description="Bring the problem, not the brief. We will help you shape the scope during Discovery."
      />
    </>
  );
}
