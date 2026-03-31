import { MetadataRoute } from 'next'

import { blogPosts } from '@/app/blog/blogData'

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  'https://www.trixode-studios.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: Array<{
    route: string
    priority: number
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  }> = [
    { route: '', priority: 1.0, changeFrequency: 'weekly' },
    { route: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/pricing', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/services', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/projects', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/contact', priority: 0.9, changeFrequency: 'monthly' },
    { route: '/people', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/careers', priority: 0.7, changeFrequency: 'weekly' },
    { route: '/blog', priority: 0.8, changeFrequency: 'weekly' },
    { route: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { route: '/terms', priority: 0.3, changeFrequency: 'yearly' },
    { route: '/cookies', priority: 0.3, changeFrequency: 'yearly' },
    { route: '/accessibility', priority: 0.3, changeFrequency: 'yearly' },
  ]

  const staticEntries = staticRoutes.map((item) => ({
    url: `${baseUrl}${item.route}`,
    lastModified: new Date(),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }))

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticEntries, ...blogRoutes]
}

