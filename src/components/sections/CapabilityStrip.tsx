import { Marquee } from '@/components/ui/Marquee';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { Shell } from '@/components/ui/Section';
import { capabilities, trustStats } from '@/content/site';

/**
 * Credibility strip: what we do, in one glance, plus the numbers that back it up.
 */
export function CapabilityStrip() {
  return (
    <section className="relative border-y border-line-soft bg-ink-soft/60">
      <Shell>
        <Marquee items={capabilities} />
      </Shell>

      <div className="border-t border-line-soft">
        <Shell>
          <dl className="grid divide-line-soft sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
            {trustStats.map((stat, index) => (
              <Reveal
                key={stat.label}
                delay={index * 0.06}
                className={`flex flex-col gap-1 px-1 py-6 sm:px-6 ${
                  index > 0 ? 'border-t border-line-soft sm:border-t-0' : ''
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon name="sparkles" className="size-3.5 text-accent" aria-hidden />
                  <dt className="text-[11px] tracking-[0.16em] text-fg-muted uppercase">
                    {stat.label}
                  </dt>
                </span>
                <dd className="text-2xl font-semibold tracking-tight">{stat.value}</dd>
              </Reveal>
            ))}
          </dl>
        </Shell>
      </div>
    </section>
  );
}
