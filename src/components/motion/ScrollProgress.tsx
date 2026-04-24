import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'

export function ScrollProgress() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.0001,
  })

  if (reduced) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-0.5 origin-left bg-bronze"
      style={{ scaleX }}
      aria-hidden
    />
  )
}
