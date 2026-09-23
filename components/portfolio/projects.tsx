import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { caseStudies } from "@/data/case-studies"

export function Projects() {
  return <section id="projects" className="px-5 py-14 md:px-8 md:py-20"><div className="mx-auto max-w-6xl"><div className="flex items-center gap-4"><div><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">Selected work</p><h2 className="mt-3 text-4xl tracking-[-0.05em] md:text-5xl">Featured <em className="text-primary">work.</em></h2></div><Separator className="mt-8" /></div><div className="mt-8 grid gap-4 md:grid-cols-2">{caseStudies.map((project, index) => <Link key={project.slug} href={`/work/${project.slug}`} className="group flex min-h-64 flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50"><div className="flex items-start justify-between gap-4"><div><span className="font-mono text-[10px] text-primary">{String(index + 1).padStart(2, "0")} · {project.period}</span><h3 className="mt-4 text-2xl tracking-tight">{project.title}</h3><p className="mt-2 text-sm text-muted-foreground">{project.category}</p></div><ArrowUpRight className="size-5 text-primary transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div><div><p className="mt-8 text-sm leading-6 text-muted-foreground">{project.tagline}</p><div className="mt-5 flex flex-wrap gap-2">{project.techStack.slice(0, 5).map((tech) => <Badge key={tech} variant="outline" className="rounded-full px-3 py-1 text-xs font-normal">{tech}</Badge>)}</div></div></Link>)}</div></div></section>
}
