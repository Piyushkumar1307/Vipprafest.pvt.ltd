import { motion } from 'framer-motion'
import {
  Building2,
  Landmark,
  Package,
  Route,
  Users,
  Warehouse,
  Waves,
  Wrench,
} from 'lucide-react'
import { services } from '../data/content'
import { Container } from '../components/ui/Container'
import { ButtonLink } from '../components/ui/ButtonLink'

function getServiceIcon(id: string) {
  if (id.includes('materials')) return Package
  if (id.includes('machinery')) return Wrench
  if (id.includes('manpower')) return Users
  if (id.includes('road')) return Route
  if (id.includes('bridge')) return Landmark
  if (id.includes('pump') || id.includes('dam')) return Waves
  if (id.includes('warehouse')) return Warehouse
  return Building2
}

export function ServicesPage() {
  return (
    <div className="py-20 sm:py-28">
      <Container>
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-bronze">
            Services
          </p>
          <h1 className="mt-2 font-heading text-4xl font-extrabold text-paper sm:text-5xl">
            End-to-end civil and infrastructure services
          </h1>
          <p className="mt-4 text-lg text-mist">
            From supply and manpower to full project execution, our teams support roads,
            bridges, buildings, water infrastructure, and industrial construction with clear
            scope and accountable delivery.
          </p>
        </header>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = getServiceIcon(s.id)
            return (
              <motion.article
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i, duration: 0.45 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-bronze/20 bg-gradient-to-b from-ink to-ink-muted/50 p-7"
              >
                <div className="absolute right-4 top-4 rounded-full border border-bronze/25 bg-ink/70 px-2 py-1 text-[11px] font-semibold text-bronze">
                  Service {String(i + 1).padStart(2, '0')}
                </div>
                <div className="mb-4 flex size-11 items-center justify-center rounded-lg border border-bronze/35 bg-bronze/10 text-bronze transition group-hover:scale-105 group-hover:border-bronze/60">
                  <Icon className="size-5" />
                </div>
                <h2 className="pr-16 font-heading text-xl font-bold text-paper">{s.title}</h2>
                <p className="mt-3 grow text-mist">{s.desc}</p>
                <ButtonLink to="/contact" className="mt-6 w-fit" variant="ghost">
                  Request scope
                </ButtonLink>
              </motion.article>
            )
          })}
        </div>
      </Container>
    </div>
  )
}
