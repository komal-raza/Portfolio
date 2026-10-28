export type Service = {
  slug: string
  title: string
  navLabel: string
  /** One sentence for rows and cards. */
  summary: string
  /** Three headline deliverables for the Home rows. */
  highlights: [string, string, string]
  metaDescription: string
  whoFor: string[]
  deliverables: { title: string; text: string }[]
  howItWorks: { title: string; text: string }[]
  tech: string[]
  relatedProjects: string[]
}

export const services: Service[] = [
  {
    slug: 'shopify-app-development',
    title: 'Shopify app development',
    navLabel: 'Shopify apps',
    summary:
      'Public and custom Shopify apps that merchants run from inside their admin, with billing, webhooks and theme app blocks built in.',
    highlights: ['Embedded Polaris admin UI', 'Shopify Billing API plans', 'Theme app blocks for the storefront'],
    metaDescription:
      'Public and custom Shopify app development: Admin API (REST and GraphQL), webhooks, Polaris UI, Shopify Billing and theme app blocks.',
    whoFor: [
      'Founders who want to launch a public app on the Shopify App Store.',
      'Merchants and agencies who need a private custom app for something the theme or existing apps cannot do.',
      'Teams with an existing app that needs billing, a rebuilt admin UI or more reliable webhooks.',
    ],
    deliverables: [
      {
        title: 'Embedded admin app',
        text: 'A React and Polaris interface inside Shopify admin, using App Bridge, that matches how merchants already work.',
      },
      {
        title: 'Admin API integration',
        text: 'Products, variants, collections, discounts, customer segments and blog content through the REST and GraphQL Admin APIs, with rate limits handled.',
      },
      {
        title: 'Webhooks and sync',
        text: 'Webhook handlers that keep your database in step with the store, including app uninstall and data cleanup.',
      },
      {
        title: 'Billing',
        text: 'Plans, add-ons and feature gating through the Shopify Billing API, with subscription state stored on your side.',
      },
      {
        title: 'Theme app blocks',
        text: 'Storefront blocks merchants add in the theme editor, so nobody edits Liquid code to use your app.',
      },
    ],
    howItWorks: [
      {
        title: 'Scope the merchant workflow',
        text: 'We agree on what the merchant does in the app, which store data it touches and which plans it needs.',
      },
      {
        title: 'Build against a development store',
        text: 'You get a dev store install to click through while I build the backend, admin UI and storefront pieces.',
      },
      {
        title: 'Review and release',
        text: 'I prepare the app for Shopify review (public apps) or install it on your store (custom apps).',
      },
    ],
    tech: [
      'React',
      'Shopify Polaris',
      'Shopify App Bridge',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Shopify Admin API (REST and GraphQL)',
      'Shopify Billing API',
      'Webhooks',
    ],
    relatedProjects: ['xychros-pre-launcher', 'buffalo-river-co'],
  },
  {
    slug: 'saas-development',
    title: 'Multi-tenant SaaS development',
    navLabel: 'Multi-tenant SaaS',
    summary:
      'SaaS platforms where every customer gets an isolated workspace, with role-based access, subscriptions and background jobs.',
    highlights: ['Tenant isolation by subdomain', 'Role-based access control', 'Stripe subscriptions and payouts'],
    metaDescription:
      'Multi-tenant SaaS development: tenant isolation, role-based access, Stripe subscriptions and Stripe Connect, background jobs with BullMQ and Redis.',
    whoFor: [
      'Founders turning a service or internal tool into a product other businesses subscribe to.',
      'Companies with one deployment per customer who want a single multi-tenant platform.',
      'Teams that need roles, permissions and billing added to an existing product.',
    ],
    deliverables: [
      {
        title: 'Tenant architecture',
        text: 'Data isolation per tenant, custom subdomains and tenant-aware queries designed into the PostgreSQL schema.',
      },
      {
        title: 'Roles and permissions',
        text: 'Role hierarchies and permission checks enforced in the API, with admin screens to manage them.',
      },
      {
        title: 'Subscriptions and payments',
        text: 'Stripe subscriptions for your customers and Stripe Connect when payments are split between you and them.',
      },
      {
        title: 'Background jobs',
        text: 'BullMQ and Redis queues plus cron jobs for reminders, notifications, scheduled charges and bulk imports.',
      },
      {
        title: 'Admin and customer dashboards',
        text: 'React dashboards with TanStack Query, themed per tenant where the product needs it.',
      },
    ],
    howItWorks: [
      {
        title: 'Map tenants, roles and money',
        text: 'Who signs up, who works inside a tenant, who pays whom. This becomes the schema and permission model.',
      },
      {
        title: 'Build the core loop first',
        text: 'The one workflow your customers pay for ships first on staging, then billing and automation around it.',
      },
      {
        title: 'Deploy and onboard',
        text: 'Production setup, the first tenants onboarded, and jobs monitored once real data flows through.',
      },
    ],
    tech: ['React', 'TanStack Query', 'Tailwind CSS', 'Node.js', 'Express.js', 'PostgreSQL', 'Redis', 'BullMQ', 'Stripe', 'Stripe Connect'],
    relatedProjects: ['library-management-saas', 'quran-foundation-lms'],
  },
  {
    slug: 'lms-edtech-platforms',
    title: 'LMS and EdTech platforms',
    navLabel: 'LMS and EdTech',
    summary:
      'Learning management systems with separate portals for admins, teachers, students and guardians, built around how your institution teaches.',
    highlights: ['Portals for every role', 'Attendance, homework and marking', 'Fees, salaries and reports'],
    metaDescription:
      'LMS and EdTech platform development: multi-centre organisations, role-based portals, curriculum, scheduling, attendance, homework marking, fees and reporting.',
    whoFor: [
      'Schools, academies and education organisations running several centres or branches.',
      'Institutions moving attendance, homework and fee records off paper and spreadsheets.',
      'EdTech founders who need an LMS shaped around a specific teaching method.',
    ],
    deliverables: [
      {
        title: 'Role-based portals',
        text: 'Separate experiences for super admins, centre managers, teachers, students and guardians, each showing only what that role needs.',
      },
      {
        title: 'Curriculum and classrooms',
        text: 'Courses, curriculum, topics, classroom scheduling and teacher assignment across centres.',
      },
      {
        title: 'Attendance and homework',
        text: 'Session attendance, classwork, homework submission (including audio) and marking screens that follow your existing sheets.',
      },
      {
        title: 'Finance and enrollment',
        text: 'Enrollment, fee collection, staff salaries and donations, with reports across centres.',
      },
      {
        title: 'Notifications and imports',
        text: 'Guardian notifications and bulk student imports from spreadsheets, run as background jobs.',
      },
    ],
    howItWorks: [
      {
        title: 'Sit with the paper process',
        text: 'I go through your registers, marking sheets and fee records to understand what each role does today.',
      },
      {
        title: 'Build role by role',
        text: 'Admin and setup screens first, then teacher, student and guardian portals, each reviewed by the people who will use it.',
      },
      {
        title: 'Migrate and go live',
        text: 'Existing student data is imported in bulk, and centres switch over with real classes.',
      },
    ],
    tech: ['React', 'Tailwind CSS', 'TanStack Query', 'Node.js', 'Express.js', 'Knex.js', 'PostgreSQL', 'Redis', 'BullMQ', 'Docker'],
    relatedProjects: ['quran-foundation-lms', 'library-management-saas'],
  },
  {
    slug: 'backend-integrations',
    title: 'Backend and integrations',
    navLabel: 'Backend and integrations',
    summary:
      'APIs, payment flows, queues and third-party integrations added to the product you already have.',
    highlights: ['Stripe and Stripe Connect', 'Klaviyo and marketing sync', 'Queues, cron jobs and bulk imports'],
    metaDescription:
      'Backend and integration work: Stripe and Stripe Connect payments, Klaviyo, Cloudinary, webhooks, BullMQ and Redis queues, cron automation and bulk CSV/XLSX imports.',
    whoFor: [
      'Teams with a working product that needs payments, a marketing integration or automation added.',
      'Products where slow tasks (emails, imports, reports) are blocking requests or failing silently.',
      'Agencies who need a Node.js and PostgreSQL backend behind a frontend they already built.',
    ],
    deliverables: [
      {
        title: 'Payments',
        text: 'Stripe checkout, subscriptions and webhooks, and Stripe Connect for marketplaces and split payments.',
      },
      {
        title: 'Marketing and media integrations',
        text: 'Klaviyo lead sync, Cloudinary upload and transformation pipelines, and other REST or GraphQL APIs.',
      },
      {
        title: 'Queues and automation',
        text: 'BullMQ and Redis job queues with retries, and cron jobs for daily fines, reminders and scheduled tasks.',
      },
      {
        title: 'Bulk imports',
        text: 'CSV and XLSX imports processed in the background, with validation and a clear result for each row.',
      },
      {
        title: 'API design',
        text: 'Express.js REST APIs on PostgreSQL with input validation and documented endpoints.',
      },
    ],
    howItWorks: [
      {
        title: 'Review the current system',
        text: 'I read your codebase and data model and agree with you on exactly where the new piece plugs in.',
      },
      {
        title: 'Build behind a flag or on staging',
        text: 'The integration is built and tested against sandbox accounts (Stripe test mode, Klaviyo test lists) first.',
      },
      {
        title: 'Switch on and monitor',
        text: 'I enable it in production and watch the first real webhooks, jobs and payments go through.',
      },
    ],
    tech: ['Node.js', 'Express.js', 'PostgreSQL', 'Redis', 'BullMQ', 'Cron jobs', 'Stripe', 'Stripe Connect', 'Klaviyo', 'Cloudinary', 'Webhooks'],
    relatedProjects: ['library-management-saas', 'buffalo-river-co', 'xychros-pre-launcher'],
  },
]

export function getService(slug: string) {
  return services.find((service) => service.slug === slug)
}

