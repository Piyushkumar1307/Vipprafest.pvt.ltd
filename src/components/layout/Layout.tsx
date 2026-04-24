import { type ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { ScrollProgress } from '../motion/ScrollProgress'
import { FloatingContactWidgets } from '../chat/FloatingContactWidgets'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="noise relative min-h-svh">
      <ScrollProgress />
      <div className="pointer-events-none fixed inset-0 -z-10 grid-blueprint opacity-60" />
      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
      <FloatingContactWidgets />
    </div>
  )
}
