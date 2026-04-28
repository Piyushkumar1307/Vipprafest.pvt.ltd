import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { team } from '../../data/content'
import { Container } from '../ui/Container'

export function TeamSection({ showAboutLink = true }: { showAboutLink?: boolean }) {
  return (
    <section id="team" className="scroll-mt-28 border-y border-bronze/10 bg-ink-muted/25 py-20 sm:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-bronze">
              Team
            </p>
            <h2 className="mt-2 font-heading text-3xl font-extrabold text-paper sm:text-4xl">
              Leadership
            </h2>
            <p className="mt-3 max-w-xl text-mist">
              A direct point of contact for scope, timelines, and delivery on construction
              supply and civil works.
            </p>
          </div>
          {showAboutLink && (
            <Link
              to="/about"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-bronze transition hover:gap-2"
            >
              About Vipprafest
              <ArrowUpRight className="size-4" />
            </Link>
          )}
        </motion.div>

        <div className="mt-12 flex justify-center sm:justify-start">
          {team.map((member, i) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * i, duration: 0.45 }}
              className="flex max-w-md flex-col items-center rounded-2xl border border-bronze/20 bg-ink-muted/50 p-8 text-center sm:flex-row sm:text-left"
            >
              <div className="relative shrink-0">
                <div className="size-36 overflow-hidden rounded-full border-4 border-bronze/35 bg-ink shadow-xl shadow-black/25 ring-2 ring-bronze/15">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.photoAlt ?? `${member.name}, ${member.role}`}
                      className="size-full object-cover object-[center_22%]"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center bg-ink-muted text-bronze">
                      <span className="text-lg font-bold">
                        {member.name
                          .split(' ')
                          .filter(Boolean)
                          .slice(0, 2)
                          .map((p) => p[0]?.toUpperCase())
                          .join('')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6 sm:ml-8 sm:mt-0">
                <h3 className="font-heading text-xl font-bold text-paper">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-bronze">
                  {member.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  Leading procurement, contracting partnerships, and day-to-day coordination for
                  materials, manpower, and civil execution.
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  )
}
