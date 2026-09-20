import { Mail, Linkedin, FileText } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

const contactLinks = [{ label: "Email", href: "mailto:razaa.komal@gmail.com", icon: Mail, display: "razaa.komal@gmail.com" }, { label: "LinkedIn", href: "https://www.linkedin.com/in/komal-raza", icon: Linkedin, display: "linkedin.com/in/komal-raza" }]

export function Contact() {
  return <section id="contact" className="px-6 py-16 lg:py-20"><div className="mx-auto max-w-5xl"><div className="flex items-center gap-4"><h2 className="whitespace-nowrap text-2xl font-bold text-foreground">Get In Touch</h2><Separator className="shrink" /></div><div className="mt-8 max-w-2xl"><p className="text-base leading-7 text-muted-foreground">I'm open to Full-Stack Engineer opportunities, freelance work, and contract projects around SaaS products and Shopify apps.</p><div className="mt-6 flex flex-col gap-2">{contactLinks.map((link) => <Button key={link.label} asChild variant="ghost" className="h-auto justify-start gap-3 px-0 py-2 text-muted-foreground hover:text-foreground"><a href={link.href} target="_blank" rel="noopener noreferrer"><link.icon className="size-5 text-primary" /><span className="text-base">{link.display}</span></a></Button>)}</div><Button asChild size="lg" className="mt-7 rounded-md"><a href="/Komal-Raza-Resume.pdf" download><FileText className="mr-2 size-4" />Download Résumé</a></Button></div></div></section>
}


