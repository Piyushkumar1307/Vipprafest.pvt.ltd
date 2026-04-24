import { ChatWidget } from './ChatWidget'
import { WhatsAppWidget } from './WhatsAppWidget'
import { TelegramWidget } from './TelegramWidget'

/**
 * Stacked floating actions (bottom → top): site chat, WhatsApp, Telegram.
 */
export function FloatingContactWidgets() {
  return (
    <div className="pointer-events-none fixed bottom-0 right-0 z-[100] p-4 sm:p-5">
      <div className="pointer-events-auto flex flex-col items-end gap-3">
        <TelegramWidget />
        <WhatsAppWidget />
        <ChatWidget />
      </div>
    </div>
  )
}
