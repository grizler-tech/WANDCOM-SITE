import { z } from 'zod';

/**
 * Server-side schemas. The client uses the same module for instant field-level
 * feedback, so validation rules can never drift between the two.
 */

export const budgetBandValues = [
  'under-50k',
  '50k-150k',
  '150k-400k',
  '400k-plus',
  'not-sure',
] as const;

export const timelineBandValues = ['asap', '1-2-months', '3-6-months', 'flexible'] as const;

/** The multi-step "Start a Project" brief. */
export const briefSchema = z.object({
  name: z.string().trim().min(2, 'Please tell us your name').max(80),
  email: z.email('Enter a valid email address').max(160),
  phone: z
    .string()
    .trim()
    .max(32, 'That phone number looks too long')
    .optional()
    .transform((value: string | undefined) => value || undefined),
  company: z
    .string()
    .trim()
    .max(140)
    .optional()
    .transform((value: string | undefined) => value || undefined),
  services: z
    .array(z.string().trim().min(1).max(80))
    .min(1, 'Select at least one thing you need')
    .max(10, 'That is more than ten services — just pick the closest ones'),
  projectDetails: z
    .string()
    .trim()
    .min(20, 'A sentence or two helps us prepare properly')
    .max(4000, 'Please keep it under 4000 characters'),
  budget: z.enum(budgetBandValues, { message: 'Choose a budget range' }),
  timeline: z.enum(timelineBandValues, { message: 'Choose a timeline' }),
  /** Honeypot: real people never see this field, so it must stay empty. */
  website: z.string().max(200).optional(),
  /** Free-text attribution captured from the page that submitted the form. */
  source: z.string().trim().max(160).optional(),
});

export type BriefInput = z.infer<typeof briefSchema>;

export const newsletterSchema = z.object({
  email: z.email('Enter a valid email address').max(160),
  source: z.string().trim().max(160).optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const quoteSchema = z.object({
  services: z.array(z.string().trim().min(1)).min(1, 'Pick at least one service').max(12),
  urgency: z.string().trim().min(1),
  scale: z.string().trim().min(1),
  email: z
    .string()
    .trim()
    .optional()
    .transform((value: string | undefined) => (value ? value : undefined))
    .refine((value: string | undefined) => !value || z.email().safeParse(value).success, {
      message: 'Enter a valid email address',
    }),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

/**
 * Converts a Zod error into `{ fieldName: message }`, which is exactly what the
 * form components expect back from the API.
 */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const output: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.length > 0 ? String(issue.path[0]) : 'form';
    if (!output[key]) output[key] = issue.message;
  }
  return output;
}
