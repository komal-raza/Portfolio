import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const roles = [
  ["Senior Full Stack Software Engineer", "Jan 2025 – Present", "Leading full-stack development of Shopify apps and SaaS platforms. Recent work includes Stripe subscription billing for a multi-tenant library platform and an LMS used by multiple education centers, with Redis and background processing for reminders, notifications, and bulk imports."],
  ["Full-stack Developer", "Dec 2023 – Dec 2024", "Took ownership of backend and database work alongside the UI. Built and shipped a custom Shopify product-media app with Cloudinary-based image optimization and merchant-facing workflows."],
  ["Frontend Developer", "Jan 2023 – Nov 2023", "Started with React interfaces from Figma designs, then moved into backend and API work on the Xychros Shopify App Store project for pre-launch campaigns and referral rewards."],
]

export function Experience() {
  return <section id="experience" className="px-6 py-16 lg:py-20"><div className="mx-auto max-w-5xl"><div className="flex items-center gap-4"><h2 className="whitespace-nowrap text-2xl font-bold text-foreground">Experience</h2><Separator className="shrink" /></div><div className="mt-8 rounded-lg border border-border/60 bg-card p-6"><div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline"><h3 className="text-xl font-semibold text-foreground">LeoaTech</h3><span className="font-mono text-sm text-primary">Jan 2023 – Present · Remote</span></div><div className="mt-7 space-y-6">{roles.map(([title, period, description]) => <div key={title} className="border-l border-primary/40 pl-5"><h4 className="font-semibold text-foreground">{title}</h4><p className="mt-1 font-mono text-sm text-primary">{period}</p><p className="mt-2 text-base leading-7 text-muted-foreground">{description}</p></div>)}</div><div className="mt-7 flex flex-wrap gap-2">{["React", "Node.js", "PostgreSQL", "Redis", "BullMQ", "Shopify APIs", "Stripe", "Tailwind CSS"].map((tech) => <Badge key={tech} variant="secondary" className="rounded-md px-2.5 py-1 text-sm font-normal text-foreground">{tech}</Badge>)}</div></div></div></section>
}


