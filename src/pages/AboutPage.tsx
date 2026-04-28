import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { TeamSection } from '../components/home/TeamSection'
import { company } from '../data/content'

const principles = [
  'Reliable supply and execution with clear timelines.',
  'Project-ready teams for public and private works.',
  'Quality-first delivery with practical coordination on site.',
] as const

const img =
  'https://firebasestorage.googleapis.com/v0/b/pdfview-india.appspot.com/o/vipprafes%2FWhatsApp%20Image%202026-04-25%20at%2015.23.23.jpeg?alt=media&token=f5fbc8ec-130a-45c5-9aff-0e7eeca9e1b7us'

export function AboutPage() {
  return (
    <div className="border-b border-bronze/10">
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-bronze">
                Who we are
              </p>
              <h1 className="mt-2 font-heading text-4xl font-extrabold text-paper sm:text-5xl">
                Built for supply, delivery, and execution
              </h1>
              <p className="mt-6 text-lg text-mist">
                {company.name} supports construction and infrastructure work by
                supplying key materials like concrete, steel, and sand; providing
                machinery parts and irrigation equipment; and arranging manpower
                supply (skilled and unskilled labour). We also undertake civil and
                infrastructure contracts including construction, renovation, repairs,
                road works, RCC/PCC works, drainage, irrigation works, and piling
                foundations for buildings and roads.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="overflow-hidden rounded-xl border border-bronze/20"
            >
              <img
                src={img}
                alt="Construction site with steel and cranes"
                className="aspect-[4/3] w-full object-cover"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="border-t border-bronze/10 bg-ink-muted/30 py-20">
        <Container>
          <h2 className="font-heading text-2xl font-bold text-paper sm:text-3xl">
            Operating principles
          </h2>
          <ul className="mt-8 space-y-4">
            {principles.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * i }}
                className="flex gap-3 rounded-lg border border-bronze/10 bg-ink/40 p-4"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-bronze" />
                <span className="text-mist">{p}</span>
              </motion.li>
            ))}
          </ul>
        </Container>
      </section>

      <TeamSection showAboutLink={false} />
    </div>
  )
}
