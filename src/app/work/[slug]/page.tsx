import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PageHero } from '@/components/layout/PageHero';
import { CTASection } from '@/components/sections/CTASection';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Section, Shell } from '@/components/ui/Section';
import { ProjectArt } from '@/components/work/ProjectArt';
import { siteConfig } from '@/content/site';
import { getNextProject, getProject, projects } from '@/content/work';

interface PageProps {
  /** Next 16 passes route params as a promise. */
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: 'Case study not found' };
  }

  return {
    title: `${project.title} — ${project.client}`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${project.client} · ${siteConfig.name}`,
      description: project.summary,
      url: `${siteConfig.url}/work/${project.slug}`,
      type: 'article',
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const next = getNextProject(project.slug);
  const meta: Array<[string, string]> = [
    ['Category', project.category],
    ['Sector', project.sector],
    ['Year', project.year],
    ['Client', project.client],
  ];

  return (
    <>
      <PageHero
        eyebrow={project.category}
        title={project.title}
        description={project.summary}
        crumb={[
          { label: 'Work', href: '/work' },
          { label: project.client, href: `/work/${project.slug}` },
        ]}
      >
        <Button href="/contact" icon="arrow-right">
          Start a similar project
        </Button>
      </PageHero>

      <Section tone="dark" flush className="pt-12">
        <Shell>
          <Reveal>
            <ProjectArt
              palette={project.palette}
              label={project.title}
              monogram={project.client.slice(0, 2).toUpperCase()}
              seed={projects.findIndex((item) => item.slug === project.slug)}
              className="aspect-[16/7]"
            />
          </Reveal>

          <RevealGroup className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {meta.map(([label, value]) => (
              <RevealItem key={label} variant="fade">
                <div className="flex h-full flex-col gap-1.5 bg-ink-card p-5">
                  <span className="text-[11px] tracking-[0.16em] text-fg-muted uppercase">
                    {label}
                  </span>
                  <span className="text-base font-medium">{value}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Shell>
      </Section>

      <Section tone="dark">
        <Shell>
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="eyebrow mb-5">Overview</p>
              <p className="text-lg leading-relaxed text-fg-muted">{project.intro}</p>

              <dl className="mt-10 flex flex-col gap-6 border-t border-line-soft pt-8 text-sm">
                <div>
                  <dt className="text-[11px] tracking-[0.16em] text-fg-muted uppercase">Services</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {project.services.map((service) => (
                      <span
                        key={service}
                        className="rounded-[var(--radius-pill)] border border-line-soft px-3 py-1 text-xs text-fg-muted"
                      >
                        {service}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] tracking-[0.16em] text-fg-muted uppercase">
                    Tools &amp; stack
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {project.stack.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-[var(--radius-pill)] border border-line-soft px-3 py-1 font-mono text-[11px] text-fg-muted"
                      >
                        {tool}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            <RevealGroup className="flex flex-col gap-10" stagger={0.07}>
              {project.steps.map((step, index) => (
                <RevealItem key={step.title} variant="up">
                  <article className="border-t border-line-soft pt-8">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs tracking-[0.22em] text-accent">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h2 className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
                        {step.title}
                      </h2>
                    </div>
                    <p className="mt-4 text-base leading-relaxed text-fg-muted">{step.body}</p>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Shell>
      </Section>

      <Section tone="paper">
        <Shell>
          <h2 className="text-[clamp(1.8rem,4vw,2.6rem)] font-semibold text-balance-tight">
            The result
          </h2>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-paper-line bg-paper-line sm:grid-cols-3">
            {project.results.map((result) => (
              <div key={result.label} className="bg-white p-7">
                <dd className="text-3xl font-semibold tracking-tight sm:text-4xl">{result.value}</dd>
                <dt className="mt-2 text-sm text-fg-invert-muted">{result.label}</dt>
              </div>
            ))}
          </dl>

          {project.testimonial ? (
            <figure className="mt-12 max-w-3xl border-l border-fg-invert pl-6">
              <Icon name="quote" className="size-5 text-fg-invert" />
              <blockquote className="mt-4 text-xl leading-relaxed font-medium tracking-tight sm:text-2xl">
                “{project.testimonial.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm text-fg-invert-muted">
                {project.testimonial.author} · {project.testimonial.role}
              </figcaption>
            </figure>
          ) : null}
        </Shell>
      </Section>

      <Section tone="deep">
        <Shell>
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow mb-4">Next case study</p>
              <Link
                href={`/work/${next.slug}`}
                className="group inline-flex items-center gap-4 text-[clamp(1.6rem,3.4vw,2.4rem)] font-semibold tracking-tight hover:text-accent"
              >
                {next.title}
                <Icon
                  name="arrow-right"
                  className="size-6 transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </Link>
              <p className="mt-2 text-sm text-fg-muted">{next.client}</p>
            </div>
            <Button href="/work" variant="secondary">
              All work
            </Button>
          </Reveal>
        </Shell>
      </Section>

      <CTASection
        eyebrow="Similar problem?"
        title="Let’s look at your numbers."
        description="Tell us what is not working and we will tell you honestly whether a build fixes it."
      />
    </>
  );
}
