# Content Gaps

Per Section 3 and Section 9 of `prompt/REDESIGN_PROMPT.md`, no facts, metrics, testimonials or outcomes were invented, and no empty sections are rendered. Fill in any of the items below when ready.

## 1. Resume PDF (`public/resume.pdf`)

- **Current state:** `public/resume.pdf` does not exist. The existing file `public/Komal-Raza-Resume.pdf` is a UTF-8 plain-text dump (5,412 bytes, no `%PDF-` header) rather than a valid PDF document.
- **How the site handles it:** `/resume` renders the full HTML summary of experience, projects, skills and education, and checks at build time whether `public/resume.pdf` (or `public/Komal-Raza-Resume.pdf`) is a real PDF (`%PDF-` magic bytes). Because neither is a valid PDF yet, the **Download resume (PDF)** button is hidden.
- **TODO:** Export a real PDF resume to `public/resume.pdf`. The download button on `/resume` will appear automatically on the next build.

## 2. Eluara e-commerce app (`/projects/eluara-ecommerce-app`)

- **Current state:** `public/ProjectImages/Eluara-ecommerce-app/` contains 28 screenshots, and Section 8 notes: *"E-commerce app with a product-management dashboard (details to come)."*
- **How the site handles it:** Renders the case study page with the summary strip, two verifiable feature cards (storefront/checkout and product-management dashboard) and the 28-screenshot gallery with lightbox. Problem, Solution, My Role, Result and external links are omitted.
- **TODO:** Add problem/solution copy, full database/backend stack details, live URL and GitHub repository URL in `data/projects.ts`.

## 3. Agentic Skills Manager (`/projects/agent-skills-manager`)

- **Current state:** Summary, stack (`Next.js`, `TypeScript`, `Prisma`, `Neon Postgres`, `Vercel`), key features, GitHub URL (`https://github.com/komal-raza/nextjs-agent-skills-manager`) and 9 screenshots are rendered.
- **TODO:** Add the public Vercel deployment URL (if public) and optional Problem / Solution / Result paragraphs in `data/projects.ts`.

## 4. Quran Foundation LMS (`/projects/quran-foundation-lms`)

- **Guardian portal screenshots:** Section 8 lists five portals (Super Admin, Center Manager, Teacher, Student, Guardian). `public/ProjectImages/quranfoundation-lms/` currently has subfolders for `admin-portal`, `manager-portal`, `teacher-portal` and `student-portal`. Dropping a `guardian-portal/` folder into `public/ProjectImages/quranfoundation-lms/` will automatically add it to the case study gallery on the next build.
- **Homework marking copy conflict:** The previous `data/case-studies.ts` mentioned *"LLM Remarks Suggestion"*, while Section 8 of `prompt/REDESIGN_PROMPT.md` specifies *"homework marking (word-by-word and rule-by-rule evaluation matching the client's paper sheets)"* without mentioning an LLM. The site follows Section 8 strictly; confirm if the LLM remark suggestion should be re-added.

## 5. Earlier internships (Precise Tech & DocSoft.ai)

- **Current state:** Role title, company and dates (`React.js Developer Intern` at Precise Tech, Apr to Jul 2022; `Front End Developer Intern` at DocSoft.ai, Aug to Dec 2022) are listed on `/about` and `/resume`.
- **TODO:** Add 1–2 sentence summaries of what you built during each internship in `data/site.ts` (`site.timeline`) if you want them shown below the role titles.

## 6. Contact email confirmation

- **Current state:** The previous header, footer, contact section and resume text used `razaa.komal@gmail.com`, while the old case-study template had a `mailto:komalraza.dev@gmail.com` link. The redesigned site uses `razaa.komal@gmail.com` everywhere.
- **TODO:** Update `site.email` in `data/site.ts` if you prefer `komalraza.dev@gmail.com`.

## 7. Client testimonials & certificates (`data/certificates.ts`)

- **Current state:** `data/certificates.ts` starts with an empty array (`certificates: Certificate[] = []`) and `/certificates` exists as a route. Because the array is empty, the Certificates link in the footer and the compact strip on `/about` are hidden. No testimonials are provided in the repo or brief.
- **TODO:** Populate `data/certificates.ts` with `{ title, issuer, date, credentialUrl, image? }` entries (for example, pointing to the PDFs in `public/certificates/` or external verification URLs) to show the compact strip on `/about` and the footer link to `/certificates`. When you have written client quotes with permission to publish, add them to `data/site.ts`.

## 8. Client regions (`clientRegion` in `data/projects.ts`)

- **Current state:** `Buffalo River Co.` (`buffalo-river-co`) and `Xychros Pre-Launcher` (`xychros-pre-launcher`) were delivered for clients in the USA and Australia through LeoaTech, but which project belongs to which country is not yet specified. Both leave `clientRegion` unset so no unverified region renders.
- **TODO:** Set `clientRegion: 'USA'` or `clientRegion: 'Australia'` on `buffalo-river-co`, `xychros-pre-launcher` (and any other client projects) in `data/projects.ts`. Once set, project rows and case study summary strips will display `"Client: {clientRegion} · Delivered through LeoaTech"`, and the Home Featured Work section will display `"Delivered for clients in {unique regions}"` once at least two projects have a region.

## 9. Social profiles (`site.socials` in `data/site.ts`)

- **Current state:** `LinkedIn` (`https://www.linkedin.com/in/komal-raza`), `GitHub` (`https://github.com/komal-raza`) and `Email` (`razaa.komal@gmail.com`) are prefilled and rendered in the "Find me online" grid on `/contact`. `Instagram`, `X`, `TikTok`, `YouTube` and `Facebook` have empty `url` strings and are hidden.
- **TODO:** Fill in `handle` and `url` for any of `Instagram`, `X`, `TikTok`, `YouTube` or `Facebook` in `data/site.ts` (`site.socials`) to render those cards on `/contact`.



