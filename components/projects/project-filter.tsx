'use client'

import { useState } from 'react'
import { projectCategories, type Project, type ProjectCategory } from '@/data/projects'
import { FeaturedProjectRows, type ProjectWithCover } from '@/components/projects/featured-rows'
import { CompactProjectList } from '@/components/projects/compact-list'
import { cn } from '@/lib/utils'

type Filter = 'All' | ProjectCategory
const filters: Filter[] = ['All', ...projectCategories]

export function ProjectFilter({
  featured,
  mini,
  secondary,
}: {
  featured: ProjectWithCover[]
  mini: ProjectWithCover[]
  secondary: Project[]
}) {
  const [active, setActive] = useState<Filter>('All')

  const filteredFeatured =
    active === 'All'
      ? featured
      : active === 'Mini Projects'
        ? []
        : featured.filter(({ project }) => project.category === active)

  const filteredMini =
    active === 'All' || active === 'Mini Projects'
      ? mini
      : mini.filter(({ project }) => project.category === active)

  const filteredSecondary =
    active === 'All' || active === 'Mini Projects'
      ? secondary
      : secondary.filter((project) => project.category === active)

  return (
    <div>
      <div
        role="toolbar"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2.5 pb-10"
      >
        {filters.map((filter) => {
          const selected = active === filter
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(filter)}
              className={cn(
                'rounded-[8px] border px-4 py-2 font-heading text-sm font-semibold transition-colors',
                selected
                  ? 'border-link bg-surface text-text'
                  : 'border-border bg-bg text-muted hover:border-link hover:text-text',
              )}
            >
              {filter}
            </button>
          )
        })}
      </div>

      {filteredFeatured.length > 0 && (
        <section aria-label="Featured projects">
          <FeaturedProjectRows items={filteredFeatured} />
        </section>
      )}

      {filteredMini.length > 0 && (
        <section
          aria-label="Mini projects"
          className={cn(filteredFeatured.length > 0 && 'mt-16')}
        >
          {active === 'All' && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-text">Mini projects</h2>
              <p className="lead mt-2">
                Full-stack Next.js and TypeScript builds with admin dashboards and live workflows.
              </p>
            </div>
          )}
          <FeaturedProjectRows items={filteredMini} />
        </section>
      )}

      {filteredSecondary.length > 0 && (
        <section
          aria-label="Personal projects"
          className={cn((filteredFeatured.length > 0 || filteredMini.length > 0) && 'mt-16')}
        >
          <h2 className="mb-6 text-xl font-bold text-text">Personal projects</h2>
          <CompactProjectList projects={filteredSecondary} />
        </section>
      )}
    </div>
  )
}
