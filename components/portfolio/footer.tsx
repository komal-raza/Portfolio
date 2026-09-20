import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/50 px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-xs text-muted-foreground">
          {"Built with Next.js & Tailwind CSS"}
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/komal-raza"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="GitHub"
          >
            <Github className="size-4" />
          </a>
          <a
            href="https://linkedin.com/in/komal-raza"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="LinkedIn"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href="mailto:razaa.komal@gmail.com"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Email"
          >
            <Mail className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
