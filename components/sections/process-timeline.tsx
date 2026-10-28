import { site } from '@/data/site'

export function ProcessTimeline() {
  return (
    <div className="mt-12">
      <ol className="relative flex flex-col gap-8 lg:grid lg:grid-cols-5 lg:gap-6">
        {/* Vertical line on mobile */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2 left-[3.5px] top-2 w-px bg-border lg:hidden"
        />
        {/* Horizontal line on desktop */}
        <span
          aria-hidden="true"
          className="pointer-events-none hidden lg:absolute lg:left-0 lg:right-0 lg:top-[3.5px] lg:block lg:h-px lg:bg-border"
        />

        {site.process.map((step) => (
          <li key={step.title} className="relative pl-7 lg:pl-0 lg:pt-7">
            <span
              aria-hidden="true"
              className="absolute left-0 top-1.5 size-2 rounded-full bg-link ring-4 ring-bg lg:left-0 lg:top-0"
            />
            <h3 className="font-heading text-lg font-semibold text-text">{step.title}</h3>
            <p className="fs-small mt-1.5 max-w-[26ch] text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
