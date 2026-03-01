import { Separator } from "@/components/ui/separator"

export function About() {
  return (
    <section id="about" className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-4">
          <h2 className="whitespace-nowrap text-2xl font-bold text-foreground">
            About Me
          </h2>
          <Separator className="shrink" />
        </div>

        <div className="mt-10 max-w-2xl space-y-5 leading-relaxed text-muted-foreground">
          <p>
            {"I'm a Full-Stack Engineer with over 2.5 years of experience building production-grade Shopify apps, SaaS platforms, and e-commerce solutions. I specialize in architecting systems that solve real business problems for merchants and product teams."}
          </p>
          <p>
            My core work revolves around custom and public Shopify app development, subscription billing systems, analytics dashboards, and API integrations. I focus on writing clean, maintainable code that scales with business growth.
          </p>
          <p>
            {"I've worked across the full stack — from building responsive UIs with React and Tailwind CSS to designing RESTful APIs with Node.js and managing PostgreSQL databases. I care deeply about developer experience, code quality, and shipping features that matter."}
          </p>
        </div>
      </div>
    </section>
  )
}
