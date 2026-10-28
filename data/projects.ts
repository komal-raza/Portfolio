export type ProjectCategory = 'Shopify' | 'SaaS' | 'LMS' | 'Personal'

export const projectCategories: ProjectCategory[] = ['Shopify', 'SaaS', 'LMS', 'Personal']

export type ProjectScreens = {
  /** Folder inside public/ProjectImages. */
  folder: string
  /** Cover image, relative to the folder. */
  cover: string
  /** Optional second image for the hero/feature composition. */
  secondary?: string
  groupLabels?: Record<string, string>
  groupOrder?: string[]
}

export type Project = {
  slug: string
  name: string
  category: ProjectCategory
  featured: boolean
  /** Whether /projects/[slug] exists. Projects without screenshots link out instead. */
  caseStudy: boolean
  year?: string
  type: string
  role: string
  status?: string
  /** One line: what the client got / the problem it solves. */
  summary: string
  problem?: string
  solution?: string
  features: { title: string; text: string }[]
  portals?: { name: string; items: string }[]
  stack: string[]
  myRole?: string[]
  result?: string
  links?: { label: string; href: string }[]
  screens?: ProjectScreens
}

export const projects: Project[] = [
  {
    slug: 'quran-foundation-lms',
    name: 'Quran Foundation LMS',
    category: 'LMS',
    featured: true,
    caseStudy: true,
    year: '2026',
    type: 'Multi-tenant LMS, client project',
    role: 'Full-stack developer, team of two',
    status: 'Deployed on Vercel and Render',
    summary:
      'A multi-tenant learning management system that runs a Quran education organisation’s classes, homework marking, fees and reports across its centres.',
    problem:
      'The client teaches Quran and Islamic courses to all ages across several centres. Enrollment, attendance, classwork, fee collection, staff salaries and donations were kept on paper, and homework was marked word by word and rule by rule on printed sheets. Management needed one place to see every centre, and guardians needed to see their child’s progress.',
    solution:
      'One platform with a seven-level role hierarchy (Super Admin, Org Admin, Area Manager, Center Manager, Teacher, Guardian, Student) and a dedicated portal for each role. Curriculum is defined once and followed by every centre, teachers mark homework on screens that mirror the paper sheets, and slow work like guardian notifications and student imports runs in Redis-backed background jobs.',
    features: [
      {
        title: 'Role hierarchy and permissions',
        text: 'Seven roles from Super Admin down to Student, with roles and permissions managed from the Super Admin portal.',
      },
      {
        title: 'Homework marking that matches the paper sheets',
        text: 'Teachers evaluate recitation word by word and rule by rule, in the same structure as the client’s existing marking sheets.',
      },
      {
        title: 'Curriculum, classrooms and attendance',
        text: 'Courses and curriculum set centrally; centres schedule classrooms, split topics between teachers and take attendance per session.',
      },
      {
        title: 'Audio homework submission',
        text: 'Students submit recitation audio for each assignment and see marks and teacher remarks when they are recorded.',
      },
      {
        title: 'Finance and enrollment',
        text: 'Enrollment, fee collection, staff salaries and donations per centre, with cross-centre finance reports for the organisation.',
      },
      {
        title: 'Background jobs',
        text: 'Guardian notifications and bulk student import run on BullMQ and Redis, so large imports never block the interface.',
      },
    ],
    portals: [
      {
        name: 'Super Admin',
        items: 'Courses, curriculum, cross-centre reports, finances, bulk student import, roles and permissions.',
      },
      {
        name: 'Center Manager',
        items: 'Classrooms, enrollment, fee collection, teacher topic split, staff, salaries and donations.',
      },
      { name: 'Teacher', items: 'Sessions, attendance, classwork and homework marking.' },
      { name: 'Student', items: 'Classes, attendance, course progress, audio submission, marks and remarks.' },
      { name: 'Guardian', items: 'Course-wise and daily progress for each child.' },
    ],
    stack: ['React', 'Tailwind CSS', 'TanStack Query', 'Express.js', 'Knex.js', 'PostgreSQL', 'Redis', 'BullMQ', 'Docker', 'Vercel', 'Render'],
    myRole: [
      'Joined after the team lead had set up authentication and the role-based access foundation, and integrated those auth APIs into the frontend.',
      'Built course and curriculum management, classroom and attendance management, and audio homework submission.',
      'Built the BullMQ and Redis bulk student import pipeline.',
      'Built the staff salary and donation modules and the cross-centre reporting dashboard.',
    ],
    result:
      'The organisation’s centres run enrollment, attendance, homework marking and finance in one system instead of paper registers. Teachers can mark audio homework outside class hours, and guardians see progress as it is recorded.',
    screens: {
      folder: 'quranfoundation-lms',
      cover: 'admin-portal/admin-home.png',
      secondary: 'manager-portal/manager-enrollments.png',
      groupLabels: {
        'admin-portal': 'Super Admin portal',
        'manager-portal': 'Center Manager portal',
        'teacher-portal': 'Teacher portal',
        'student-portal': 'Student portal',
      },
      groupOrder: ['admin-portal', 'manager-portal', 'teacher-portal', 'student-portal'],
    },
  },
  {
    slug: 'xychros-pre-launcher',
    name: 'Xychros Pre-Launcher',
    category: 'Shopify',
    featured: true,
    caseStudy: true,
    year: '2023',
    type: 'Public Shopify app',
    role: 'Full-stack Shopify app developer, team of four',
    status: 'Live on the Shopify App Store',
    summary:
      'A Shopify app that lets merchants collect a waitlist and run viral referral campaigns before a product goes live.',
    problem:
      'Shopify gives merchants no built-in way to build demand before a launch: no waitlist page, no referral rewards and no view of which customers are spreading the word.',
    solution:
      'A self-serve app inside Shopify admin where merchants create pre-launch campaigns with a landing page, unique referral links and reward tiers. Rewards are issued as Shopify discounts, leads sync to Klaviyo, and plans are billed through Shopify.',
    features: [
      {
        title: 'Campaign builder',
        text: 'Merchants create, configure and switch pre-launch campaigns between draft and active, with landing page templates and banners.',
      },
      {
        title: 'Referral tracking and reward tiers',
        text: 'Each signup gets a referral link. Milestone tiers issue Shopify discount codes, with global and per-campaign tier rules.',
      },
      {
        title: 'Tier-based subscriptions',
        text: 'Plans and add-ons through the Shopify Billing API, with subscription state stored in PostgreSQL to gate premium features.',
      },
      {
        title: 'Shopify rewards and Klaviyo',
        text: 'Discounts and customer segments created through the Admin API; captured leads flow into Klaviyo for email follow-up.',
      },
      {
        title: 'Analytics dashboard',
        text: 'Campaign, referral, click and revenue views in Polaris, with light and dark mode.',
      },
    ],
    stack: ['React.js', 'Shopify Polaris', 'Node.js', 'Express.js', 'PostgreSQL', 'Shopify Admin API', 'Shopify Billing API', 'Klaviyo'],
    myRole: [
      'Owned the merchant-facing campaign management experience.',
      'Built the subscription billing end to end, including the plan and feature-access rules.',
      'Built referral tier settings supporting both global and campaign-specific rules.',
      'Built the Klaviyo integration hub and the campaign analytics dashboard.',
    ],
    result: 'Shipped as a public app on the Shopify App Store under Xychros Technologies LLC.',
    links: [{ label: 'Shopify App Store listing', href: 'https://apps.shopify.com/viral-launch' }],
    screens: {
      folder: 'xychros-launch-your-product',
      cover: 'viral-app.png',
      secondary: 'viral-app2.png',
    },
  },
  {
    slug: 'buffalo-river-co',
    name: 'Buffalo River Co.',
    category: 'Shopify',
    featured: true,
    caseStudy: true,
    year: '2024 to 2025',
    type: 'Private custom Shopify app',
    role: 'Shopify full-stack app developer, team of three',
    status: 'Private app for one merchant',
    summary:
      'A custom Shopify app that gives every product variant its own images and video, managed by non-technical staff from one dashboard.',
    problem:
      'Shopify allows one featured image per variant. The merchant needed several images and videos per variant, different media rules for different theme sections, and a way for staff to manage all of it without editing Liquid code.',
    solution:
      'An embedded app that stores media in Cloudinary, maps it to products, variants, collections, theme sections and blog posts, and renders it on the storefront through Theme App Blocks that staff add in the theme editor.',
    features: [
      {
        title: 'Variant-level multi-image and video',
        text: 'Images and videos mapped to exact variant option combinations, with Admin API calls throttled to stay inside rate limits.',
      },
      {
        title: 'Section-based media logic',
        text: 'Named galleries tied to storefront section types such as masonry, slideshow and blog templates.',
      },
      {
        title: 'Cloudinary integration',
        text: 'Uploads go straight to Cloudinary, with transformation rules for breakpoints, crop modes, aspect ratios and output format per resource type.',
      },
      {
        title: 'Blog and article media',
        text: 'The same media management and transformation rules extended to blog hero images and article content.',
      },
      {
        title: 'Theme App Blocks',
        text: 'Storefront rendering through app blocks, so non-technical merchants place and change media without touching theme code.',
      },
    ],
    stack: ['React.js', 'Shopify Polaris', 'Node.js', 'Express.js', 'PostgreSQL', 'Cloudinary', 'Shopify Admin API (GraphQL and REST)', 'Webhooks'],
    myRole: [
      'Designed the relational database schema and built the REST API.',
      'Built the Shopify Admin API integrations (GraphQL and REST) and webhook handlers.',
      'Built the Cloudinary transformation rules, gallery manager, media editor and variant mapping UI.',
      'Built the React and Polaris frontend from the client’s design reference.',
    ],
    result:
      'Merchant staff manage variant, gallery, section and blog media from one dashboard without touching theme code.',
    links: [{ label: 'Merchant storefront', href: 'https://buffaloriver.co' }],
    screens: {
      folder: 'buffalo-river-co',
      cover: '4-productVariantDetailPage.png',
      secondary: '5-GalleryListiPage.png',
    },
  },
  {
    slug: 'library-management-saas',
    name: 'Library Management SaaS',
    category: 'SaaS',
    featured: true,
    caseStudy: true,
    year: '2024 to present',
    type: 'Multi-tenant SaaS platform',
    role: 'Full-stack engineer',
    summary:
      'A multi-tenant platform where every library gets its own subdomain, automatic fines and reminders, and Stripe payments.',
    problem:
      'Each library needed its own workspace for catalogue, members, staff, bookings and payments, kept fully separate from every other library, without staff chasing overdue returns by hand.',
    solution:
      'A multi-tenant SaaS with custom subdomain isolation per library. Daily fines and return reminders run on cron, notifications and bulk catalogue uploads run on BullMQ and Redis, and Stripe Connect splits payments between the platform and each library.',
    features: [
      {
        title: 'Subdomain isolation per library',
        text: 'Each library works on its own subdomain with tenant-scoped data access.',
      },
      {
        title: 'Automated fines and reminders',
        text: 'Cron jobs calculate daily fines and send return reminders without staff involvement.',
      },
      {
        title: 'Queued notifications and bulk uploads',
        text: 'BullMQ and Redis handle notifications and CSV/XLSX bulk uploads in the background.',
      },
      {
        title: 'Stripe Connect payments',
        text: 'Split payments between the platform and each library, plus subscriptions for libraries themselves.',
      },
      {
        title: 'Themed frontend',
        text: 'A TanStack Query frontend with dynamic themes, so each library’s public pages carry its own look.',
      },
    ],
    stack: ['React', 'TanStack Query', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Redis', 'BullMQ', 'Stripe Connect'],
    myRole: [
      'Built the React and Node.js product surface and tenant-aware data flows.',
      'Built booking operations, scheduled jobs, bulk imports and notifications.',
      'Built the Stripe Connect payment and subscription workflows.',
    ],
    result:
      'Libraries manage catalogue and bookings from an isolated workspace, with fines and reminders automated and imports and notifications processed in the background.',
    links: [{ label: 'Live site', href: 'https://my-books-library-client.vercel.app/' }],
    screens: {
      folder: 'leoatech-library-app',
      cover: 'admin-home.png',
      secondary: 'admin-bookings.png',
    },
  },
  {
    slug: 'agent-skills-manager',
    name: 'Agentic Skills Manager',
    category: 'Personal',
    featured: false,
    caseStudy: true,
    type: 'Personal project',
    role: 'Solo: design, frontend and backend',
    status: 'Deployed on Vercel',
    summary:
      'A place for developers to add, share or keep private the Skills.md instruction files they give coding agents.',
    features: [
      {
        title: 'Public and private skills',
        text: 'Users add Skills.md instruction files and choose whether each one is shared or kept private.',
      },
      {
        title: 'Cookie-based auth',
        text: 'Authentication with httpOnly cookies.',
      },
      {
        title: 'Incremental static regeneration',
        text: 'Public pages are served with ISR on Vercel.',
      },
      {
        title: 'Prisma on Neon Postgres',
        text: 'Typed data access with Prisma against a serverless Neon Postgres database.',
      },
    ],
    stack: ['Next.js', 'TypeScript', 'Prisma', 'Neon Postgres', 'Vercel'],
    links: [
      { label: 'Live site', href: 'https://nextjs-agent-skills-manager.vercel.app' },
      { label: 'Source on GitHub', href: 'https://github.com/komal-raza/nextjs-agent-skills-manager' },
    ],
    screens: {
      folder: 'agent-skills-manager',
      cover: 'dashboard.png',
    },
  },
  {
    slug: 'eluara-ecommerce-app',
    name: 'Eluara e-commerce app',
    category: 'Personal',
    featured: false,
    caseStudy: true,
    type: 'Personal project',
    role: 'Solo',
    summary: 'An e-commerce storefront with a product-management dashboard.',
    features: [
      {
        title: 'Product-management dashboard',
        text: 'Admin screens to list, add and edit products, including drag-and-drop image upload and storefront settings.',
      },
      {
        title: 'Storefront and checkout',
        text: 'Collections, product detail pages, cart and a Stripe checkout flow, with mobile layouts for each step.',
      },
    ],
    stack: ['Next.js', 'TypeScript', 'Stripe'],
    links: [
      { label: 'Live site', href: 'https://eluara.insforge.site' },
      {
        label: 'Source on GitHub',
        href: 'https://github.com/komal-raza/nextjs-ecommerce-website/tree/main',
      },
    ],
    screens: {
      folder: 'Eluara-ecommerce-app',
      cover: 'HeroSection.png',
    },
  },
  {
    slug: 'portfolio',
    name: 'This portfolio',
    category: 'Personal',
    featured: false,
    caseStudy: false,
    type: 'Personal project',
    role: 'Solo',
    summary: 'This site. Case study galleries are generated at build time from the screenshot folders in the repo.',
    features: [],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    links: [{ label: 'Source on GitHub', href: 'https://github.com/komal-raza/Portfolio' }],
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
export const personalProjects = projects.filter((project) => project.category === 'Personal')
export const caseStudies = projects.filter((project) => project.caseStudy)

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export function getNextCaseStudy(slug: string) {
  const index = caseStudies.findIndex((project) => project.slug === slug)
  return caseStudies[(index + 1) % caseStudies.length]
}

export function projectHref(project: Project) {
  return project.caseStudy ? `/projects/${project.slug}` : project.links?.[0]?.href ?? '/projects'
}

