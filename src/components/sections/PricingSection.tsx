import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Section, Shell } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { pricingAddOns, pricingTiers } from '@/content/pricing';
import { cn } from '@/lib/utils';

/**
 * Pricing bands, not a fixed price list: Starter / Growth / Custom.
 * A real calculator lives on /pricing — this section always routes there.
 */
export function PricingSection({ showAddOns = true }: { showAddOns?: boolean }) {
  return (
    <Section id="pricing" tone="paper">
      <Shell>
        <SectionHeading
          eyebrow="Engagements"
          title="Three ways to work with us."
          description="Transparent bands so you can sanity-check the fit before we ever talk. Every project is quoted line by line after Discovery."
        />

        <RevealGroup className="mt-14 grid gap-5 lg:grid-cols-3" stagger={0.08}>
          {pricingTiers.map((tier) => (
            <RevealItem key={tier.id}>
              <div
                className={cn(
                  'flex h-full flex-col rounded-[var(--radius-card)] border bg-white p-7 sm:p-8',
                  tier.highlighted
                    ? 'border-fg-invert shadow-[0_24px_60px_-40px_rgba(0,0,0,0.55)]'
                    : 'border-paper-line',
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold tracking-tight">{tier.name}</h3>
                  {tier.highlighted ? (
                    <span className="rounded-[var(--radius-pill)] bg-accent px-3 py-1 font-mono text-[10px] tracking-[0.16em] uppercase">
                      Most chosen
                    </span>
                  ) : null}
                </div>

                <p className="mt-4 text-sm leading-relaxed text-fg-invert-muted">{tier.for}</p>

                <p className="mt-7 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {tier.price}
                </p>
                <p className="mt-1 text-xs tracking-[0.14em] text-fg-invert-muted uppercase">
                  {tier.priceNote}
                </p>

                <ul className="mt-8 flex flex-col gap-3 text-sm">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Icon
                        name="check"
                        className="mt-0.5 size-4 shrink-0 text-fg-invert"
                        aria-hidden
                      />
                      <span className="text-fg-invert-muted">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <Button
                    href={`/contact?tier=${tier.id}`}
                    variant={tier.highlighted ? 'invert' : 'outline'}
                    icon="arrow-right"
                    fullWidth
                  >
                    {tier.cta}
                  </Button>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {showAddOns ? (
          <div className="mt-14 rounded-[var(--radius-card)] border border-paper-line bg-white p-7 sm:p-9">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold tracking-tight">Add-ons & retainers</h3>
                <p className="mt-1.5 text-sm text-fg-invert-muted">
                  Bolt any of these onto a project, or run them as a standalone retainer.
                </p>
              </div>
              <Button href="/pricing" variant="outline" icon="arrow-right">
                Estimate your project
              </Button>
            </div>

            <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-paper-line bg-paper-line sm:grid-cols-2 lg:grid-cols-3">
              {pricingAddOns.map((addOn) => (
                <div key={addOn.name} className="bg-white p-5">
                  <dt className="text-sm font-medium">{addOn.name}</dt>
                  <dd className="mt-1 text-sm text-fg-invert-muted">{addOn.note}</dd>
                  <dd className="mt-3 font-mono text-xs tracking-[0.1em]">{addOn.price}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-sm text-fg-invert-muted">
              Need something outside these bands?{' '}
              <Link
                href="/contact"
                className="text-fg-invert underline decoration-accent underline-offset-4"
              >
                Request a custom quote
              </Link>{' '}
              — we scope multi-phase work the same way: written, fixed and phased.
            </p>
          </div>
        ) : null}
      </Shell>
    </Section>
  );
}
