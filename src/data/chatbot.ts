import { company } from './content'

export const chatGreeting = {
  title: `${company.name} Assistant`,
  subtitle: 'Quick answers from our public FAQ.',
  welcome:
    `Hi! I'm a simple assistant with pre-fed answers about ${company.name}. Ask a question or tap a topic below. For detailed estimates, our team will follow up on the contact page.`,
} as const

/** Short labels shown as chips to seed the conversation */
export const suggestedPrompts = [
  'What services do you offer?',
  'How do I get a quote?',
  'Where is your office?',
  'What projects have you done?',
] as const

const defaultFallback = `I don't have a scripted answer for that yet. For specifics, email ${company.email} or call ${company.phone}, or use the **Contact** page and we'll respond within one business day.`

type Knowledge = { keywords: string[]; reply: string }

const knowledge: Knowledge[] = [
  {
    keywords: [
      'hello',
      'hi',
      'hey',
      'good morning',
      'start',
    ],
    reply:
      "Hello! Ask about our services, quotes, location, or projects—or say **contact** for phone and email.",
  },
  {
    keywords: ['service', 'services', 'offer', 'do you build', 'capabilities', 'what can'],
    reply: `${company.name} handles commercial shells, residential builds, site & civil work, and turnkey delivery from preconstruction through warranty. See the full list on the **Services** page for details.`,
  },
  {
    keywords: ['quote', 'estimate', 'pricing', 'price', 'cost', 'bid', 'budget', 'how much'],
    reply: `We prepare estimates after a scope review. Share drawings or a short brief via our **Contact** form or email ${company.email}—we typically reply within one business day with next steps.`,
  },
  {
    keywords: ['contact', 'phone', 'email', 'call', 'reach', 'speak', 'human'],
    reply: `**Phone:** ${company.phone}  
**Email:** ${company.email}  
**Address:** ${company.address}  
You can also use the **Contact** page on this site.`,
  },
  {
    keywords: ['location', 'address', 'where', 'office', 'visit', 'map'],
    reply: `Our office is at **${company.address}**. Call ahead if you are planning a visit so we can expect you.`,
  },
  {
    keywords: ['project', 'projects', 'portfolio', 'work', 'built', 'past', 'example'],
    reply: `We publish selected work on the **Projects** page (logistics, multi-family, civic, and more). Tell us your sector and we can point you to a relevant example in conversation with our team.`,
  },
  {
    keywords: ['hour', 'hours', 'open', 'when', 'time'],
    reply: `Office hours are typically **weekdays, 7:00 a.m. to 5:00 p.m. PT**—confirm by phone for holidays or on-site walkthroughs outside normal hours.`,
  },
  {
    keywords: [
      'insurance',
      'license',
      'bond',
      'certified',
      'compliance',
      'safety',
    ],
    reply: `We carry standard contractor insurance and can provide COIs and license numbers for your RFP. Mention your requirements in your message so we include the right documents.`,
  },
  {
    keywords: ['emergency', 'urgent', 'leak', 'site issue'],
    reply: `For active project emergencies, use the superintendent line provided in your contract. If you do not have one, call ${company.phone} and choose the urgent option if available—otherwise we will return your call as soon as possible.`,
  },
  {
    keywords: ['thanks', 'thank you', 'bye', 'goodbye', 'thx'],
    reply: `You're welcome! If you need anything else, just ask. When you're ready to talk scope, the **Contact** page is the fastest way to get to our team.`,
  },
  {
    keywords: ['bot', 'ai', 'who are you', 'real'],
    reply: `I'm a **fixed FAQ bot** on this site—I only use pre-fed answers. For real project decisions, a person from ${company.name} will help you on email or a call.`,
  },
]

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s?]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function getChatReply(userMessage: string): string {
  const n = normalize(userMessage)
  if (!n) {
    return 'Ask a question in your own words, or tap one of the suggested topics above.'
  }

  let best: { score: number; reply: string } = { score: 0, reply: defaultFallback }

  for (const row of knowledge) {
    let score = 0
    for (const kw of row.keywords) {
      const k = kw.toLowerCase()
      if (n.includes(k)) {
        score += k.length > 3 ? 2 : 1
      }
    }
    if (score > best.score) {
      best = { score, reply: row.reply }
    }
  }

  if (best.score > 0) {
    return best.reply
  }
  return defaultFallback
}
