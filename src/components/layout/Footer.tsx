import Link from 'next/link';

import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { divisions } from '@/content/services';
import { footerNav, siteConfig, socialLinks, whatsappLink } from '@/content/site';

const year = new Date().getFullYear();

export function Footer() {
  const companyNav = footerNav.find((group) => group.title === 'Company');

  return (
    <footer className="border-t border-line bg-ink-soft">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_2fr]">
          {/* Brand + primary actions -------------------------------------- */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2.5 text-[1.05rem] font-semibold tracking-[0.22em]"
            >
              <span
                className="grid size-7 place-items-center rounded-[9px] bg-accent text-[11px] font-bold text-ink"
                aria-hidden
              >
                W
              </span>
              <span>{siteConfig.name}</span>
            </Link>

            <p className="mt-5 max-w-sm text-base leading-relaxed text-fg-muted">
              {siteConfig.tagline}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/contact" icon="arrow-right">
                Start a Project
              </Button>
              <Button href={whatsappLink()} variant="secondary">
                WhatsApp us
              </Button>
            </div>

            <div className="mt-8 flex flex-col gap-2 text-sm text-fg-muted">
              <a className="w-fit hover:text-accent" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
              <a
                className="w-fit hover:text-accent"
                href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
              >
                {siteConfig.phone}
              </a>
              <span>{siteConfig.location}</span>
              <span className="text-fg-muted/70">{siteConfig.hours}</span>
            </div>
          </div>

          {/* Navigation + connect ----------------------------------------- */}
          <div className="grid gap-10 sm:grid-cols-3">
            <nav aria-label="Services">
              <h2 className="text-sm font-semibold tracking-wide">Services</h2>
              <ul className="mt-5 flex flex-col gap-3 text-sm">
                {divisions.map((division) => (
                  <li key={division.id}>
                    <Link
                      href={`/services#${division.id}`}
                      className="text-fg-muted transition-colors hover:text-accent"
                    >
                      {division.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Company">
              <h2 className="text-sm font-semibold tracking-wide">Company</h2>
              <ul className="mt-5 flex flex-col gap-3 text-sm">
                {(companyNav?.links ?? []).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-fg-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="text-sm font-semibold tracking-wide">Connect</h2>
              <ul className="mt-5 flex flex-col gap-3 text-sm">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-fg-muted transition-colors hover:text-accent"
                    >
                      {social.label}
                      <Icon
                        name="arrow-up-right"
                        className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-fg-muted transition-colors hover:text-accent"
                  >
                    WhatsApp
                    <Icon
                      name="arrow-up-right"
                      className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-8 border-t border-line-soft pt-10 lg:flex-row lg:items-end lg:justify-between">
          <NewsletterForm />
          <p className="text-sm text-fg-muted/70">
            Prefer a conversation?{' '}
            <Link
              href="/contact"
              className="text-fg underline decoration-accent/60 underline-offset-4 hover:text-accent"
            >
              Send a project brief
            </Link>{' '}
            — we reply within one working day.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line-soft pt-6 text-xs text-fg-muted/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} WANDCOM. All rights reserved.</p>
          <p className="font-mono tracking-[0.14em] uppercase">{siteConfig.positioning}</p>
        </div>
      </div>
    </footer>
  );
}
