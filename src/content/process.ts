import type { ProcessStep } from '@/types';

/**
 * The six-phase process. It doubles as the answer to "how do I start?" and as
 * the reason a prospect trusts us with a deposit.
 */
export const processSteps: ProcessStep[] = [
  {
    index: '01',
    title: 'Discover',
    body: 'We understand your business, goals and audience. A working session, a short questionnaire and an honest look at what is already working.',
    output: 'Discovery notes, priorities and success measures',
  },
  {
    index: '02',
    title: 'Plan',
    body: 'We define the structure, strategy and direction — pages, user journeys, content and the technology that fits.',
    output: 'Scope, sitemap, timeline and fixed quotation',
  },
  {
    index: '03',
    title: 'Design',
    body: 'We turn the strategy into a visual experience: layouts, brand application, components and a prototype you can react to.',
    output: 'Approved UI designs and design system',
  },
  {
    index: '04',
    title: 'Build',
    body: 'We develop, test and optimise — accessible markup, real content, real devices, and performance measured before launch.',
    output: 'Staging link for review, then production build',
  },
  {
    index: '05',
    title: 'Launch',
    body: 'Your digital product goes live: domains, analytics, search basics, backups and monitoring all configured.',
    output: 'Live site plus a handover walkthrough',
  },
  {
    index: '06',
    title: 'Grow',
    body: 'We help improve and maintain it — reporting, iteration, content and campaigns that build on what the data shows.',
    output: 'Monthly report and a prioritised roadmap',
  },
];

export const engagementModels: { title: string; body: string; bestFor: string }[] = [
  {
    title: 'Fixed-scope project',
    body: 'A clearly defined deliverable, a fixed price and a milestone schedule. Best when the scope is knowable.',
    bestFor: 'Websites, brand identity, e-commerce builds',
  },
  {
    title: 'Monthly retainer',
    body: 'A reserved number of hours or deliverables each month for design, content and marketing work.',
    bestFor: 'Social media, content, ongoing improvements',
  },
  {
    title: 'Product partnership',
    body: 'Longer-term collaboration on a custom system or application, delivered in sprints with continuous feedback.',
    bestFor: 'Automation, portals, dashboards, web apps',
  },
];
