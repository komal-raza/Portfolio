import { ExternalLink } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "Xychros Pre-Launcher",
    description:
      "Public Shopify App for pre-launch waitlists and viral referral campaigns with subscriptions and analytics.",
    stack: ["React", "Node.js", "PostgreSQL", "Shopify APIs", "Stripe"],
    role: "Full-stack development, Shopify app architecture, billing integration",
    link: "#",
  },
  {
    title: "Advanced Media & Variant Management",
    description:
      "Custom Shopify app enabling multi-image and video support per product variant with dynamic theme integration.",
    stack: ["React", "Shopify Polaris", "Node.js", "Theme App Extensions"],
    role: "End-to-end development, Shopify API integration, theme customization",
    link: "#",
  },
  {
    title: "Library Management SaaS",
    description:
      "Full-stack SaaS with admin dashboards, subscriptions, analytics, and bulk inventory handling.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
    role: "Full product ownership, subscription billing, analytics dashboards",
    link: "#",
  },
  {
    title: "Shopify Theme Customization Demo",
    description:
      "Custom Online Store 2.0 theme built with Liquid, sections, blocks, metafields, and JavaScript.",
    stack: ["Liquid", "JavaScript", "CSS", "Shopify OS 2.0"],
    role: "Theme architecture, custom sections and blocks, metafield integration",
    link: "#",
  },
]

export function Projects() {
  return (
    <section id="projects" className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-4">
          <h2 className="whitespace-nowrap text-2xl font-bold text-foreground">
            Projects
          </h2>
          <Separator className="shrink" />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group flex flex-col rounded-lg border border-border/60 bg-card p-6 transition-colors hover:border-primary/30"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {project.title}
                </h3>
                <Button asChild variant="ghost" size="icon-sm" className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary">
                  <a href={project.link} aria-label={`View ${project.title}`}>
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              </div>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <p className="mt-3 text-xs leading-relaxed text-muted-foreground/80">
                <span className="font-medium text-muted-foreground">Impact:</span>{" "}
                {project.role}
              </p>

              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                {project.stack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="rounded-md text-xs font-normal text-muted-foreground"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
