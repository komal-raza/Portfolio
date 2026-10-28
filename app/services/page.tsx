import Link from 'next/link'
import { services } from '@/data/services'
import { getProject } from '@/data/projects'
import { pageMetadata } from '@/lib/seo'
import { CtaBand } from '@/components/ui/cta-band'
import { ProcessTimeline } from '@/components/sections/process-timeline'

export const metadata = pageMetadata({
  title: 'Services',
  description:
    'Shopify app development, multi-tenant SaaS platforms, LMS and EdTech systems, and backend and payment integrations.',
  path: '/services',
})

export default function ServicesOverviewPage() {
  return (
    <>
      <section className="section-y border-b border-border">
        <div className="container-site">
          <h1>Services for your next product</h1>
          <p className="lead mt-6">
            I take on full-product builds and focused backend or integration milestones. Every project starts with a written scope and ships in small increments to a staging URL you can review.
          </p>
          <span className=" font-heading text-[0.9375rem] font-semibold text-link underline"
          >
            All services are delivered remotely.
          </span>
        </div>
      </section>

      <section className="section-y border-b border-border" aria-label="Service breakdown">
        <div className="container-site divide-y divide-border border-y border-border">
          {services.map((service) => {
            const related = service.relatedProjects
              .map((slug) => getProject(slug))
              .filter((project): project is NonNullable<typeof project> => Boolean(project))
            return (
              <article
                key={service.slug}
                className="grid gap-8 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16"
              >
                <div className="lg:col-span-5">
                  <h2 className="text-2xl font-bold text-text md:text-3xl">{service.title}</h2>
                  <p className="mt-4 text-muted">{service.summary}</p>

                  {related.length > 0 && (
                    <div className="mt-6">
                      <p className="font-mono text-xs text-muted">Related work</p>
                      <ul className="mt-2 flex flex-wrap gap-3">
                        {related.map((project) => (
                          <li key={project.slug}>
                            <Link
                              href={`/projects/${project.slug}`}
                              className="fs-small text-link underline"
                            >
                              {project.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-8">
                    <Link
                      href={`/services/${service.slug}`}
                      className="font-heading text-[0.9375rem] font-semibold text-link underline"
                    >
                      Read {service.navLabel.toLowerCase()} details
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <h3 className="text-base font-semibold text-text">What you get</h3>
                  <dl className="mt-4 grid gap-6 sm:grid-cols-2">
                    {service.deliverables.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-[12px] border border-border bg-surface p-5"
                      >
                        <dt className="font-heading text-base font-semibold text-text">
                          {item.title}
                        </dt>
                        <dd className="fs-small mt-2 text-muted">{item.text}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="section-y" aria-labelledby="services-process-heading">
        <div className="container-site">
          <h2 id="services-process-heading">How a project runs</h2>
          <p className="lead mt-3">
            The same five-step rhythm across Shopify apps, SaaS platforms and backend engagements.
          </p>

          <ProcessTimeline />
        </div>
      </section>

      <CtaBand
        title="Need a quote for your project?"
        text="Share what you are building and your rough timeline. I will reply by email with questions or a scoped proposal."
        buttonLabel="Get a quote"
      />
    </>
  )
}

