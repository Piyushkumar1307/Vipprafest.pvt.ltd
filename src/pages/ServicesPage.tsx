import { motion } from 'framer-motion'
import { services } from '../data/content'
import { Container } from '../components/ui/Container'
import { ButtonLink } from '../components/ui/ButtonLink'

export function ServicesPage() {
  return (
    <div className="py-20 sm:py-28">
      <Container>
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-bronze">
            Services
          </p>
          <h1 className="mt-2 font-heading text-4xl font-extrabold text-paper sm:text-5xl">
            What we can own end-to-end
          </h1>
          <p className="mt-4 text-lg text-mist">
            Engage for a single line item or a full GMP. We integrate estimating,
            VDC, and field reporting so the story matches the numbers.
          </p>
        </header>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {services.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * i, duration: 0.45 }}
              className="flex flex-col rounded-xl border border-bronze/20 bg-ink-muted/40 p-8"
            >
              <h2 className="font-heading text-xl font-bold text-paper">
                {s.title}
              </h2>
              <p className="mt-3 grow text-mist">{s.desc}</p>
              <ButtonLink to="/contact" className="mt-6 w-fit" variant="ghost">
                Request scope
              </ButtonLink>
            </motion.article>
          ))}
        </div>
      </Container>
    </div>
  )
}
