import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X, Send, Bot } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  chatGreeting,
  getChatReply,
  suggestedPrompts,
} from '../../data/chatbot'
import { cn } from '../../lib/cn'

type Role = 'user' | 'bot'

type Message = { id: string; role: Role; text: string; at: number }

function nextId() {
  return `m-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function formatRichText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-paper">
          {p.slice(2, -2)}
        </strong>
      )
    }
    return <span key={i}>{p}</span>
  })
}

export function ChatWidget() {
  const id = useId()
  const panelId = `chat-panel-${id}`
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const pushBot = useCallback((text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: nextId(), role: 'bot', text, at: Date.now() },
    ])
  }, [])

  const pushUser = useCallback((text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: nextId(), role: 'user', text, at: Date.now() },
    ])
  }, [])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  const toggleOpen = useCallback(() => {
    if (!open) {
      setMessages((prev) =>
        prev.length > 0
          ? prev
          : [
              {
                id: nextId(),
                role: 'bot',
                text: chatGreeting.welcome,
                at: Date.now(),
              },
            ],
      )
    }
    setOpen((o) => !o)
  }, [open])

  useEffect(() => {
    const el = listRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [messages, open])

  function sendText(raw: string) {
    const text = raw.trim()
    if (!text) return
    pushUser(text)
    setInput('')
    queueMicrotask(() => {
      const reply = getChatReply(text)
      pushBot(reply)
    })
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    sendText(input)
  }

  return (
    <div className="flex flex-col items-end gap-3">
      <AnimatePresence>
          {open && (
            <motion.div
              id={panelId}
              role="dialog"
              aria-label="Chat with Vippra assistant"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 360, damping: 30 }}
              className="flex max-h-[min(520px,70dvh)] w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-xl border border-bronze/30 bg-ink/95 text-left shadow-2xl shadow-black/50 backdrop-blur-md sm:w-[24rem]"
            >
              <div className="flex items-center gap-2 border-b border-bronze/20 bg-ink-muted/50 px-3 py-2.5">
                <div className="flex size-9 items-center justify-center rounded-lg border border-bronze/30 bg-bronze/10 text-bronze">
                  <Bot className="size-4" strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-sm font-bold text-paper">
                    {chatGreeting.title}
                  </p>
                  <p className="truncate text-[11px] text-mist">
                    {chatGreeting.subtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={toggleOpen}
                  className="flex size-8 shrink-0 items-center justify-center rounded border border-bronze/20 text-mist transition hover:border-bronze/50 hover:text-paper"
                  aria-label="Close chat"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div
                ref={listRef}
                className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3"
              >
                {messages.length <= 1 && (
                  <div className="flex flex-wrap gap-1.5">
                    {suggestedPrompts.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => sendText(q)}
                        className="rounded-full border border-bronze/25 bg-ink/80 px-2.5 py-1 text-left text-[11px] text-mist transition hover:border-bronze/50 hover:text-paper"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={cn(
                      'flex',
                      m.role === 'user' ? 'justify-end' : 'justify-start',
                    )}
                  >
                    <div
                      className={cn(
                        'max-w-[92%] rounded-lg px-2.5 py-2 text-[13px] leading-snug',
                        m.role === 'user'
                          ? 'bg-bronze/20 text-paper'
                          : 'border border-bronze/15 bg-ink-muted/60 text-mist',
                      )}
                    >
                      <p className="whitespace-pre-line">
                        {formatRichText(m.text)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <form
                onSubmit={onSubmit}
                className="border-t border-bronze/20 bg-ink/90 p-2"
              >
                <div className="flex gap-1.5">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        sendText(input)
                      }
                    }}
                    placeholder="Type a message…"
                    rows={1}
                    className="min-h-10 max-h-28 w-full flex-1 resize-y rounded border border-bronze/20 bg-ink px-2 py-2 text-[13px] text-paper placeholder:text-mist/50 focus:border-bronze/60 focus:outline-none"
                    aria-label="Message"
                  />
                  <button
                    type="submit"
                    className="flex size-10 shrink-0 items-center justify-center rounded border border-bronze/40 bg-bronze/15 text-bronze transition hover:bg-bronze/25"
                    aria-label="Send message"
                  >
                    <Send className="size-4" />
                  </button>
                </div>
                <p className="mt-1.5 text-center text-[10px] text-mist/70">
                  Prefer email?{' '}
                  <Link
                    to="/contact"
                    className="text-bronze underline-offset-2 hover:underline"
                    onClick={() => setOpen(false)}
                  >
                    Contact page
                  </Link>
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={toggleOpen}
          className="relative z-[101] flex h-14 w-14 items-center justify-center rounded-full border border-bronze/40 bg-bronze/90 text-ink shadow-lg shadow-bronze/20 transition hover:scale-105 hover:bg-bronze focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze"
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          aria-label={open ? 'Close chat panel' : 'Open chat with Vippra assistant'}
        >
          {open ? (
            <X className="size-6" />
          ) : (
            <MessageCircle className="size-6" />
          )}
        </button>
    </div>
  )
}
