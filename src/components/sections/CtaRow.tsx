import { Button } from '@/components/ui/Button';
import { Icon, type IconName } from '@/components/ui/Icon';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Section, Shell } from '@/components/ui/Section';
import { siteConfig, whatsappLink } from '@/content/site';

interface CtaRowProps {
  /** Override the default heading. */
  eyebrow?: string;
  title?: string;
}

interface Option {
  icon: IconName;
  title: string;
  body: string;
  cta: string;
  href: string;
  external?: boolean;
}

/**
 * Two side-by-side conversion routes, used on pages that need a mid-page
 * decision point: send a brief, or start a conversation on WhatsApp.
 */
export function CtaRow({ eyebrow = 'Two ways to start', title }: CtaRowProps) {
  const options: Option[] = [
    {
      icon: 'send',
      title: 'Send a project brief',
      body: 'Four quick questions. You get a considered reply with approach, timeline and budget within one working day.',
      cta: 'Start a Project',
      href: '/contact',
    },
    {
      icon: 'message-circle',
      title: 'Chat on WhatsApp',
      body: 'For quick questions, timelines or a sanity check on scope before you write anything down.',
      cta: 'Open WhatsApp',
      href: whatsappLink(),
      external: true,
    },
  ];

  return (
    <Section tone="dark">
      <Shell>
        <p className="eyebrow mb-8">{eyebrow}</p>
        {title ? (
          <h2 className="mb-10 max-w-3xl text-[clamp(1.8rem,4vw,2.6rem)] font-semibold text-balance-tight">
            {title}
          </h2>
        ) : null}

        <RevealGroup className="grid gap-5 lg:grid-cols-2" stagger={0.08}>
          {options.map((option) => (
            <RevealItem key={option.title}>
              <div className="card card-hover flex h-full flex-col p-7 sm:p-9">
                <span className="grid size-11 place-items-center rounded-full border border-line text-accent">
                  <Icon name={option.icon} className="size-4" />
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-tight sm:text-2xl">
                  {option.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{option.body}</p>
                <div className="mt-auto pt-7">
                  <Button
                    href={option.href}
                    external={option.external}
                    variant={option.external ? 'secondary' : 'primary'}
                    icon="arrow-right"
                  >
                    {option.cta}
                  </Button>
                  {option.external ? (
                    <p className="mt-3 text-xs text-fg-muted">
                      Or email {siteConfig.email} · {siteConfig.hours}
                    </p>
                  ) : null}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Shell>
    </Section>
  );
}
