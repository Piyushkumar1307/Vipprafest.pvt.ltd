import { motion } from 'framer-motion'
import { Container } from '../components/ui/Container'
import { Gallery } from '../components/gallery/Gallery'
import { galleryItems } from '../data/gallery'

export function GalleryPage() {
  return (
    <div className="border-b border-bronze/10">
      <section className="py-20 sm:py-28">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-bronze">
              Gallery
            </p>
            <h1 className="mt-2 font-heading text-4xl font-extrabold text-paper sm:text-5xl">
              Images & videos from our work
            </h1>
          </motion.div>

          <div className="mt-12">
            <Gallery items={galleryItems} />
          </div>
        </Container>
      </section>
    </div>
  )
}

