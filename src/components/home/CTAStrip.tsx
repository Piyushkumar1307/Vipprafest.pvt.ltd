import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ButtonLink } from '../ui/ButtonLink'
import { Container } from '../ui/Container'

export function CTAStrip() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'end 0.2'],
  })
  const orb1 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -80])
  const orb2 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 100])
  const float = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 20])
  const orb3 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -40])

  return (
    <section ref={sectionRef} className="py-20 sm:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-2xl border border-bronze/25 bg-gradient-to-br from-ink-muted to-ink p-8 sm:p-12 lg:p-16"
        >
          <motion.div
            className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-bronze/10 blur-3xl"
            style={{ y: orb1, x: float }}
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute -bottom-16 -left-10 size-48 rounded-full bg-rust/20 blur-2xl"
            style={{ y: orb2 }}
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute right-1/4 top-1/2 size-32 rounded-full bg-bronze/5 blur-2xl"
            style={{ y: orb3 }}
            aria-hidden
          />

          <div className="relative max-w-2xl">
            <motion.h2
              className="font-heading text-3xl font-extrabold text-paper sm:text-4xl"
              style={reduced ? undefined : { y: float }}
            >
              Have drawings and a rough schedule?
            </motion.h2>
            <p className="mt-4 text-mist">
              Send us a package—we will return a critical path, risk register,
              and a number you can take to your partners without translating.
            </p>
            <motion.div
              className="mt-8"
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            >
              <ButtonLink to="/contact" className="!px-8 !py-3">
                Book a call
              </ButtonLink>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
