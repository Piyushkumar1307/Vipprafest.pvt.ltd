import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import { company } from '../../data/content'
import { telegramChatUrl } from '../../lib/telegram'

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

const tgUser = company.telegramUsername?.trim() ?? ''
const defaultMsg = company.telegramDefaultMessage

export function TelegramWidget() {
  const id = useId()
  const panelId = `tg-panel-${id}`
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const toggleOpen = useCallback(() => {
    setOpen((wasOpen) => {
      if (!wasOpen) {
        setMessage(defaultMsg)
      }
      return !wasOpen
    })
  }, [])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  function openInTelegram() {
    if (!tgUser) return
    window.open(
      telegramChatUrl(tgUser, message),
      '_blank',
      'noopener,noreferrer',
    )
  }

  if (!tgUser) {
    return null
  }

  return (
    <div className="flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-label="Send a Telegram message to Vippra"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
            className="flex max-h-[min(420px,65dvh)] w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-xl border border-sky-500/30 bg-ink/95 text-left shadow-2xl shadow-black/50 backdrop-blur-md sm:w-[24rem]"
          >
            <div className="flex items-center gap-2 border-b border-bronze/20 bg-ink-muted/50 px-3 py-2.5">
              <div className="flex size-9 items-center justify-center rounded-lg border border-sky-500/40 bg-sky-500/10 text-[#229ED9]">
                <TelegramIcon className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-heading text-sm font-bold text-paper">
                  Telegram
                </p>
                <p className="truncate text-[11px] text-mist">
                  Message @{tgUser} — opens in Telegram
                </p>
              </div>
              <button
                type="button"
                onClick={toggleOpen}
                className="flex size-8 shrink-0 items-center justify-center rounded border border-bronze/20 text-mist transition hover:border-bronze/50 hover:text-paper"
                aria-label="Close Telegram panel"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-3">
              <p className="text-[12px] leading-relaxed text-mist">
                Type your message below. We will open a chat with{' '}
                <span className="text-paper/90">t.me</span> with this text
                pre-filled. You can edit it again in Telegram before sending.
              </p>
              <label htmlFor={`${id}-tg-body`} className="sr-only">
                Your message
              </label>
              <textarea
                id={`${id}-tg-body`}
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault()
                    openInTelegram()
                  }
                }}
                placeholder="e.g. Hi, I'd like a quote for a commercial build…"
                rows={5}
                className="min-h-[7.5rem] w-full resize-y rounded border border-bronze/20 bg-ink px-2.5 py-2 text-[13px] text-paper placeholder:text-mist/45 focus:border-sky-500/50 focus:outline-none"
              />
            </div>

            <div className="border-t border-bronze/20 bg-ink/90 p-2">
              <button
                type="button"
                onClick={openInTelegram}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-sky-600/50 bg-[#229ED9] px-3 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-900/30 transition hover:bg-[#1e8cc4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
              >
                <TelegramIcon className="size-4" />
                Open in Telegram
                <ExternalLink className="size-3 opacity-80" />
              </button>
              <p className="mt-1.5 text-center text-[10px] text-mist/70">
                @{tgUser} ·{' '}
                <span className="whitespace-nowrap text-mist/90">
                  Ctrl or ⌘ + Enter
                </span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={toggleOpen}
        className="relative z-[101] flex h-14 w-14 items-center justify-center rounded-full border border-sky-600/50 bg-[#229ED9] text-white shadow-lg shadow-sky-900/40 transition hover:scale-105 hover:bg-[#1e8cc4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? 'Close Telegram panel' : 'Open Telegram message'}
      >
        {open ? <X className="size-6" /> : <TelegramIcon className="size-7" />}
      </button>
    </div>
  )
}
