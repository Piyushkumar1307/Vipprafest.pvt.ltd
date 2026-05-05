import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { company } from '../../data/content'
import { cn } from '../../lib/cn'
import { Container } from '../ui/Container'
import { ButtonLink } from '../ui/ButtonLink'
import { applyTheme, getInitialTheme, persistTheme, type ThemeMode } from '../../lib/theme'

const nav = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/clients', label: 'Clients' },
  { to: '/contact', label: 'Contact' },
] as const

export function Header() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<ThemeMode>(() => getInitialTheme())
  const { pathname } = useLocation()

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    applyTheme(next)
    persistTheme(next)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-paper/10 bg-ink/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          className="group flex items-baseline gap-2 font-heading text-lg font-extrabold tracking-tight text-paper"
        >
          <img
            src="/logo.png"
            alt={`${company.name} logo`}
            className="h-5 w-auto translate-y-[2px] select-none opacity-95"
            draggable={false}
          />
          <span className="transition group-hover:text-paper">{company.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-mist md:flex">
          {nav.map((item) => {
            const active = pathname === item.to
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'relative transition hover:text-paper',
                  active && 'text-paper',
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-bronze" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded border border-bronze/30 text-paper transition hover:bg-ink-muted"
            aria-label={theme === 'dark' ? 'Switch to day mode' : 'Switch to night mode'}
            title={theme === 'dark' ? 'Day mode' : 'Night mode'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a
            href={`tel:${company.phone.replace(/[^\d+]/g, '')}`}
            className="text-sm text-mist transition hover:text-paper"
          >
            {company.phone}
          </a>
          <ButtonLink to="/contact" className="!py-2 !text-xs">
            Start a project
          </ButtonLink>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded border border-bronze/30 text-paper md:hidden"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            className="border-t border-bronze/20 bg-ink md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Container className="flex flex-col gap-1 py-4">
              <button
                type="button"
                onClick={toggleTheme}
                className="mb-1 flex items-center justify-between rounded-sm border border-bronze/30 px-3 py-2 text-paper hover:bg-ink-muted"
                aria-label={theme === 'dark' ? 'Switch to day mode' : 'Switch to night mode'}
              >
                <span className="text-sm">{theme === 'dark' ? 'Day mode' : 'Night mode'}</span>
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-sm px-3 py-2 text-paper hover:bg-ink-muted"
                >
                  {item.label}
                </Link>
              ))}
              <ButtonLink
                to="/contact"
                className="mt-2 w-full"
                onClick={() => setOpen(false)}
              >
                Start a project
              </ButtonLink>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
