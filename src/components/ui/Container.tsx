import { forwardRef, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export const Container = forwardRef<
  HTMLDivElement,
  { className?: string; children: ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8', className)}
    >
      {children}
    </div>
  )
})
Container.displayName = 'Container'
