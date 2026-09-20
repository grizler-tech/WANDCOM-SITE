'use client';

import { motion } from 'motion/react';

import { briefStepMeta } from '@/components/forms/brief-config';
import { Icon } from '@/components/ui/Icon';
import { easeOutExpo } from '@/lib/motion';
import { cn } from '@/lib/utils';

/** Step counter + progress rail shared by every step of the brief. */
export function BriefProgress({ step }: { step: number }) {
  return (
    <div className="border-b border-line-soft px-6 py-5 sm:px-8">
      <ol className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
        {briefStepMeta.map((meta, index) => (
          <li key={meta.title} className="flex items-center gap-2">
            <span
              className={cn(
                'grid size-6 place-items-center rounded-full border font-mono text-[10px]',
                index < step && 'border-accent bg-accent text-ink',
                index === step && 'border-accent text-accent',
                index > step && 'border-line text-fg-muted',
              )}
            >
              {index < step ? <Icon name="check" className="size-3" strokeWidth={3} /> : index + 1}
            </span>
            <span className={cn('hidden sm:inline', index === step ? 'text-fg' : 'text-fg-muted')}>
              {meta.title}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-4 h-0.5 w-full overflow-hidden rounded-full bg-line">
        <motion.div
          className="h-full bg-accent"
          animate={{ width: `${((step + 1) / briefStepMeta.length) * 100}%` }}
          transition={{ duration: 0.4, ease: easeOutExpo }}
        />
      </div>
    </div>
  );
}
