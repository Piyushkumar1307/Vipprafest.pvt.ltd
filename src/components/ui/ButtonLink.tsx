import { type ReactNode, type ComponentProps } from 'react'
import { Link, type To } from 'react-router-dom'
import { cn } from '../../lib/cn'

const base =
  'inline-flex items-center justify-center gap-2 rounded-sm px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze'

const variants = {
  primary:
    'bg-bronze text-ink shadow-lg shadow-bronze/20 hover:bg-bronze-deep active:scale-[0.99]',
  ghost:
    'border border-bronze/40 bg-transparent text-paper hover:border-bronze hover:bg-bronze/5',
} as const

type LinkRest = Omit<ComponentProps<typeof Link>, 'to' | 'className' | 'children'>

export function ButtonLink({
  to,
  variant = 'primary',
  className,
  children,
  ...rest
}: {
  to: To
  variant?: keyof typeof variants
  className?: string
  children: ReactNode
} & LinkRest) {
  return (
    <Link
      to={to}
      className={cn(base, variants[variant], className)}
      {...rest}
    >
      {children}
    </Link>
  )
}

export function Button({
  type = 'button',
  variant = 'primary',
  className,
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants
}) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], className)}
      {...rest}
    >
      {children}
    </button>
  )
}
