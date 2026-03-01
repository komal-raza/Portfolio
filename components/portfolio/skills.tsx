import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const skillGroups = [
  {
    label: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "Shopify Polaris"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    label: "Databases",
    skills: ["PostgreSQL", "MongoDB"],
  },
  {
    label: "Shopify",
    skills: [
      "Custom Shopify Apps",
      "Public Shopify Apps",
      "Shopify APIs",
      "Shopify Billing",
      "Theme App Extensions",
    ],
  },
  {
    label: "SaaS & Integrations",
    skills: ["Stripe", "Subscription Systems", "Analytics Dashboards"],
  },
  {
    label: "Developer Productivity",
    skills: ["Git", "GitHub", "AI-Assisted Development"],
  },
]

export function Skills() {
  return (
    <section id="skills" className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-4">
          <h2 className="whitespace-nowrap text-2xl font-bold text-foreground">
            Skills
          </h2>
          <Separator className="shrink" />
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="mb-3 font-mono text-sm font-medium text-primary">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="rounded-md text-xs font-normal"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
