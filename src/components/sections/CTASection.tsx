import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Shell } from '@/components/ui/Section';
import { siteConfig, whatsappLink } from '@/content/site';

interface CTASectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Primary button label. */
  cta?: string;
  href?: string;
}

/** Closing call to action used at the bottom of nearly every page. */
export function CTASection({
  eyebrow = 'Next step',
  title = 'Let’s build something.',
  description = 'Tell us what you are trying to achieve. Within one working day you get a straight answer on approach, timeline and budget — no sales sequence.',
  cta = 'Start a Project',
  href = '/contact',
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden border-t border-line bg-ink">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute -bottom-52 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-20 blur-[130px]"
        style={{ background: 'radial-gradient(closest-side, #c8ff4d, transparent)' }}
        aria-hidden
      />

      <Shell className="relative section-y">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">{eyebrow}</p>
          <h2 className="mt-6 text-[clamp(2.2rem,5.6vw,4rem)] font-semibold text-balance-tight">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
            {description}
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={href} size="lg" icon="arrow-right">
              {cta}
            </Button>
            <Button href={whatsappLink()} variant="secondary" size="lg">
              Chat on WhatsApp
            </Button>
          </div>

          <p className="mt-8 text-sm text-fg-muted">
            Or email{' '}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-fg underline decoration-accent/60 underline-offset-4 hover:text-accent"
            >
              {siteConfig.email}
            </a>{' '}
            · {siteConfig.location}
          </p>
        </Reveal>
      </Shell>
    </section>
  );
}
