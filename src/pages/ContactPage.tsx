import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Send, Check, Loader2 } from 'lucide-react'
import { company } from '../data/content'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/ButtonLink'

export function ContactPage() {
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [values, setValues] = useState({ name: '', email: '', message: '' })

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const name = values.name.trim()
    const email = values.email.trim()
    const message = values.message.trim()

    if (name.length < 2) {
      setError('Please enter your name (at least 2 characters).')
      return
    }
    if (email.length < 3 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    if (message.length < 10) {
      setError(
        'Please add a slightly longer summary — at least 10 characters — so we can respond helpfully.',
      )
      return
    }

    setSubmitting(true)

    try {
      const endpoint =
        (import.meta.env.VITE_CONTACT_API_URL as string | undefined) ??
        '/api/contact'

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null
        throw new Error(data?.error ?? 'Failed to send message')
      }

      setSent(true)
      setValues({ name: '', email: '', message: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {submitting && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-live="polite"
          aria-busy="true"
          aria-labelledby="contact-sending-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-sm rounded-2xl border border-bronze/25 bg-ink-muted/95 p-8 text-center shadow-2xl shadow-bronze/10"
          >
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-bronze/15 text-bronze">
              <Loader2 className="size-8 animate-spin" aria-hidden />
            </div>
            <p
              id="contact-sending-title"
              className="mt-5 font-heading text-lg font-bold text-paper"
            >
              Sending your message
            </p>
            <p className="mt-2 text-sm text-mist">
              Please wait — this usually takes just a moment.
            </p>
          </motion.div>
        </div>
      )}
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
                  Your message has been sent to our inbox. We typically reply
                  within one business day.
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
                {error && (
                  <div className="rounded-lg border border-rust/40 bg-rust/10 px-3 py-2 text-sm text-paper">
                    {error}
                  </div>
                )}
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
                    minLength={2}
                    maxLength={80}
                    className="mt-1.5 w-full rounded border border-bronze/20 bg-ink px-3 py-2.5 text-paper placeholder:text-mist/50 focus:border-bronze focus:outline-none"
                    placeholder="Name"
                    value={values.name}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, name: e.target.value }))
                    }
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
                    maxLength={160}
                    className="mt-1.5 w-full rounded border border-bronze/20 bg-ink px-3 py-2.5 text-paper placeholder:text-mist/50 focus:border-bronze focus:outline-none"
                    placeholder="you@company.com"
                    value={values.email}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, email: e.target.value }))
                    }
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
                    minLength={10}
                    maxLength={4000}
                    rows={4}
                    className="mt-1.5 w-full resize-y rounded border border-bronze/20 bg-ink px-3 py-2.5 text-paper placeholder:text-mist/50 focus:border-bronze focus:outline-none"
                    placeholder="Size, city, target groundbreak…"
                    value={values.message}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, message: e.target.value }))
                    }
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full sm:w-auto disabled:pointer-events-none disabled:opacity-40"
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  <Send className="size-4" />
                  {submitting ? 'Sending…' : 'Send message'}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </div>
    </>
  )
}
