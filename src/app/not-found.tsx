import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { navItems } from '@/content/site';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'That page does not exist — here is the way back.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden pt-40 pb-28">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      <div className="shell relative">
        <p className="eyebrow">404</p>
        <h1 className="mt-6 max-w-3xl text-[clamp(2.2rem,6vw,4rem)] font-semibold text-balance-tight">
          That page has moved, or never existed.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
          No harm done. Pick a direction below — or send us a brief and we will point you to the
          right place.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/" icon="arrow-right">
            Back to home
          </Button>
          <Button href="/contact" variant="secondary">
            Start a Project
          </Button>
        </div>

        <ul className="mt-14 flex flex-wrap gap-x-4 gap-y-3">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-line px-4 py-2 text-sm text-fg-muted transition-colors hover:border-accent/60 hover:text-accent"
              >
                {item.label}
                <Icon name="arrow-up-right" className="size-3.5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
