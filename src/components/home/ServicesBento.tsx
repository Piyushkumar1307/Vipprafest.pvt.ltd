import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Package,
  Wrench,
  Users,
  Building2,
  ArrowUpRight,
  Warehouse,
  Waves,
  Landmark,
  Route,
} from 'lucide-react'
import { services } from '../../data/content'
import { Container } from '../ui/Container'
import { TiltCard } from '../motion/TiltCard'

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

const cardContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

const cardItem = {
  hidden: { opacity: 0, y: 36, rotateX: 8 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: 'spring' as const, stiffness: 90, damping: 20 },
  },
}

export function ServicesBento() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section className="py-20 sm:py-28">
      <Container ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-bronze">
              Capabilities
            </p>
            <h2 className="mt-2 font-heading text-3xl font-extrabold text-paper sm:text-4xl">
              What we do best
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1 text-sm font-semibold text-bronze transition hover:gap-2"
          >
            View all services
            <ArrowUpRight className="size-4" />
          </Link>
        </motion.div>

        <motion.div
          variants={cardContainer}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mt-12 grid gap-4 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s, i) => {
            const Icon = getServiceIcon(s.id)
            return (
              <motion.div key={s.id} variants={cardItem} className="[transform-style:preserve-3d]">
                <TiltCard className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-bronze/20 bg-gradient-to-b from-ink to-ink-muted/70 p-6 shadow-lg shadow-black/20 transition hover:border-bronze/45">
                  <div className="absolute right-4 top-4 rounded-full border border-bronze/25 bg-ink-muted/50 px-2 py-1 text-[11px] font-semibold text-bronze">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="mb-4 flex size-11 items-center justify-center rounded-lg border border-bronze/35 bg-bronze/10 text-bronze transition group-hover:scale-105 group-hover:border-bronze/60">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="max-w-[90%] font-heading text-lg font-bold text-paper">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{s.desc}</p>
                </TiltCard>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </section>
  )
}
