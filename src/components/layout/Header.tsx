'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { navItems, siteConfig, whatsappLink } from '@/content/site';
import { easeOutExpo } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * Sticky primary navigation.
 *
 *  • Transparent over the hero, then blurs and adds a hairline once scrolled.
 *  • Full desktop nav from `lg`; a slide-down panel on smaller screens.
 *  • The primary CTA ("Start a Project") is never hidden.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile panel on navigation, and lock body scroll while it is open.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-line-soft bg-ink/85 backdrop-blur-xl' : 'border-b border-transparent',
      )}
    >
      <div className="shell flex h-[68px] items-center justify-between gap-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-[1.05rem] font-semibold tracking-[0.22em]"
          aria-label={`${siteConfig.name} — home`}
        >
          <span
            className="grid size-7 place-items-center rounded-[9px] bg-accent text-[11px] font-bold text-ink transition-transform duration-300 group-hover:rotate-6"
            aria-hidden
          >
            W
          </span>
          <span>{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={cn(
                'relative rounded-[var(--radius-pill)] px-3.5 py-2 text-sm transition-colors duration-200',
                isActive(item.href) ? 'text-fg' : 'text-fg-muted hover:text-fg',
              )}
            >
              {item.label}
              {isActive(item.href) ? (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-3 -bottom-0.5 h-px bg-accent"
                  transition={{ duration: 0.35, ease: easeOutExpo }}
                />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-[var(--radius-pill)] px-3 py-2 text-sm text-fg-muted transition-colors hover:text-accent xl:inline-flex"
          >
            <Icon name="message-circle" className="size-4" />
            WhatsApp
          </a>

          <Button href="/contact" size="sm" className="hidden sm:inline-flex">
            Start a Project
          </Button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid size-10 place-items-center rounded-full border border-line text-fg transition-colors hover:border-accent/60 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <svg viewBox="0 0 20 20" className="size-5" aria-hidden fill="none" strokeWidth={1.7} stroke="currentColor" strokeLinecap="round">
              {open ? (
                <>
                  <path d="M5 5l10 10" />
                  <path d="M15 5L5 15" />
                </>
              ) : (
                <>
                  <path d="M3 6.5h14" />
                  <path d="M3 13.5h14" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            className="overflow-hidden border-t border-line-soft bg-ink/97 backdrop-blur-xl lg:hidden"
          >
            <div className="shell flex max-h-[calc(100dvh-68px)] flex-col gap-1 overflow-y-auto py-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center justify-between rounded-2xl border border-transparent px-4 py-3.5 text-lg font-medium transition-colors',
                    isActive(item.href)
                      ? 'border-line bg-white/[0.03] text-fg'
                      : 'text-fg-muted hover:border-line hover:text-fg',
                  )}
                >
                  <span>{item.label}</span>
                  <Icon name="arrow-up-right" className="size-4 text-accent" />
                </Link>
              ))}

              <div className="mt-4 flex flex-col gap-3">
                <Button href="/contact" size="lg" fullWidth icon="arrow-right">
                  Start a Project
                </Button>
                <Button href={whatsappLink()} variant="secondary" size="lg" fullWidth>
                  Chat on WhatsApp
                </Button>
              </div>

              <div className="mt-5 flex flex-col gap-1 pb-2 text-sm text-fg-muted">
                <a className="hover:text-accent" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
                <span>{siteConfig.location}</span>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
