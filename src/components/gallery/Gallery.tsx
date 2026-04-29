import { useEffect, useMemo, useState } from 'react'
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
        className="h-auto w-full"
      />
    )
  }

  return (
    <div className="relative w-full">
      {item.poster ? (
        <img
          src={item.poster}
          alt={item.title}
          loading="lazy"
          className="h-auto w-full"
        />
      ) : (
        <div className="aspect-video w-full bg-ink-muted" />
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const active = useMemo(
    () => (activeIndex === null ? null : items[activeIndex] ?? null),
    [activeIndex, items],
  )

  const close = () => setActiveIndex(null)
  const prev = () =>
    setActiveIndex((i) => {
      if (i === null) return i
      return (i - 1 + items.length) % items.length
    })
  const next = () =>
    setActiveIndex((i) => {
      if (i === null) return i
      return (i + 1) % items.length
    })

  useEffect(() => {
    if (!active) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active])

  return (
    <div className={cn('w-full', className)}>
      <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
        {items.map((item, idx) => (
          <button
            key={`${item.type}:${item.src}`}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={cn(
              'group relative overflow-hidden rounded-xl border border-bronze/15 bg-ink/30 text-left',
              'w-full break-inside-avoid',
              'focus:outline-none focus:ring-2 focus:ring-bronze/50',
            )}
            aria-label={item.type === 'image' ? item.alt : item.title}
          >
            <MediaThumb item={item} />
            <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
            </div>
          </button>
        ))}
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

