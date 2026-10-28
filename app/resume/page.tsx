import fs from 'node:fs'
import path from 'node:path'
import Link from 'next/link'
import { Download } from 'lucide-react'
import { site } from '@/data/site'
import { featuredProjects, personalProjects } from '@/data/projects'
import { pageMetadata } from '@/lib/seo'
import { AnchorButton } from '@/components/ui/button-link'
import { CtaBand } from '@/components/ui/cta-band'

export const metadata = pageMetadata({
  title: 'Resume',
  description:
    'Resume of Komal Raza, Senior Full Stack Engineer (React, Node.js, PostgreSQL) building Shopify apps, multi-tenant SaaS platforms and LMS products.',
  path: '/resume',
})

function findValidResumePdf(): string | null {
  const candidates = ['/resume.pdf', '/Komal-Raza-Resume.pdf']
  for (const rel of candidates) {
    const abs = path.join(process.cwd(), 'public', rel)
    if (!fs.existsSync(abs)) continue
    try {
      const fd = fs.openSync(abs, 'r')
      const head = Buffer.alloc(5)
      fs.readSync(fd, head, 0, 5, 0)
      fs.closeSync(fd)
      if (head.toString('ascii') === '%PDF-') return rel
    } catch {
      continue
    }
  }
  return null
}

export default function ResumePage() {
  const resumeHref = findValidResumePdf()

  return (
    <>
      <section className="section-y border-b border-border">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h1>{site.name}</h1>
              <p className="lead mt-3">
                {site.role} · {site.location}
              </p>
              <p className="fs-small mt-2 text-muted">
                <a href={`mailto:${site.email}`} className="text-link underline">
                  {site.email}
                </a>{' '}
                ·{' '}
                <a href={site.linkedin} target="_blank" rel="noopener" className="text-link underline">
                  LinkedIn
                </a>{' '}
                ·{' '}
                <a href={site.github} target="_blank" rel="noopener" className="text-link underline">
                  GitHub
                </a>
              </p>
            </div>

            {resumeHref && (
              <div>
                <AnchorButton href={resumeHref} download>
                  <Download aria-hidden="true" strokeWidth={1.5} className="size-4" />
                  Download resume (PDF)
                </AnchorButton>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Readable resume summary */}
      <section className="section-y">
        <div className="container-site space-y-16">
          {/* Experience */}
          <div>
            <h2>Experience</h2>
            <div className="mt-8 space-y-8">
              {site.timeline.map((entry) => (
                <article
                  key={entry.org}
                  className="rounded-[12px] border border-border bg-surface p-6 md:p-8"
                >
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                    <h3 className="text-xl font-semibold text-text">
                      {entry.role} · {entry.org}
                    </h3>
                    <span className="font-mono text-xs text-link">
                      {entry.period}
                      {entry.location ? ` · ${entry.location}` : ''}
                    </span>
                  </div>

                  {entry.details && (
                    <div className="mt-6 space-y-5 border-t border-border pt-6">
                      {entry.details.map((sub) => (
                        <div key={sub.role} className="border-l border-border pl-4">
                          <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                            <h4 className="font-heading text-base font-semibold text-text">
                              {sub.role}
                            </h4>
                            <span className="font-mono text-xs text-muted">{sub.period}</span>
                          </div>
                          <p className="mt-2 text-muted">{sub.summary}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>

          {/* Client and product work */}
          <div>
            <h2>Client and product work</h2>
            <div className="mt-8 divide-y divide-border border-y border-border">
              {featuredProjects.map((project) => (
                <article
                  key={project.slug}
                  className="grid gap-4 py-6 md:grid-cols-[240px_1fr_auto] md:items-baseline md:gap-8"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-text">{project.name}</h3>
                    <p className="font-mono text-xs text-muted">
                      {project.type}
                      {project.year ? ` · ${project.year}` : ''}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted">{project.summary}</p>
                    <p className="font-mono text-xs text-muted mt-2">
                      Stack: {project.stack.join(', ')}
                    </p>
                  </div>
                  <div>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="fs-small font-heading font-semibold text-link underline"
                    >
                      Case study
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Personal projects */}
          <div>
            <h2>Personal projects</h2>
            <div className="mt-8 divide-y divide-border border-y border-border">
              {personalProjects.map((project) => (
                <article
                  key={project.slug}
                  className="grid gap-4 py-5 md:grid-cols-[240px_1fr] md:items-baseline md:gap-8"
                >
                  <h3 className="text-lg font-semibold text-text">{project.name}</h3>
                  <div>
                    <p className="text-muted">{project.summary}</p>
                    <p className="font-mono text-xs text-muted mt-1.5">
                      Stack: {project.stack.join(', ')}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2>Skills</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {site.stack.map((group) => (
                <div
                  key={group.group}
                  className="rounded-[12px] border border-border bg-surface p-5"
                >
                  <h3 className="text-base font-semibold text-text">{group.group}</h3>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-[8px] border border-border bg-bg px-2 py-0.5 font-mono text-xs text-text"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2>Education</h2>
            <div className="mt-6 rounded-[12px] border border-border bg-surface p-6">
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <h3 className="text-lg font-semibold text-text">{site.education.degree}</h3>
                <span className="font-mono text-xs text-link">{site.education.period}</span>
              </div>
              <p className="mt-1 text-muted">{site.education.school}</p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

