import { Header } from "@/components/portfolio/header"
import { Hero } from "@/components/portfolio/hero"
import { Projects } from "@/components/portfolio/projects"
import { Experience } from "@/components/portfolio/experience"
import { Skills } from "@/components/portfolio/skills"
import { About } from "@/components/portfolio/about"
import { Contact } from "@/components/portfolio/contact"
import { Footer } from "@/components/portfolio/footer"

export default function HomePage() {
  return <><Header /><main><Hero /><Projects /><Experience /><Skills /><About /><Contact /></main><Footer /></>
}
