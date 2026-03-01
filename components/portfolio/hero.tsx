import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-start justify-center px-6 pt-20">
      <div className="mx-auto w-full max-w-5xl">
        <p className="mb-4 font-mono text-sm text-primary">Hi, my name is</p>
        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Komal Raza
        </h1>
        <h2 className="mt-3 text-balance text-2xl font-semibold text-muted-foreground sm:text-3xl lg:text-4xl">
          Full-Stack Engineer & Shopify App Developer
        </h2>
        <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          Building scalable Shopify apps and SaaS products with React, Node.js,
          and PostgreSQL. Turning complex business requirements into clean,
          production-ready software.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button asChild size="lg" className="rounded-md">
            <a href="#projects">View Projects</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-md">
            <a href="#contact">Contact</a>
          </Button>
        </div>
        <div className="mt-20 flex justify-center lg:mt-28">
          <a
            href="#about"
            className="text-muted-foreground transition-colors hover:text-primary"
            aria-label="Scroll to about section"
          >
            <ArrowDown className="size-5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  )
}
