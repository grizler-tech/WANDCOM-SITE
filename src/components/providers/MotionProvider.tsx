'use client';

import { MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * Global motion configuration.
 *
 * `reducedMotion="user"` makes every `motion` component in the tree jump
 * straight to its end state when the visitor has reduced motion enabled at the
 * operating-system level — one switch instead of hundreds of tiny checks.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
