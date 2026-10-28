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
  secondary,
}: {
  featured: ProjectWithCover[]
  secondary: Project[]
}) {
  const [active, setActive] = useState<Filter>('All')

  const filteredFeatured =
    active === 'All' ? featured : featured.filter(({ project }) => project.category === active)
  const filteredSecondary =
    active === 'All' ? secondary : secondary.filter((project) => project.category === active)

  return (
    <div>
      <div
        role="toolbar"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2 pb-10"
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

      {filteredSecondary.length > 0 && (
        <section
          aria-label="Additional and personal projects"
          className={cn(filteredFeatured.length > 0 && 'mt-16')}
        >
          <h2 className="mb-6 text-xl font-bold text-text">Personal and open-source work</h2>
          <CompactProjectList projects={filteredSecondary} />
        </section>
      )}
    </div>
  )
}
