import Image from "next/image"
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

        <div className="mt-10 flex flex-col items-start gap-10 lg:flex-row lg:gap-14">
          <div className="relative mx-auto shrink-0 lg:mx-0">
            <div className="h-64 w-64 overflow-hidden rounded-2xl border-2 border-border lg:h-72 lg:w-72">
              <Image
                src="/images/profile.jpg"
                alt="Komal Raza - Full-Stack Engineer"
                width={288}
                height={288}
                className="h-full w-full object-cover object-top"
                priority
              />
            </div>
            <div className="absolute -bottom-3 -right-3 h-20 w-20 rounded-xl border border-primary/30 bg-primary/10" />
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground lg:text-base">
            <p>
              {"I'm a Full-Stack Engineer with over 2.5 years of experience building production-grade Shopify apps, SaaS platforms, and e-commerce solutions. I specialize in architecting systems that solve real business problems for merchants and product teams."}
            </p>
            <p>
              My core work revolves around custom and public Shopify app development, subscription billing systems, analytics dashboards, and API integrations. I focus on writing clean, maintainable code that scales with business growth.
            </p>
            <p>
              {"I've worked across the full stack \u2014 from building responsive UIs with React and Tailwind CSS to designing RESTful APIs with Node.js and managing PostgreSQL databases. I care deeply about developer experience, code quality, and shipping features that matter."}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
