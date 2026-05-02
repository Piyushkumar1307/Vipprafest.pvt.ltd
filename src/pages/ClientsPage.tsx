import { motion } from 'framer-motion'
import { clients } from '../data/content'
import { Container } from '../components/ui/Container'

export function ClientsPage() {
  return (
    <div className="py-20 sm:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col gap-4 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-bronze">
            Clients
          </p>
          <h1 className="font-heading text-4xl font-extrabold text-paper sm:text-5xl">
            Trusted by Government & Infrastructure Partners
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-mist sm:text-base">
            We partner with government departments and public bodies to deliver strong, reliable
            construction supply, machinery parts, workforce support, and civil contracting.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client, index) => (
            <motion.article
              key={client.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * index, duration: 0.4 }}
              className="flex flex-col items-center gap-4 rounded-3xl border border-bronze/10 bg-ink/70 p-6 text-center"
            >
              <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-2 border-bronze/20 bg-ink shadow-xl shadow-black/10">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-full w-full object-contain object-center"
                />
              </div>
              <p className="font-semibold text-paper">{client.name}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </div>
  )
}
