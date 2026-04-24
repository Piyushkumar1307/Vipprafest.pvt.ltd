import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Send, Check } from 'lucide-react'
import { company } from '../data/content'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/ButtonLink'

export function ContactPage() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-bronze">
              Contact
            </p>
            <h1 className="mt-2 font-heading text-4xl font-extrabold text-paper sm:text-5xl">
              Talk through your next move
            </h1>
            <p className="mt-4 text-mist">
              Share a short brief—we reply within one business day with
              next-step options. No RFP required for an initial call.
            </p>
            <dl className="mt-10 space-y-3 text-sm">
              <div>
                <dt className="text-mist/80">Phone</dt>
                <dd>
                  <a
                    href={`tel:${company.phone.replace(/[^\d+]/g, '')}`}
                    className="font-medium text-paper hover:underline"
                  >
                    {company.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-mist/80">Email</dt>
                <dd>
                  <a
                    href={`mailto:${company.email}`}
                    className="font-medium text-paper hover:underline"
                  >
                    {company.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-mist/80">Office</dt>
                <dd className="text-paper/90">{company.address}</dd>
              </div>
            </dl>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-bronze/20 bg-ink-muted/50 p-6 sm:p-8"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-bronze/20 text-bronze">
                  <Check className="size-6" />
                </div>
                <p className="font-heading text-xl font-bold text-paper">
                  Thanks—we will be in touch
                </p>
                <p className="mt-2 text-sm text-mist">
                  This is a demo form with no server; your message was not
                  transmitted.
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  className="mt-6"
                  onClick={() => setSent(false)}
                >
                  Send another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="text-xs font-semibold uppercase tracking-wider text-mist"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="mt-1.5 w-full rounded border border-bronze/20 bg-ink px-3 py-2.5 text-paper placeholder:text-mist/50 focus:border-bronze focus:outline-none"
                    placeholder="Alex Rivera"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold uppercase tracking-wider text-mist"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1.5 w-full rounded border border-bronze/20 bg-ink px-3 py-2.5 text-paper placeholder:text-mist/50 focus:border-bronze focus:outline-none"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="text-xs font-semibold uppercase tracking-wider text-mist"
                  >
                    Project summary
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="mt-1.5 w-full resize-y rounded border border-bronze/20 bg-ink px-3 py-2.5 text-paper placeholder:text-mist/50 focus:border-bronze focus:outline-none"
                    placeholder="Size, city, target groundbreak…"
                  />
                </div>
                <Button type="submit" className="w-full sm:w-auto">
                  <Send className="size-4" />
                  Send message
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </div>
  )
}
