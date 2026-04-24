/** Returns digits only, e.g. +91 92057 26749 → 919205726749 */
export function toWhatsAppNumber(phone: string): string {
  return phone.replace(/\D/g, '')
}

export function whatsAppUrl(phone: string, message: string): string {
  const n = toWhatsAppNumber(phone)
  const text = message.trim()
  const base = `https://wa.me/${n}`
  if (!text) return base
  return `${base}?text=${encodeURIComponent(text)}`
}
