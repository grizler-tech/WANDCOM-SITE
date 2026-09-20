import type { Variants } from 'motion/react';

/**
 * Motion language for the whole site.
 *
 * Rules of engagement (see docs/design-system.md):
 *  1. Every animation must be subtle, fast and purposeful.
 *  2. Reveals happen once — content is never re-animated on scroll-back.
 *  3. Users with `prefers-reduced-motion` get the end state immediately.
 */

/** Signature easing curve — confident start, soft landing. */
export const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const durations = {
  fast: 0.25,
  base: 0.5,
  slow: 0.8,
} as const;

/** Standard scroll-reveal viewport config. */
export const viewportOnce = { once: true, amount: 0.25 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.slow, ease: easeOutExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: durations.base, ease: easeOutExpo } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: durations.base, ease: easeOutExpo },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: durations.slow, ease: easeOutExpo } },
};

/** Parent variant that staggers its children. */
export const staggerParent = (stagger = 0.08, delay = 0.05): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** Char/word-level entrance used by the hero headline. */
export const headlineWord: Variants = {
  hidden: { opacity: 0, y: '0.5em' },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

/** Hover micro-interaction shared by cards. */
export const cardHover = {
  y: -6,
  transition: { duration: durations.fast, ease: easeOutExpo },
} as const;
