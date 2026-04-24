import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { company } from '../data/content'

const principles = [
  'Transparent budget revisions with alternates, not surprise COs.',
  'Superintendent-led huddles with trade partners each phase.',
  'Warranty program with named contacts—not a generic help desk.',
] as const

const img =
  'https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?w=1200&q=80&auto=format&fit=crop'

export function AboutPage() {
  return (
    <div className="border-b border-bronze/10">
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-bronze">
                Who we are
              </p>
              <h1 className="mt-2 font-heading text-4xl font-extrabold text-paper sm:text-5xl">
                Builders who read the drawing set twice
              </h1>
              <p className="mt-6 text-lg text-mist">
                {company.name} started on complex retrofits in industrial
                districts—tight clearances, live tenants, unforgiving inspectors.
                That shaped how we run every job: sequence before speed, and
                clarity before concrete.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="overflow-hidden rounded-xl border border-bronze/20"
            >
              <img
                src={img}
                alt="Construction site with steel and cranes"
                className="aspect-[4/3] w-full object-cover"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="border-t border-bronze/10 bg-ink-muted/30 py-20">
        <Container>
          <h2 className="font-heading text-2xl font-bold text-paper sm:text-3xl">
            Operating principles
          </h2>
          <ul className="mt-8 space-y-4">
            {principles.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * i }}
                className="flex gap-3 rounded-lg border border-bronze/10 bg-ink/40 p-4"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-bronze" />
                <span className="text-mist">{p}</span>
              </motion.li>
            ))}
          </ul>
        </Container>
      </section>
    </div>
  )
}
