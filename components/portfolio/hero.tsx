"use client"

import { ArrowDown, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect } from "react";

export function Hero() {
   useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return <section className="flex min-h-[78vh] flex-col items-start justify-center px-6 pb-12 pt-24"><div className="mx-auto w-full max-w-5xl"><p className="mb-4 font-mono text-sm text-primary opacity-0 animate-[fadeSlideUp_0.5s_ease-out_0.1s_forwards]">Hi, I'm Komal Raza</p><h1 className="max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tight text-foreground opacity-0 animate-[fadeSlideUp_0.5s_ease-out_0.3s_forwards] sm:text-5xl lg:text-6xl">Full-Stack Engineer building multi-tenant SaaS and Shopify apps.</h1><p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground opacity-0 animate-[fadeSlideUp_0.5s_ease-out_0.5s_forwards]">I work across React, Node.js, and PostgreSQL to turn complex business requirements into reliable products, from merchant-facing workflows to automated backend systems.</p><div className="mt-7 flex flex-wrap items-center gap-3 opacity-0 animate-[fadeSlideUp_0.5s_ease-out_0.7s_forwards]"><Button asChild size="lg" className="rounded-md"><a href="#projects">View Work</a></Button><Button asChild variant="outline" size="lg" className="rounded-md"><a href="/Komal-Raza-Resume.pdf" download><FileText className="mr-2 size-4" />Download Résumé</a></Button></div><div className="mt-12 opacity-0 animate-[fadeIn_0.5s_ease-out_1s_forwards]"><a href="#projects" className="text-muted-foreground transition-colors hover:text-primary" aria-label="Scroll to featured work"><ArrowDown className="size-5 animate-bounce" /></a></div></div>
    <div className="ticker border-t border-border py-3"><div className="ticker-track font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{["React", "Node.js", "PostgreSQL", "Shopify", "Stripe", "Redis", "BullMQ", "GraphQL", "Cloudinary", "Tailwind CSS", "React", "Node.js", "PostgreSQL", "Shopify", "Stripe", "Redis", "BullMQ", "GraphQL", "Cloudinary", "Tailwind CSS"].map((item, index) => <span key={`${item}-${index}`} className={index % 3 === 1 ? "text-accent" : index % 3 === 2 ? "text-secondary" : ""}>{item}<b>/</b></span>)}</div></div>
  </section>
}


