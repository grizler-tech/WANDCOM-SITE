import type { Project } from '@/types';

/**
 * Case studies.
 *
 * NOTE FOR THE TEAM: these four projects are representative samples written to
 * the final structure (Challenge → Approach → Design → Development → Result).
 * Replace the client names, metrics, imagery and quotes with real projects
 * before launch — keep the structure, drop anything you cannot measure.
 */
export const projects: Project[] = [
  {
    slug: 'sanaa-co-brand-identity',
    title: 'Brand Identity',
    client: 'Sanaa & Co.',
    category: 'Brand Identity',
    sector: 'Fashion / Lifestyle',
    year: '2025',
    summary:
      'A founder-led fashion label that looked like a hobby online, rebuilt around one confident identity.',
    intro:
      'Sanaa & Co. had grown entirely by word of mouth. The product was loved; the presentation was inconsistent — six logo versions, three colour palettes and no rules. We rebuilt the identity as a system, then applied it across packaging, social and the storefront.',
    services: ['Brand strategy', 'Logo suite', 'Brand guidelines', 'Social templates'],
    stack: ['Figma', 'Illustrator', 'Next.js storefront'],
    palette: ['#C8FF4D', '#0A0B0E'],
    featured: true,
    steps: [
      {
        title: 'The Challenge',
        body: 'Every touchpoint looked like a different company: inconsistent marks, improvised colours and photos shot on three different phones. Wholesale buyers were asking for a brand book that did not exist.',
      },
      {
        title: 'Our Approach',
        body: 'We started with positioning rather than drawing. Two workshops defined who the label is for, what it stands against and the word it wants to own. Everything visual had to earn its place against that.',
      },
      {
        title: 'Design',
        body: 'A tight wordmark with a flexible monogram, a two-colour system that survives cheap printing, and a type pairing that reads well from a 24px avatar to a 3m banner.',
      },
      {
        title: 'Development',
        body: 'We documented the system as a living brand guide, then rebuilt the social templates and packaging artwork so the team could produce assets without a designer in the loop.',
      },
      {
        title: 'Result',
        body: 'One identity, applied everywhere within a month. The label now pitches wholesale with a proper brand book and posts consistently without approval bottlenecks.',
      },
    ],
    results: [
      { label: 'Logo versions reduced', value: '6 → 1' },
      { label: 'Asset turnaround', value: '3 days → 30 mins' },
      { label: 'Wholesale enquiries', value: '+38%' },
    ],
    testimonial: {
      quote:
        'We stopped explaining who we are and started showing it. The difference in how buyers treat us is immediate.',
      author: 'Amina W.',
      role: 'Founder, Sanaa & Co.',
    },
  },
  {
    slug: 'mavuno-home-ecommerce',
    title: 'E-commerce Website',
    client: 'Mavuno Home',
    category: 'E-commerce Website',
    sector: 'Retail',
    year: '2025',
    summary:
      'A homeware retailer selling on Instagram DMs, moved to a store that takes orders while the team sleeps.',
    intro:
      'Mavuno Home was taking every order through Instagram messages and WhatsApp screenshots. Stock was oversold, payments were reconciled by hand, and nothing was measurable. We designed and built a store around their actual fulfilment process.',
    services: [
      'UX & UI design',
      'E-commerce development',
      'M-Pesa & card payments',
      'Delivery workflow',
    ],
    stack: ['Next.js', 'Headless commerce', 'M-Pesa API', 'Vercel'],
    palette: ['#7DE2D1', '#0A0B0E'],
    featured: true,
    steps: [
      {
        title: 'The Challenge',
        body: 'Two people managed 60+ orders a week from their phones. Overselling was common, delivery addresses arrived incomplete, and there was no way to see which products actually sold.',
      },
      {
        title: 'Our Approach',
        body: 'We mapped a real week of orders before designing anything: how stock is counted, who confirms payment, how deliveries are batched. The store was built to that map, not to a generic template.',
      },
      {
        title: 'Design',
        body: 'A calm, image-led catalogue with filters customers actually use — room, material, size — and a checkout reduced to three steps on mobile, which is where 91% of their traffic comes from.',
      },
      {
        title: 'Development',
        body: 'Fast product pages, live stock levels, automatic payment confirmation, and order notifications pushed to the team’s WhatsApp group so nothing sits unseen.',
      },
      {
        title: 'Result',
        body: 'Orders now arrive complete and paid. Overselling stopped, and for the first time the owner can see which lines deserve more shelf space.',
      },
    ],
    results: [
      { label: 'Orders per week', value: '60 → 140' },
      { label: 'Checkout steps', value: '7 → 3' },
      { label: 'Manual admin per order', value: '−75%' },
    ],
    testimonial: {
      quote:
        'The dashboard replaced the notebook I used to keep. I know what sold yesterday before I open the shop.',
      author: 'Grace M.',
      role: 'Owner, Mavuno Home',
    },
  },
  {
    slug: 'kirinyaga-legal-website',
    title: 'Business Website',
    client: 'Kirinyaga Legal Advocates',
    category: 'Business Website',
    sector: 'Professional Services',
    year: '2024',
    summary:
      'A respected practice with a 2012 website, rebuilt into a credible, searchable front door.',
    intro:
      'The firm won clients on reputation alone. Their website was slow, unreadable on phones and impossible to update without a developer. We rebuilt it as a professional services platform: practice areas, team profiles, insights and enquiry routing.',
    services: ['Content strategy', 'Website design', 'Next.js development', 'SEO'],
    stack: ['Next.js', 'Sanity CMS', 'Vercel', 'Analytics'],
    palette: ['#9BB7FF', '#0A0B0E'],
    featured: true,
    steps: [
      {
        title: 'The Challenge',
        body: 'The old site ranked for nothing, took 9 seconds to load on mobile, and gave a prospective client no reason to trust the firm over a competitor with a better first impression.',
      },
      {
        title: 'Our Approach',
        body: 'We interviewed partners and recent clients to find the questions that actually precede an instruction, then structured the entire site around answering them before first contact.',
      },
      {
        title: 'Design',
        body: 'A restrained, typographic layout — authority without cliché — with clear practice-area pages, partner profiles and a visible, low-friction consultation form.',
      },
      {
        title: 'Development',
        body: 'A hand-built Next.js front-end with a CMS the office administrator runs, structured data for search engines, and enquiry routing to the right department.',
      },
      {
        title: 'Result',
        body: 'The site now loads in under a second, appears for practice-area searches in Nairobi, and the firm publishes insights without calling anyone.',
      },
    ],
    results: [
      { label: 'Mobile load time', value: '9.1s → 0.8s' },
      { label: 'Organic enquiries', value: '+3.2×' },
      { label: 'Lighthouse performance', value: '41 → 99' },
    ],
  },
  {
    slug: 'tamu-kitchen-campaign',
    title: 'Digital Campaign',
    client: 'Tamu Kitchen',
    category: 'Digital Campaign',
    sector: 'Food & Beverage',
    year: '2024',
    summary:
      'A weekly-special food brand that turned a two-week campaign into a repeatable ordering system.',
    intro:
      'Tamu Kitchen cooks excellent food and posted about it inconsistently. We built a two-week launch campaign around one offer, then left behind the assets and WhatsApp ordering flow that keep it running.',
    services: [
      'Campaign strategy',
      'Content production',
      'Paid social',
      'WhatsApp ordering flow',
    ],
    stack: ['Meta Ads', 'WhatsApp Business API', 'Lightroom', 'Google Sheets'],
    palette: ['#FFB067', '#0A0B0E'],
    featured: true,
    steps: [
      {
        title: 'The Challenge',
        body: 'Great food, no rhythm. Posts were irregular, orders arrived across three channels, and there was no way to tell which dish or which post actually drove sales.',
      },
      {
        title: 'Our Approach',
        body: 'One hero offer, one destination, one measurement. Every asset pointed at a single ordering flow so the campaign could actually be judged.',
      },
      {
        title: 'Design',
        body: 'A bold, appetite-first art direction with a consistent frame so the feed reads as one campaign — colour-coded by dish category and shot to look good on a phone in daylight.',
      },
      {
        title: 'Development',
        body: 'A quick-reply WhatsApp ordering flow with a menu, upsell prompt and payment link, plus a simple sheet the kitchen updates in seconds each morning.',
      },
      {
        title: 'Result',
        body: 'The campaign paid for itself in the first week, and the ordering flow kept converting after the ads stopped — which was the point.',
      },
    ],
    results: [
      { label: 'Return on ad spend', value: '4.1×' },
      { label: 'WhatsApp orders / week', value: '+180' },
      { label: 'Repeat order rate', value: '34%' },
    ],
  },
];

/** All projects, newest first. */
export const featuredProjects: Project[] = projects.filter((project) => project.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  const next = projects[(index + 1) % projects.length];
  // `projects` is never empty, so the fallback is only there to satisfy types.
  return next ?? projects[0]!;
}

