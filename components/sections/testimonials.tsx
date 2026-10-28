import { testimonials } from '@/data/testimonials'

export function TestimonialsSection() {
  if (testimonials.length === 0) return null

  return (
    <section className="section-y border-b border-border" aria-labelledby="testimonials-heading">
      <div className="container-site">
        <h2 id="testimonials-heading">Testimonials</h2>
        <p className="lead mt-3">
          Feedback from engineering leads and teams I have worked with.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {testimonials.map((item) => (
            <figure
              key={`${item.name}-${item.company}`}
              className="flex flex-col justify-between rounded-[12px] border border-border bg-surface p-6 md:p-8"
            >
              <blockquote className="text-base leading-relaxed text-text">
                “{item.quote}”
              </blockquote>

              <figcaption className="mt-6 flex items-baseline justify-between gap-4 border-t border-border pt-4">
                <div>
                  <p className="font-heading text-base font-semibold text-text">{item.name}</p>
                  <p className="fs-small text-muted">
                    {item.role} · {item.company}
                  </p>
                </div>
                {item.sourceUrl && (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fs-small font-heading font-semibold text-link underline"
                  >
                    Source
                  </a>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

