import { Icon } from '@/components/ui/Icon';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Section, Shell } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { differentiators, siteConfig } from '@/content/site';

/**
 * "Why WANDCOM?" — light chapter. Deliberately opinionated statements rather
 * than a list of adjectives.
 */
export function WhyWandcom() {
  return (
    <Section id="why" tone="paper">
      <Shell>
        <SectionHeading
          eyebrow="Why Wandcom"
          title="Four reasons clients stay after the first build."
          description={`We are not a template shop. ${siteConfig.name} exists so ambitious businesses can look, sell and operate like much bigger companies.`}
        />

        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-paper-line bg-paper-line sm:grid-cols-2">
          {differentiators.map((item, index) => (
            <RevealItem key={item.title} variant="fade" className="bg-white">
              <div className="flex h-full flex-col gap-4 p-7 sm:p-9">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.2em] text-fg-invert-muted">
                    0{index + 1}
                  </span>
                  <Icon name="check" className="size-4 text-fg-invert" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{item.title}</h3>
                <p className="text-sm leading-relaxed text-fg-invert-muted">{item.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-12 flex flex-col gap-4 rounded-[var(--radius-card)] border border-paper-line bg-white p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <p className="max-w-2xl text-lg font-medium tracking-tight">
            If a project is not a fit, we will tell you in the first conversation — and point you to
            someone who is.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex shrink-0 items-center gap-2 text-sm font-medium underline decoration-accent underline-offset-4 hover:text-fg-invert-muted"
          >
            {siteConfig.email}
            <Icon name="arrow-up-right" className="size-4" />
          </a>
        </div>
      </Shell>
    </Section>
  );
}
