import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Building2, Hammer, Route, Wrench, ArrowUpRight } from 'lucide-react'
import { services } from '../../data/content'
import { Container } from '../ui/Container'
import { TiltCard } from '../motion/TiltCard'
import { cn } from '../../lib/cn'

const icons = {
  commercial: Building2,
  residential: Hammer,
  civil: Route,
  turnkey: Wrench,
} as const

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
              A bento of what we do best
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1 text-sm font-semibold text-bronze transition hover:gap-2"
          >
            Full service list
            <ArrowUpRight className="size-4" />
          </Link>
        </motion.div>

        <motion.div
          variants={cardContainer}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mt-12 grid gap-4 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2"
        >
          {services.map((s, i) => {
            const Icon = icons[s.id as keyof typeof icons] ?? Wrench
            const wide = i === 0
            return (
              <motion.div
                key={s.id}
                variants={cardItem}
                className={cn(
                  wide && 'sm:col-span-2 lg:row-span-1',
                  '[transform-style:preserve-3d]',
                )}
              >
                <TiltCard
                  className={cn(
                    'group flex h-full flex-col rounded-lg border border-bronze/15 bg-ink-muted/50 p-6 transition hover:border-bronze/40',
                    'shadow-lg shadow-black/20',
                  )}
                >
                  <div className="mb-4 flex size-10 items-center justify-center rounded border border-bronze/30 text-bronze transition group-hover:border-bronze/50 group-hover:bg-bronze/10">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-paper">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">
                    {s.desc}
                  </p>
                </TiltCard>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </section>
  )
}
