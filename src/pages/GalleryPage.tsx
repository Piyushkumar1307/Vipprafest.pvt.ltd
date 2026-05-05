import { motion } from 'framer-motion'
import { Container } from '../components/ui/Container'
import { Gallery } from '../components/gallery/Gallery'
import { galleryItems } from '../data/gallery'

export function GalleryPage() {
  return (
    <div className="border-b border-bronze/10">
      <section className="relative overflow-hidden py-16 sm:py-22">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-bronze/10 blur-3xl" />
          <div className="absolute -bottom-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-rust/10 blur-3xl" />
        </div>
        <Container>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mx-auto max-w-3xl text-center"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-bronze">
                Gallery
              </p>
              <h1 className="mt-3 font-heading text-4xl font-extrabold text-paper sm:text-5xl">
                Images & videos from our work
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-mist sm:text-base">
                A quick look at the builds, sites, and on-ground work we’ve delivered.
                Tap any image to view it full screen. The gallery scrolls automatically —
                hover to pause.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="mt-10 rounded-3xl border border-bronze/15 bg-ink/15 p-3 backdrop-blur sm:mt-12 sm:p-4"
            >
              <Gallery items={galleryItems} />
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-bronze/10 pt-4">
                <p className="text-xs text-mist">
                  Tip: hover on the gallery to pause scrolling.
                </p>
                <p className="text-xs text-mist">
                  Click any tile to open the viewer. Use ← / → to navigate.
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  )
}

