export type CaseStudySlide = {
  label: string
  headline: string
  body: string
  bullets: string[]
  caption: string
}

export type CaseStudy = {
  slug: string
  title: string
  eyebrow: string
  tagline: string
  category: string
  goal: string
  contribution: string
  result: string
  features: { title: string; description: string }[]
  role: string
  focus: string
  delivery: string
  techStack: string[]
  period: string
  link?: string
  slides?: CaseStudySlide[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "library-management-saas",
    title: "Library Management SaaS",
    eyebrow: "CASE STUDY",
    tagline: "A multi-tenant library platform for everyday operations, payments, and automated reminders.",
    category: "Full-stack · multi-tenant",
    goal: "Give each library an operational workspace while keeping tenant data isolated across books, members, staff, bookings, and payments.",
    contribution: "Built the React and Node.js product surface, tenant-aware data flows, booking operations, scheduled jobs, bulk imports, notifications, and Stripe Connect payment workflows.",
    result: "Libraries can manage their catalog and bookings from an isolated workspace, with automated fines and reminders and background processing for imports and notifications.",
    features: [
      { title: "Tenant isolation", description: "Custom subdomain routing and scoped data access for each library workspace." },
      { title: "Operations dashboard", description: "Catalog, members, staff, and bookings organized for daily workflows." },
      { title: "Automated jobs", description: "Daily fines and return reminders run through scheduled background work." },
      { title: "Payments", description: "Stripe Connect supports split payments and library subscription flows." },
    ],
    role: "Full-stack engineer", focus: "Multi-tenant SaaS · payments", delivery: "Product build", techStack: ["React", "Node.js", "PostgreSQL", "Tailwind", "TanStack Query", "BullMQ", "Redis", "Stripe Connect"], period: "2024 – Present", link: "https://my-books-library-client.vercel.app/",
  },
  {
    slug: "quran-foundation-lms",
    title: "Quran Foundation LMS",
    eyebrow: "CASE STUDY",
    tagline: "A full-featured learning management platform built to digitalize the complete operations of a Quran education organization — from curriculum delivery and classroom management to student progress tracking and multi-center analytics.",
    category: "EdTech · LMS · Full Stack",
    goal: "Quran Foundation runs multiple centers teaching Quranic education and religious courses to all age groups. Every operation — enrollment, attendance, classwork, homework, progress reporting, staff payments, and donations — was entirely paper-based. The goal was to fully digitalize these operations into a single, role-aware platform.",
    contribution: "Joined after the Team Lead had laid the Auth and RBAC foundation. Extended the platform end-to-end by integrating auth APIs into the frontend, building course and curriculum management, audio homework submission and LLM-powered remarks, classroom and attendance management, the BullMQ and Redis bulk student import pipeline, staff salary and donation modules, and the multi-center analytics dashboard.",
    result: "The organization moved from fully paper-based to a fully digital operation. Teachers can review and mark audio homework outside classroom hours, parents and students have real-time transparency into progress, marks, and attendance, and management can compare center performance and track finances across centers.",
    features: [
      { title: "Curriculum & Homework System", description: "Structured per-course assignment flow where each center follows the same curriculum, duration, and homework schedule." },
      { title: "Audio Submission Pipeline", description: "Students record or upload recitation audio; teachers access and mark it with per-word/verse granularity outside class hours." },
      { title: "LLM Remarks Suggestion", description: "An integrated LLM API suggests personalized teacher feedback after marks are entered for each word or verse." },
      { title: "Bulk Student Import", description: "A BullMQ and Redis background job migrates existing Excel student data while keeping enrollment counts accurate per center." },
      { title: "Multi-Center Analytics", description: "A real-time dashboard compares student progress, attendance, and course completion across all Quran Foundation centers." },
      { title: "Finance & Donation Tracking", description: "Staff salary records and per-center donation collections give management full financial transparency." },
    ],
    role: "Full Stack Developer", focus: "Feature Development & Systems Integration", delivery: "Collaborative — Team of 2", techStack: ["React", "Tailwind CSS", "Node.js", "Express.js", "Zod", "PostgreSQL", "BullMQ", "Redis", "LLM API"], period: "2026 – Present",
    slides: [
      { label: "01 · Teaching & classroom operations", headline: "Teaching Tools & Classroom Management", body: "Built the full classroom workflow — teachers can view assigned topics, open a scheduled class session to mark attendance, manage classwork, and review submitted homework.", bullets: ["Attendance Marking — Mark each student present or absent by session date", "Classwork Sheet — Structured per-session classwork log inside the classroom view", "Homework Review — Review student audio assignments with per-word/verse marks", "LLM Remarks Suggestion — Generate personalized feedback for teacher confirmation or editing"], caption: "Teacher dashboard — attendance, classwork, and AI-assisted homework feedback in one workflow." },
      { label: "02 · Student experience & audio submissions", headline: "Student Progress & Audio Assignment Submission", body: "Built the student-facing experience for assigned homework, voice recording or audio upload within the submission window, and long-term progress tracking.", bullets: ["Audio Submission — Record live or upload Quran recitation audio", "Time-framed Access — Enforce submission windows per assignment date and course", "Progress Dashboard — View attendance, marks, and course completion", "Guardian Transparency — Give parents visibility into progress and teacher feedback"], caption: "Student portal — voice-based homework submission, marks history, and live progress tracking." },
      { label: "03 · Operations, analytics & finance", headline: "Multi-Center Analytics & Operational Management", body: "Built the admin and manager layer for course batches, bulk student imports, enrollment tracking, cross-center analytics, staff salaries, and donations.", bullets: ["Bulk Student Import — Migrate Excel data through a BullMQ background process", "Cross-Center Analytics — Compare progress, attendance, and course completion", "Staff & Salary Management — Manage staff profiles and salary payments", "Donation Tracking — Record collections broken down per center"], caption: "Admin layer — bulk imports, real-time multi-center analytics, and full financial transparency." },
    ],
  },
  {
    slug: "buffalo-river-co", title: "Buffalo River & Co.", eyebrow: "CASE STUDY", tagline: "A custom Shopify app for variant-level product media and storefront galleries.", category: "Shopify app · full-stack", goal: "Make product imagery and video manageable at the variant level without requiring merchants to change theme code.", contribution: "Built galleries, masonry layouts, section configurations, Shopify Admin API and webhook sync, Cloudinary transformations, and an in-app editor for crop, resize, and preview workflows.", result: "Merchants can manage richer variant media and render it in storefront sections through a focused app workflow and Theme App Blocks.", features: [{ title: "Variant media", description: "Product and variant galleries support images and video in one workflow." }, { title: "Theme App Blocks", description: "Storefront sections render media without direct theme-code changes." }, { title: "Media pipeline", description: "Cloudinary transformations generate responsive image presets." }, { title: "Editor workflow", description: "Crop, resize, and preview tools keep media preparation in context." }], role: "Shopify app engineer", focus: "Shopify · media systems", delivery: "Custom app", techStack: ["Shopify Admin API", "React", "Node.js", "Express.js", "PostgreSQL", "Cloudinary", "Theme App Blocks"], period: "2024 – 2025", link: "https://buffaloriver.co",
  },
  {
    slug: "xychros-pre-launcher", title: "Xychros Pre-Launcher", eyebrow: "CASE STUDY", tagline: "A Shopify pre-launch waitlist and viral referral campaign app for product teams.", category: "Shopify app · full-stack", goal: "Help merchants collect pre-launch demand and turn referrals into configurable campaign rewards.", contribution: "Built referral tiers, reward products, landing pages, campaign states, Shopify billing, GraphQL and REST integrations, Klaviyo lead sync, notifications, customer tags, discount rewards, and campaign analytics.", result: "Merchants can run configurable pre-launch campaigns with referral tracking, rewards, lead synchronization, and analytics in one Shopify app.", features: [{ title: "Referral tracking", description: "Campaign referrals and tier progress are captured in the app flow." }, { title: "Reward tiers", description: "Merchants configure reward products and campaign states." }, { title: "Lead sync", description: "Klaviyo integration connects campaign activity to marketing workflows." }, { title: "Analytics", description: "A campaign dashboard gives teams visibility into pre-launch activity." }], role: "Shopify app engineer", focus: "Growth workflows · integrations", delivery: "Public Shopify app", techStack: ["Shopify Admin API", "React", "Node.js", "PostgreSQL", "Polaris", "Klaviyo"], period: "2023", link: "https://apps.myshopify.com/viral-launch",
  },
]

export const placeholderSlides: CaseStudySlide[] = [
  { label: "Primary product view", headline: "Product workflow", body: "Add a representative product screenshot here.", bullets: [], caption: "Add a representative product screenshot here." },
  { label: "Workflow detail", headline: "Workflow detail", body: "Add a focused workflow or dashboard screenshot here.", bullets: [], caption: "Add a focused workflow or dashboard screenshot here." },
  { label: "Storefront result", headline: "Storefront result", body: "Add the customer-facing result or storefront view here.", bullets: [], caption: "Add the customer-facing result or storefront view here." },
]

export function getCaseStudy(slug: string) { return caseStudies.find((study) => study.slug === slug) }
export function getRelatedStudies(slug: string) { return caseStudies.filter((study) => study.slug !== slug).slice(0, 2) }

export function getSlides(study: CaseStudy) { return study.slides ?? placeholderSlides }
