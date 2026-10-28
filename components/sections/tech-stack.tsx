import { Layers, Layout, Server, Wrench, type LucideIcon } from 'lucide-react'
import { site } from '@/data/site'

const groupIcons: Record<string, LucideIcon> = {
  Frontend: Layout,
  Backend: Server,
  'Payments and APIs': Layers,
  'Tools & Engineering': Wrench,
}

export function TechStackGrid() {
  return (
    <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-14">
      {site.stack.map((group) => {
        const Icon = groupIcons[group.group] ?? Layers
        return (
          <div key={group.group}>
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <Icon aria-hidden="true" strokeWidth={1.5} className="size-5 shrink-0 text-link" />
              <h3 className="text-xl font-bold tracking-tight text-text md:text-[1.375rem]">
                {group.group}
              </h3>
            </div>
            <ul className="mt-6 flex flex-wrap gap-3.5" aria-label={`${group.group} skills`}>
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-[10px] border border-border bg-surface px-5 py-3 text-[0.9375rem] font-medium text-text"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

