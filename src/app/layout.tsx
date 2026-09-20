import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { MotionProvider } from '@/components/providers/MotionProvider';
import { siteConfig } from '@/content/site';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.positioning}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'digital agency Kenya',
    'web design Nairobi',
    'e-commerce development Kenya',
    'brand identity Nairobi',
    'digital solutions company',
    'WhatsApp commerce',
    'business automation Kenya',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.positioning}`,
    description: siteConfig.description,
    url: siteConfig.url,
    locale: siteConfig.locale,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.positioning}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  formatDetection: { telephone: true, address: false, email: true },
};

export const viewport: Viewport = {
  themeColor: '#07080A',
  colorScheme: 'dark',
};

/** Organization-level structured data — helps brand + service discovery. */
const organisationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  areaServed: 'Kenya',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nairobi',
    addressCountry: 'KE',
  },
  sameAs: [
    process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    process.env.NEXT_PUBLIC_TIKTOK_URL,
    process.env.NEXT_PUBLIC_LINKEDIN_URL,
  ].filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
        >
          Skip to content
        </a>

        <MotionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </MotionProvider>

        <script
          type="application/ld+json"
          // Structured data is static, developer-authored JSON — safe to inline.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
      </body>
    </html>
  );
}
