"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { CaseStudySlide } from "@/data/case-studies"

type Props = { slides: CaseStudySlide[]; title: string }

export function CaseStudyCarousel({ slides, title }: Props) {
  const [active, setActive] = useState(0)
  const current = slides[active]

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setActive((index) => (index + 1) % slides.length)
      if (event.key === "ArrowLeft") setActive((index) => (index - 1 + slides.length) % slides.length)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [slides.length])

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[16/8] overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-2xl">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_50%_20%,oklch(0.27_0.04_145),transparent_55%)] px-6 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">{current.label}</span>
          <span className="max-w-2xl text-2xl font-medium tracking-tight text-foreground/90 md:text-4xl">{current.headline}</span>
          <span className="max-w-xl text-sm leading-6 text-muted-foreground">{current.body}</span>
          {current.bullets.length > 0 && <ul className="mt-2 grid max-w-2xl gap-2 text-left text-xs leading-5 text-muted-foreground md:grid-cols-2">{current.bullets.map((bullet) => <li key={bullet}>• {bullet}</li>)}</ul>}
        </div>
        <div className="absolute bottom-4 left-4 rounded-full border border-border bg-background/70 px-3 py-1 font-mono text-[10px] text-muted-foreground backdrop-blur">{String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</div>
        <div className="absolute bottom-3 right-3 flex gap-2">
          <Button variant="outline" size="icon" aria-label="Previous screenshot" onClick={() => setActive((index) => (index - 1 + slides.length) % slides.length)}><ArrowLeft /></Button>
          <Button variant="outline" size="icon" aria-label="Next screenshot" onClick={() => setActive((index) => (index + 1) % slides.length)}><ArrowRight /></Button>
        </div>
      </div>
      <p className="text-sm leading-6 text-muted-foreground">{current.caption}</p>
      <div className="flex gap-2" aria-label={`${title} screenshots`}>
        {slides.map((slide, index) => <button key={slide.label} type="button" aria-label={`Show ${slide.label}`} aria-current={active === index} onClick={() => setActive(index)} className={`size-2 rounded-full transition-colors ${active === index ? "bg-primary" : "bg-muted-foreground/40"}`} />)}
      </div>
    </div>
  )
}
