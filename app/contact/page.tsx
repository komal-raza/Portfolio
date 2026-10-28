import { Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { site } from '@/data/site'
import { pageMetadata } from '@/lib/seo'
import { ContactForm } from '@/components/contact/contact-form'

export const metadata = pageMetadata({
  title: 'Start a project',
  description:
    'Start a Shopify app, multi-tenant SaaS or LMS project with Komal Raza. Send your scope or email razaa.komal@gmail.com directly.',
  path: '/contact',
})

const iconProps = { 'aria-hidden': true, strokeWidth: 1.5, className: 'size-4 shrink-0 text-link' } as const

export default function ContactPage() {
  return (
    <section className="section-y">
      <div className="container-site grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h1>Start a project</h1>
          <p className="lead mt-6">
            Tell me what you want to build, who will use it and what already exists. I will reply by email with follow-up questions or a short plan for how to ship it.
          </p>

          <div className="mt-10 rounded-[12px] border border-border bg-surface p-6">
            <h2 className="text-lg font-semibold text-text">Direct contact</h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2.5 text-text underline"
                >
                  <Mail {...iconProps} />
                  <span>{site.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="me noopener"
                  className="inline-flex items-center gap-2.5 text-text underline"
                >
                  <Linkedin {...iconProps} />
                  <span>linkedin.com/in/komal-raza</span>
                </a>
              </li>
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="me noopener"
                  className="inline-flex items-center gap-2.5 text-text underline"
                >
                  <Github {...iconProps} />
                  <span>github.com/komal-raza</span>
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-muted">
                <MapPin {...iconProps} />
                <span>{site.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

