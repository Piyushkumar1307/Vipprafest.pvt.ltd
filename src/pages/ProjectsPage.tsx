import { motion } from 'framer-motion'
import { projects } from '../data/content'
import { Container } from '../components/ui/Container'
import { ButtonLink } from '../components/ui/ButtonLink'

export function ProjectsPage() {
  return (
    <div className="py-20 sm:py-28">
      <Container>
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-bronze">
            Projects
          </p>
          <h1 className="mt-2 font-heading text-4xl font-extrabold text-paper sm:text-5xl">
            Selected work
          </h1>
          <p className="mt-4 text-lg text-mist">
            Representative deliveries across industrial, housing, and civic
            programs. Real names changed where confidentiality applies.
          </p>
        </header>

        <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.li
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i, duration: 0.45 }}
              className="group flex flex-col overflow-hidden rounded-xl border border-bronze/15 bg-ink-muted/50"
            >
              <div className="overflow-hidden">
                <img
                  src={p.image}
                  alt=""
                  className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs text-bronze">
                  {p.year} · {p.type}
                </p>
                <h2 className="mt-1 font-heading text-lg font-bold text-paper">
                  {p.name}
                </h2>
                <p className="mt-2 text-sm text-mist">{p.area}</p>
                <div className="mt-4" />
                <ButtonLink
                  to="/contact"
                  variant="ghost"
                  className="mt-auto w-full !justify-center"
                >
                  Similar build
                </ButtonLink>
              </div>
            </motion.li>
          ))}
        </ul>
      </Container>
    </div>
  )
}
