import { z } from 'zod'
import { site } from '@/data/site'

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name (at least 2 characters).').max(120),
  email: z.string().trim().email('Please enter a valid email address.').max(200),
  projectType: z.enum(site.contact.projectTypes, {
    errorMap: () => ({ message: 'Please choose a project type.' }),
  }),
  message: z
    .string()
    .trim()
    .min(20, 'Please share at least a sentence or two about your project (20+ characters).')
    .max(4000),
  /** Honeypot field — must stay empty. */
  companyWebsite: z.string().max(0).optional().default(''),
})

export type ContactInput = z.infer<typeof contactSchema>
