import Link from 'next/link'
import { Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { site } from '@/data/site'
import { services } from '@/data/services'

const iconProps = { 'aria-hidden': true, strokeWidth: 1.5, className: 'size-4 shrink-0' } as const

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="container-site grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:gap-8">
        <div>
          <Link href="/" className="font-heading text-lg font-bold text-text no-underline">
            {site.name}
          </Link>
          <p className="fs-small mt-3 max-w-[32ch] text-muted">{site.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-heading text-sm font-semibold text-text">Pages</h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="fs-small text-muted no-underline hover:text-text">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services">
          <h2 className="font-heading text-sm font-semibold text-text">Services</h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="fs-small text-muted no-underline hover:text-text">
                  {service.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-heading text-sm font-semibold text-text">Contact</h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            <li>
              <a href={`mailto:${site.email}`} className="fs-small inline-flex items-center gap-2 text-muted no-underline hover:text-text">
                <Mail {...iconProps} />
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.linkedin} className="fs-small inline-flex items-center gap-2 text-muted no-underline hover:text-text" rel="me noopener" target="_blank">
                <Linkedin {...iconProps} />
                LinkedIn
              </a>
            </li>
            <li>
              <a href={site.github} className="fs-small inline-flex items-center gap-2 text-muted no-underline hover:text-text" rel="me noopener" target="_blank">
                <Github {...iconProps} />
                GitHub
              </a>
            </li>
            <li className="fs-small inline-flex items-center gap-2 text-muted">
              <MapPin {...iconProps} />
              {site.location}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-site flex flex-col gap-2 py-6 text-muted sm:flex-row sm:justify-between">
          <p className="fs-small">© {new Date().getFullYear()} {site.name}</p>
          <p className="fs-small">
            <a href={site.repo} target="_blank" rel="noopener" className="text-muted hover:text-text">
              Source on GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

