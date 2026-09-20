import type { PricingAddOn, PricingTier } from '@/types';

/**
 * Three engagement bands instead of a fixed price list, exactly as the blueprint
 * asks: Starter / Growth / Custom, each answering "who is this for?".
 *
 * `quoteSignal` values are also used by the instant quote calculator on /pricing.
 */
export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    for: 'For individuals and small businesses that need to exist online, properly.',
    price: 'From KES 45,000',
    priceNote: 'one-off project',
    features: [
      'Up to 5 pages, designed and built',
      'Mobile-first responsive build',
      'Contact form + WhatsApp click-to-chat',
      'Basic SEO setup & analytics',
      'Domain, hosting and SSL configured',
      'Launch handover walkthrough',
    ],
    cta: 'Start with Starter',
    highlighted: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    for: 'For businesses ready to establish a stronger, consistent digital presence.',
    price: 'From KES 150,000',
    priceNote: 'one-off project',
    features: [
      'Everything in Starter',
      'Brand identity or refresh',
      'E-commerce or booking functionality',
      'CMS so your team can publish',
      'Content and imagery production',
      '90-day growth roadmap',
      '30 days of post-launch support',
    ],
    cta: 'Choose Growth',
    highlighted: true,
  },
  {
    id: 'custom',
    name: 'Custom',
    for: 'For companies requiring advanced digital solutions and integrations.',
    price: 'Quoted per project',
    priceNote: 'scoped in phases',
    features: [
      'Everything in Growth',
      'Business automation & integrations',
      'Custom web applications or portals',
      'WhatsApp commerce flows',
      'Business dashboards & reporting',
      'Team training and documentation',
      'Ongoing product partnership',
    ],
    cta: 'Request a custom quote',
    highlighted: false,
  },
];

export const pricingAddOns: PricingAddOn[] = [
  { name: 'Website maintenance', price: 'From KES 8,000/mo', note: 'Updates, backups, monitoring' },
  { name: 'Social media management', price: 'From KES 35,000/mo', note: 'Calendar, posts, community' },
  { name: 'SEO retainer', price: 'From KES 25,000/mo', note: 'Technical, content, reporting' },
  { name: 'Content shoot', price: 'From KES 20,000/day', note: 'Photo & short-form video' },
  { name: 'WhatsApp commerce setup', price: 'From KES 60,000', note: 'Catalogue, flows, payments' },
  { name: 'Automation sprint', price: 'From KES 80,000', note: 'Map, build, hand over' },
];

/** Bands selectable in the project brief form and the quote calculator. */
export const budgetBands: { id: string; label: string; note: string }[] = [
  { id: 'under-50k', label: 'Under KES 50,000', note: 'Starter essentials' },
  { id: '50k-150k', label: 'KES 50,000 – 150,000', note: 'Focused single deliverable' },
  { id: '150k-400k', label: 'KES 150,000 – 400,000', note: 'Full digital presence' },
  { id: '400k-plus', label: 'KES 400,000+', note: 'Systems, apps, automation' },
  { id: 'not-sure', label: 'Not sure yet', note: 'Help me scope it' },
];

export const timelineBands: { id: string; label: string }[] = [
  { id: 'asap', label: 'As soon as possible' },
  { id: '1-2-months', label: 'Within 1 – 2 months' },
  { id: '3-6-months', label: 'Within 3 – 6 months' },
  { id: 'flexible', label: 'Flexible — quality first' },
];

/** Starter prices in KES per service, used by the instant estimator. */
export const estimatorRates: { id: string; label: string; price: number }[] = [
  { id: 'website', label: 'Website design & build', price: 45000 },
  { id: 'landing', label: 'Landing page', price: 25000 },
  { id: 'ecommerce', label: 'E-commerce store', price: 120000 },
  { id: 'brand', label: 'Brand identity', price: 30000 },
  { id: 'social', label: 'Social media (monthly)', price: 35000 },
  { id: 'marketing', label: 'Digital marketing (monthly)', price: 40000 },
  { id: 'content', label: 'Content production', price: 30000 },
  { id: 'automation', label: 'Automation & integrations', price: 80000 },
  { id: 'app', label: 'Custom web application', price: 250000 },
  { id: 'dashboard', label: 'Business dashboard', price: 150000 },
];

/** Percentage adjustments applied by the estimator on top of the line items. */
export const estimatorModifiers: {
  urgency: { id: string; label: string; multiplier: number }[];
  scale: { id: string; label: string; multiplier: number }[];
} = {
  urgency: [
    { id: 'relaxed', label: 'Standard timeline', multiplier: 1 },
    { id: 'soon', label: 'Needs to start soon', multiplier: 1.1 },
    { id: 'rush', label: 'Rush / priority', multiplier: 1.25 },
  ],
  scale: [
    { id: 'lean', label: 'Lean — essentials only', multiplier: 0.85 },
    { id: 'standard', label: 'Standard scope', multiplier: 1 },
    { id: 'expanded', label: 'Expanded — extra pages, content, polish', multiplier: 1.3 },
  ],
};
