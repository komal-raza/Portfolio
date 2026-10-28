# Komal Raza — Portfolio & Agency Website

Personal portfolio and freelance agency site for **Komal Raza**, Senior Full-Stack Engineer (React, Node.js, PostgreSQL) building Shopify apps, multi-tenant SaaS platforms and LMS/EdTech products.

## Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 with strict CSS custom-property design tokens (`app/globals.css`)
- **Fonts:** `next/font/google` — Sora (headings, buttons), Inter (body/UI), JetBrains Mono (code/metadata)
- **Validation:** `zod`
- **Icons:** `lucide-react` (1.5px stroke)

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Create a `.env.local` file in the project root (all variables are optional in development):

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Optional | Canonical origin used for metadata, `sitemap.xml`, `robots.txt` and JSON-LD (e.g. `https://komalraza.dev`). Falls back to `https://$VERCEL_PROJECT_PRODUCTION_URL`, then `http://localhost:3000`. |
| `RESEND_API_KEY` | Optional | Resend API key for sending `/contact` submissions via email. When omitted, submissions are logged in development and the user is given a pre-filled `mailto:` fallback button. |
| `CONTACT_TO_EMAIL` | Optional | Recipient email for `/contact` messages. Defaults to `razaa.komal@gmail.com`. |
| `CONTACT_FROM_EMAIL` | Optional | Verified sender address for Resend (e.g. `Portfolio <contact@yourdomain.com>`). Defaults to `Portfolio Contact <onboarding@resend.dev>`. |

## Content & screenshots

- Site copy, process, timeline and tech stack live in `data/site.ts`.
- Service pages live in `data/services.ts`.
- Project case studies live in `data/projects.ts`.
- Project screenshots live in `public/ProjectImages/<folder>/` and are read automatically at build time (`lib/screenshots.ts`) with natural sorting and intrinsic dimensions read from image headers. Dropping a new screenshot into any project folder adds it to that project's gallery on the next `npm run build`.
- Unresolved content questions are tracked in `CONTENT_GAPS.md`.
- Architectural and design decisions are documented in `docs/redesign-plan.md`.

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Production build (`next build`)
- `npm run start` — Start production server
- `npm run lint` — Run ESLint
