import { featuredProjects, miniProjects, personalProjects } from '@/data/projects'
import { getCoverScreenshot } from '@/lib/screenshots'
import { pageMetadata } from '@/lib/seo'
import { ProjectFilter } from '@/components/projects/project-filter'
import { CtaBand } from '@/components/ui/cta-band'

export const metadata = pageMetadata({
  title: 'Projects',
  description:
    'Case studies and projects across Shopify apps, multi-tenant SaaS platforms, LMS products and Next.js mini projects.',
  path: '/projects',
})

export default function ProjectsPage() {
  const featuredWithCovers = featuredProjects.map((project) => ({
    project,
    cover: project.screens
      ? getCoverScreenshot(project.screens.folder, project.screens.cover, project.name)
      : undefined,
  }))

  const miniWithCovers = miniProjects.map((project) => ({
    project,
    cover: project.screens
      ? getCoverScreenshot(project.screens.folder, project.screens.cover, project.name)
      : undefined,
  }))

  const otherPersonal = personalProjects.filter((project) => !project.screens)

  return (
    <>
      <section className="section-y border-b border-border">
        <div className="container-site">
          <h1>Projects</h1>
          <p className="lead mt-6">
            Client and product work across Shopify apps, multi-tenant SaaS platforms and learning management systems, plus Next.js mini projects.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <ProjectFilter
            featured={featuredWithCovers}
            mini={miniWithCovers}
            secondary={otherPersonal}
          />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
