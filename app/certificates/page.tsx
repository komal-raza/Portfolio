import { certificates } from '@/data/certificates'
import { pageMetadata } from '@/lib/seo'
import { CtaBand } from '@/components/ui/cta-band'

export const metadata = pageMetadata({
  title: 'Certificates',
  description: 'Certificates and credentials earned by Komal Raza.',
  path: '/certificates',
})

export default function CertificatesPage() {
  return (
    <>
      <section className="section-y border-b border-border">
        <div className="container-site">
          <h1>Certificates</h1>
          <p className="lead mt-6">
            Coursework and technical credentials across full-stack engineering, React and Node.js.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          {certificates.length > 0 ? (
            <ul className="divide-y divide-border border-y border-border">
              {certificates.map((cert) => (
                <li
                  key={`${cert.title}-${cert.issuer}`}
                  className="grid gap-3 py-6 md:grid-cols-[1.4fr_1fr_auto] md:items-baseline md:gap-8"
                >
                  <div>
                    <h2 className="text-lg font-semibold text-text">{cert.title}</h2>
                  </div>
                  <div className="fs-small text-muted">
                    <span>{cert.issuer}</span>
                    {cert.date ? ` · ${cert.date}` : ''}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 md:justify-end">
                    {cert.fileUrl && (
                      <a
                        href={cert.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fs-small text-muted underline hover:text-text"
                      >
                        View PDF
                      </a>
                    )}
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fs-small font-heading font-semibold text-link underline"
                      >
                        Verify credential
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No certificates listed yet.</p>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  )
}

