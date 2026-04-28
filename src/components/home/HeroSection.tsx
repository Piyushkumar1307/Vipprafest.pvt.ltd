import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'
import { ArrowRight, ChevronsDown, HardHat } from 'lucide-react'
import { ButtonLink } from '../ui/ButtonLink'
import { Container } from '../ui/Container'
import { company } from '../../data/content'

const heroImage =
  'https://images.unsplash.com/photo-1541976590-713941681591?w=1600&q=80&auto=format&fit=crop'

const headingContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.045, delayChildren: 0.12 },
  },
}

const headingChild = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, stiffness: 110, damping: 20, mass: 0.5 },
  },
}

function ParallaxLayer({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>
}) {
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  return (
    <motion.div
      className="grid-blueprint pointer-events-none absolute inset-0 z-[1] opacity-25"
      style={{ y }}
      aria-hidden
    />
  )
}

function ParallaxRulers({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>
}) {
  const a = useTransform(scrollYProgress, [0, 1], [0, -64])
  const b = useTransform(scrollYProgress, [0, 1], [0, 48])
  return (
    <>
      <motion.div
        className="pointer-events-none absolute right-[8%] top-[18%] z-[1] h-32 w-px bg-gradient-to-b from-bronze/60 to-transparent"
        style={{ y: a }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute bottom-[22%] left-[5%] z-[1] h-20 w-px bg-gradient-to-t from-bronze/50 to-transparent"
        style={{ y: b }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute bottom-[30%] right-[18%] z-[1] size-2 rounded-sm border border-bronze/40"
        style={{ y: a, rotate: 45 }}
        aria-hidden
      />
    </>
  )
}

export function HeroSection() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const rawImgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const rawImgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const rawTextY = useTransform(scrollYProgress, [0, 0.75], [0, 100])
  const rawTextOp = useTransform(scrollYProgress, [0, 0.55], [1, 0.25])

  const imgY = useSpring(rawImgY, { stiffness: 90, damping: 28 })
  const textY = useSpring(rawTextY, { stiffness: 90, damping: 32 })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden border-b border-bronze/10"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={heroImage}
          alt=""
          className="h-[118%] w-full -translate-y-[4%] object-cover opacity-55"
          style={
            reduced
              ? undefined
              : {
                  y: imgY,
                  scale: rawImgScale,
                }
          }
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/75" />
      </div>

      {!reduced && (
        <>
          <ParallaxLayer scrollYProgress={scrollYProgress} />
          <ParallaxRulers scrollYProgress={scrollYProgress} />
        </>
      )}

      <Container className="relative z-10 flex min-h-[100dvh] flex-col justify-center py-20 sm:py-24 lg:py-32">
        <motion.div
          className="max-w-2xl will-change-transform"
          style={
            reduced
              ? undefined
              : { y: textY, opacity: rawTextOp }
          }
        >
          <motion.p
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-bronze/30 bg-ink/60 px-3 py-1 text-xs font-medium uppercase tracking-widest text-bronze shadow-lg shadow-ink/40 backdrop-blur"
          >
            <motion.span
              animate={reduced ? undefined : { y: [0, -3, 0] }}
              transition={reduced ? undefined : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <HardHat className="size-3.5" />
            </motion.span>
            Construction supply & contracting
          </motion.p>

          <div className="[perspective:1000px]">
            <motion.h1
              variants={headingContainer}
              initial="hidden"
              animate="show"
              className="font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-paper [transform-style:preserve-3d] sm:text-5xl lg:text-6xl"
            >
              <span className="mb-1 block overflow-hidden [transform-style:preserve-3d]">
                <span className="block">
                  <motion.span
                    variants={headingChild}
                    className="inline-block [transform-style:preserve-3d] [&:not(:last-child)]:mr-2"
                  >
                    We
                  </motion.span>
                  <motion.span
                    variants={headingChild}
                    className="inline-block [transform-style:preserve-3d] [&:not(:last-child)]:mr-2"
                  >
                    supply
                  </motion.span>{' '}
                  <motion.span
                    variants={headingChild}
                    className="inline-block bg-gradient-to-r from-bronze to-amber-200/90 bg-clip-text text-transparent [transform-style:preserve-3d]"
                  >
                    reliable
                  </motion.span>
                </span>
              </span>
              <span className="block">
                {['materials,', 'manpower,', 'and', 'execute', 'civil', 'works.'].map(
                  (w) => (
                  <motion.span
                    key={w}
                    variants={headingChild}
                    className="inline-block [transform-style:preserve-3d] [&:not(:last-child)]:mr-2"
                  >
                    {w}
                  </motion.span>
                  ),
                )}
              </span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-lg text-mist"
          >
            {company.tagline} From concrete and steel to machinery parts and skilled
            labour, {company.name} supports public and private projects with dependable
            supply and on-ground execution.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <ButtonLink to="/contact">
              Plan your build
              <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink to="/projects" variant="ghost">
              See recent work
            </ButtonLink>
          </motion.div>
        </motion.div>
      </Container>

      <motion.a
        href="#stats-anchor"
        className="group absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 text-xs font-medium text-mist/80"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        whileHover={reduced ? undefined : { y: -2, color: '#faf7f2' }}
      >
        <span className="sr-only">Scroll to next section</span>
        <span aria-hidden>Scroll</span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={reduced ? undefined : { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronsDown className="size-5 text-bronze/80" />
        </motion.span>
      </motion.a>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-ink to-transparent" />
    </section>
  )
}
