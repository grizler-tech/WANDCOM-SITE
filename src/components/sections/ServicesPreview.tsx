import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Section, Shell } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { divisions } from '@/content/services';

/**
 * The four divisions, presented as opening chapters rather than a service dump.
 * Each card links to its anchored section on /services.
 */
export function ServicesPreview() {
  return (
    <Section id="services" tone="dark">
      <Shell>
        <SectionHeading
          eyebrow="What we do"
          title="Four divisions. One creative partner."
          description="Everything digital a growing business needs, organised so you only pay for the parts you actually need right now."
          action={
            <Button href="/services" variant="secondary" icon="arrow-right">
              All services
            </Button>
          }
        />

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2">
          {divisions.map((division) => (
            <RevealItem key={division.id}>
              <Link
                href={`/services#${division.id}`}
                className="card card-hover group flex h-full flex-col p-7 sm:p-9"
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="font-mono text-xs tracking-[0.2em] text-accent">
                    {division.index}
                  </span>
                  <span className="grid size-10 place-items-center rounded-full border border-line text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-ink">
                    <Icon name={division.icon as IconName} className="size-4" />
                  </span>
                </div>

                <h3 className="mt-8 text-2xl font-semibold tracking-tight sm:text-[1.7rem]">
                  {division.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{division.tagline}</p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {division.items.slice(0, 4).map((item) => (
                    <li
                      key={item.title}
                      className="rounded-[var(--radius-pill)] border border-line-soft px-3 py-1 text-xs text-fg-muted"
                    >
                      {item.title}
                    </li>
                  ))}
                  <li className="rounded-[var(--radius-pill)] border border-line-soft px-3 py-1 text-xs text-fg-muted">
                    +{division.items.length - 4} more
                  </li>
                </ul>

                <div className="mt-auto flex items-center justify-between gap-4 pt-8 text-sm">
                  <span className="text-fg-muted">{division.startingFrom}</span>
                  <span className="inline-flex items-center gap-1.5 text-accent">
                    Explore
                    <Icon
                      name="arrow-right"
                      className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-8">
          <p className="text-sm text-fg-muted">
            Not sure which fits?{' '}
            <Link
              href="/pricing"
              className="text-fg underline decoration-accent/60 underline-offset-4 hover:text-accent"
            >
              Compare engagement models
            </Link>{' '}
            or send a brief and we will recommend the smallest thing that solves it.
          </p>
        </Reveal>
      </Shell>
    </Section>
  );
}
