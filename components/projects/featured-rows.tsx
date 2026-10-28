import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { formatClientLine, formatProjectPeriod, getLiveLink, type Project } from '@/data/projects'
import type { Screenshot } from '@/lib/screenshots'
import { BrowserFrame } from '@/components/ui/device-frame'
import { cn } from '@/lib/utils'

export type ProjectWithCover = {
  project: Project
  cover?: Screenshot
}

export function FeaturedProjectRows({ items }: { items: ProjectWithCover[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map(({ project, cover }, index) => {
        const reversed = index % 2 === 1
        return (
          <article
            key={project.slug}
            className="grid items-center gap-8 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16"
          >
            <div className={cn('lg:col-span-7', reversed && 'lg:order-2')}>
              {cover && (
                <Link
                  href={`/projects/${project.slug}`}
                  className="block no-underline"
                  aria-label={`View ${project.name} case study`}
                >
                  <BrowserFrame title={`${project.slug} · ${cover.label}`}>
                    <div className="aspect-[16/10] w-full overflow-hidden bg-bg">
                      <Image
                        src={cover.src}
                        alt={cover.alt}
                        width={cover.width}
                        height={cover.height}
                        sizes="(min-width: 1024px) 660px, 92vw"
                        loading="lazy"
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                  </BrowserFrame>
                </Link>
              )}
            </div>

            <div className={cn('lg:col-span-5', reversed && 'lg:order-1')}>
              <p className="fs-small font-medium text-muted">
                {project.type}
                {formatProjectPeriod(project) ? ` · ${formatProjectPeriod(project)}` : ''}
              </p>
              {formatClientLine(project) && (
                <p className="fs-small mt-1 text-muted">{formatClientLine(project)}</p>
              )}
              <div className="mt-2 flex items-start justify-between gap-4">
                <h3 className="text-2xl font-bold text-text md:text-[1.75rem]">{project.name}</h3>
                {getLiveLink(project) && (
                  <a
                    href={getLiveLink(project)!.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.name} (${getLiveLink(project)!.label}) in new tab`}
                    title={getLiveLink(project)!.label}
                    className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-[8px] border border-border bg-surface text-link transition-colors hover:border-link hover:text-text"
                  >
                    <ExternalLink aria-hidden="true" strokeWidth={1.75} className="size-4" />
                  </a>
                )}
              </div>
              {project.status && (
                <p className="fs-small mt-1 text-muted">{project.status}</p>
              )}
              <p className="mt-4 text-text">{project.summary}</p>

              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.name} tech stack`}>
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-[8px] border border-border bg-surface px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-5">
                <Link
                  href={`/projects/${project.slug}`}
                  className="font-heading text-[0.9375rem] font-semibold text-link underline"
                >
                  View case study
                </Link>
                {project.links?.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener"
                    className="fs-small text-muted underline hover:text-text"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

