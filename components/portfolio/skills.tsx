import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const skillGroups = [
  { label: "Frontend", skills: ["JavaScript", "HTML", "CSS", "React", "Vite", "Next.js", "Tailwind CSS", "Shopify Polaris", "TanStack Query", "React Router", "Shopify App Bridge"] },
  { label: "Backend & Data", skills: ["Node.js", "Express.js", "PostgreSQL", "Redis", "BullMQ", "Cron Jobs", "SQL"] },
  { label: "Payments & Integrations", skills: ["Stripe", "Stripe Connect", "Shopify Billing API", "REST APIs", "GraphQL Admin API", "Cloudinary Transformations API", "Klaviyo Integration"] },
  { label: "Shopify", skills: ["Shopify App Development", "Shopify Admin API", "Shopify Webhooks", "Shopify App Store", "Shopify SaaS Applications"] },
  { label: "Tools", skills: ["Git", "GitHub", "Postman", "PgAdmin", "JIRA", "Linux", "ChatGPT", "Claude", "Gemini API"] },
]

export function Skills() {
  return <section id="skills" className="px-6 py-16 lg:py-20"><div className="mx-auto max-w-5xl"><div className="flex items-center gap-4"><h2 className="whitespace-nowrap text-2xl font-bold text-foreground">Skills</h2><Separator className="shrink" /></div><div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">{skillGroups.map((group) => <div key={group.label}><h3 className="mb-3 font-mono text-sm font-medium text-primary">{group.label}</h3><div className="flex flex-wrap gap-2">{group.skills.map((skill) => <Badge key={skill} variant="secondary" className="rounded-md px-2.5 py-1 text-sm font-normal text-foreground">{skill}</Badge>)}</div></div>)}</div></div></section>
}


