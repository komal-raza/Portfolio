import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getService, services } from '@/data/services'
import { getProject } from '@/data/projects'
import { getCoverScreenshot } from '@/lib/screenshots'
import { pageMetadata } from '@/lib/seo'
import { ButtonLink } from '@/components/ui/button-link'
import { CtaBand } from '@/components/ui/cta-band'
import { FeaturedProjectRows } from '@/components/projects/featured-rows'

export const dynamicParams = false

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}
  return pageMetadata({
    title: service.title,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  })
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const related = service.relatedProjects
    .map((projectSlug) => getProject(projectSlug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project))
    .map((project) => ({
      project,
      cover: project.screens
        ? getCoverScreenshot(project.screens.folder, project.screens.cover, project.name)
        : undefined,
    }))

  return (
    <>
      <section className="section-y border-b border-border">
        <div className="container-site">
          <p className="fs-small text-muted">
            <Link href="/services" className="text-muted no-underline hover:text-text">
              Services
            </Link>{' '}
            / <span className="text-text">{service.navLabel}</span>
          </p>
          <h1 className="mt-4">{service.title}</h1>
          <p className="lead mt-6">{service.summary}</p>
          <div className="mt-8">
            <ButtonLink href="/contact">Start Project</ButtonLink>
          </div>
        </div>
      </section>

      {/* Who it is for */}
      <section className="section-y border-b border-border" aria-labelledby="who-for-heading">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="who-for-heading">Who it is for</h2>
          </div>
          <ul className="space-y-4 lg:col-span-8">
            {service.whoFor.map((item) => (
              <li
                key={item}
                className="flex items-baseline gap-3 rounded-[12px] border border-border bg-surface p-5 text-text"
              >
                <span className="size-2 shrink-0 rounded-full bg-link" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Deliverables */}
      <section className="section-y border-b border-border" aria-labelledby="deliverables-heading">
        <div className="container-site">
          <h2 id="deliverables-heading">What you get</h2>
          <p className="lead mt-3">
            Concrete deliverables included in a {service.title.toLowerCase()} engagement.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {service.deliverables.map((item) => (
              <article
                key={item.title}
                className="rounded-[12px] border border-border bg-surface p-6 md:p-8"
              >
                <h3 className="text-xl font-semibold text-text">{item.title}</h3>
                <p className="mt-3 text-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works (sequence) */}
      <section className="section-y border-b border-border" aria-labelledby="how-it-works-heading">
        <div className="container-site">
          <h2 id="how-it-works-heading">How it works</h2>
          <ol className="mt-10 divide-y divide-border border-y border-border">
            {service.howItWorks.map((step, index) => (
              <li
                key={step.title}
                className="grid gap-3 py-6 md:grid-cols-[80px_260px_1fr] md:items-baseline md:gap-8"
              >
                <span className="font-mono text-sm text-link">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-semibold text-text">{step.title}</h3>
                <p className="text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Tech used */}
      <section className="section-y border-b border-border" aria-labelledby="service-tech-heading">
        <div className="container-site grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="service-tech-heading">Tech used</h2>
          </div>
          <ul className="flex flex-wrap gap-2.5 lg:col-span-8">
            {service.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-[8px] border border-border bg-surface px-3 py-1.5 font-mono text-sm text-text"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related projects */}
      {related.length > 0 && (
        <section className="section-y" aria-labelledby="related-projects-heading">
          <div className="container-site">
            <h2 id="related-projects-heading" className="mb-10">
              Related projects
            </h2>
            <FeaturedProjectRows items={related} />
          </div>
        </section>
      )}

      <CtaBand
        title={`Start your ${service.navLabel.toLowerCase()} project`}
        text="Tell me about your product and what you want to ship. I will reply by email with follow-up questions or a quote."
        buttonLabel="Get a quote"
      />
    </>
  )
}

