export type NavItem = { label: string; href: string }

export type TimelineEntry = {
  org: string
  role: string
  period: string
  location?: string
  details?: { role: string; period: string; summary: string }[]
  summary?: string
}

export const site = {
  name: 'Komal Raza',
  role: 'Full-Stack Engineer',
  shortRole: 'Full-Stack Engineer · SaaS · Shopify Apps',
  location: 'Remote, Pakistan',
  email: 'razaa.komal@gmail.com',
  github: 'https://github.com/komal-raza',
  linkedin: 'https://www.linkedin.com/in/komal-raza',
  repo: 'https://github.com/komal-raza/Portfolio',
  description:
    'I build Shopify apps, multi-tenant SaaS platforms and LMS products with React, Node.js and PostgreSQL. Freelance and contract projects, working remotely from Pakistan.',
  tagline: 'Shopify apps, multi-tenant SaaS and LMS platforms, built end to end.',

  hero: {
    chip: 'Full-Stack Engineer · SaaS · Shopify Apps',
    title: 'Building ideas into scalable digital products',
    subhead:
      'I design and build Shopify apps, multi-tenant SaaS platforms and learning management systems, from database schema to the last dashboard screen. Founders, agencies and merchants bring me a workflow; I hand back a product their team and customers can use every day.',
  },

  cta: {
    label: 'Start Project',
    href: '/contact',
    bandTitle: 'Have a project in mind?',
    bandText:
      'Tell me what you want to build. I will reply by email with questions or a short plan for next steps.',
  },

  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Resume', href: '/resume' },
    { label: 'Contact', href: '/contact' },
  ] satisfies NavItem[],

  /** Steps shown in "How I work". The only numbered section on the site. */
  process: [
    {
      title: 'Discover',
      text: 'We walk through your users, roles and the workflow you run today, and I write it up as a short scope you can approve.',
    },
    {
      title: 'Design',
      text: 'I plan the data model, permissions and screens before writing features, so changes are cheap while they are still on paper.',
    },
    {
      title: 'Build',
      text: 'I ship in small increments to a staging URL you can click through, with the backend, frontend and integrations built together.',
    },
    {
      title: 'Launch',
      text: 'I handle deployment, environment setup and App Store or production release, and walk your team through the finished product.',
    },
    {
      title: 'Support',
      text: 'After launch I fix issues, watch background jobs and webhooks, and add the next features as your users ask for them.',
    },
  ],

  stack: [
    {
      group: 'Frontend',
      items: [
        'React',
        'Next.js',
        'TypeScript',
        'JavaScript',
        'Tailwind CSS',
        'Shopify Polaris',
        'TanStack Query',
        'React Router',
        'Shopify App Bridge',
        'Vite',
        'HTML & CSS',
      ],
    },
    {
      group: 'Backend',
      items: [
        'Node.js',
        'Express.js',
        'PostgreSQL',
        'Knex.js',
        'Prisma',
        'Redis',
        'BullMQ',
        'SQL',
        'Cron Jobs',
      ],
    },
    {
      group: 'Payments and APIs',
      items: [
        'Shopify Admin API',
        'GraphQL & REST APIs',
        'Shopify Billing API',
        'Webhooks',
        'Stripe',
        'Stripe Connect',
        'Cloudinary',
        'Klaviyo',
      ],
    },
    {
      group: 'Tools & Engineering',
      items: [
        'Git',
        'GitHub',
        'Docker',
        'Postman',
        'Linux',
        'Vercel',
        'Render',
      ],
    },
  ],

  about: {
    intro:
      'I am a full-stack engineer who builds Shopify apps, multi-tenant SaaS platforms and learning management systems.',
    story: [
      'I studied computer science at the University of Narowal, then started my career in 2022 with two front-end internships, building React interfaces from designs at Precise Tech and DocSoft.ai.',
      'In January 2023 I joined LeoaTech full time. I started on React interfaces for a public Shopify app, then moved into backend and API work, and today I own features end to end: database design, APIs, background jobs, billing and the screens people use.',
      'Most of what I build is software that runs a business process: a merchant setting up a referral campaign, a library charging fines automatically, a Quran education centre marking homework the same way its teachers did on paper. I like turning those workflows into products that hold up once real people start using them.',
    ],
    principles: [
      {
        title: 'Model the business first',
        text: 'Roles, tenants and money flows go into the schema before any screen is built. Most bugs I prevent are decided there.',
      },
      {
        title: 'Match how people already work',
        text: 'The Quran Foundation marking screens follow the paper sheets teachers already used, so teachers mark the way they already did.',
      },
      {
        title: 'Move slow work to the background',
        text: 'Imports, notifications and reminders run as queued jobs with retries, so the interface stays fast and nothing is silently lost.',
      },
      {
        title: 'Hand over something non-developers can run',
        text: 'Theme app blocks, admin settings and clear dashboards mean merchants and admins change things without calling me.',
      },
    ],
  },

  education: {
    degree: 'BS Computer Science',
    school: 'University of Narowal',
    period: '2017 to 2021',
  },

  timeline: [
    {
      org: 'LeoaTech',
      role: 'Senior Full Stack Engineer',
      period: 'Jan 2023 to present',
      location: 'Remote, full-time',
      details: [
        {
          role: 'Senior Full Stack Software Engineer',
          period: 'Jan 2025 to present',
          summary:
            'Leading full-stack work on Shopify apps and SaaS platforms, including Stripe subscription billing for a multi-tenant library platform and the Quran Foundation LMS, with Redis and BullMQ for reminders, notifications and bulk imports.',
        },
        {
          role: 'Full-stack Developer',
          period: 'Dec 2023 to Dec 2024',
          summary:
            'Took ownership of backend and database work alongside the UI. Built the Buffalo River Co. custom Shopify media app with Cloudinary-based image delivery.',
        },
        {
          role: 'Frontend Developer',
          period: 'Jan 2023 to Nov 2023',
          summary:
            'Built React interfaces from Figma designs, then moved into backend and API work on the Xychros Pre-Launcher Shopify app.',
        },
      ],
    },
    {
      org: 'DocSoft.ai',
      role: 'Front End Developer Intern',
      period: 'Aug 2022 to Dec 2022',
    },
    {
      org: 'Precise Tech',
      role: 'React.js Developer Intern',
      period: 'Apr 2022 to Jul 2022',
    },
  ] satisfies TimelineEntry[],

  contact: {
    projectTypes: [
      'Shopify app',
      'Multi-tenant SaaS',
      'LMS or EdTech platform',
      'Backend or integrations',
      'Something else',
    ],
  },
} as const

export type Site = typeof site
