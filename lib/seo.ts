import type { Metadata } from 'next'
import { site } from '@/data/site'

function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  return 'http://localhost:3000'
}

export const siteUrl = resolveSiteUrl()

export function absoluteUrl(path = '/') {
  return `${siteUrl}${path === '/' ? '' : path}`
}

type PageMeta = {
  title?: string
  description: string
  path: string
  /** Optional OG image path (defaults to the generated /opengraph-image). */
  image?: string
}

export function pageMetadata({ title, description, path, image }: PageMeta): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | ${site.role}`
  return {
    ...(title ? { title } : { title: { absolute: fullTitle } }),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: site.name,
      type: 'website',
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  }
}

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: 'Senior Full Stack Engineer',
    url: siteUrl,
    image: absoluteUrl('/images/profile.jpg'),
    email: `mailto:${site.email}`,
    worksFor: { '@type': 'Organization', name: 'LeoaTech' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: site.education.school },
    address: { '@type': 'PostalAddress', addressCountry: 'PK' },
    sameAs: [site.github, site.linkedin],
    knowsAbout: [
      'Shopify app development',
      'Multi-tenant SaaS',
      'Learning management systems',
      'React',
      'Node.js',
      'PostgreSQL',
    ],
  }
}

