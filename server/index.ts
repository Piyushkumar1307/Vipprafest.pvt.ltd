import 'dotenv/config'
import path from 'node:path'
import { existsSync } from 'node:fs'
import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import { z } from 'zod'

const PORT = Number(process.env.PORT ?? 8787)

const ContactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  message: z.string().trim().min(10).max(4000),
})

function envBool(name: string, defaultValue: boolean) {
  const raw = process.env[name]
  if (raw == null) return defaultValue
  return ['1', 'true', 'yes', 'on'].includes(raw.toLowerCase())
}

function mustEnv(name: string) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env var: ${name}`)
  return v
}

function createTransport() {
  const host = mustEnv('SMTP_HOST')
  const port = Number(mustEnv('SMTP_PORT'))
  const user = mustEnv('SMTP_USER')
  const pass = mustEnv('SMTP_PASS')

  const secure = port === 465

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  })
}

const app = express()
app.disable('x-powered-by')
app.set('trust proxy', 1)

app.use(
  cors({
    origin: true,
    credentials: false,
  }),
)
app.use(express.json({ limit: '200kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/contact', async (req, res) => {
  const parsed = ContactSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: 'Invalid form data',
      issues: parsed.error.issues,
    })
  }

  const { name, email, message } = parsed.data

  try {
    const transport = createTransport()

    const from = mustEnv('SMTP_FROM') // e.g. "Vipprafest <no-reply@yourdomain>"
    const to = mustEnv('SMTP_TO') // where you want to receive leads

    const subject = `New website enquiry — ${name}`

    await transport.sendMail({
      from,
      to,
      replyTo: email,
      subject,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        message,
        '',
        `Sent from: ${req.headers['origin'] ?? 'unknown origin'}`,
      ].join('\n'),
    })

    const autoReplyEnabled = envBool('AUTO_REPLY_ENABLED', true)
    if (autoReplyEnabled) {
      const autoSubject =
        process.env.AUTO_REPLY_SUBJECT?.trim() ||
        'We received your message — Vipprafest'
      const autoBody =
        process.env.AUTO_REPLY_BODY?.trim() ||
        [
          `Hi ${name},`,
          '',
          `Thanks for contacting Vipprafest. We have received your message and will respond within one business day.`,
          '',
          'Your message:',
          message,
          '',
          '— Vipprafest',
        ].join('\n')

      await transport.sendMail({
        from,
        to: email,
        subject: autoSubject,
        text: autoBody,
      })
    }

    return res.json({ ok: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return res.status(500).json({ ok: false, error: msg })
  }
})

const isProd = process.env.NODE_ENV === 'production'
const distPath = path.join(process.cwd(), 'dist')

if (isProd && existsSync(distPath)) {
  app.use(express.static(distPath))
  app.get('{*path}', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      res.status(404).type('text').send('Not Found')
      return
    }
    res.sendFile(path.join(distPath, 'index.html'), (err) => {
      if (err) next(err)
    })
  })
} else if (isProd) {
  console.warn('NODE_ENV=production but dist/ is missing — run `npm run build` first.')
}

app.listen(PORT, () => {
  if (isProd && existsSync(distPath)) {
    console.log(`Server (API + static) listening on http://localhost:${PORT}`)
  } else {
    console.log(`API listening on http://localhost:${PORT}`)
  }
})

