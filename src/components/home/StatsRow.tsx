import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'
import { useRef } from 'react'
import { Container } from '../ui/Container'

const items = [
  { value: '32', suffix: '+', label: 'Years combined PM experience' },
  { value: '4.2', suffix: 'M', label: 'Sq ft under active care' },
  { value: '0', suffix: ' lost days', label: 'Last three fiscal years' },
] as const

function ParallaxStat({
  item,
  index,
  inView,
  y,
}: {
  item: (typeof items)[number]
  index: number
  inView: boolean
  y: MotionValue<number>
}) {
  return (
    <motion.div style={{ y }} className="will-change-transform">
      <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
        animate={
          inView
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : { opacity: 0, y: 40, filter: 'blur(6px)' }
        }
        transition={{ delay: index * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.p
          className="font-heading text-3xl font-bold text-bronze sm:text-4xl"
          whileHover={{ scale: 1.04 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          {item.value}
          <span className="text-paper/90">{item.suffix}</span>
        </motion.p>
        <p className="mt-1 text-sm text-mist">{item.label}</p>
      </motion.div>
    </motion.div>
  )
}

export function StatsRow() {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.2'],
  })
  const y0 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -24])
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 0])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 24])
  const ys: [MotionValue<number>, MotionValue<number>, MotionValue<number>] = [y0, y1, y2]

  return (
    <section id="stats-anchor" className="border-b border-bronze/10 py-12 sm:py-16">
      <Container ref={ref}>
        <div className="grid gap-8 sm:grid-cols-3">
          {items.map((item, i) => (
            <ParallaxStat
              key={item.label}
              item={item}
              index={i}
              inView={inView}
              y={ys[i]!}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
