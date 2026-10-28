import fs from 'node:fs'
import path from 'node:path'
import { Download, ExternalLink, FileText } from 'lucide-react'
import { site } from '@/data/site'
import { pageMetadata } from '@/lib/seo'
import { AnchorButton } from '@/components/ui/button-link'
import { CtaBand } from '@/components/ui/cta-band'

export const metadata = pageMetadata({
  title: 'Resume',
  description:
    'View or download the resume of Komal Raza, Full-Stack Engineer (React, Node.js, PostgreSQL).',
  path: '/resume',
})

function resolveResumeHref(): string {
  const preferred = path.join(process.cwd(), 'public', 'resume.pdf')
  if (fs.existsSync(preferred)) return '/resume.pdf'
  return '/Komal-Raza-Resume.pdf'
}

export default function ResumePage() {
  const resumeHref = resolveResumeHref()

  return (
    <>
      <section className="section-y">
        <div className="container-site">
          <div className="mx-auto max-w-2xl rounded-[12px] border border-border bg-surface p-8 md:p-12">
            <div className="flex size-12 items-center justify-center rounded-[8px] border border-border bg-bg text-link">
              <FileText aria-hidden="true" strokeWidth={1.5} className="size-6" />
            </div>

            <h1 className="mt-6">Resume</h1>
            <p className="lead mt-4">
              {site.name} · {site.role} ({site.location})
            </p>
            <p className="mt-3 text-muted">
              View my resume in your browser or download a copy for your team.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <AnchorButton href={resumeHref} download>
                <Download aria-hidden="true" strokeWidth={1.5} className="size-4" />
                Download Resume
              </AnchorButton>
              <AnchorButton
                href={resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                <ExternalLink aria-hidden="true" strokeWidth={1.5} className="size-4" />
                View Resume
              </AnchorButton>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
