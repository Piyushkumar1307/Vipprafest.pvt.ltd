export const company = {
  name: 'Vipprafest',
  tagline:
    'Suppliers of construction materials, machinery parts, manpower, and civil contracting.',
  email: 'VIPPRAFESTPRIVATELIMITED@GMAIL.COM',
  phone: '+91 76439 63125',
  address: 'Jehanabad, Bihar (India)',
  /** Public Telegram @username, no @. Set to '' to hide the Telegram button. */
  telegramUsername: 'VIPPRAFEST',
  /** Prefills the one-tap Telegram link; user still sends the message in Telegram. */
  telegramDefaultMessage: `Hi! I'm interested in Vipprafest's construction services. Can we talk about my project?`,
}

export const services = [
  {
    id: 'materials',
    title: 'Construction material supply',
    desc: 'Concrete, steel, sand, and project-specific materials with consistent quality and dependable timelines.',
  },
  {
    id: 'machinery',
    title: 'Machinery parts & equipment',
    desc: 'Parts and supplies for excavators, loaders, mixer machines, water supply systems, and irrigation equipment.',
  },
  {
    id: 'manpower',
    title: 'Manpower supply',
    desc: 'Skilled and unskilled labour including masons and site support teams—scaled to your project needs.',
  },
  {
    id: 'contracting',
    title: 'Civil & infrastructure contracting',
    desc: 'Construction, renovation, road works, RCC/PCC, bridges, tunnels, drainage, irrigation, piling foundations, and public utility works.',
  },
] as const

export const team = [
  {
    name: 'Pawan Kumar',
    role: 'Director',
    photo: '/team/pawan-kumar.png',
    photoAlt: 'Pawan Kumar, Director — Vipprafest Pvt. Ltd.',
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
