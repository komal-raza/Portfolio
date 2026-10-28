import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function BrowserFrame({
  title,
  children,
  className,
}: {
  title?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('overflow-hidden rounded-[12px] border border-border bg-surface', className)}>
      <div className="flex h-8 items-center gap-3 border-b border-border bg-bg px-3.5">
        <span className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full border border-border bg-surface" />
          <span className="size-2 rounded-full border border-border bg-surface" />
          <span className="size-2 rounded-full border border-border bg-surface" />
        </span>
        {title && <span className="truncate font-mono text-xs text-muted">{title}</span>}
      </div>
      <div className="bg-bg">{children}</div>
    </div>
  )
}

export function PhoneFrame({
  title,
  children,
  className,
}: {
  title?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('overflow-hidden rounded-[12px] border border-border bg-surface p-2', className)}>
      <div className="mb-1.5 flex items-center justify-between px-1.5" aria-hidden="true">
        <span className="h-1 w-8 rounded-full bg-border" />
        {title && <span className="truncate font-mono text-[10px] text-muted">{title}</span>}
      </div>
      <div className="overflow-hidden rounded-[8px] border border-border bg-bg">{children}</div>
    </div>
  )
}

