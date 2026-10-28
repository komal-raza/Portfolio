import Image from 'next/image'
import { site } from '@/data/site'
import { pageMetadata, personJsonLd } from '@/lib/seo'
import { CtaBand } from '@/components/ui/cta-band'

export const metadata = pageMetadata({
  title: 'About',
  description:
    'Senior Full Stack Engineer at LeoaTech building Shopify apps, multi-tenant SaaS platforms and LMS products from Pakistan.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />

      {/* Intro & photo */}
      <section className="section-y border-b border-border">
        <div className="container-site grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h1>About Komal Raza</h1>
            <p className="lead mt-6">{site.about.intro}</p>
            <div className="mt-6 space-y-4 text-muted">
              {site.about.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <dl className="mt-8 grid gap-6 border-t border-border pt-6 sm:grid-cols-3">
              <div>
                <dt className="font-mono text-xs text-muted">Current role</dt>
                <dd className="mt-1 font-heading text-sm font-semibold text-text">
                  Senior Full Stack Engineer, LeoaTech
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs text-muted">Location</dt>
                <dd className="mt-1 font-heading text-sm font-semibold text-text">{site.location}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs text-muted">Education</dt>
                <dd className="mt-1 font-heading text-sm font-semibold text-text">
                  {site.education.degree}
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-5">
            <div className="mx-auto max-w-sm overflow-hidden rounded-[12px] border border-border bg-surface lg:mx-0 lg:ml-auto">
              <Image
                src="/images/profile.jpg"
                alt="Komal Raza, Full-Stack Engineer"
                width={1088}
                height={1088}
                priority
                fetchPriority="high"
                sizes="(min-width: 1024px) 384px, 85vw"
                className="aspect-square w-full object-cover object-top"
              />
              <div className="border-t border-border px-5 py-4">
                <p className="font-heading text-sm font-semibold text-text">{site.name}</p>
                <p className="fs-small text-muted">
                  {site.role} · {site.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience timeline & Education */}
      <section className="section-y border-b border-border" aria-labelledby="timeline-heading">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="timeline-heading">Experience and education</h2>
            <p className="lead mt-3">
              Full-time at LeoaTech since January 2023, following two front-end internships and a computer science degree.
            </p>
          </div>

          <div className="space-y-8 lg:col-span-8">
            {site.timeline.map((entry) => (
              <article
                key={entry.org}
                className="rounded-[12px] border border-border bg-surface p-6 md:p-8"
              >
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <h3 className="text-xl font-semibold text-text">{entry.org}</h3>
                  <span className="font-mono text-xs text-link">
                    {entry.period}
                    {entry.location ? ` · ${entry.location}` : ''}
                  </span>
                </div>
                <p className="fs-small mt-1 font-medium text-muted">{entry.role}</p>

                {entry.details && (
                  <div className="mt-6 space-y-6 border-t border-border pt-6">
                    {entry.details.map((sub) => (
                      <div key={sub.role} className="border-l border-border pl-4">
                        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                          <h4 className="font-heading text-base font-semibold text-text">{sub.role}</h4>
                          <span className="font-mono text-xs text-muted">{sub.period}</span>
                        </div>
                        <p className="mt-2 text-muted">{sub.summary}</p>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}

            <article className="rounded-[12px] border border-border bg-surface p-6 md:p-8">
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <h3 className="text-xl font-semibold text-text">{site.education.school}</h3>
                <span className="font-mono text-xs text-link">{site.education.period}</span>
              </div>
              <p className="mt-1 text-muted">{site.education.degree}</p>
            </article>
          </div>
        </div>
      </section>

      {/* How I think about software */}
      <section className="section-y border-b border-border" aria-labelledby="principles-heading">
        <div className="container-site">
          <h2 id="principles-heading">How I think about software</h2>
          <p className="lead mt-3">
            Four habits that shape how I design schemas, APIs and interfaces.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {site.about.principles.map((item) => (
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

      {/* Tech stack */}
      <section className="section-y" aria-labelledby="about-stack-heading">
        <div className="container-site">
          <h2 id="about-stack-heading">Tech stack</h2>
          <p className="lead mt-3">
            Languages, frameworks, APIs and tools I work with day to day.
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {site.stack.map((group) => (
              <div key={group.group} className="rounded-[12px] border border-border bg-surface p-6">
                <h3 className="text-lg font-semibold text-text">{group.group}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-[8px] border border-border bg-bg px-2.5 py-1 font-mono text-xs text-text"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
