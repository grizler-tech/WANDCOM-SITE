/**
 * Small shared helpers used across components and API routes.
 */

/**
 * Minimal class joiner — keeps the dependency tree small.
 *
 * Accepts anything a conditional might produce (`false`, `null`, `undefined`,
 * `0`, `''`, nested arrays) and keeps only real strings, so callers can write
 * `cn('base', isActive && 'active')` without type gymnastics.
 */
export type ClassValue =
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined
  | ClassValue[];

export function cn(...values: ClassValue[]): string {
  const classes: string[] = [];

  for (const value of values) {
    if (!value) continue;

    if (Array.isArray(value)) {
      const nested = cn(...value);
      if (nested) classes.push(nested);
      continue;
    }

    if (typeof value === 'string') classes.push(value);
  }

  return classes.join(' ');
}

/** Formats a number as Kenyan shillings without decimals: 150000 → "KES 150,000". */
export function formatKes(amount: number): string {
  return `KES ${new Intl.NumberFormat('en-KE', {
    maximumFractionDigits: 0,
  }).format(amount)}`;
}

/** Rounds to the nearest 5,000 so estimates stay honest rather than fake-precise. */
export function roundToNearest(amount: number, step = 5000): number {
  return Math.round(amount / step) * step;
}
