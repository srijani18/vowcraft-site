import type { MetadataRoute } from 'next'
import { DOCS } from '@/lib/content'
import { siteUrl } from '@/lib/env'

/** Static routes plus every doc. Login and signup live in the app and are noindex. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/features', '/pricing', '/docs', '/security', '/contact']
  const docs = DOCS.map((doc) => `/docs/${doc.slug}`)

  return [...pages, ...docs].map((path) => ({
    url: siteUrl(path),
    lastModified: new Date(),
    changeFrequency: path.startsWith('/docs') ? ('monthly' as const) : ('weekly' as const),
    priority: path === '' ? 1 : path.startsWith('/docs/') ? 0.6 : 0.8,
  }))
}
