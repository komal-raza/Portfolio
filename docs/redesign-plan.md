# Redesign plan: agency portfolio

Branch: `redesign/agency-portfolio` (never `main`).

## 1. Audit: what exists

| Area | Finding |
|---|---|
| Framework | Next.js 16.1.6, React 19, **App Router**, TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` in `app/globals.css`, `@tailwindcss/postcss`). `styles/globals.css` is an unused duplicate left by v0. |
| Fonts | `next/font/google`: Inter + JetBrains Mono (no heading font) |
| Routes | `/` (single long page with `#about`, `#skills`, `#projects`, `#experience`, `#contact` anchors) and `/work/[slug]` (4 case studies) |
| Components | `components/portfolio/*` (header, hero, about, projects, experience, skills, contact, footer), `components/case-study/*` (text-only "carousel" with no real images, template), 50+ unused shadcn files in `components/ui/*`, `theme-provider`, `theme-toggle`, `hooks/*` |
| Data | `data/case-studies.ts` (4 case studies, rich copy, typed) |
| Config | `next.config.mjs` has `typescript.ignoreBuildErrors: true` and `images.unoptimized: true` (both hide problems / hurt performance) |
| Lint | `npm run lint` calls `eslint .` but ESLint is not installed |
| Lockfiles | Both `package-lock.json` and `pnpm-lock.yaml` exist; pnpm is not installed locally |
| Dependencies | ~45 runtime deps, most only used by the unused shadcn files (Radix, recharts, embla, cmdk, vaul, sonner, react-hook-form, date-fns...) |
| Assets | `public/images/profile.jpg` (1088×1088 profile photo), `public/images/signature.png` (old logo), `public/images/Portfolio.png` + `caseStudy.png` (full-page screenshots of the old site), `public/Komal-Raza-Resume.pdf` (**not a real PDF**: it is a UTF-8 text file with a `.pdf` extension), v0 placeholder images, favicons |
| Other | `app/Case Study UI – Quran Foundation LMS.html` is an untracked standalone design mock. Left untouched and uncommitted. |

## 2. What I reuse

- Stack: Next.js App Router, TypeScript, Tailwind v4 (CSS-first tokens), `lucide-react`, `zod`, `clsx` + `tailwind-merge` (`lib/utils.ts`), `@vercel/analytics`.
- Copy and facts from `data/case-studies.ts` that do not conflict with the brief (feature descriptions for Buffalo River, Xychros, Library SaaS; role titles; years; public links). Anything that would need confirmation is listed in `CONTENT_GAPS.md` instead.
- LeoaTech role progression from the old Experience section (Frontend Developer → Full-stack Developer → Senior Full Stack Software Engineer) for the About timeline.
- `public/images/profile.jpg` on About.
- Favicons (`icon.svg`, `icon-*-32x32.png`, `apple-icon.png`).
- Contact email `razaa.komal@gmail.com` (used in the old header/footer/contact and in the resume text). The old case-study template used `komalraza.dev@gmail.com`; that is listed as a gap.

## 3. What I remove

- `components/portfolio/*`, `components/case-study/*`, `components/ui/*`, `components/theme-*`, `hooks/*`, `styles/globals.css`, `data/case-studies.ts`, v0 placeholder images.
- All dependencies only used by those files. Final runtime deps: `next`, `react`, `react-dom`, `lucide-react`, `zod`, `clsx`, `tailwind-merge`, `@vercel/analytics`.
- `pnpm-lock.yaml`: two lockfiles make the install non-deterministic (and a stale pnpm lock would fail a frozen install on Vercel once `package.json` changes). `npm` is what is installed locally, so `package-lock.json` is kept as the single source of truth.
- `typescript.ignoreBuildErrors` and `images.unoptimized` (Next image optimization is required for the Lighthouse target; `sharp` is already installed).

## 4. Sitemap

```
/                                   Home
/about                              About
/services                           Services overview
/services/shopify-app-development
/services/saas-development
/services/lms-edtech-platforms
/services/backend-integrations
/projects                           Projects (filter: All, Shopify, SaaS, LMS, Personal)
/projects/[slug]                    Case study
/resume                             Resume summary + Download (button hidden until a real PDF exists)
/contact                            Start a project form
/api/contact                        POST route handler
404 (app/not-found.tsx), /sitemap.xml, /robots.txt, /opengraph-image
```

Redirects (permanent): `/work/:slug` → `/projects/:slug` (old case-study URLs). The old in-page anchors (`/#projects` etc.) are fragments and cannot be redirected server-side; they now simply land on Home.

## 5. Folder-to-project mapping

All screenshot folders live in `public/ProjectImages/`. Files are read at build time (`fs.readdirSync`, recursive one level for portal sub-folders, natural sort). Nothing is renamed, moved or modified.

| Folder | Slug | Category | Notes |
|---|---|---|---|
| `quranfoundation-lms/` (sub-folders `admin-portal`, `manager-portal`, `teacher-portal`, `student-portal`) | `quran-foundation-lms` | LMS | Flagship. Gallery grouped by portal. Hero uses `admin-portal/admin-home.png` + `manager-portal/manager-enrollments.png` + `teacher-portal/teacher-home.png` (phone frame). |
| `xychros-launch-your-product/` | `xychros-pre-launcher` | Shopify | Slug kept from the old site so `/work/xychros-pre-launcher` redirects cleanly. |
| `buffalo-river-co/` | `buffalo-river-co` | Shopify | Files are numbered `1-…12-`; natural sort keeps 10/11/12 after 9. |
| `leoatech-library-app/` | `library-management-saas` | SaaS | |
| `agent-skills-manager/` | `agent-skills-manager` | Personal | |
| `Eluara-ecommerce-app/` | `eluara-ecommerce-app` | Personal | Name taken from the folder; brief says "details to come", so the case study shows only verifiable facts + gallery. |
| (none) | `portfolio` | Personal | This site. No screenshot folder, so it is a list entry linking to GitHub, not a case study page. |

## 6. Design decisions (where the brief was silent)

- **Tokens live in CSS variables and are mapped into Tailwind v4 `@theme inline`**, so utilities like `bg-surface`, `text-muted`, `border-border` read the brand kit directly. No other colors exist in the theme (Tailwind's default palette is reset with `--color-*: initial`), which makes it impossible to drift off-brand by accident.
- **Dark only.** Light mode is optional in the brief; I shipped dark only so dark is perfect, and removed `next-themes`.
- **Hero composition:** desktop browser frame with the LMS Super Admin dashboard, a second browser frame (Center Manager enrollments) offset behind it, and a phone frame (Teacher portal) overlapping the bottom-left corner. Three real screens from three roles tell the "multi-role platform" story without copy.
- **Hero load sequence** (the only decorative motion): chip → H1 → subhead → button → screenshots, 60 ms steps, opacity + 8 px translate. Disabled under `prefers-reduced-motion`.
- **Button hover:** primary goes from Lime to Mist (still dark text, no new color); secondary gets a Cyan border. No transforms on cards.
- **Signature chip** uses the 8 px radius and hard `3px 3px 0 #000` shadow from the brief. Used once on Home (hero) only; other pages have no chip, keeping it special. (The brief's "999px only for the signature chip" vs "8px radius" conflict is resolved in favour of the explicit chip spec: 8 px.)
- **Section headings:** plain H2 + optional one-line intro. No eyebrows.
- **Services:** editorial rows with a 1px top border, a 2-column grid (title + sentence | deliverables), and a text link. Not cards.
- **Featured projects:** big alternating rows (screenshot in a browser frame left/right). **Secondary projects:** compact table-like list (name, type, stack, year).
- **Process** is the only numbered section (true sequence).
- **Tech stack:** four labelled groups of plain text tags (bordered, no fill).
- **Gallery:** responsive grid of fixed 16:10 thumbnails (`object-cover object-top`, so very tall mobile captures do not explode the layout). Lightbox uses the native `<dialog>` (built-in focus trap, Esc, inert background), prev/next buttons and arrow keys, and shows the full-size image in a scroll container so tall mobile screenshots can be read.
- **Image dimensions** are read from PNG/JPEG headers at build time (tiny parser in `lib/screenshots.ts`, no dependency) so every `next/image` has intrinsic width/height → no layout shift.
- **Alt text** is generated from the filename (number prefixes, domain prefixes and camelCase removed, a few filename typos fixed for display only) plus the project name and portal.
- **Resume:** the only resume file in the repo is a text file with a `.pdf` extension, so the page checks for a real PDF (`%PDF` magic bytes) at `public/resume.pdf`, then `public/Komal-Raza-Resume.pdf`. If none is valid, the Download button is hidden and the gap is listed. The page always shows an HTML summary built from `data/site.ts`.
- **Contact delivery:** Resend is called with `fetch` against its REST API, so no SDK dependency is added. Rate limit is an in-memory sliding window per IP (5 requests / 10 minutes) — good enough for a single-region serverless portfolio; documented as best-effort in the README.
- **Site URL** comes from `NEXT_PUBLIC_SITE_URL`, falling back to Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, then `http://localhost:3000`.
- **OG image** is generated with `next/og` at build time (1200×630, Midnight background, Lime chip, Cyan rule).
- **ESLint:** `eslint` + `eslint-config-next` added as dev dependencies because the existing `lint` script calls `eslint .` and nothing was installed.

