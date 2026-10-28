import { site } from '@/data/site'
import { ButtonLink } from '@/components/ui/button-link'

export function CtaBand({
  title = site.cta.bandTitle,
  text = site.cta.bandText,
  buttonLabel = site.cta.label,
  href = site.cta.href,
}: {
  title?: string
  text?: string
  buttonLabel?: string
  href?: string
}) {
  return (
    <section className="section-y border-t border-border">
      <div className="container-site">
        <div className=" flex w-full flex-col items-center rounded-[12px] border-b border-border bg-surface px-6 py-12 text-center shadow-[0_8px_24px_-12px_#000000] md:px-12 md:py-16">
          <h2>{title}</h2>
          <p className="lead mt-4 text-center">{text}</p>
          <div className="mt-8">
            <ButtonLink href={href}>{buttonLabel}</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}


