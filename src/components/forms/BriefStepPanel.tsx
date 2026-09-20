'use client';

import { motion } from 'motion/react';

import type { BriefFormState } from '@/components/forms/brief-config';
import { briefStepMeta } from '@/components/forms/brief-config';
import { StepChoices } from '@/components/forms/BriefChoices';
import { StepDetails, StepServices } from '@/components/forms/ProjectBriefSteps';
import { budgetBands, timelineBands } from '@/content/pricing';
import { easeOutExpo } from '@/lib/motion';
import type { BudgetBand, TimelineBand } from '@/types';

interface BriefStepPanelProps {
  step: number;
  values: BriefFormState;
  errors: Record<string, string>;
  onField: <K extends keyof BriefFormState>(key: K, value: BriefFormState[K]) => void;
  onToggleService: (service: string) => void;
}

/** Renders the active step inside an animated panel. */
export function BriefStepPanel({
  step,
  values,
  errors,
  onField,
  onToggleService,
}: BriefStepPanelProps) {
  return (
    <div className="px-6 py-8 sm:px-8 sm:py-10">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.28, ease: easeOutExpo }}
      >
        <p className="eyebrow mb-4">
          Step {step + 1} of {briefStepMeta.length}
        </p>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {briefStepMeta[step]?.title}
        </h2>
        <p className="mt-2 text-sm text-fg-muted">{briefStepMeta[step]?.hint}</p>

        <div className="mt-8">
          {step === 0 ? (
            <StepServices
              selected={values.services}
              onToggle={onToggleService}
              error={errors.services}
            />
          ) : null}

          {step === 1 ? (
            <StepDetails
              values={values}
              errors={errors}
              onChange={(key, value) => onField(key, value)}
            />
          ) : null}

          {step === 2 ? (
            <StepChoices
              name="budget"
              choices={budgetBands}
              value={values.budget}
              onChange={(value) => onField('budget', value as BudgetBand)}
              error={errors.budget}
            />
          ) : null}

          {step === 3 ? (
            <StepChoices
              name="timeline"
              choices={timelineBands}
              value={values.timeline}
              onChange={(value) => onField('timeline', value as TimelineBand)}
              error={errors.timeline}
            />
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}
