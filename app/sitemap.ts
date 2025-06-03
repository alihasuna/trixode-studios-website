import { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://trixodestudios.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/people',
    '/about',
    '/projects',
    '/blog',
    '/contact',
    '/privacy',
    '/terms',
    '/cookies',
    '/accessibility',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
} 