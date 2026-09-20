import type { ReactNode } from 'react';

import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  /** Small uppercase label above the title, e.g. "02 — Brand & Visual". */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Right-hand slot: buttons, links or a counter. */
  action?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  /** Heading level — keeps the document outline correct per page. */
  as?: 'h1' | 'h2' | 'h3';
}

const titleSizes = {
  h1: 'text-[clamp(2.6rem,7vw,5.2rem)]',
  h2: 'text-[clamp(2rem,4.6vw,3.4rem)]',
  h3: 'text-[clamp(1.5rem,3vw,2.1rem)]',
} as const;

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
  className,
  as = 'h2',
}: SectionHeadingProps) {
  const Heading = as;

  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        align === 'center' && 'items-center text-center',
        action && 'lg:flex-row lg:items-end lg:justify-between',
        className,
      )}
    >
      <Reveal className={cn('max-w-3xl', align === 'center' && 'mx-auto')}>
        {eyebrow ? <p className="eyebrow mb-5">{eyebrow}</p> : null}
        <Heading className={cn('text-balance-tight font-semibold', titleSizes[as])}>{title}</Heading>
        {description ? (
          <div className="prose-wandcom mt-5 max-w-2xl text-base sm:text-lg">
            {typeof description === 'string' ? <p>{description}</p> : description}
          </div>
        ) : null}
      </Reveal>

      {action ? <Reveal delay={0.1} className="shrink-0">{action}</Reveal> : null}
    </div>
  );
}
