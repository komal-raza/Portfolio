import Link from 'next/link'
import { type Project, projectHref } from '@/data/projects'

export function CompactProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {projects.map((project) => {
        const href = projectHref(project)
        const isExternal = href.startsWith('http')
        return (
          <article
            key={project.slug}
            className="grid gap-4 py-6 md:grid-cols-[1.1fr_1.6fr_auto] md:items-baseline md:gap-8"
          >
            <div>
              <h3 className="text-lg font-semibold text-text">{project.name}</h3>
              <p className="fs-small mt-0.5 text-muted">
                {project.type}
                {project.status ? ` · ${project.status}` : ''}
              </p>
            </div>

            <div>
              <p className="fs-small text-muted">{project.summary}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={`${project.name} stack`}>
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-[8px] border border-border px-2 py-0.5 font-mono text-xs text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:text-right">
              {isExternal ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener"
                  className="fs-small font-heading font-semibold text-link underline"
                >
                  Source on GitHub
                </a>
              ) : (
                <Link href={href} className="fs-small font-heading font-semibold text-link underline">
                  View case study
                </Link>
              )}
            </div>
          </article>
        )
      })}
    </div>
  )
}

