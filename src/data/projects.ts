// Cover and link of every project the page names. The words (title and the one
// sentence) live with the rest of the copy in src/i18n/content.ts, per language.
// The first link is the one a card or a name points to; a project without a
// public link is rendered as plain text.

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  cover?: string;
  /** width / height of the cover file, so a card can show it whole */
  coverRatio?: number;
  links: ProjectLink[];
}

export const projects: Project[] = [
  // voice agents
  {
    id: 'dance-voice-agent',
    cover: '/images/dance_voice_agent_cover.svg', coverRatio: 1200 / 630,
    links: [{ label: 'demo', href: 'https://dance-voice-agent-dashboard.vercel.app' }],
  },
  {
    id: 'shy-order',
    cover: '/images/shy_order_cover.svg', coverRatio: 1200 / 630,
    links: [{ label: 'demo', href: 'https://shy-order.onrender.com' }],
  },
  // no public link: the tester runs in-house
  { id: 'collaudio', links: [] },
  // no public link: the APK is not distributed (every install burns real voice minutes)
  { id: 'parlando', cover: '/images/parlando.webp', links: [] },

  // AI automations
  {
    id: 'company-brain',
    cover: '/images/company_brain_cover.svg', coverRatio: 1200 / 630,
    links: [{ label: 'live demo', href: 'https://company-brain-alberto.onrender.com' }],
  },
  { id: 'zero-to-hubspot', cover: '/images/zero-to-hubspot.webp', coverRatio: 1600 / 900, links: [] },
  {
    id: 'beat-agent',
    cover: '/images/beat_agent_cover.svg',
    links: [{ label: 'part of Beat Store', href: 'https://ffinnico.netlify.app' }],
  },
  { id: 'invoice-agent', cover: '/images/invoice_agent_cover_v3.svg', links: [] },

  // sites & platforms
  {
    id: 'beat-store',
    cover: '/images/beat-store.webp', coverRatio: 1000 / 562,
    // a preview: the store launches on the producer's own domain in early 2027
    links: [{ label: 'preview', href: 'https://ffinnico.netlify.app' }],
  },
  {
    id: 'alex-bartok',
    cover: '/images/alex-bartok.webp', coverRatio: 1600 / 900,
    links: [{ label: 'visit site', href: 'https://alexbartokmusic.com' }],
  },
  {
    id: 'filoconduttore',
    cover: '/images/filoconduttore.webp',
    links: [{ label: 'visit site', href: 'https://filoconduttore.it' }],
  },

  // more
  {
    id: 'lyra',
    cover: '/images/lyra.webp',
    links: [{ label: 'try it', href: 'https://lyra-green-chi.vercel.app' }],
  },
  {
    id: 'thesis',
    cover: '/images/thesis.webp',
    links: [{ label: 'learn more', href: 'https://youtu.be/2TnS3kzFt2c' }],
  },
  {
    id: 'beyond-space',
    cover: '/images/rave_presentation.webp',
    links: [{ label: 'demo', href: 'https://beyond-space-kappa.vercel.app' }],
  },
  {
    id: 'wdf-h9000',
    cover: '/images/project-course-presentation.webp',
    links: [{ label: 'learn more', href: 'https://github.com/albedimaria/WDF-on-H9000' }],
  },
];
