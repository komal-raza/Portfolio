# Task: Redesign my Next.js portfolio into a premium portfolio + agency website

You are redesigning an existing Next.js portfolio repository for **Komal Raza**, a Full-Stack Engineer (React, Node.js, PostgreSQL) who builds Shopify apps, multi-tenant SaaS platforms and LMS/EdTech products. The result should work both as a personal portfolio and as a freelance "agency-style" site where clients can see services, past work and start a project.

Do not produce a generic template. Follow this brief exactly. Where the brief is silent, choose deliberately and write the reason in `docs/redesign-plan.md`.

## 0. How to work

1. **Audit first, no code yet.** Read `package.json`, the router (App Router or Pages), existing components, styling approach (Tailwind, CSS modules, etc.), `public/`, and every folder that contains project screenshots. Write `docs/redesign-plan.md` covering: what exists, what you will reuse, the sitemap, and the folder-to-project mapping.
2. **Branch:** work on `redesign/agency-portfolio`. Never touch `main`. Commit after each phase below.
3. **Keep the existing stack.** Next.js, same language (TS or JS as the repo uses), same styling system. Do not migrate frameworks. Add dependencies only when needed (`lucide-react`, `zod`, `next/font` are fine).
4. Phases: (1) design tokens and fonts, (2) layout shell (navbar, footer), (3) shared components, (4) data files, (5) pages, (6) SEO and performance, (7) QA. Run `next build` at the end of each phase.

## 1. Brand kit (use exactly, do not invent new colors)

Dark-first. Define all of these as CSS variables (and map them into the Tailwind theme if the repo uses Tailwind).

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0A1328` (Midnight) | page background, hero |
| `--surface` | `#111C38` (Deep Navy) | cards, panels |
| `--border` | `#22315A` | 1px borders, dividers |
| `--text` | `#E6EDF7` (Mist) | body text |
| `--muted` | `#8A9BB8` (Slate) | secondary text, captions |
| `--accent` | `#C8F03F` (Lime) | primary buttons and one highlight per screen |
| `--link` | `#38BDF8` (Signal Cyan) | links, outlines, focus rings, diagram lines |
| `--paper` | `#F4F7FB` | light-mode background |

Rules: roughly 70% Midnight/Deep Navy, 20% Mist/Slate, 10% Lime/Cyan. Text on Lime is always `#0A1328`, never white. Lime is never used for body text or large background areas. Light mode is optional (add a toggle only if time allows); dark is the default and must be perfect first.

**Fonts** (load with `next/font/google`, `display: swap`, with system fallbacks):
- **Sora** 600/700: headings, logo text, buttons
- **Inter** 400/500/600: body and UI
- **JetBrains Mono** 400: code snippets only

**Type scale** (fluid, tight headings, relaxed body):
- H1: `clamp(2.5rem, 6vw, 4.5rem)`, line-height 1.05, letter-spacing -0.02em, Sora 700
- H2: `clamp(1.75rem, 3.5vw, 2.5rem)`, line-height 1.15, Sora 700
- H3: `1.25rem` to `1.5rem`, Sora 600
- Body: `1rem` / 1.65 Inter; lead paragraph `1.125rem` / 1.6
- Small: `0.875rem`; max line length 68 characters for paragraphs
- Left-align all text. Center only short CTA bands.

**Layout:** container max 1200px, side padding 20px mobile / 32px desktop, 8px spacing scale, section padding 96px desktop / 64px mobile. Radii: 12px cards, 8px buttons and inputs, 999px only for the signature chip.

**Signature element:** the pill chip from her LinkedIn banner: Lime background, dark bold text, 8px radius, hard offset shadow `3px 3px 0 #000`. Use it for the hero tag and nowhere else more than once per page.

## 2. Anti-AI-slop rules (hard constraints)

Reject these defaults even if they feel "standard":
- No gradient text, no gradient washes or blurred glowing blobs, no glassmorphism, no purple/pink gradients.
- No all-caps tracked-out eyebrow label above every heading. No emoji as icons. No `→` appended to every link.
- Do not highlight a single word in a headline with a different color or italic.
- No numbered markers (01/02/03) unless the content is truly a sequence (only the Process section is).
- Do not chop everything into identical rounded cards with the same soft shadow. Vary structure: services as larger editorial rows, featured projects as big alternating image/text rows, secondary projects as a compact list. Shadows are not used on cards; use 1px borders.
- No fade-and-slide-up on every section, no hover animation on every card. Allowed motion: one hero load sequence, button hover and focus states, and the project gallery lightbox open/close. Respect `prefers-reduced-motion`.
- No filler copy ("cutting-edge", "seamless", "passionate", "leverage", "empower", "unlock"). No fake testimonials, fake client logos, fake metrics, fake pricing or stock photos.
- No lorem ipsum anywhere.
- Icons: `lucide-react`, stroke 1.5, used sparingly and consistently.

The one memorable thing on the site is the **hero's real product screenshots** shown in browser/device frames. Everything else stays quiet and disciplined.

## 3. Content truth rules

- Use only the facts in section 8 and what you find in the repo. If a section would need information I have not given (testimonials, certificates, role details, outcomes), **do not invent it and do not render an empty section.** Render nothing, and list each gap in `CONTENT_GAPS.md` so I can fill it.
- No numbers like "5+ years", "hundreds of merchants", "2x growth". Allowed stat style: verifiable facts only (e.g. "Xychros Pre-Launcher: live on the Shopify App Store").
- Client confidentiality: no revenue, merchant counts or private client data.
- Location is shown as **Remote, Pakistan**.
- Voice: plain, confident, specific; first person singular ("I build…"), never "we". Lead with what the client gets, then how it was built. Sentence case. CTAs say exactly what happens.

## 4. Sitemap (add the missing pages)

```
/                       Home
/about                  About
/services               Services overview
/services/shopify-app-development
/services/saas-development
/services/lms-edtech-platforms
/services/backend-integrations
/projects               Projects (category filter: Shopify, SaaS, LMS, Personal)
/projects/[slug]        Case study per project
/resume                 Resume page with the Download button
/contact                Start a project form
404, sitemap.xml, robots.txt
```

**Navbar:** logo (Komal Raza, Sora), Home, About, Services (dropdown with the 4 services), Projects, Resume, Contact, and a Lime **Start Project** button on the right. Mobile: full-screen menu with focus trap. Footer: short tagline, nav links, GitHub, LinkedIn, email, "Remote, Pakistan".

**Hero CTA rule:** the hero has exactly one button: **Start Project** (links to `/contact`). There is no resume button in the hero. The resume is only downloaded from `/resume`, which shows a readable preview or summary of the resume and a Download button for `public/resume.pdf` (if the file does not exist, create the page with a clear TODO in `CONTENT_GAPS.md` and hide the button).

## 5. Page specs

**Home**
1. Hero: two columns on desktop. Left: signature chip "Full-Stack Engineer · SaaS · Shopify Apps", H1 "Building ideas into scalable digital products", a two-sentence subhead (what I build, for whom), one **Start Project** button. Right: 2 to 3 real screenshots from the repo (LMS dashboard as the main one, a second offset behind it) in a browser frame. Mobile: text first, screenshots below.
2. Services: 4 services as editorial rows (title, one sentence, 3 deliverables, link). Not four equal boxes.
3. Featured work: 3 to 4 projects as large alternating rows (screenshot, name, one-line problem, tech tags, "View case study").
4. How I work: the only sequential section (Discover, Design, Build, Launch, Support), each with one concrete sentence.
5. Tech stack grouped: Frontend, Backend, Payments and APIs, Tools. Plain text tags, no skill percentage bars.
6. Personal projects strip (Agentic Skills Manager, e-commerce dashboard, portfolio) as a compact list.
7. CTA band: "Have a project in mind?" with the Start Project button.

**About:** short story, current role, timeline (LeoaTech: Jan 2023 to present; earlier internships), education, how I think about software (3 to 4 short principles), tech stack, photo (use the existing profile photo in the repo).

**Services:** overview page plus 4 detail pages. Each detail page: who it is for, what you get (deliverables), how it works, tech used, related projects (linked), and a Start Project band. No prices. Use "Get a quote" wording on the CTA band if needed.

**Projects:** filter chips by category, featured projects first as large rows, the rest as a compact list. **Case study template:** hero screenshot, summary strip (type, role, stack, status), problem, solution, key features, tech stack, my role, result (only if facts exist), full screenshot gallery with lightbox, next project link, Start Project band.

**Contact:** short form (name, email, project type select, message). Validate with `zod`, honeypot field, simple rate limit in the route handler. Send with Resend if `RESEND_API_KEY` exists, otherwise log in dev and show a mailto fallback. Document env vars in `README`. Include direct email and LinkedIn links. Confirmation state says exactly what happens next.

## 6. Screenshots and data

- Project screenshots already exist in the repo, in folders named after each project (for example `quran-lms` holds the LMS app screenshots). **Find every such folder** during the audit and map each to a project slug in `docs/redesign-plan.md`.
- Never rename, move, delete or modify the original images. Read them at build time (`fs.readdirSync`, natural sort) and render the gallery automatically, so adding a new screenshot to a folder updates the site.
- Use `next/image` with `sizes`, lazy loading below the fold, `priority` only on the hero image, and meaningful alt text (project name plus screen name derived from the filename, cleaned up).
- Put content in typed data files: `data/projects.ts`, `data/services.ts`, `data/site.ts`. Pages read from these; no content hardcoded in components.

## 7. Quality bar

- SEO: per-page `metadata` (title, description, canonical, Open Graph), JSON-LD `Person` on Home and About, `sitemap.xml`, `robots.txt`, one `h1` per page, an `og:image` of 1200x630 in the brand colors.
- Accessibility: WCAG AA contrast, visible keyboard focus (Cyan ring), semantic landmarks, skip link, labels on every input, dropdown navigable by keyboard.
- Performance: Lighthouse mobile Performance 90+, Accessibility 95+, SEO 95+. No layout shift. No unused dependencies.
- Responsive check at 360, 768, 1280 and 1536 px. No horizontal scroll at any width.
- Before finishing: remove dead code and old unused components, run lint and `next build`, fix all warnings, and make sure no old routes break (add redirects if any URL changed).

## 8. Facts you may use (Komal Raza)

**Role:** Senior Full Stack Engineer at LeoaTech, remote; full-time since Jan 2023. Earlier: React.js Developer Intern at Precise Tech (Apr to Jul 2022), Front End Developer Intern at DocSoft.ai (Aug to Dec 2022). Education: BS Computer Science, University of Narowal (2017 to 2021).

**Client and product work**
- **Xychros Pre-Launcher** (2023, live on the Shopify App Store): Shopify app for pre-launch waitlists and viral referral campaigns. Referral tracking, tier-based subscriptions, Shopify rewards and Klaviyo integration, analytics dashboard with light and dark mode. Stack: Shopify Admin APIs, React.js, Node.js, PostgreSQL, Polaris.
- **Buffalo River Co.** (Shopify, private app): custom app adding variant-level multi-image and video support, section-based media logic, Cloudinary integration, and Theme App Blocks so non-technical merchants can use it. Stack: React.js, Node.js, Express.js, PostgreSQL, Cloudinary.
- **Library Management SaaS:** multi-tenant platform with custom subdomain isolation per library, cron-automated daily fines and return reminders, TanStack Query frontend with dynamic themes, BullMQ + Redis for notifications and bulk CSV/XLSX uploads, Stripe Connect for split payments and library subscriptions. Stack: React, Node.js, PostgreSQL, Tailwind.
- **Quran Foundation LMS** (flagship case study, 2026): multi-tenant Islamic learning management system for a client. Role hierarchy: Super Admin, Org Admin, Area Manager, Center Manager, Teacher, Guardian, Student. Covers curriculum, classroom scheduling, attendance, homework marking (word-by-word and rule-by-rule evaluation matching the client's paper sheets), finance and enrollment. Portals: Super Admin (courses, curriculum, cross-center reports, finances, bulk student import, roles and permissions), Center Manager (classrooms, enrollment, fee collection, teacher topic split, staff, salaries, donations), Teacher (sessions, attendance, classwork, homework marking), Student (classes, attendance, course progress, audio submission, marks and remarks), Guardian (course-wise and daily progress). Redis-backed background jobs for guardian notifications; Docker; deployed on Vercel and Render. Stack: React, Express.js, Knex.js, PostgreSQL, Tailwind, TanStack Query, Redis, BullMQ.

**Personal projects (Next.js + TypeScript):** Agentic Skills Manager (users add, share or keep private Skills.md instruction files for coding agents; Prisma, Neon Postgres, auth with httpOnly cookies, ISR, deployed on Vercel; github.com/komal-raza/nextjs-agent-skills-manager). E-commerce app with a product-management dashboard (details to come). This portfolio (github.com/komal-raza/Portfolio).

**Skills:** JavaScript, SQL, HTML, CSS; React, Vite, Next.js, Tailwind CSS, Shopify Polaris, TanStack Query, React Router, Shopify App Bridge; Node.js, Express.js, PostgreSQL, Redis, BullMQ, cron jobs; Shopify Billing API, Stripe, Stripe Connect, Shopify Admin API (REST and GraphQL), webhooks, Cloudinary, Klaviyo; Git, GitHub, Postman, Linux.

**Services to present:** (1) Shopify app development (public and custom apps, Admin API, webhooks, Polaris UI, billing, theme app blocks); (2) multi-tenant SaaS development (architecture, role-based access, subscriptions, background jobs); (3) LMS and EdTech platforms; (4) backend and integrations (Stripe and Stripe Connect, Klaviyo, queues and automation, bulk imports).

## 9. Definition of done

- All pages in section 4 exist and are linked from the nav or footer.
- Hero has only the Start Project button; `/resume` holds the download.
- Every project folder with screenshots appears in a case study gallery.
- Only brand-kit colors and fonts are used; none of the section 2 patterns appear.
- `CONTENT_GAPS.md` lists everything you could not fill without inventing facts.
- `next build` passes, Lighthouse targets met, and `docs/redesign-plan.md` explains the main design decisions.