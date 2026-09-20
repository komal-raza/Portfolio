import { ExternalLink } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "Quran Foundation LMS",
    type: "Full-stack learning management system",
    description: "Extended a multi-centre LMS for course management, enrollment, attendance, academic progress, and finance. Built validated bulk student onboarding with profile-image processing, audio homework workflows, analytics, fee management, and automated notifications.",
    stack: ["React", "Express.js", "PostgreSQL", "Tailwind CSS", "Redis", "BullMQ"],
    period: "2026 – Present",
    link: null,
  },
  {
    title: "Multi-Tenant Library Management SaaS",
    type: "Full-stack, multi-tenant",
    description: "Each library gets its own tenant environment and isolated data for books, members, staff, bookings, and daily operations. Stripe handles library subscriptions, platform fees, and overdue-fine payments, while scheduled jobs automate fines, return reminders, and notifications.",
    stack: ["React", "Node.js", "PostgreSQL", "Tailwind CSS", "TanStack Query", "Stripe"],
    period: "2024 – Present",
    link: "https://my-books-library-client.vercel.app/",
  },
  {
    title: "Buffalo River Co.",
    type: "Shopify app",
    description: "Built a custom product and variant media platform with galleries, masonry layouts, and section-specific configurations without theme code changes. Shopify Admin APIs and webhooks sync catalog metadata, while Cloudinary transformations generate responsive image presets and an in-app editor supports crop, resize, and preview workflows.",
    stack: ["Shopify", "React", "Node.js", "Express.js", "PostgreSQL", "Cloudinary"],
    period: "2024 – 2025",
    link: "https://buffaloriver.co",
  },
  {
    title: "Xychros Pre-Launcher",
    type: "Shopify app",
    description: "Built a public Shopify app for pre-launch campaigns with configurable referral tiers, reward products, landing pages, and campaign states. Integrated Shopify billing, GraphQL and REST APIs, Klaviyo lead sync, email notifications, customer tags, discount rewards, and campaign analytics.",
    stack: ["Shopify Admin API", "React", "Node.js", "PostgreSQL", "Polaris", "Klaviyo"],
    period: "2023",
    link: "https://apps.myshopify.com/viral-launch",
  },
]

export function Projects() {
  return (
    <section id="projects" className="px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-4"><h2 className="whitespace-nowrap text-2xl font-bold text-foreground">Featured Work</h2><Separator className="shrink" /></div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {projects.map((project) => (
            <article key={project.title} className="group flex flex-col rounded-lg border border-border/60 bg-card p-6 transition-colors hover:border-primary/40">
              <div className="flex items-start justify-between gap-4">
                <div><h3 className="text-lg font-semibold text-foreground">{project.title}</h3><p className="mt-1 font-mono text-xs text-primary">{project.type} · {project.period}</p></div>
                {project.link && <Button asChild variant="ghost" size="icon-sm" className="shrink-0 text-muted-foreground group-hover:text-primary"><a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title}`}><ExternalLink className="size-4" /></a></Button>}
              </div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{project.description}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-5">{project.stack.map((tech) => <Badge key={tech} variant="outline" className="rounded-md text-sm font-normal text-primary">{tech}</Badge>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}


