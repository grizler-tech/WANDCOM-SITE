import type { NavItem, SocialLink, TrustStat } from '@/types';

/**
 * Single source of truth for brand-level, site-wide data.
 */

export const siteConfig = {
  name: 'WANDCOM',
  /** Used in browser tabs and Open Graph titles. */
  title: 'WANDCOM — Digital Experiences, Creative Solutions',
  shortTitle: 'WANDCOM',
  /** One-line positioning that appears after "WANDCOM —" everywhere. */
  positioning: 'Digital solutions & creative technology company',
  description:
    'WANDCOM is a digital solutions company. We design and build websites, e-commerce experiences, brand systems and business automation for ambitious businesses.',
  tagline: 'Digital experiences. Creative solutions. Built for what’s next.',
  /** Used by metadata/sitemap; overridable with NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://wandcom.co.ke',
  locale: 'en_KE',
  /** Where enquiries are sent. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@wandcom.co.ke',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+254 700 000 000',
  location: 'Nairobi, Kenya',
  /** Digits only — used to build wa.me links. */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '254700000000',
  whatsappMessage: 'Hi WANDCOM 👋 I’d like to talk about a project.',
  hours: 'Mon – Fri · 08:30 – 18:00 EAT',
} as const;

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    description: 'Four divisions: experiences, brand, growth and digital solutions.',
  },
  { label: 'Work', href: '/work', description: 'Case studies and recent builds.' },
  { label: 'Process', href: '/process', description: 'How we take a project from brief to launch.' },
  { label: 'Pricing', href: '/pricing', description: 'Engagement models and honest budget bands.' },
  { label: 'About', href: '/about', description: 'Who we are and how we think.' },
];

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: 'Services',
    links: [
      { label: 'Digital Experiences', href: '/services#digital-experiences' },
      { label: 'Brand & Visual', href: '/services#brand-visual' },
      { label: 'Digital Growth', href: '/services#digital-growth' },
      { label: 'Digital Solutions', href: '/services#digital-solutions' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Work', href: '/work' },
      { label: 'Process', href: '/process' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  {
    label: 'Instagram',
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/wandcom',
    handle: '@wandcom',
  },
  {
    label: 'TikTok',
    href: process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://tiktok.com/@wandcom',
    handle: '@wandcom',
  },
  {
    label: 'LinkedIn',
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/company/wandcom',
    handle: '/wandcom',
  },
];

/** The credibility strip under the hero. */
export const capabilities: string[] = [
  'Web Design',
  'Branding',
  'Digital Solutions',
  'Creative Design',
  'Social Media',
  'E-commerce',
];

export const trustStats: TrustStat[] = [
  { value: '48h', label: 'Average first response' },
  { value: '4', label: 'Digital divisions in-house' },
  { value: '100%', label: 'Custom builds — no templates' },
  { value: '6', label: 'Phase process, brief to launch' },
];

/** "Why WANDCOM?" — three-to-four strong ideas, deliberately not corporate. */
export const differentiators: { title: string; body: string }[] = [
  {
    title: 'Built around your business.',
    body: 'No copy-paste websites. Every structure, page and flow starts from your goals, your customers and how you actually sell.',
  },
  {
    title: 'Design meets function.',
    body: 'We care about how it looks and how it works. Beautiful interfaces that load fast, read clearly and convert visitors into enquiries.',
  },
  {
    title: 'Digital-first thinking.',
    body: 'Social, search, WhatsApp and automation are designed in from day one — not bolted on later when the site is already finished.',
  },
  {
    title: 'One creative partner.',
    body: 'Design, development and digital strategy under one roof, so nothing gets lost between three different freelancers.',
  },
];

/** Builds a wa.me deep link with a pre-filled message. */
export function whatsappLink(message: string = siteConfig.whatsappMessage): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
