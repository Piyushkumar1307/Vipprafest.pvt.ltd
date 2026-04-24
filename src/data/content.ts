export const company = {
  name: 'Vippra',
  tagline: 'Structure first. Finishes that endure.',
  email: 'hello@vippra.build',
  phone: '+91 92057 26749',
  address: '1200 Foundry Street, Bayview District, CA',
  /** Public Telegram @username, no @. Set to '' to hide the Telegram button. */
  telegramUsername: 'vippra',
  /** Prefills the one-tap Telegram link; user still sends the message in Telegram. */
  telegramDefaultMessage: `Hi! I'm interested in Vippra's construction services. Can we talk about my project?`,
}

export const services = [
  {
    id: 'commercial',
    title: 'Commercial shells',
    desc: 'High-bay steel, tilt-up, and complex sequencing for logistics and life-science clients.',
  },
  {
    id: 'residential',
    title: 'Residential build',
    desc: 'Custom homes, ADUs, and multi-unit with thermal-first envelopes and honest timelines.',
  },
  {
    id: 'civil',
    title: 'Site & civil',
    desc: 'Grading, utility coordination, and stormwater plans aligned with your permit package.',
  },
  {
    id: 'turnkey',
    title: 'Turnkey delivery',
    desc: 'Owner-representative through punch list. One ledger, one accountable team.',
  },
] as const

export const projects = [
  {
    name: 'Harbor Logistics Annex',
    type: 'Steel + tilt-up',
    year: '2024',
    area: '240k sq ft',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format&fit=crop',
  },
  {
    name: 'Redwood Residences',
    type: 'Multi-family wood frame',
    year: '2023',
    area: '86 units',
    image:
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80&auto=format&fit=crop',
  },
  {
    name: 'Civic Arts Pavilion',
    type: 'Glulam + cross-lam',
    year: '2025',
    area: '18k sq ft',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format&fit=crop',
  },
] as const
