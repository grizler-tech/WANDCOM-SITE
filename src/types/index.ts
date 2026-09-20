/**
 * Shared domain types for the WANDCOM site.
 *
 * The content in `src/content/*` is intentionally typed and framework-free so it
 * can be swapped for a headless CMS (Sanity, Payload, Contentful...) later
 * without touching a single component.
 */

/* ------------------------------------------------------------------ site ---*/

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
}

/* -------------------------------------------------------------- services ---*/

export type DivisionId =
  | 'digital-experiences'
  | 'brand-visual'
  | 'digital-growth'
  | 'digital-solutions';

export interface ServiceItem {
  /** Service name, e.g. "E-commerce websites". */
  title: string;
  /** One-line explanation of the value, not the feature list. */
  description: string;
  /** Concrete things the client receives. */
  deliverables: string[];
}

export interface ServiceDivision {
  id: DivisionId;
  /** Display index: "01" … "04". */
  index: string;
  name: string;
  /** Short positioning line used on cards and headers. */
  tagline: string;
  /** 2–3 sentence positioning paragraph. */
  summary: string;
  /** Business outcomes — what the client actually gets out of it. */
  outcomes: string[];
  items: ServiceItem[];
  /** Honest "from" price band, e.g. "From KES 45,000". */
  startingFrom: string;
  /** Typical delivery window. */
  timeline: string;
  /** Lucide icon key resolved in `components/ui/Icon.tsx`. */
  icon: string;
}

/* ------------------------------------------------------------------ work ---*/

export interface CaseStudyStep {
  /** "The Challenge" | "Our Approach" | "Design" | "Development" | "Result" */
  title: string;
  body: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  /** Card label, e.g. "E-commerce Website". */
  category: string;
  /** Card label, e.g. "Retail". */
  sector: string;
  year: string;
  /** One-sentence summary used in listings. */
  summary: string;
  /** Long-form intro for the case study header. */
  intro: string;
  services: string[];
  stack: string[];
  /** Two-colour art direction for the generative card visual. */
  palette: [string, string];
  /** The full case-study narrative. */
  steps: CaseStudyStep[];
  results: ProjectMetric[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  featured: boolean;
}

/* --------------------------------------------------------------- process ---*/

export interface ProcessStep {
  index: string;
  title: string;
  body: string;
  /** What the client walks away with at the end of the phase. */
  output: string;
}

/* --------------------------------------------------------------- pricing ---*/

export interface PricingTier {
  id: string;
  name: string;
  /** Positioning line. */
  for: string;
  price: string;
  /** e.g. "one-off project" */
  priceNote: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

export interface PricingAddOn {
  name: string;
  price: string;
  note: string;
}

/* ---------------------------------------------------------- social proof ---*/

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface Faq {
  question: string;
  answer: string;
}

/* ---------------------------------------------------------------- trust ----*/

export interface TrustStat {
  value: string;
  label: string;
}

/* ----------------------------------------------------------------- forms ---*/

export type BudgetBand = 'under-50k' | '50k-150k' | '150k-400k' | '400k-plus' | 'not-sure';

export type TimelineBand = 'asap' | '1-2-months' | '3-6-months' | 'flexible';

export interface ApiSuccess<T> {
  ok: true;
  data: T;
  message?: string;
}

export interface ApiFailure {
  ok: false;
  error: string;
  /** Field-level errors, keyed by form field name. */
  fields?: Record<string, string>;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
