import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FolderGit2, Send } from 'lucide-react'
import { site } from '@/data/site'
import { services } from '@/data/services'
import { featuredProjects, getUniqueClientRegions, personalProjects } from '@/data/projects'
import { getCoverScreenshot, getScreenshot } from '@/lib/screenshots'
import { pageMetadata, personJsonLd } from '@/lib/seo'
import { ButtonLink } from '@/components/ui/button-link'
import { BrowserFrame } from '@/components/ui/device-frame'
import { CtaBand } from '@/components/ui/cta-band'
import { FeaturedProjectRows } from '@/components/projects/featured-rows'
import { CompactProjectList } from '@/components/projects/compact-list'
import { ProcessTimeline } from '@/components/sections/process-timeline'
import { TechStackGrid } from '@/components/sections/tech-stack'
import { TestimonialsSection } from '@/components/sections/testimonials'

export const metadata = pageMetadata({
  description: site.description,
  path: '/',
})

const seq = (step: number) => ({ '--seq': step } as CSSProperties)

export default function HomePage() {
  const heroMain = getScreenshot(
    'quranfoundation-lms',
    'admin-portal/admin-home.png',
    'Quran Foundation LMS',
    'Super Admin portal',
  )

  const featuredWithCovers = featuredProjects.map((project) => ({
    project,
    cover: project.screens
      ? getCoverScreenshot(project.screens.folder, project.screens.cover, project.name)
      : undefined,
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />

      {/* 1. Hero */}
      <section className="section-y border-b border-border">
        <div className="container-site grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Mobile: photo first; Desktop: right column with framed circular portrait + overlapping card */}
          <div className="hero-seq order-1 lg:order-2 lg:col-span-6" style={seq(4)}>
            <div className="relative mx-auto max-w-sm lg:ml-auto lg:mr-0 lg:max-w-[420px] lg:pb-6 lg:pl-8">
              <div className="relative flex aspect-square w-full items-center justify-center rounded-[12px] border border-border bg-surface p-6 sm:p-8">
                {/* Availability badge in top-right */}
                <div className="absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-border bg-bg px-3.5 py-1.5 font-heading text-xs font-semibold text-text shadow-md">
                  <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
                  <span>Available for Projects</span>
                </div>

                {/* Circular portrait */}
                <div className="relative aspect-square w-[82%] overflow-hidden rounded-full border-4 border-link bg-bg p-1">
                  <div className="h-full w-full overflow-hidden rounded-full border-2 border-text/80">
                    <Image
                      src="/images/profile.jpg"
                      alt="Komal Raza, Full-Stack Engineer"
                      width={1088}
                      height={1088}
                      priority
                      fetchPriority="high"
                      sizes="(min-width: 1024px) 320px, (min-width: 640px) 300px, 75vw"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>

              {heroMain && (
                <div className="hidden lg:absolute lg:-bottom-2 lg:-left-2 lg:z-20 lg:block lg:w-[46%]">
                  <BrowserFrame title="quran-lms">
                    <div className="aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={heroMain.src}
                        alt={heroMain.alt}
                        width={heroMain.width}
                        height={heroMain.height}
                        sizes="200px"
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                  </BrowserFrame>
                </div>
              )}
            </div>
          </div>

          {/* Mobile: text second; Desktop: left column */}
          <div className="order-2 lg:order-1 lg:col-span-6">
            <div className="hero-seq" style={seq(0)}>
              <span className="signature-chip">{site.hero.chip}</span>
            </div>
            <h1
              className="hero-seq mt-6 text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.08] font-bold tracking-tight"
              style={seq(1)}
            >
              {site.hero.title}
            </h1>
            <p
              className="hero-seq mt-6 max-w-[52ch] text-[1.25rem] leading-[1.6] text-text"
              style={seq(2)}
            >
              <span className="font-semibold">{site.hero.leadIn}</span>
              {site.hero.subhead}
            </p>
            <div
              className="hero-seq mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
              style={seq(3)}
            >
              <ButtonLink href={site.cta.href} className="w-full sm:w-auto">
                <Send aria-hidden="true" strokeWidth={1.75} className="size-4 shrink-0" />
                <span>{site.cta.label}</span>
              </ButtonLink>
              <ButtonLink
                href={site.cta.secondaryHref}
                variant="secondary"
                className="w-full sm:w-auto"
              >
                <FolderGit2 aria-hidden="true" strokeWidth={1.75} className="size-4 shrink-0" />
                <span>{site.cta.secondaryLabel}</span>
              </ButtonLink>
            </div>
          </div>

          {/* Mobile: screenshot card third (below text) */}
          {heroMain && (
            <div className="hero-seq order-3 lg:hidden" style={seq(4)}>
              <BrowserFrame title="quran-lms">
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={heroMain.src}
                    alt={heroMain.alt}
                    width={heroMain.width}
                    height={heroMain.height}
                    sizes="92vw"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </BrowserFrame>
            </div>
          )}
        </div>
      </section>

      {/* 2. Services (editorial rows, not four equal boxes) */}
      <section className="section-y border-b border-border" aria-labelledby="services-heading">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-4 pb-10 md:flex-row md:items-end">
            <div>
              <h2 id="services-heading">Services</h2>
              <p className="lead mt-3">
                What I build for merchants, education organisations and product teams.
              </p>
            </div>
            <Link href="/services" className="font-heading text-sm font-semibold text-link underline">
              Compare all services
            </Link>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {services.map((service) => (
              <article
                key={service.slug}
                className="grid gap-6 py-8 md:grid-cols-12 md:items-start md:gap-8 md:py-10"
              >
                <div className="md:col-span-5">
                  <h3 className="text-xl font-semibold text-text md:text-2xl">{service.title}</h3>
                  <p className="mt-2 text-muted">{service.summary}</p>
                </div>

                <ul className="space-y-1.5 md:col-span-5" aria-label={`${service.title} deliverables`}>
                  {service.highlights.map((item) => (
                    <li key={item} className="fs-small flex items-baseline gap-2.5 text-text">
                      <span className="size-1.5 shrink-0 rounded-full bg-link" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="md:col-span-2 md:text-right">
                  <Link
                    href={`/services/${service.slug}`}
                    className="font-heading text-sm font-semibold text-link underline"
                  >
                    Service details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured work (large alternating rows) */}
      <section className="section-y border-b border-border" aria-labelledby="featured-work-heading">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-4 pb-10 md:flex-row md:items-end">
            <div>
              {getUniqueClientRegions().length >= 2 && (
                <p className="fs-small mb-2 font-medium text-muted">
                  Delivered for clients in {getUniqueClientRegions().join(' and ')}
                </p>
              )}
              <h2 id="featured-work-heading">Featured work</h2>
              <p className="lead mt-3">
                Production Shopify apps, multi-tenant SaaS platforms and an LMS used across education centres.
              </p>
            </div>
            <Link href="/projects" className="font-heading text-sm font-semibold text-link underline">
              All projects
            </Link>
          </div>

          <FeaturedProjectRows items={featuredWithCovers} />
        </div>
      </section>

      {/* 4. How I work (borderless horizontal timeline on desktop, vertical on mobile) */}
      <section className="section-y border-b border-border" aria-labelledby="process-heading">
        <div className="container-site">
          <h2 id="process-heading">How I work</h2>
          <p className="lead mt-3">
            Five steps from the first call to post-launch support.
          </p>

          <ProcessTimeline />
        </div>
      </section>

      {/* 5. Tech stack grouped */}
      <section className="section-y border-b border-border" aria-labelledby="stack-heading">
        <div className="container-site">
          <h2 id="stack-heading">Tech stack</h2>
          <p className="lead mt-3">
            Tools and APIs I use in production across client and product work.
          </p>

          <TechStackGrid />
        </div>
      </section>

      {/* 6. Testimonials (rendered only when testimonials array has entries) */}
      <TestimonialsSection />

      {/* 7. Personal projects strip */}
      <section className="section-y" aria-labelledby="personal-projects-heading">
        <div className="container-site">
          <h2 id="personal-projects-heading">Personal projects</h2>
          <p className="lead mt-3 mb-8">
            Side projects and tools built with Next.js and TypeScript.
          </p>

          <CompactProjectList projects={personalProjects} />
        </div>
      </section>

      {/* 7. CTA band */}
      <CtaBand />
    </>
  )
}
