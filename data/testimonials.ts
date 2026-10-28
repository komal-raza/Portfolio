export type Testimonial = {
  name: string
  role: string
  company: string
  quote: string
  sourceUrl?: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Sughra Mehdi',
    role: 'Team Lead',
    company: 'LeoaTech',
    quote:
      'Komal owns complex features end to end — from PostgreSQL schemas and BullMQ background pipelines to Shopify billing and multi-portal React interfaces. She consistently turns intricate business workflows into reliable production software.',
  },
]
