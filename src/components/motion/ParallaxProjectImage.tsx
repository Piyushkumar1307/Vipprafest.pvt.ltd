import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

type Props = { src: string; alt?: string }

export function ParallaxProjectImage({ src, alt = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.1'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <div
      ref={ref}
      className="relative min-h-[220px] overflow-hidden sm:min-h-[280px] lg:min-h-[min(100%,320px)]"
    >
      <motion.img
        src={src}
        alt={alt}
        className="absolute left-0 right-0 top-[-15%] h-[130%] w-full object-cover"
        style={reduced ? undefined : { y }}
      />
    </div>
  )
}
