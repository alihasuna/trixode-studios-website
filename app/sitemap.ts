import { MetadataRoute } from 'next'

import { blogPosts } from '@/app/blog/blogData'

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  'https://www.trixode-studios.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/home-2',
    '/people',
    '/about',
    '/projects',
    '/services',
    '/careers',
    '/blog',
    '/contact',
    '/privacy',
    '/terms',
    '/cookies',
    '/accessibility',
  ].map((route) => {
    const priority = route === '' ? 1 : route.startsWith('/blog') ? 0.7 : 0.8

    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority,
    }
  })

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes]
} 
