import { briefSchema } from '@/lib/validation';
import type { BudgetBand, TimelineBand } from '@/types';

/** Shared configuration and types for the multi-step project brief. */

export interface BriefFormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  services: string[];
  projectDetails: string;
  budget: '' | BudgetBand;
  timeline: '' | TimelineBand;
  /** Honeypot — must stay empty. */
  website: string;
}

export const initialBriefState: BriefFormState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  services: [],
  projectDetails: '',
  budget: '',
  timeline: '',
  website: '',
};

export const briefStepMeta = [
  { title: 'What do you need?', hint: 'Select everything that applies.' },
  { title: 'Tell us about the project', hint: 'A few sentences is plenty.' },
  { title: 'What is your budget range?', hint: 'Honest bands keep scoping honest.' },
  { title: 'When do you want to launch?', hint: 'Then you are done.' },
] as const;

/**
 * Per-step validation reuses the server schema, so the rules enforced in the
 * browser are literally the same rules enforced in the API route.
 */
export const briefStepSchemas = [
  briefSchema.pick({ services: true }),
  briefSchema.pick({
    name: true,
    email: true,
    phone: true,
    company: true,
    projectDetails: true,
  }),
  briefSchema.pick({ budget: true }),
  briefSchema.pick({ timeline: true }),
] as const;
