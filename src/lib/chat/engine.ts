import { BRAND, INDUSTRIES_SERVED } from '../../data/brand';
import { groupCompanies } from '../../data/groupCompanies';
import { partnershipTypes } from '../../data/partnerships';
import { roadmap } from '../../data/roadmap';
import { chairman, managingDirector } from '../../data/leadership';
import { news } from '../../data/news';
import { about } from '../../data/about';

export interface ChatLink {
  label: string;
  /** Section path relative to the active demo, e.g. "group-companies" */
  section: string;
}

export interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  links?: ChatLink[];
}

export interface ChatReply {
  text: string;
  links?: ChatLink[];
}

/**
 * Provider abstraction. The demo uses the deterministic rule-based provider below.
 * To integrate a real AI model later, implement `ChatProvider` with a call to your own
 * secure backend endpoint (see `createBackendProvider`). Never call a model API directly
 * from the browser and never place API keys in VITE_ variables.
 */
export interface ChatProvider {
  reply(history: ChatMessage[], input: string): Promise<ChatReply>;
}

export const SUGGESTED_QUESTIONS = [
  'What does the group do?',
  'Which companies are in the group?',
  'Which industries do you serve?',
  'How can I become a distributor?',
  'What is on the future roadmap?',
  'How do I contact you?',
];

export const GREETING: ChatReply = {
  text: `Hello, I'm the ${BRAND.shortName} demo assistant. I can answer questions about the group, our companies, industries, partnership opportunities, the roadmap and how to reach us. Responses come from the sample website content.`,
};

interface Intent {
  id: string;
  keywords: string[];
  respond: (input: string) => ChatReply;
}

const companyKeywords: Record<string, string[]> = {
  'nexora-industrial-systems': ['automation', 'robot', 'production line', 'industrial systems', 'factory'],
  'nexora-engineering-projects': ['engineering', 'epc', 'construction', 'infrastructure', 'project'],
  'nexora-energy-solutions': ['energy', 'solar', 'wind', 'renewable', 'power'],
  'nexora-digital-technologies': ['digital', 'software', 'iot', 'data', 'cyber', 'technology company', 'analytics'],
  'nexora-logistics': ['logistic', 'warehouse', 'supply chain', 'distribution hub', 'shipping', 'freight'],
  'nexora-precision-components': ['component', 'machining', 'cnc', 'fabrication', 'parts'],
};

const list = (items: readonly string[]) => items.map((i) => `• ${i}`).join('\n');

const intents: Intent[] = [
  {
    id: 'partnership',
    keywords: ['partner', 'dealer', 'distributor', 'distribution', 'oem', 'vendor', 'supplier', 'invest', 'collaborat', 'joint venture', 'register'],
    respond: (input) => {
      const specific = partnershipTypes.find((p) =>
        (p.id === 'dealer' && /dealer|distribut/.test(input)) ||
        (p.id === 'oem' && /\boem\b/.test(input)) ||
        (p.id === 'technology' && /technology partner|tech partner|collaborat/.test(input)) ||
        (p.id === 'investment' && /invest/.test(input)) ||
        (p.id === 'vendor' && /vendor|supplier|register/.test(input)),
      );
      if (specific) {
        return {
          text: `${specific.title}: ${specific.summary}\n\nIdeal for: ${specific.idealFor}\n\nYou can complete the dedicated ${specific.shortTitle.toLowerCase()} form on the Partner With Us page.`,
          links: [{ label: `Open ${specific.shortTitle} form`, section: `partner-with-us?type=${specific.id}` }],
        };
      }
      return {
        text: `We offer five partnership routes:\n${list(partnershipTypes.map((p) => p.title))}\n\nEach has its own short application form.`,
        links: [{ label: 'Partner With Us', section: 'partner-with-us' }],
      };
    },
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'phone', 'call', 'address', 'office', 'reach', 'location', 'where are you', 'career', 'job'],
    respond: () => ({
      text: `You can reach the group at:\n• Email: ${BRAND.contact.email}\n• Phone: ${BRAND.contact.phone}\n• ${BRAND.offices[0].label}: ${BRAND.offices[0].lines.join(', ')}\n\nThese are placeholder details for the design demonstration.`,
      links: [{ label: 'Contact page', section: 'contact' }],
    }),
  },
  {
    id: 'roadmap',
    keywords: ['roadmap', 'future', 'plan', 'strategy', 'expansion', 'next', 'vision', 'goal', 'sustainab'],
    respond: () => ({
      text: `Our illustrative roadmap has three horizons:\n${list(roadmap.map((p) => `${p.label} (${p.horizon}): ${p.title}`))}\n\nAll milestones are sample content pending client confirmation.`,
      links: [{ label: 'View the roadmap', section: 'future-roadmap' }],
    }),
  },
  {
    id: 'industries',
    keywords: ['industr', 'sector', 'serve', 'customer', 'client', 'market'],
    respond: () => ({
      text: `Group companies serve a broad range of industries, including:\n${list(INDUSTRIES_SERVED)}`,
      links: [{ label: 'Explore group companies', section: 'group-companies' }],
    }),
  },
  {
    id: 'products',
    keywords: ['product', 'service', 'offer', 'solution', 'capabilit', 'what do you sell', 'provide'],
    respond: () => ({
      text: `Our main offerings by company:\n${list(groupCompanies.map((c) => `${c.shortName}: ${c.offerings.slice(0, 2).join(', ')}`))}`,
      links: [{ label: 'See all offerings', section: 'group-companies' }],
    }),
  },
  {
    id: 'companies',
    keywords: ['compan', 'subsidiar', 'business', 'portfolio', 'brands', 'divisions'],
    respond: () => ({
      text: `The group currently includes ${groupCompanies.length} sample companies:\n${list(groupCompanies.map((c) => `${c.name} — ${c.sector}`))}`,
      links: [{ label: 'Group Companies', section: 'group-companies' }],
    }),
  },
  {
    id: 'leadership',
    keywords: ['chairman', 'director', 'leader', 'ceo', 'management', 'board', 'founder', 'who runs'],
    respond: () => ({
      text: `The group is led by ${chairman.name} (${chairman.role}) and ${managingDirector.name} (${managingDirector.role}), supported by a board of directors and advisors. These are fictional placeholder profiles.`,
      links: [{ label: 'Leadership', section: 'leadership' }],
    }),
  },
  {
    id: 'news',
    keywords: ['news', 'latest', 'announcement', 'event', 'update', 'video', 'media'],
    respond: () => ({
      text: `Recent sample updates:\n${list(news.slice(0, 3).map((n) => n.title))}`,
      links: [{ label: 'News & Media', section: 'news' }],
    }),
  },
  {
    id: 'history',
    keywords: ['history', 'about', 'story', 'founded', 'group', 'who are you', 'what do you do', 'mission', 'values', 'established'],
    respond: () => ({
      text: `${about.story[0]}\n\n${about.story[2]}\n\nOur mission: ${about.mission}`,
      links: [{ label: 'About Us', section: 'about-us' }],
    }),
  },
  {
    id: 'greeting',
    keywords: ['hello', 'hi ', 'hey', 'good morning', 'good afternoon', 'good evening'],
    respond: () => ({ text: 'Hello! What would you like to know about the group? You can pick one of the suggested questions or type your own.' }),
  },
];

export function respond(rawInput: string): ChatReply {
  const input = ` ${rawInput.toLowerCase().trim()} `;

  // A specific company question takes precedence over generic intents.
  for (const [slug, words] of Object.entries(companyKeywords)) {
    if (words.some((w) => input.includes(w)) && !/partner|dealer|distribut|vendor|invest/.test(input)) {
      const c = groupCompanies.find((g) => g.slug === slug)!;
      return {
        text: `${c.name} (${c.sector})\n${c.intro}\n\nCore offerings:\n${list(c.offerings)}\n\nIndustries served: ${c.industries.join(', ')}.`,
        links: [{ label: `About ${c.shortName}`, section: `group-companies/${c.slug}` }],
      };
    }
  }

  for (const intent of intents) {
    if (intent.keywords.some((k) => input.includes(k))) return intent.respond(input);
  }

  return {
    text: "I'm a demo assistant with a limited set of sample answers. I can help with the group's history, companies, products and services, industries, partnerships, the roadmap and contact details. Try one of the suggestions below.",
  };
}

/** Deterministic provider used for the presentation. Adds a short delay to show the loading state. */
export const ruleBasedProvider: ChatProvider = {
  reply: (_history, input) => new Promise((resolve) => setTimeout(() => resolve(respond(input)), 650 + Math.random() * 400)),
};

/**
 * Example of how a production provider would look. It posts to YOUR backend
 * (e.g. a Vercel serverless function at /api/chat), which holds the API key server-side.
 * Not used in demo mode.
 */
export function createBackendProvider(endpoint = '/api/chat'): ChatProvider {
  return {
    async reply(history, input) {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: history.map(({ role, text }) => ({ role, text })), input }),
      });
      if (!res.ok) throw new Error(`Chat request failed (${res.status})`);
      return (await res.json()) as ChatReply;
    },
  };
}
