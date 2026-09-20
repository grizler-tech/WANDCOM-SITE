import type { Faq, Testimonial } from '@/types';

/**
 * Social proof. Quotes are placeholder-flagged: replace with real client words
 * before launch (see docs/blueprint.md → "Content to replace before launch").
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      'They rebuilt our online store in six weeks and we finally understand our own sales numbers. Orders are up and we stopped losing customers at checkout.',
    author: 'Amina W.',
    role: 'Founder, retail brand',
  },
  {
    quote:
      'The brand system is the first thing that made us look like a company rather than a side hustle. Our proposals close faster now.',
    author: 'Brian K.',
    role: 'Director, professional services',
  },
  {
    quote:
      'The WhatsApp ordering flow alone replaced two hours of manual replies every day. That is the part nobody else offered us.',
    author: 'Grace M.',
    role: 'Operations lead, food & beverage',
  },
];

export const faqs: Faq[] = [
  {
    question: 'How long does a website take?',
    answer:
      'A focused landing page or small site is typically 2 – 3 weeks. A full multi-page or e-commerce build runs 4 – 8 weeks, depending on how quickly content and approvals come back. You get a dated schedule in the Plan phase and a staging link you can review while we build.',
  },
  {
    question: 'How much does a project cost?',
    answer:
      'Websites start at KES 45,000, brand identity at KES 30,000, and custom digital solutions at KES 120,000. After the Discover and Plan phases you receive a fixed quotation with a line-by-line scope, so there are no surprise invoices. Payment is normally 50% to start and 50% on launch.',
  },
  {
    question: 'Do you work with businesses outside Nairobi?',
    answer:
      'Yes. Most of our work is remote-first — discovery calls, shared project boards and review links — and we can travel for workshops or shoots when a project needs it.',
  },
  {
    question: 'Will I be able to update the website myself?',
    answer:
      'Yes. Content-managed builds ship with a CMS, and the Launch phase includes a recorded handover walkthrough so your team can edit text, images and products confidently.',
  },
  {
    question: 'Do you handle hosting, domains and payments?',
    answer:
      'We configure hosting, domains, SSL, business email and payment gateways (including M-Pesa where relevant) as part of delivery. You own every account — we set them up in your name and document the access.',
  },
  {
    question: 'What do you need from me to start?',
    answer:
      'A short conversation, whatever brand assets you already have, and access to any existing accounts. If you do not have content ready, we can produce the copy and imagery as part of the project.',
  },
  {
    question: 'Can you maintain the site after launch?',
    answer:
      'Yes — optional maintenance covers updates, backups, uptime monitoring, small content changes and a monthly, prioritised improvement list.',
  },
];
