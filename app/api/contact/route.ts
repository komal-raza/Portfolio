import { NextResponse } from 'next/server'
import { contactSchema } from '@/lib/contact-schema'
import { site } from '@/data/site'

const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS = 5
const hits = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS)
  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  return false
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') ?? 'local'
}

export async function POST(request: Request) {
  const ip = getClientIp(request)
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many submissions in a short time. Please wait a few minutes or email me directly.' },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 })
  }

  // Silently accept honeypot triggers so automated bots don't retry.
  if (
    typeof body === 'object' &&
    body !== null &&
    'companyWebsite' in body &&
    typeof (body as { companyWebsite?: unknown }).companyWebsite === 'string' &&
    (body as { companyWebsite: string }).companyWebsite.trim().length > 0
  ) {
    return NextResponse.json({ ok: true, delivery: 'resend' })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors
    return NextResponse.json(
      {
        ok: false,
        error: 'Please check the highlighted fields and try again.',
        fieldErrors,
      },
      { status: 400 },
    )
  }

  const { name, email, projectType, message } = parsed.data
  const resendKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL || site.email
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>'

  if (resendKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          reply_to: email,
          subject: `New project inquiry (${projectType}) from ${name}`,
          text: [`Name: ${name}`, `Email: ${email}`, `Project type: ${projectType}`, '', message].join('\n'),
        }),
      })

      if (!response.ok) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('[contact] Resend API returned non-OK:', response.status)
        }
        return NextResponse.json({
          ok: true,
          delivery: 'mailto',
          mailto: buildMailto({ name, email, projectType, message }),
        })
      }

      return NextResponse.json({ ok: true, delivery: 'resend' })
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[contact] Resend request failed:', error)
      }
      return NextResponse.json({
        ok: true,
        delivery: 'mailto',
        mailto: buildMailto({ name, email, projectType, message }),
      })
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    console.info('[contact] Submission (no RESEND_API_KEY configured):', {
      name,
      email,
      projectType,
      message,
    })
  }

  return NextResponse.json({
    ok: true,
    delivery: 'mailto',
    mailto: buildMailto({ name, email, projectType, message }),
  })
}

function buildMailto({
  name,
  email,
  projectType,
  message,
}: {
  name: string
  email: string
  projectType: string
  message: string
}) {
  const subject = encodeURIComponent(`Project inquiry: ${projectType} (${name})`)
  const body = encodeURIComponent(
    [`Name: ${name}`, `Email: ${email}`, `Project type: ${projectType}`, '', message].join('\n'),
  )
  return `mailto:${site.email}?subject=${subject}&body=${body}`
}
