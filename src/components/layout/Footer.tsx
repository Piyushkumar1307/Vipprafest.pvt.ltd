import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'
import { company } from '../../data/content'
import { Container } from '../ui/Container'

export function Footer() {
  return (
    <footer className="border-t border-bronze/20 bg-ink-muted">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-heading text-xl font-bold text-paper">
              {company.name}
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-mist">
              {company.tagline}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-bronze">
              Navigate
            </p>
            <ul className="mt-4 space-y-2 text-sm text-mist">
              <li>
                <Link to="/about" className="hover:text-paper">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-paper">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-paper">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-paper">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-bronze">
              Office
            </p>
            <p className="mt-4 flex items-start gap-2 text-sm text-mist">
              <MapPin className="mt-0.5 shrink-0 text-bronze" size={16} />
              {company.address}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-bronze">
              Direct
            </p>
            <a
              href={`tel:${company.phone.replace(/[^\d+]/g, '')}`}
              className="mt-4 flex items-center gap-2 text-sm text-mist transition hover:text-paper"
            >
              <Phone size={16} className="text-bronze" />
              {company.phone}
            </a>
            <a
              href={`mailto:${company.email}`}
              className="mt-3 flex items-center gap-2 text-sm text-mist transition hover:text-paper"
            >
              <Mail size={16} className="text-bronze" />
              {company.email}
            </a>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-bronze/10 pt-8 text-xs text-mist sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span>
          <a
            href="https://unsplash.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 transition hover:text-paper"
          >
          </a>
        </div>
      </Container>
    </footer>
  )
}
