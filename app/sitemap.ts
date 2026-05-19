import type { MetadataRoute } from 'next'
import { absoluteUrl, getSitemapPaths } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return getSitemapPaths().map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path.includes('/product/') ? 'weekly' : 'daily',
    priority: path === '' || path === '/shop' ? 1 : path.includes('/product/') ? 0.8 : 0.7,
  }))
}
