'use client'

import { useEffect, useRef, useState } from 'react'
import { site } from '@/data/site'
import { contactSchema } from '@/lib/contact-schema'
import { AnchorButton, buttonClasses } from '@/components/ui/button-link'

type FieldErrors = Partial<Record<'name' | 'email' | 'projectType' | 'message', string[]>>

type SubmitState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'sent'; delivery: 'resend' | 'mailto'; mailto?: string }
  | { status: 'error'; message: string; fieldErrors?: FieldErrors }

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, setState] = useState<SubmitState>({ status: 'idle' })

  // Synchronize programmatic aria-invalid with native :user-invalid (plus fallback for older engines)
  useEffect(() => {
    const form = formRef.current
    if (!form) return

    const supportsUserInvalid =
      typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('selector(:user-invalid)')
    const dirtyState = new WeakMap<Element, { interacted: boolean; blurred: boolean }>()

    const syncField = (el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
      if (supportsUserInvalid) {
        if (el.matches(':user-invalid')) {
          el.setAttribute('aria-invalid', 'true')
        } else {
          el.removeAttribute('aria-invalid')
        }
      } else {
        const valid = el.checkValidity()
        el.classList.toggle('user-invalid-fallback', !valid)
        if (!valid) {
          el.setAttribute('aria-invalid', 'true')
        } else {
          el.removeAttribute('aria-invalid')
        }
      }
    }

    const onEvent = (event: Event) => {
      const target = event.target
      if (
        !(target instanceof HTMLInputElement) &&
        !(target instanceof HTMLTextAreaElement) &&
        !(target instanceof HTMLSelectElement)
      ) {
        return
      }

      if (supportsUserInvalid) {
        if (event.type === 'blur' || event.type === 'focus') {
          syncField(target)
        } else if (event.type === 'input' && target.getAttribute('aria-invalid') === 'true') {
          syncField(target)
        }
        return
      }

      const record = dirtyState.get(target) ?? { interacted: false, blurred: false }
      if (event.type === 'input' || event.type === 'change') {
        record.interacted = true
        dirtyState.set(target, record)
        if (record.blurred) syncField(target)
      } else if (event.type === 'blur') {
        record.blurred = true
        dirtyState.set(target, record)
        if (record.interacted) syncField(target)
      }
    }

    form.addEventListener('blur', onEvent, true)
    form.addEventListener('focus', onEvent, true)
    form.addEventListener('input', onEvent, true)
    form.addEventListener('change', onEvent, true)
    return () => {
      form.removeEventListener('blur', onEvent, true)
      form.removeEventListener('focus', onEvent, true)
      form.removeEventListener('input', onEvent, true)
      form.removeEventListener('change', onEvent, true)
    }
  }, [])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      projectType: String(formData.get('projectType') ?? ''),
      message: String(formData.get('message') ?? ''),
      companyWebsite: String(formData.get('companyWebsite') ?? ''),
    }

    const parsed = contactSchema.safeParse(payload)
    if (!parsed.success) {
      setState({
        status: 'error',
        message: 'Please check the highlighted fields before sending.',
        fieldErrors: parsed.error.flatten().fieldErrors,
      })
      return
    }

    setState({ status: 'submitting' })
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await response.json()) as {
        ok: boolean
        delivery?: 'resend' | 'mailto'
        mailto?: string
        error?: string
        fieldErrors?: FieldErrors
      }

      if (!response.ok || !data.ok) {
        setState({
          status: 'error',
          message: data.error ?? 'Could not submit the form. Please try again or email me directly.',
          fieldErrors: data.fieldErrors,
        })
        return
      }

      setState({
        status: 'sent',
        delivery: data.delivery ?? 'resend',
        mailto: data.mailto,
      })
    } catch {
      setState({
        status: 'error',
        message: `Network error while sending. You can email me directly at ${site.email}.`,
      })
    }
  }

  if (state.status === 'sent') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-[12px] border border-border bg-surface p-6 md:p-8"
      >
        <h2 className="text-2xl font-bold text-text">
          {state.delivery === 'resend' ? 'Message received' : 'Ready to send in your email app'}
        </h2>
        {state.delivery === 'resend' ? (
          <p className="mt-3 text-muted">
            Your project details have been sent to {site.email}. Next step: I will read through your scope and reply by
            email with follow-up questions or a short plan for how to build it.
          </p>
        ) : (
          <p className="mt-3 text-muted">
            Your message has been validated and prepared. Direct email delivery is not configured on this server yet, so
            click the button below to open your email app with everything filled in, or send your note directly to{' '}
            <a href={`mailto:${site.email}`} className="text-link underline">
              {site.email}
            </a>
            . Once you send it, I will reply by email with follow-up questions or a short plan.
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          {state.mailto && (
            <AnchorButton href={state.mailto} variant="primary" size="md">
              Open in email app
            </AnchorButton>
          )}
          <button
            type="button"
            onClick={() => setState({ status: 'idle' })}
            className={buttonClasses('secondary', 'md')}
          >
            Send another message
          </button>
        </div>
      </div>
    )
  }

  const fieldErrors = state.status === 'error' ? state.fieldErrors : undefined

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-6 rounded-[12px] border border-border bg-surface p-6 md:p-8">
      {/* Honeypot field — hidden from sighted and assistive technology users */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="companyWebsite">Company website (leave blank)</label>
        <input
          id="companyWebsite"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="name" className="block font-heading text-sm font-semibold text-text">
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={120}
          autoComplete="name"
          aria-errormessage="name-error"
          aria-describedby="name-error"
          aria-invalid={fieldErrors?.name ? 'true' : undefined}
          className="mt-2 h-11 w-full rounded-[8px] border border-border bg-bg px-3.5 text-text placeholder:text-muted"
          placeholder="Jane Doe"
        />
        <span id="name-error" className="field-error fs-small mt-1.5">
          {fieldErrors?.name?.[0] ?? 'Please enter your name (at least 2 characters).'}
        </span>
        {fieldErrors?.name?.[0] && (
          <p className="fs-small mt-1.5 text-text" role="alert">
            {fieldErrors.name[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block font-heading text-sm font-semibold text-text">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          aria-errormessage="email-error"
          aria-describedby="email-error"
          aria-invalid={fieldErrors?.email ? 'true' : undefined}
          className="mt-2 h-11 w-full rounded-[8px] border border-border bg-bg px-3.5 text-text placeholder:text-muted"
          placeholder="jane@company.com"
        />
        <span id="email-error" className="field-error fs-small mt-1.5">
          {fieldErrors?.email?.[0] ?? 'Please enter a valid email address.'}
        </span>
        {fieldErrors?.email?.[0] && (
          <p className="fs-small mt-1.5 text-text" role="alert">
            {fieldErrors.email[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="projectType" className="block font-heading text-sm font-semibold text-text">
          Project type
        </label>
        <select
          id="projectType"
          name="projectType"
          required
          defaultValue=""
          aria-errormessage="projectType-error"
          aria-describedby="projectType-error"
          aria-invalid={fieldErrors?.projectType ? 'true' : undefined}
          className="mt-2 h-11 w-full rounded-[8px] border border-border bg-bg px-3.5 text-text"
        >
          <option value="" disabled>
            Select a project type
          </option>
          {site.contact.projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <span id="projectType-error" className="field-error fs-small mt-1.5">
          {fieldErrors?.projectType?.[0] ?? 'Please choose a project type.'}
        </span>
        {fieldErrors?.projectType?.[0] && (
          <p className="fs-small mt-1.5 text-text" role="alert">
            {fieldErrors.projectType[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block font-heading text-sm font-semibold text-text">
          What do you want to build?
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={20}
          maxLength={4000}
          rows={5}
          aria-errormessage="message-error"
          aria-describedby="message-error"
          aria-invalid={fieldErrors?.message ? 'true' : undefined}
          className="mt-2 w-full rounded-[8px] border border-border bg-bg p-3.5 text-text placeholder:text-muted"
          placeholder="Share what your users or merchants need to do, any existing stack, and your rough timeline."
        />
        <span id="message-error" className="field-error fs-small mt-1.5">
          {fieldErrors?.message?.[0] ?? 'Please share at least a sentence or two about your project (20+ characters).'}
        </span>
        {fieldErrors?.message?.[0] && (
          <p className="fs-small mt-1.5 text-text" role="alert">
            {fieldErrors.message[0]}
          </p>
        )}
      </div>

      {state.status === 'error' && (
        <p role="alert" className="rounded-[8px] border border-link bg-bg px-4 py-3 fs-small text-text">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={state.status === 'submitting'}
        className={buttonClasses('primary', 'md', 'w-full sm:w-auto disabled:opacity-60')}
      >
        {state.status === 'submitting' ? 'Sending project details…' : 'Send project details'}
      </button>
    </form>
  )
}
