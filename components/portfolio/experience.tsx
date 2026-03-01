import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export function Experience() {
  return (
    <section id="experience" className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-4">
          <h2 className="whitespace-nowrap text-2xl font-bold text-foreground">
            Experience
          </h2>
          <Separator className="shrink" />
        </div>

        <div className="mt-10">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <h3 className="text-lg font-semibold text-foreground">
              Full-Stack Shopify App Developer
            </h3>
            <span className="font-mono text-sm text-muted-foreground">
              LeoaTech
            </span>
          </div>

          <p className="mt-1 font-mono text-xs text-primary">
            2.5+ years
          </p>

          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <li className="flex gap-3">
              <span className="mt-2 block size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              Architected and shipped both custom and public Shopify apps end-to-end, from design to deployment, handling the full lifecycle including Shopify review and app store listing.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 block size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              Built SaaS products with subscription billing, admin dashboards, and analytics — owning the full stack from database schema design to production infrastructure.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 block size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              Integrated third-party services including Stripe for payments, Shopify Billing API for app charges, and external analytics platforms for merchant insights.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 block size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              Developed theme app extensions and Online Store 2.0 customizations with Liquid, sections, blocks, and metafields for seamless merchant experiences.
            </li>
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {["React", "Node.js", "PostgreSQL", "Shopify APIs", "Stripe", "Tailwind CSS", "Express.js"].map(
              (tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="rounded-md text-xs font-normal"
                >
                  {tech}
                </Badge>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
