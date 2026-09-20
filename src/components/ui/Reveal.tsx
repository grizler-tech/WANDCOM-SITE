'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

import { fadeIn, fadeUp, scaleIn, slideInLeft, viewportOnce, durations, easeOutExpo, staggerParent } from '@/lib/motion';
import { cn } from '@/lib/utils';

const presets = {
  up: fadeUp,
  fade: fadeIn,
  scale: scaleIn,
  left: slideInLeft,
} as const;

interface RevealProps {
  children: ReactNode;
  /** Animation style — defaults to a short upward fade. */
  variant?: keyof typeof presets;
  /** Extra delay in seconds, added on top of the preset timing. */
  delay?: number;
  className?: string;
}

/**
 * Scroll-reveal wrapper. Animates once, respects `prefers-reduced-motion`
 * (handled globally by MotionProvider), and adds no layout wrappers of its own.
 */
export function Reveal({ children, variant = 'up', delay = 0, className }: RevealProps) {
  const preset = presets[variant];

  return (
    <motion.div
      className={cn(className)}
      variants={preset}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ duration: durations.slow, ease: easeOutExpo, delay }}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

/** Parent for staggered children — pair with `<Reveal variant="up">` items. */
export function RevealGroup({ children, className, stagger = 0.08 }: RevealGroupProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={staggerParent(stagger)}
    >
      {children}
    </motion.div>
  );
}

/** Child of `<RevealGroup>`: inherits the parent's stagger timing. */
export function RevealItem({
  children,
  className,
  variant = 'up',
}: {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof presets;
}) {
  return (
    <motion.div className={cn(className)} variants={presets[variant]}>
      {children}
    </motion.div>
  );
}
