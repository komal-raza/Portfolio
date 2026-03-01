import { Mail, Github, Linkedin } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

const contactLinks = [
  {
    label: "Email",
    href: "mailto:komalraza.dev@gmail.com",
    icon: Mail,
    display: "komalraza.dev@gmail.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/komalraza",
    icon: Github,
    display: "github.com/komalraza",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/komalraza",
    icon: Linkedin,
    display: "linkedin.com/in/komalraza",
  },
]

export function Contact() {
  return (
    <section id="contact" className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-4">
          <h2 className="whitespace-nowrap text-2xl font-bold text-foreground">
            Get In Touch
          </h2>
          <Separator className="shrink" />
        </div>

        <div className="mt-10 max-w-lg">
          <p className="leading-relaxed text-muted-foreground">
            {"I'm always open to discussing new projects, interesting ideas, or opportunities to build something impactful. Feel free to reach out."}
          </p>

          <div className="mt-8 flex flex-col gap-4">
            {contactLinks.map((link) => (
              <Button
                key={link.label}
                asChild
                variant="ghost"
                className="h-auto justify-start gap-3 px-0 py-2 text-muted-foreground hover:text-foreground"
              >
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  <link.icon className="size-4 text-primary" />
                  <span className="text-sm">{link.display}</span>
                </a>
              </Button>
            ))}
          </div>

          <div className="mt-10">
            <Button asChild size="lg" className="rounded-md">
              <a href="mailto:komalraza.dev@gmail.com">Say Hello</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
