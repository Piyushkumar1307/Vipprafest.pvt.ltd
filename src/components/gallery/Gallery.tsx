import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { cn } from '../../lib/cn'
import type { GalleryItem } from '../../data/gallery'

function MediaThumb({ item }: { item: GalleryItem }) {
  if (item.type === 'image') {
    return (
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    )
  }

  return (
    <div className="relative h-full w-full">
      {item.poster ? (
        <img
          src={item.poster}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="h-full w-full bg-ink-muted" />
      )}
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid size-11 place-items-center rounded-full border border-bronze/40 bg-ink/70 text-paper backdrop-blur">
          <Play className="ml-0.5 size-5" />
        </div>
      </div>
    </div>
  )
}

function MediaViewer({ item }: { item: GalleryItem }) {
  if (item.type === 'image') {
    return (
      <img
        src={item.src}
        alt={item.alt}
        className="max-h-[75svh] w-auto max-w-[92vw] select-none rounded-lg object-contain"
        draggable={false}
      />
    )
  }

  return (
    <video
      src={item.src}
      poster={item.poster}
      controls
      playsInline
      className="max-h-[75svh] w-auto max-w-[92vw] rounded-lg bg-black object-contain"
    />
  )
}

export function Gallery({
  items,
  className,
}: {
  items: GalleryItem[]
  className?: string
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const active = useMemo(
    () => (activeIndex === null ? null : items[activeIndex] ?? null),
    [activeIndex, items],
  )
  const [isPaused, setIsPaused] = useState(false)

  const cards = useMemo(() => {
    const size = 5
    if (items.length === 0) return []
    const cardCount = Math.max(1, Math.ceil(items.length / size))
    const out: GalleryItem[][] = []
    for (let c = 0; c < cardCount; c++) {
      const group: GalleryItem[] = []
      for (let i = 0; i < size; i++) {
        group.push(items[(c * size + i) % items.length]!)
      }
      out.push(group)
    }
    return out
  }, [items])

  const [cardFrame, setCardFrame] = useState<number[]>(() => Array(cards.length).fill(0))

  const bumpCard = useCallback((cardIdx: number, delta: number) => {
    setCardFrame((prev) => {
      const next =
        prev.length >= cards.length
          ? [...prev]
          : Array.from({ length: cards.length }, (_, i) => prev[i] ?? 0)
      const cur = next[cardIdx] ?? 0
      next[cardIdx] = (cur + delta + 5) % 5
      return next
    })
  }, [cards.length])

  const close = useCallback(() => setActiveIndex(null), [])
  const prev = useCallback(
    () =>
      setActiveIndex((i) => {
        if (i === null) return i
        return (i - 1 + items.length) % items.length
      }),
    [items.length],
  )
  const next = useCallback(
    () =>
      setActiveIndex((i) => {
        if (i === null) return i
        return (i + 1) % items.length
      }),
    [items.length],
  )

  useEffect(() => {
    if (!active) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active, close, next, prev])

  useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (reduceMotion) return
    if (isPaused) return
    if (cards.length === 0) return

    const id = window.setInterval(() => {
      setCardFrame((prev) => {
        const next =
          prev.length >= cards.length
            ? [...prev]
            : Array.from({ length: cards.length }, (_, i) => prev[i] ?? 0)
        return next.map((v) => (v + 1) % 5)
      })
    }, 2500)
    return () => window.clearInterval(id)
  }, [cards.length, isPaused])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (reduceMotion) return

    let raf = 0
    let last = performance.now()

    const tick = (now: number) => {
      const container = scrollRef.current
      if (!container) return

      const dt = now - last
      last = now

      if (!isPaused) {
        const speed = 28 // px/s
        container.scrollTop += (speed * dt) / 1000

        const max = container.scrollHeight - container.clientHeight
        if (max > 0 && container.scrollTop >= max) container.scrollTop = 0
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isPaused])

  return (
    <div className={cn('w-full', className)}>
      <div
        ref={scrollRef}
        className={cn(
          'hide-scrollbar overflow-y-auto rounded-2xl border border-bronze/15 bg-ink/20 p-3',
          'lg:h-[560px]',
          'max-lg:max-h-[75svh]',
        )}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-2">
          {cards.map((group, cardIdx) => {
            const startIndex = cardIdx * 5
            const frame = cardFrame[cardIdx] ?? 0
            const item = group[frame] ?? group[0]
            const idx = items.length ? (startIndex + frame) % items.length : 0

            return (
              <div
                key={`card:${cardIdx}`}
                className={cn(
                  'group relative overflow-hidden rounded-2xl border border-bronze/20 bg-ink/35 p-2 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.75)]',
                  'h-[220px] w-full',
                  'transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.01] hover:border-bronze/35',
                )}
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    'relative h-full w-full overflow-hidden rounded-xl border border-bronze/15 bg-ink/30',
                    'focus:outline-none focus:ring-2 focus:ring-bronze/50',
                  )}
                  aria-label={item?.type === 'image' ? item.alt : item?.title ?? 'Open'}
                >
                  {item ? <MediaThumb item={item} /> : null}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                  </div>
                </button>

                <div className="absolute inset-x-2 top-2 flex items-center justify-between gap-2 opacity-0 transition group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      bumpCard(cardIdx, -1)
                    }}
                    className="grid size-10 place-items-center rounded-full border border-bronze/25 bg-ink/70 text-paper hover:bg-ink"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      bumpCard(cardIdx, 1)
                    }}
                    className="grid size-10 place-items-center rounded-full border border-bronze/25 bg-ink/70 text-paper hover:bg-ink"
                    aria-label="Next image"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </div>

                <div className="pointer-events-none absolute bottom-2 left-2 rounded-full border border-bronze/20 bg-ink/70 px-2 py-0.5 text-[11px] text-paper/90 backdrop-blur">
                  {frame + 1} / 5
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -top-12 right-0 flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="grid size-10 place-items-center rounded-full border border-bronze/25 bg-ink/70 text-paper hover:bg-ink"
                  aria-label="Previous"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="grid size-10 place-items-center rounded-full border border-bronze/25 bg-ink/70 text-paper hover:bg-ink"
                  aria-label="Next"
                >
                  <ChevronRight className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="grid size-10 place-items-center rounded-full border border-bronze/25 bg-ink/70 text-paper hover:bg-ink"
                  aria-label="Close"
                >
                  <X className="size-5" />
                </button>
              </div>

              <MediaViewer item={active} />

              <div className="mt-3 flex items-baseline justify-between gap-4 px-1">
                <p className="text-xs text-mist">
                  {activeIndex !== null ? `${activeIndex + 1} / ${items.length}` : ''}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

