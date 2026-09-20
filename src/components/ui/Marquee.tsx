import type { CSSProperties } from 'react';

import { cn } from '@/lib/utils';

interface MarqueeProps {
  items: string[];
  className?: string;
  /** Seconds for one full pass. */
  speed?: number;
  separator?: string;
}

/**
 * The credibility strip under the hero.
 *
 * Pure CSS (no JS, no layout thrash): the list is rendered twice and the track
 * translates -50%, which loops seamlessly. The duplicate is hidden from
 * assistive tech so screen readers announce the list once.
 */
export function Marquee({ items, className, speed = 38, separator = '·' }: MarqueeProps) {
  return (
    <div className={cn('edge-fade-x group relative overflow-hidden py-5', className)}>
      <div
        className="animate-marquee flex w-max items-center gap-10 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ animationDuration: `${speed}s` } as CSSProperties}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 || undefined}
            className="flex items-center gap-10 text-sm font-medium tracking-[0.16em] text-fg-muted uppercase"
          >
            {items.map((item) => (
              <li key={`${copy}-${item}`} className="flex items-center gap-10 whitespace-nowrap">
                <span className="transition-colors duration-200 hover:text-accent">{item}</span>
                <span className="text-accent/60">{separator}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
