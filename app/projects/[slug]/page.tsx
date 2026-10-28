import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { caseStudies, getNextCaseStudy, getProject } from '@/data/projects'
import { getScreenshot, getScreenshots } from '@/lib/screenshots'
import { pageMetadata } from '@/lib/seo'
import { BrowserFrame } from '@/components/ui/device-frame'
import { ProjectGallery } from '@/components/projects/gallery'
import { CtaBand } from '@/components/ui/cta-band'

export const dynamicParams = false

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project || !project.caseStudy) return {}
  return pageMetadata({
    title: project.name,
    description: project.summary,
    path: `/projects/${project.slug}`,
  })
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project || !project.caseStudy) notFound()

  const heroScreen = project.screens
    ? getScreenshot(project.screens.folder, project.screens.cover, project.name)
    : undefined

  const galleryScreens = project.screens
    ? getScreenshots(
        project.screens.folder,
        project.name,
        project.screens.groupLabels,
        project.screens.groupOrder,
      )
    : []

  const nextProject = getNextCaseStudy(project.slug)

  return (
    <>
      {/* Header + Hero screenshot */}
      <section className="section-y border-b border-border">
        <div className="container-site">
          <p className="fs-small text-muted">
            <Link href="/projects" className="text-muted no-underline hover:text-text">
              Projects
            </Link>{' '}
            / <span className="text-text">{project.name}</span>
          </p>

          <h1 className="mt-4">{project.name}</h1>
          <p className="lead mt-6">{project.summary}</p>

          {project.links && project.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-5">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  className="font-heading text-sm font-semibold text-link underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {/* Summary strip: type, role, stack, status */}
          <dl className="mt-10 grid gap-6 rounded-[12px] border border-border bg-surface p-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="font-mono text-xs text-muted">Type</dt>
              <dd className="mt-1 font-heading text-sm font-semibold text-text">
                {project.type}
                {project.year ? ` (${project.year})` : ''}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-muted">Role</dt>
              <dd className="mt-1 font-heading text-sm font-semibold text-text">{project.role}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-muted">Core stack</dt>
              <dd className="mt-1 font-mono text-xs text-text">
                {project.stack.slice(0, 4).join(', ')}
              </dd>
            </div>
            {project.status && (
              <div>
                <dt className="font-mono text-xs text-muted">Status</dt>
                <dd className="mt-1 font-heading text-sm font-semibold text-text">
                  {project.status}
                </dd>
              </div>
            )}
          </dl>

          {heroScreen && (
            <div className="mt-10">
              <BrowserFrame title={`${project.slug} · ${heroScreen.label}`}>
                <Image
                  src={heroScreen.src}
                  alt={heroScreen.alt}
                  width={heroScreen.width}
                  height={heroScreen.height}
                  priority
                  fetchPriority="high"
                  sizes="(min-width: 1280px) 1200px, 94vw"
                  className="h-auto w-full"
                />
              </BrowserFrame>
            </div>
          )}
        </div>
      </section>

      {/* Problem & Solution */}
      {(project.problem || project.solution) && (
        <section className="section-y border-b border-border" aria-label="Problem and solution">
          <div className="container-site grid gap-10 lg:grid-cols-2 lg:gap-12">
            {project.problem && (
              <div className="rounded-[12px] border border-border bg-surface p-6 md:p-8">
                <h2 className="text-2xl font-bold text-text">Problem</h2>
                <p className="mt-4 text-muted">{project.problem}</p>
              </div>
            )}
            {project.solution && (
              <div className="rounded-[12px] border border-border bg-surface p-6 md:p-8">
                <h2 className="text-2xl font-bold text-text">Solution</h2>
                <p className="mt-4 text-muted">{project.solution}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Key features */}
      {project.features.length > 0 && (
        <section className="section-y border-b border-border" aria-labelledby="features-heading">
          <div className="container-site">
            <h2 id="features-heading">Key features</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {project.features.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-[12px] border border-border bg-surface p-6 md:p-8"
                >
                  <h3 className="text-xl font-semibold text-text">{feature.title}</h3>
                  <p className="mt-3 text-muted">{feature.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Portals breakdown (when applicable, e.g. Quran Foundation LMS) */}
      {project.portals && project.portals.length > 0 && (
        <section className="section-y border-b border-border" aria-labelledby="portals-heading">
          <div className="container-site">
            <h2 id="portals-heading">Portals by role</h2>
            <p className="lead mt-3">
              What each role sees and manages inside {project.name}.
            </p>
            <div className="mt-8 divide-y divide-border border-y border-border">
              {project.portals.map((portal) => (
                <div
                  key={portal.name}
                  className="grid gap-2 py-5 md:grid-cols-[220px_1fr] md:items-baseline md:gap-8"
                >
                  <h3 className="text-lg font-semibold text-text">{portal.name}</h3>
                  <p className="text-muted">{portal.items}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* My role, Result & Tech stack */}
      <section className="section-y border-b border-border" aria-label="Role, stack and outcome">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          {project.myRole && project.myRole.length > 0 && (
            <div className="lg:col-span-7">
              <h2>My role</h2>
              <ul className="mt-6 space-y-3">
                {project.myRole.map((item) => (
                  <li key={item} className="flex items-baseline gap-3 text-muted">
                    <span className="size-1.5 shrink-0 rounded-full bg-link" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {project.result && (
                <div className="mt-10 rounded-[12px] border border-border bg-surface p-6">
                  <h3 className="text-lg font-semibold text-text">Result</h3>
                  <p className="mt-2 text-muted">{project.result}</p>
                </div>
              )}
            </div>
          )}

          <div className={project.myRole?.length ? 'lg:col-span-5' : 'lg:col-span-12'}>
            <h2>Tech stack</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-[8px] border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Full screenshot gallery with lightbox */}
      {galleryScreens.length > 0 && (
        <section className="section-y border-b border-border" aria-labelledby="gallery-heading">
          <div className="container-site">
            <div className="mb-10 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <h2 id="gallery-heading">Product screens</h2>
                <p className="lead mt-2">
                  Click any screenshot to inspect the full screen. Use arrow keys to step through.
                </p>
              </div>
              <span className="font-mono text-xs text-muted">
                {galleryScreens.length} screens in repository
              </span>
            </div>

            <ProjectGallery screenshots={galleryScreens} projectName={project.name} />
          </div>
        </section>
      )}

      {/* Next project link */}
      {nextProject && nextProject.slug !== project.slug && (
        <section className="border-b border-border py-12" aria-label="Next case study">
          <div className="container-site flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="font-mono text-xs text-muted">Next case study</p>
              <p className="mt-1 font-heading text-xl font-bold text-text">{nextProject.name}</p>
            </div>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="font-heading text-base font-semibold text-link underline"
            >
              Read {nextProject.name} case study
            </Link>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  )
}
