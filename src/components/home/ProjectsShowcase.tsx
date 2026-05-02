import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../../data/content'
import { Container } from '../ui/Container'
import { ParallaxProjectImage } from '../motion/ParallaxProjectImage'
import { cn } from '../../lib/cn'

export function ProjectsShowcase() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section
      ref={ref}
      className="border-y border-bronze/10 bg-paper-dim/5 py-20 sm:py-28"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex max-w-2xl flex-col gap-2"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-bronze">
            Projects
          </p>
          <h2 className="font-heading text-3xl font-extrabold text-paper sm:text-4xl">
            Work you can count on
          </h2>
          <p className="text-mist">
            A quick look at recent work—each project is delivered with clear scope,
            reliable timelines, and strong on-site coordination.
          </p>
        </motion.div>

        <ul className="mt-12 flex flex-col gap-6">
          {projects.slice(0, 3).map((p, i) => {
            const skew = i % 2 === 0 ? 'lg:-translate-x-4' : 'lg:translate-x-4'
            return (
              <motion.li
                key={p.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -48 : 48, rotateY: i % 2 === 0 ? 2 : -2 }}
                animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                transition={{ delay: 0.08 * i, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'group grid overflow-hidden rounded-lg border border-bronze/20 bg-ink-muted [transform-style:preserve-3d] [perspective:1400px] lg:grid-cols-2',
                  skew,
                )}
              >
                <ParallaxProjectImage src={p.image} alt="" />
                <div className="flex flex-col justify-center p-6 sm:p-10">
                  <p className="text-xs text-bronze">{p.year} · {p.type}</p>
                  <h3 className="mt-1 font-heading text-2xl font-bold text-paper">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm text-mist">Delivered scope: {p.area}</p>
                  <p className="mt-2 text-sm text-mist">
                    Location: <span className="text-paper">{p.location}</span>
                  </p>
                  <p className="mt-1 text-sm text-mist">
                    Date: <span className="text-paper">{p.date}</span>
                  </p>
                </div>
              </motion.li>
            )
          })}
        </ul>

        <motion.p
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link
            to="/projects"
            className="inline-block border-b border-bronze/50 pb-0.5 text-sm font-semibold text-bronze transition hover:border-bronze"
          >
            View all projects
          </Link>
        </motion.p>
      </Container>
    </section>
  )
}
