import type { ReactNode } from 'react';

import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Shell } from '@/components/ui/Section';

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  /** Optional action buttons. */
  children?: ReactNode;
  /** Small breadcrumb-style label shown above the eyebrow. */
  crumb?: { label: string; href: string }[];
}

/**
 * Shared inner-page header. Keeps every page opening with the same rhythm the
 * homepage hero establishes, without repeating hero-sized type.
 */
export function PageHero({ eyebrow, title, description, children, crumb }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line-soft pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[620px] rounded-full opacity-15 blur-[120px]"
        style={{ background: 'radial-gradient(closest-side, #c8ff4d, transparent)' }}
        aria-hidden
      />

      <Shell className="relative">
        {crumb ? (
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-fg-muted">
            {crumb.map((item, index) => (
              <span key={item.href} className="inline-flex items-center gap-2">
                {index > 0 ? <Icon name="chevron-right" className="size-3" /> : null}
                <a href={item.href} className="hover:text-accent">
                  {item.label}
                </a>
              </span>
            ))}
          </nav>
        ) : null}

        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.3rem,6vw,4.4rem)] font-semibold text-balance-tight">
            {title}
          </h1>
          {description ? (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-9 flex flex-wrap gap-3">{children}</div> : null}
        </Reveal>
      </Shell>
    </section>
  );
}
