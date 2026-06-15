import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/wealth',
    '/goal',
    '/simulator',
    '/about',
    '/retirement',
    '/fire',
    '/swp',
    '/lumpsum',
    '/net-worth',
    '/mutual-funds',
  ];

  return routes.map((route) => ({
    url: `${SITE_CONFIG.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
