import { featuredProjects, personalProjects } from '@/data/projects'
import { getScreenshot } from '@/lib/screenshots'
import { pageMetadata } from '@/lib/seo'
import { ProjectFilter } from '@/components/projects/project-filter'
import { CtaBand } from '@/components/ui/cta-band'

export const metadata = pageMetadata({
  title: 'Projects',
  description:
    'Case studies and projects across Shopify apps, multi-tenant SaaS platforms, LMS products and Next.js personal builds.',
  path: '/projects',
})

export default function ProjectsPage() {
  const featuredWithCovers = featuredProjects.map((project) => ({
    project,
    cover: project.screens
      ? getScreenshot(project.screens.folder, project.screens.cover, project.name)
      : undefined,
  }))

  return (
    <>
      <section className="section-y border-b border-border">
        <div className="container-site">
          <h1>Projects</h1>
          <p className="lead mt-6">
            Client and product work across Shopify apps, multi-tenant SaaS platforms and learning management systems, plus personal Next.js projects.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <ProjectFilter featured={featuredWithCovers} secondary={personalProjects} />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
