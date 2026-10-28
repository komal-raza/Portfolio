'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { site } from '@/data/site'
import { services } from '@/data/services'
import { ButtonLink } from '@/components/ui/button-link'
import { cn } from '@/lib/utils'

const serviceLinks = [
  { label: 'All services', href: '/services' },
  ...services.map((service) => ({ label: service.title, href: `/services/${service.slug}` })),
]

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lastPath, setLastPath] = useState(pathname)

  // Close the mobile menu whenever the route changes.
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setMobileOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b bg-bg transition-colors',
        scrolled ? 'border-border' : 'border-transparent',
      )}
    >
      <div className="container-site flex h-[72px] items-center justify-between gap-6">
        <Link
          href="/"
          className="font-heading text-lg font-bold tracking-tight text-text no-underline"
          aria-label={`${site.name}, home`}
        >
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {site.nav.map((item) =>
              item.href === '/services' ? (
                <li key={item.href}>
                  <ServicesDropdown active={isActive(pathname, '/services')} pathname={pathname} />
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                    className={cn(
                      'rounded-[8px] px-3 py-2 text-[0.9375rem] font-medium no-underline transition-colors',
                      isActive(pathname, item.href) ? 'text-text' : 'text-muted hover:text-text',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href={site.cta.href} size="sm">
            {site.cta.label}
          </ButtonLink>
        </div>

        <MobileMenu open={mobileOpen} setOpen={setMobileOpen} pathname={pathname} />
      </div>
    </header>
  )
}

function ServicesDropdown({ active, pathname }: { active: boolean; pathname: string }) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuId = useId()
  const [lastPath, setLastPath] = useState(pathname)

  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  const items = () =>
    Array.from(wrapperRef.current?.querySelectorAll<HTMLAnchorElement>('[data-menu-item]') ?? [])

  const focusItem = (index: number) => {
    const list = items()
    if (!list.length) return
    list[(index + list.length) % list.length]?.focus()
  }

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  const onButtonKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      setOpen(true)
      requestAnimationFrame(() => focusItem(event.key === 'ArrowDown' ? 0 : -1))
    }
  }

  const onMenuKeyDown = (event: React.KeyboardEvent) => {
    const list = items()
    const index = list.indexOf(document.activeElement as HTMLAnchorElement)
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      focusItem(index + 1)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      focusItem(index - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      focusItem(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      focusItem(-1)
    }
  }

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          setOpen(false)
          buttonRef.current?.focus()
        }
      }}
      onBlur={(event) => {
        if (!wrapperRef.current?.contains(event.relatedTarget as Node)) setOpen(false)
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onButtonKeyDown}
        className={cn(
          'flex items-center gap-1 rounded-[8px] px-3 py-2 text-[0.9375rem] font-medium transition-colors',
          active ? 'text-text' : 'text-muted hover:text-text',
        )}
      >
        Services
        <ChevronDown
          aria-hidden="true"
          strokeWidth={1.5}
          className={cn('size-4 transition-transform', open && 'rotate-180')}
        />
      </button>
      <div
        id={menuId}
        hidden={!open}
        onKeyDown={onMenuKeyDown}
        className="absolute left-0 top-[calc(100%+12px)] w-72 rounded-[12px] border border-border bg-surface p-2"
      >
        <ul>
          {serviceLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                data-menu-item
                aria-current={pathname === link.href ? 'page' : undefined}
                className={cn(
                  'block rounded-[8px] px-3 py-2.5 text-[0.9375rem] no-underline transition-colors hover:bg-bg',
                  pathname === link.href ? 'text-text' : 'text-muted hover:text-text',
                  link.href === '/services' && 'mb-1 border-b border-border pb-3 font-medium text-text',
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function MobileMenu({
  open,
  setOpen,
  pathname,
}: {
  open: boolean
  setOpen: (value: boolean) => void
  pathname: string
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()

  const close = useCallback(() => {
    setOpen(false)
    toggleRef.current?.focus()
  }, [setOpen])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)
    first?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return
      const focusables = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (!focusables.length) return
      const firstEl = focusables[0]
      const lastEl = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault()
        lastEl.focus()
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault()
        firstEl.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, close])

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="-mr-2 flex size-11 items-center justify-center rounded-[8px] text-text"
      >
        <Menu aria-hidden="true" strokeWidth={1.5} className="size-6" />
      </button>

      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className="fixed inset-0 z-[60] overflow-y-auto bg-bg"
      >
        <div className="container-site flex h-[72px] items-center justify-between border-b border-border">
          <Link href="/" className="font-heading text-lg font-bold text-text no-underline" onClick={() => setOpen(false)}>
            {site.name}
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="-mr-2 flex size-11 items-center justify-center rounded-[8px] text-text"
          >
            <X aria-hidden="true" strokeWidth={1.5} className="size-6" />
          </button>
        </div>
        <nav aria-label="Mobile" className="container-site py-8">
          <ul className="flex flex-col">
            {site.nav.map((item) => (
              <li key={item.href} className="border-b border-border">
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block py-4 font-heading text-2xl font-semibold no-underline',
                    isActive(pathname, item.href) ? 'text-text' : 'text-muted',
                  )}
                >
                  {item.label}
                </Link>
                {item.href === '/services' && (
                  <ul className="-mt-1 mb-4 flex flex-col gap-1 pl-4">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          onClick={() => setOpen(false)}
                          aria-current={pathname === `/services/${service.slug}` ? 'page' : undefined}
                          className="block py-1.5 text-base text-muted no-underline hover:text-text"
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <ButtonLink href={site.cta.href} className="mt-8 w-full" onClick={() => setOpen(false)}>
            {site.cta.label}
          </ButtonLink>
        </nav>
      </div>
    </div>
  )
}

