'use client'

import Image from 'next/image'
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Screenshot } from '@/lib/screenshots'

let supportsDisplayTransition: boolean | undefined

function canTransitionDisplay(): boolean {
  if (supportsDisplayTransition !== undefined) return supportsDisplayTransition
  if (
    typeof window === 'undefined' ||
    !window.CSS?.supports?.('transition-behavior', 'allow-discrete') ||
    !document.body
  ) {
    return false
  }
  const probe = document.createElement('div')
  probe.style.cssText = 'transition: display 1s allow-discrete !important; display: block;'
  document.body.appendChild(probe)
  void getComputedStyle(probe).display
  probe.style.display = 'none'
  supportsDisplayTransition = getComputedStyle(probe).display === 'block'
  probe.remove()
  return supportsDisplayTransition
}

function supportsTopLayerExit(): boolean {
  return typeof window !== 'undefined' && Boolean(window.CSS?.supports?.('overlay', 'auto')) && canTransitionDisplay()
}

async function closeTopLayer(dialog: HTMLDialogElement) {
  if (!dialog.open) return
  if (!supportsTopLayerExit()) {
    dialog.setAttribute('data-closing', '')
    const animations = dialog.getAnimations({ subtree: true })
    if (animations.length > 0) {
      await Promise.race([
        Promise.allSettled(animations.map((a) => a.finished)),
        new Promise((resolve) => setTimeout(resolve, 400)),
      ])
    }
    if (!dialog.hasAttribute('data-closing')) return
    dialog.removeAttribute('data-closing')
  }
  dialog.close()
}

export function ProjectGallery({
  screenshots,
  projectName,
}: {
  screenshots: Screenshot[]
  projectName: string
}) {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])
  const titleId = useId()

  const groups = useMemo(() => {
    const map = new Map<string, { item: Screenshot; index: number }[]>()
    screenshots.forEach((item, index) => {
      const key = item.group ?? ''
      const list = map.get(key) ?? []
      list.push({ item, index })
      map.set(key, list)
    })
    return Array.from(map.entries())
  }, [screenshots])

  const openAt = useCallback((index: number) => {
    setActiveIndex(index)
    setIsOpen(true)
    const dialog = dialogRef.current
    if (dialog && !dialog.open) {
      dialog.removeAttribute('data-closing')
      dialog.showModal()
    }
  }, [])

  const requestClose = useCallback(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    void closeTopLayer(dialog)
  }, [])

  const prev = useCallback(() => {
    setActiveIndex((current) => (current - 1 + screenshots.length) % screenshots.length)
  }, [screenshots.length])

  const next = useCallback(() => {
    setActiveIndex((current) => (current + 1) % screenshots.length)
  }, [screenshots.length])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const onCancel = (event: Event) => {
      event.preventDefault()
      void closeTopLayer(dialog)
    }

    const onClose = () => {
      setIsOpen(false)
      triggerRefs.current[activeIndex]?.focus()
    }

    const onClick = (event: MouseEvent) => {
      if ('closedBy' in HTMLDialogElement.prototype) return
      if (event.target !== dialog) return
      const rect = dialog.getBoundingClientRect()
      const isDialogContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      if (!isDialogContent) {
        void closeTopLayer(dialog)
      }
    }

    dialog.addEventListener('cancel', onCancel)
    dialog.addEventListener('close', onClose)
    dialog.addEventListener('click', onClick)
    return () => {
      dialog.removeEventListener('cancel', onCancel)
      dialog.removeEventListener('close', onClose)
      dialog.removeEventListener('click', onClick)
    }
  }, [activeIndex])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        prev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        next()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, prev, next])

  if (!screenshots.length) return null
  const current = screenshots[activeIndex] ?? screenshots[0]

  return (
    <div className="space-y-12">
      {groups.map(([groupName, entries]) => (
        <div key={groupName || 'all'} className="space-y-4">
          {groupName && (
            <div className="flex items-baseline justify-between border-b border-border pb-2">
              <h3 className="text-lg font-semibold text-text">{groupName}</h3>
              <span className="font-mono text-xs text-muted">{entries.length} screens</span>
            </div>
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map(({ item, index }) => (
              <button
                key={item.src}
                ref={(el) => {
                  triggerRefs.current[index] = el
                }}
                type="button"
                onClick={() => openAt(index)}
                aria-label={`Open ${item.label} screenshot in lightbox`}
                className="group flex flex-col overflow-hidden rounded-[12px] border border-border bg-surface text-left transition-colors hover:border-link"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-bg">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="(min-width: 1024px) 368px, (min-width: 640px) 46vw, 92vw"
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="flex w-full items-center justify-between gap-3 px-4 py-3">
                  <span className="fs-small truncate font-medium text-text">{item.label}</span>
                  <span className="font-mono text-xs text-muted">
                    {index + 1}/{screenshots.length}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      <dialog
        ref={dialogRef}
        {...({ closedby: 'any' } as Record<string, string>)}
        aria-labelledby={titleId}
        className="lightbox m-auto max-h-[92dvh] w-[min(94vw,1120px)] overflow-hidden rounded-[12px] border border-border bg-surface p-0 text-text"
      >
        <div className="flex max-h-[92dvh] flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-border bg-bg px-4 py-3 md:px-6">
            <div className="min-w-0">
              <p id={titleId} className="truncate font-heading text-sm font-semibold text-text md:text-base">
                {projectName}
                {current.group ? ` · ${current.group}` : ''} — {current.label}
              </p>
              <p className="font-mono text-xs text-muted">
                Screen {activeIndex + 1} of {screenshots.length}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous screenshot"
                className="flex size-9 items-center justify-center rounded-[8px] border border-border bg-surface text-text hover:border-link"
              >
                <ChevronLeft aria-hidden="true" strokeWidth={1.5} className="size-4" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next screenshot"
                className="flex size-9 items-center justify-center rounded-[8px] border border-border bg-surface text-text hover:border-link"
              >
                <ChevronRight aria-hidden="true" strokeWidth={1.5} className="size-4" />
              </button>
              <button
                type="button"
                onClick={requestClose}
                aria-label="Close lightbox"
                className="flex size-9 items-center justify-center rounded-[8px] border border-border bg-surface text-text hover:border-link"
              >
                <X aria-hidden="true" strokeWidth={1.5} className="size-4" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto bg-bg p-4 md:p-6">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="94vw"
              className="mx-auto h-auto max-w-full rounded-[8px] border border-border"
            />
          </div>
        </div>
      </dialog>
    </div>
  )
}
