import type { MetadataRoute } from 'next'
import { services } from '@/data/services'
import { caseStudies } from '@/data/projects'
import { certificates } from '@/data/certificates'
import { absoluteUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const staticPaths = [
    '/',
    '/about',
    '/services',
    '/projects',
    '/resume',
    '/contact',
    ...(certificates.length > 0 ? ['/certificates'] : []),
  ]

  return [
    ...staticPaths.map((path) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: path === '/' ? 1 : 0.8,
    })),
    ...services.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...caseStudies.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}

