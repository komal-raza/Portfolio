import Link from "next/link"
import { ArrowUpRight, Play } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CaseStudyCarousel } from "@/components/case-study/carousel"
import { getSlides, type CaseStudy } from "@/data/case-studies"

export function CaseStudyTemplate({ study, related }: { study: CaseStudy; related: CaseStudy[] }) {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-20 pt-8 md:pt-12">
      <Link href="/#projects" className="text-sm text-muted-foreground transition-colors hover:text-primary">← Back to work</Link>
      <section className="mt-8 rounded-xl border border-border bg-card p-6 md:p-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{study.eyebrow}</p>
        <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="max-w-3xl"><h1 className="text-4xl font-bold tracking-tight md:text-6xl">{study.title}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">{study.tagline}</p></div>
          <Badge variant="outline" className="w-fit">{study.category}</Badge>
        </div>
      </section>
      <section className="py-10"><CaseStudyCarousel slides={getSlides(study)} title={study.title} /></section>
      <section className="grid gap-8 border-y border-border py-12 md:grid-cols-[0.7fr_1.3fr]"><div><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">At a glance</p><h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">What I delivered.</h2></div><div className="grid gap-4">{[["01", "Project goal", study.goal], ["02", "My contribution", study.contribution], ["03", "Result", study.result]].map(([number, label, copy]) => <article key={number} className="rounded-lg border border-border bg-card p-5"><span className="font-mono text-xs text-primary">{number}</span><h3 className="mt-3 text-xl font-semibold">{label}</h3><p className="mt-2 text-base leading-7 text-muted-foreground">{copy}</p></article>)}</div></section>
      <section className="py-14"><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Selected development</p><h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">The work behind the experience.</h2><div className="mt-8 grid overflow-hidden rounded-lg border border-border md:grid-cols-2">{study.features.map((feature, index) => <article key={feature.title} className="border-border bg-card p-6 md:border-r md:border-b md:nth-[2n]:border-r-0"><span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-4 text-lg font-semibold">{feature.title}</h3><p className="mt-2 text-base leading-7 text-muted-foreground">{feature.description}</p></article>)}</div></section>
      <section className="border-t border-border py-8"><div className="grid gap-6 md:grid-cols-3">{[["Role", study.role], ["Focus", study.focus], ["Delivery", study.delivery]].map(([label, value]) => <div key={label}><p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</p><p className="mt-2 text-base font-medium">{value}</p></div>)}</div><div className="mt-7 flex flex-wrap gap-2">{study.techStack.map((tech) => <Badge key={tech} variant="outline" className="px-3 py-1 text-sm font-normal">{tech}</Badge>)}</div></section>
      <section className="py-10"><div className="flex aspect-video flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card text-center"><Play className="size-8 text-primary" /><p className="text-lg font-semibold">Demo video coming soon</p><p className="max-w-xl text-base leading-7 text-muted-foreground">A walkthrough of the full platform will be added here.</p></div></section>
      <section className="border-t border-border py-12"><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Keep exploring</p><div className="mt-6 grid gap-4 md:grid-cols-2">{related.map((item) => <Link key={item.slug} href={`/work/${item.slug}`} className="group rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/50"><p className="text-sm text-muted-foreground">{item.category}</p><h3 className="mt-3 text-2xl font-semibold tracking-tight">{item.title} <ArrowUpRight className="inline size-5 text-primary" /></h3><p className="mt-3 text-base leading-7 text-muted-foreground">{item.tagline}</p></Link>)}</div></section>
      <section className="rounded-xl border border-border bg-card px-6 py-10 md:px-10"><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Have a similar challenge?</p><h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Let&apos;s build something useful.</h2><Button asChild className="mt-6"><a href="mailto:komalraza.dev@gmail.com">Start a conversation</a></Button></section>
    </main>
  )
}
