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
    slug: "buffalo-river-co",
    title: "Buffalo River Co.",
    eyebrow: "CASE STUDY",
    tagline: "A custom Shopify app that breaks past Shopify's native media limits — giving merchants full control over multi-image and video assignments across products, variants, collections, sections, and blogs.",
    category: "Shopify App Development",
    goal: "Shopify natively supports only a single featured image per product variant. The goal was to build one embedded dashboard for product images, variant-specific assets, gallery groups, section media, and blog imagery, all delivered through Cloudinary's transformation pipeline.",
    contribution: "Architected and built the full-stack application end-to-end: relational database schema, REST API endpoints, Shopify Admin API integrations across GraphQL and REST, webhook handlers, Cloudinary transformation rules, Gallery Manager, Media Editor, variant mapping UI, and transformation settings. Built the React and Polaris frontend from a client-provided design reference.",
    result: "Merchants can manage storefront media from one unified dashboard without touching Liquid theme code. Variant-specific image and video assignments, gallery composition, section-level rules, and editorial media optimization are controlled through the app with device-optimized delivery.",
    features: [
      { title: "Variant Media Mapping Engine", description: "Maps images and videos to specific product variant option combinations with throttled GraphQL API calls to stay within rate limits." },
      { title: "Cloudinary Transformation Rule Builder", description: "Configures responsive breakpoints, crop modes, aspect ratios, and output formats per resource type — products, collections, and theme sections." },
      { title: "Multi-Media Gallery & Masonry Engine", description: "Manages named gallery groups linked to storefront section types such as Masonry, Slideshow, and Blog templates through transactional database writes." },
      { title: "Blog & Article Media Optimization", description: "Extends Cloudinary transformation and context metadata tracking to Shopify blog posts and articles, including hero banners and body assets." },
      { title: "Media Asset Registry", description: "Links every uploaded Cloudinary asset to its Shopify GID across Products, ProductVariants, and Articles with display-name editing and media classification." },
      { title: "Theme Section Integration Layer", description: "Discovers active theme JSON section types and renders gallery assets non-destructively through Shopify App Blocks." },
    ],
    role: "Shopify Full Stack App Developer",
    focus: "Backend architecture, REST API, Shopify Admin API, Cloudinary pipeline, React/Polaris frontend",
    delivery: "Collaborative — team of 3",
    techStack: ["React.js", "Shopify Polaris", "Node.js", "Express.js", "Shopify Admin API (GraphQL / REST)", "Shopify Webhooks", "PostgreSQL", "Cloudinary"],
    period: "2024 – 2025",
    link: "https://buffaloriver.co",
    slides: [
      { label: "01 · App onboarding", headline: "App Onboarding & Entry Point", body: "The app's home screen inside Shopify Admin greets merchants with a clear three-path onboarding flow so they can immediately navigate to the workflow that matters for their store.", bullets: ["Add Images to Products", "Add Images to Variants", "Create Galleries"], caption: "Image placeholder — replace with 1-home.png when the asset is available." },
      { label: "02 · Product catalog", headline: "Searchable Product Catalog", body: "The Products view pulls the merchant's Shopify catalog with variant counts surfaced per row, giving a quick overview of media complexity before drilling into a product.", bullets: ["Searchable catalog", "Variant counts per row", "Responsive mobile view"], caption: "Image placeholder — replace with 2-productListing.png or Product-mob.png when the asset is available." },
      { label: "03 · Product media", headline: "Product-Level Multi-Image Management", body: "Inside a product, merchants upload and manage additional images with per-asset controls, then see the full variant list to map specific media to specific options.", bullets: ["Per-asset edit and delete", "Product image bank", "Variant list for mapping"], caption: "Image placeholder — replace with 3-ProductDetailPage.png or mob-productDetail.png when the asset is available." },
      { label: "04 · Variant mapping", headline: "Variant-Level Media Mapping", body: "Merchants select a specific variant combination and assign dedicated media to that exact option pairing, bypassing Shopify's single featured image limit per variant.", bullets: ["Option-combination selector", "Dedicated variant media", "Image and video support"], caption: "Image placeholder — replace with 4-productVariantDetailPage.png when the asset is available." },
      { label: "05 · Galleries", headline: "Gallery Manager & Cloudinary Upload", body: "The Gallery view combines an asset pool uploaded directly to Cloudinary with named gallery lists tied to storefront section types such as Masonry, Slideshow, or Blog templates.", bullets: ["Images and videos gallery", "Named gallery groups", "Section-specific associations"], caption: "Image placeholder — replace with 5-GalleryListiPage.png when the asset is available." },
      { label: "06 · Asset registry", headline: "Media Asset Editor — Linked Object Registry", body: "The media table exposes every uploaded asset with its display name, public ID, media type, and exact Shopify GID for traceability across the merchant's media graph.", bullets: ["Products", "ProductVariants", "Articles"], caption: "Image placeholder — replace with 7-EditMediaAssetsAssociatedWithProductVariant.png when the asset is available." },
      { label: "07 · Blogs", headline: "Blog & Article Management", body: "The Blogs & Blog Posts section provides the entry point for extending Cloudinary media optimization to editorial content such as hero banners and article body images.", bullets: ["Blog listing", "Comment status", "Last-updated timestamps"], caption: "Image placeholder — replace with 8-ManageBlogs.png when the asset is available." },
      { label: "08 · Transformations", headline: "Cloudinary Transformation Rule Engine", body: "Merchants configure transformation modes, aspect ratios, responsive breakpoints, output formats, and whether rules apply to existing media or new uploads.", bullets: ["Products and collections", "Responsive breakpoints", "JPEG, PNG, or Auto output"], caption: "Image placeholder — replace with 11-ManageProductAndCollectionsTransformations.png when the asset is available." },
      { label: "09 · Sections", headline: "Section-Based Transformation Rules", body: "A dedicated Sections Transformation table configures per-breakpoint Cloudinary transformation strings for each storefront section type.", bullets: ["Crop and gravity", "Fetch format", "Aspect ratio rules"], caption: "Image placeholder — replace with 12-ManageSectionMediaTransformations.png when the asset is available." },
    ],
  },
  {
    slug: "xychros-pre-launcher",
    title: "Launch Your Product",
    eyebrow: "CASE STUDY",
    tagline: "A public Shopify app that lets merchants build pre-launch waitlists and viral referral campaigns — driving organic customer acquisition before a product ever goes live.",
    category: "Shopify SaaS · Public App",
    goal: "Most Shopify merchants have no native way to build excitement before a product launch. Launch Your Product gives merchants a self-serve dashboard to create pre-launch waitlist campaigns with viral referral loops, reward milestones, and automated discount fulfillment inside Shopify.",
    contribution: "Owned the SaaS billing infrastructure end-to-end, integrating the Shopify Billing API for Free, Starter, Pro, and Enterprise plans plus an optional phone-collection add-on. Also built Polaris-based merchant UI, campaign management screens, and analytics views with React, Redux Toolkit, and React Query.",
    result: "The app shipped as a live, publicly listed Shopify App Store product under Xychros Technologies LLC. Native Shopify plan management lets the product operate as a sustainable SaaS without handling raw payment credentials or third-party gateways.",
    features: [
      { title: "Viral Campaign Builder", description: "No-code dashboard to create, configure, and toggle pre-launch campaigns with customizable hero banners, landing page templates, and draft or active states." },
      { title: "Tiered Reward Engine", description: "Referral milestone tiers map thresholds such as 5, 10, and 15 referrals to unique Shopify discount codes, with customer segments created through the GraphQL Admin API." },
      { title: "SaaS Billing Integration", description: "Native Shopify Billing API implementation for Free, Starter, Pro, and Enterprise plans plus add-ons, with subscription state persisted in PostgreSQL." },
      { title: "Revenue Attribution Dashboard", description: "React Query-powered Polaris views aggregate campaign KPIs, referral conversions, click logs, and revenue attribution for merchants." },
    ],
    role: "Full Stack Shopify App Developer",
    focus: "SaaS Billing Infrastructure · Merchant Dashboard UI · Analytics Views · Campaign Management Frontend",
    delivery: "Team of 4 — Team Lead, Backend Intern, Shopify Frontend Developer, and myself",
    techStack: ["React.js", "Redux Toolkit", "React Query", "Custom CSS", "Node.js", "Express.js", "PostgreSQL", "Shopify Admin API", "Shopify Billing API", "Shopify Webhooks", "Shopify Polaris", "Klaviyo", "Nodemailer"],
    period: "2023",
    link: "https://apps.shopify.com/viral-launch",
    slides: [
      { label: "01 · Public listing", headline: "Live Shopify App Store Listing", body: "The app's public Shopify App Store listing shows the Viral Launch brand, free-plan availability, and a preview of the merchant analytics dashboard under Xychros Technologies LLC.", bullets: ["Public Shopify app", "Free-plan availability", "Merchant analytics preview"], caption: "Image placeholder — replace with virallaunch1.jpeg when the asset is available." },
      { label: "02 · Analytics", headline: "Merchant Home Dashboard", body: "The merchant dashboard brings campaign performance into one view, with KPI summaries for campaigns, referrals, revenue, and clicks, followed by trend visualizations and product-level pre-launch revenue insights.", bullets: ["Campaigns", "Referrals", "Revenue and clicks", "Six-month trends"], caption: "Image placeholder — replace with viral-app.png when the asset is available." },
      { label: "03 · Campaign builder", headline: "New Campaign & Rewards Settings", body: "Merchants configure discount type and create up to four referral reward tiers, each with a threshold and unique discount code such as 05OFF or 10OFF.", bullets: ["Percentage or dollar discount", "Up to four reward tiers", "Referral threshold and discount code"], caption: "Image placeholder — replace with viral-app2.png when the asset is available." },
      { label: "04 · Full loop", headline: "Merchant-to-Customer Referral Loop", body: "A composite view connects the campaign list, creation form, and live storefront landing page with referral links, social sharing, milestone progress, and reward gift cards.", bullets: ["Campaign list and controls", "Unique referral link", "Social share buttons", "5 → 10 → 15 friend milestones"], caption: "Image placeholder — replace with viral-launch.png when the asset is available." },
    ],
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
