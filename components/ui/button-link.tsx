import Link from 'next/link'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary'
type Size = 'sm' | 'md'

const base =
  'inline-flex items-center justify-center gap-2 rounded-[8px] font-heading font-semibold no-underline transition-colors duration-150 select-none'

const variants: Record<Variant, string> = {
  // Text on Lime is always Midnight. Hover moves to Mist, still dark text.
  primary: 'bg-accent text-ink hover:bg-text focus-visible:bg-text',
  secondary: 'border border-border bg-transparent text-text hover:border-link focus-visible:border-link',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-[0.9375rem]',
  md: 'h-12 px-6 text-base',
}

export function buttonClasses(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className)
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant; size?: Size }

export function ButtonLink({ variant = 'primary', size = 'md', className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, size, className)} {...props} />
}

type AnchorButtonProps = ComponentProps<'a'> & { variant?: Variant; size?: Size }

/** For downloads, mailto links and external URLs. */
export function AnchorButton({ variant = 'primary', size = 'md', className, ...props }: AnchorButtonProps) {
  return <a className={buttonClasses(variant, size, className)} {...props} />
}

