import type { ServiceDivision } from '@/types';

/**
 * The four digital divisions.
 *
 * This structure is deliberate: it keeps four focused offers on the surface while
 * giving WANDCOM room to grow into automation, systems and custom applications
 * without re-branding. Array order is the order shown on the website.
 */
export const divisions: ServiceDivision[] = [
  {
    id: 'digital-experiences',
    index: '01',
    name: 'Digital Experiences',
    tagline: 'Websites and interfaces people actually enjoy using.',
    summary:
      'We design and build fast, responsive websites and digital products around how your business really works — from a single landing page to a full e-commerce store.',
    outcomes: [
      'A website that looks credible on every screen',
      'Clear journeys that turn visitors into enquiries',
      'A build your team can update without a developer',
    ],
    items: [
      {
        title: 'Website design',
        description:
          'Structure, wireframes and high-fidelity design built around your customer journey.',
        deliverables: ['Sitemap & wireframes', 'UI design system', 'Responsive layouts'],
      },
      {
        title: 'Website development',
        description:
          'Hand-built front-ends on a modern stack — fast, accessible and easy to maintain.',
        deliverables: ['Next.js or WordPress build', 'CMS wiring', 'Speed & SEO basics'],
      },
      {
        title: 'Landing pages',
        description:
          'Single-purpose campaign pages designed to convert one specific audience.',
        deliverables: ['Conversion-led layout', 'Lead capture form', 'Analytics events'],
      },
      {
        title: 'E-commerce websites',
        description: 'Online stores with a clean catalogue, checkout and order workflow.',
        deliverables: ['Catalogue setup', 'M-Pesa & card payments', 'Delivery & order flow'],
      },
      {
        title: 'UI/UX design',
        description:
          'Product interfaces, dashboards and design systems that scale with your team.',
        deliverables: ['User flows', 'Component library', 'Clickable prototype'],
      },
      {
        title: 'Website maintenance',
        description:
          'Ongoing care: updates, backups, monitoring and improvements every month.',
        deliverables: ['Monthly updates', 'Backups & uptime checks', 'Content changes'],
      },
    ],
    startingFrom: 'From KES 45,000',
    timeline: '2 – 8 weeks',
    icon: 'monitor',
  },
  {
    id: 'brand-visual',
    index: '02',
    name: 'Brand & Visual',
    tagline: 'An identity that holds up everywhere it appears.',
    summary:
      'Logo, colour, type and layout rules that make your business look established — plus the marketing material that keeps it consistent.',
    outcomes: [
      'A recognisable, professional identity',
      'Material that stays consistent across channels',
      'Assets your team can use without guesswork',
    ],
    items: [
      {
        title: 'Brand identity',
        description:
          'Positioning, naming direction and the full visual identity for your business.',
        deliverables: ['Logo suite', 'Colour & type system', 'Usage guidelines'],
      },
      {
        title: 'Logo design',
        description: 'A focused mark designed for small sizes, print and social avatars.',
        deliverables: ['Primary & secondary marks', 'Light/dark versions', 'All file formats'],
      },
      {
        title: 'Graphic design',
        description: 'Day-to-day design support across print and digital touchpoints.',
        deliverables: ['Flyers & posters', 'Pitch decks', 'Packaging artwork'],
      },
      {
        title: 'Marketing materials',
        description: 'The collateral your sales conversations depend on.',
        deliverables: ['Company profile', 'Brochures', 'Signage & banners'],
      },
      {
        title: 'Social media visuals',
        description:
          'Templates and artwork so your feed looks intentional instead of improvised.',
        deliverables: ['Post & story templates', 'Carousel designs', 'Highlight covers'],
      },
      {
        title: 'Brand systems',
        description: 'Documented rules so the brand survives new staff, agencies and channels.',
        deliverables: ['Brand guidelines', 'Asset library', 'Template pack'],
      },
    ],
    startingFrom: 'From KES 30,000',
    timeline: '1 – 4 weeks',
    icon: 'palette',
  },
  {
    id: 'digital-growth',
    index: '03',
    name: 'Digital Growth',
    tagline: 'Attention, traffic and content that compounds.',
    summary:
      'We manage the channels that bring people to your business, and produce the content that keeps them there — planned monthly, measured monthly.',
    outcomes: [
      'A consistent, planned online presence',
      'Traffic from search and social, not luck',
      'Content that supports sales instead of decorating',
    ],
    items: [
      {
        title: 'Social media management',
        description: 'Strategy, calendars, publishing and replies handled end to end.',
        deliverables: ['Monthly calendar', '8 – 20 posts', 'Community management'],
      },
      {
        title: 'Digital marketing',
        description: 'Paid and organic campaigns with clear objectives and reporting.',
        deliverables: ['Channel plan', 'Ad creative & copy', 'Monthly report'],
      },
      {
        title: 'Content creation',
        description: 'Photo, video and copy produced for the platforms your customers use.',
        deliverables: ['Product & lifestyle shoots', 'Short-form video', 'Captions & copy'],
      },
      {
        title: 'Campaign design',
        description: 'Launch campaigns built as a system: idea, assets, schedule, measurement.',
        deliverables: ['Campaign concept', 'Full asset set', 'Rollout schedule'],
      },
      {
        title: 'SEO',
        description: 'Technical fixes, content structure and keywords that bring qualified traffic.',
        deliverables: ['Technical audit', 'Keyword map', 'On-page optimisation'],
      },
      {
        title: 'Online presence strategy',
        description: 'A written plan for what goes where, how often and what success looks like.',
        deliverables: ['Audit & positioning', '90-day roadmap', 'KPI framework'],
      },
    ],
    startingFrom: 'From KES 35,000 / month',
    timeline: 'Ongoing monthly',
    icon: 'trending-up',
  },
  {
    id: 'digital-solutions',
    index: '04',
    name: 'Digital Solutions',
    tagline: 'The systems that quietly do the heavy lifting.',
    summary:
      'This is where WANDCOM goes beyond design: automating manual work, selling through WhatsApp, and building custom tools, integrations and dashboards your team uses every day.',
    outcomes: [
      'Less repetitive admin work every week',
      'Orders and enquiries captured in one place',
      'Operational data you can actually see',
    ],
    items: [
      {
        title: 'Business automation',
        description: 'Connect the tools you already use so work moves without being chased.',
        deliverables: ['Workflow mapping', 'Automations (n8n, Make, Zapier)', 'Team training'],
      },
      {
        title: 'WhatsApp commerce solutions',
        description: 'Catalogue, ordering and payment flows that run inside WhatsApp Business.',
        deliverables: ['Catalogue setup', 'Automated replies & routing', 'M-Pesa payment flow'],
      },
      {
        title: 'Digital business systems',
        description: 'Internal portals for bookings, orders, inventory or client records.',
        deliverables: ['Data model & requirements', 'Custom portal', 'Roles & permissions'],
      },
      {
        title: 'Custom web applications',
        description: 'When off-the-shelf software cannot fit, we build the thing that does.',
        deliverables: ['Technical spec', 'Full-stack build', 'Deployment & docs'],
      },
      {
        title: 'Integrations',
        description: 'Payments, CRMs, accounting and delivery tools wired into one flow.',
        deliverables: ['M-Pesa & card', 'CRM / ERP sync', 'Webhooks & APIs'],
      },
      {
        title: 'Business dashboards',
        description: 'One screen that shows sales, stock, leads or performance in real time.',
        deliverables: ['Data sources connected', 'Live dashboard', 'Scheduled reports'],
      },
    ],
    startingFrom: 'From KES 120,000',
    timeline: '4 – 12 weeks',
    icon: 'workflow',
  },
];

/** Services offered as checkboxes in the "Start a Project" form. */
export const servicesInBriefForm: string[] = [
  'Website',
  'E-commerce',
  'Branding',
  'Social Media',
  'Digital Marketing',
  'Content Creation',
  'Custom Digital Solution',
  'Something else',
];

export function getDivision(id: string): ServiceDivision | undefined {
  return divisions.find((division) => division.id === id);
}
