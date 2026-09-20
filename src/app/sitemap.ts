import type { MetadataRoute } from 'next';

import { siteConfig } from '@/content/site';
import { projects } from '@/content/work';

/** Static sitemap. Add new routes here as pages are introduced. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const fixedRoutes: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }[] = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/work', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/process', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.9, changeFrequency: 'monthly' },
  ];

  return [
    ...fixedRoutes.map((route) => ({
      url: `${siteConfig.url}${route.path === '/' ? '' : route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...projects.map((project) => ({
      url: `${siteConfig.url}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
