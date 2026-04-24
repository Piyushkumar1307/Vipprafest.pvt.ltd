/**
 * Opens a chat with a public @username. Optional ?text= pre-fills the compose field
 * in many Telegram clients (supported on t.me web and apps).
 * @param username - without @, e.g. "vippra"
 */
export function telegramChatUrl(username: string, message?: string): string {
  const u = username.replace(/^@/u, '').trim()
  if (!u) {
    return 'https://t.me/'
  }
  const base = `https://t.me/${encodeURIComponent(u)}`
  const t = message?.trim()
  if (!t) return base
  return `${base}?text=${encodeURIComponent(t)}`
}
