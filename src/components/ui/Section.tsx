import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type Tone = 'dark' | 'deep' | 'paper' | 'accent';

const tones: Record<Tone, string> = {
  dark: 'bg-ink text-fg',
  deep: 'bg-ink-soft text-fg',
  paper: 'on-paper',
  accent: 'bg-accent text-ink',
};

interface SectionProps {
  children: ReactNode;
  id?: string;
  tone?: Tone;
  /** Adds the hairline grid background. */
  grid?: boolean;
  /** Removes the default vertical rhythm (useful for hero/CTA blocks). */
  flush?: boolean;
  className?: string;
  'aria-labelledby'?: string;
}

export function Section({
  children,
  id,
  tone = 'dark',
  grid = false,
  flush = false,
  className,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative',
        tones[tone],
        !flush && 'section-y',
        grid && 'grid-bg',
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}

export function Shell({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('shell', className)}>{children}</div>;
}
