// Single source of truth for the work section.
// English copy is canonical here; IT/ES come from the i18n dicts in Phase 4.
// Content reconciled against the live site.

export interface ProjectLink {
  label: string;
  href: string;
}

/** A feature line. A plain string renders as-is; the {lead, body} form
 *  bolds a short lead ("what it is") before the rest — used on the
 *  flagship/services-referenced projects for scannability. */
export type Bullet = string | { lead: string; body: string };

/** One numeric proof point, revealed when the engineering block is expanded. */
export interface EngineeringStat {
  value: string;
  label: string;
}

/** Optional "rigor + measures" block — collapsed by default, expandable.
 *  Only the flagship projects carry it; the rest stay metric-free. */
export interface Engineering {
  /** qualitative signal, always visible in the collapsed summary */
  summary: string;
  /** the numbers, revealed on expand */
  stats: EngineeringStat[];
  note?: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'Client work' | 'Hackathon' | 'Products' | 'Research' | 'Experiments';
  /** chips this project appears under in the work filter */
  filters: string[];
  featured: boolean;
  badge?: string;
  /** collaboration credit (e.g. the designer), shown under the cover */
  credit?: { role: string; name: string; href?: string };
  /** short subtitle, used in both featured and grid cards */
  oneliner: string;
  bullets: Bullet[];
  stack: string[];
  ai?: string[];
  hardware?: string[];
  engineering?: Engineering;
  cover: string;
  links: ProjectLink[];
}

export const projects: Project[] = [
  {
    id: 'alex-bartok',
    title: 'Alex Bartok Music',
    category: 'Client work',
    filters: ['Client work'],
    featured: true,
    oneliner: 'A musician’s broken website rebuilt from scratch — fast, secure, trilingual, with a paid client area.',
    bullets: [
      { lead: 'Rebuilt as a modern app', body: 'public site + private client area, in three languages (IT/EN/ES) — from a site that barely worked.' },
      { lead: 'Every project gets its own room', body: 'versioned audio, comments pinned to the exact second, downloads reserved for paying clients.' },
      { lead: 'Delivered hardened', body: 'automatic checks on every change, secured, anti-spam contact form; two access leaks found and closed.' },
    ],
    stack: ['React', 'TypeScript', 'Supabase', 'Vite', 'Tailwind'],
    engineering: {
      summary: 'RLS-secured · CI-gated · hardened',
      stats: [
        { value: '2', label: 'RLS leaks closed' },
        { value: '4', label: 'tests · CI gate' },
        { value: 'HSTS·CSP', label: 'headers' },
      ],
      note: 'ownership + is_paid RLS paywall · signed-URL downloads · GitHub Actions typecheck/lint/build/test gate',
    },
    cover: '/images/alex-bartok.webp',
    links: [{ label: 'visit site ↗', href: 'https://alexbartokmusic.com' }],
  },
  {
    id: 'lyra',
    title: 'Lyra',
    category: 'Hackathon',
    filters: ['Hackathons', 'Audio / ML'],
    featured: true,
    badge: 'Musixmatch Musicathon',
    oneliner: 'Lyrics-first music discovery — a playlist that travels your emotions.',
    bullets: [
      { lead: 'Describe a mood', body: 'in plain language or tap a 12-emotion wheel — a Claude agent resolves it and Lyra builds the playlist as a trajectory through that space, not a flat list.' },
      { lead: 'Chosen by the lyrics', body: 'sentence-transformer embeddings place each track on a valence × energy taxonomy; the exact cited line that matched your mood is surfaced via Musixmatch.' },
      { lead: 'Steer live', body: 'more like this / change the mood / raise the energy — reshaping the queue without cutting the current track; a 3D compass turns to your mood and traces the path.' },
    ],
    stack: ['Next.js 16', 'TypeScript', 'react-three-fiber', 'FastAPI', 'Vercel', 'Hugging Face'],
    ai: ['Claude (Anthropic)', 'sentence-transformers (mpnet)', 'Musixmatch Pro API'],
    cover: '/images/lyra.webp',
    links: [
      { label: 'try it ↗', href: 'https://lyra-green-chi.vercel.app' },
      { label: 'code ↗', href: 'https://github.com/dr-zaib/Lyra_musicathon' },
    ],
  },
  {
    id: 'beat-store',
    title: 'Beat Store',
    category: 'Client work',
    filters: ['Client work'],
    featured: true,
    badge: '★ first client',
    credit: { role: 'design', name: 'Laura Zanchetta' },
    oneliner: 'A producer’s online store: beats for sale with previews, licensing and in-page checkout.',
    bullets: [
      { lead: 'In-page checkout', body: 'waveform previews, a multi-license cart (MP3 / WAV / stems / exclusive) and Stripe without leaving the page.' },
      { lead: 'Delivers itself', body: 'every purchase sends private download links, valid only for the buyer.' },
      { lead: 'Running costs cut to the bone', body: 'audio flies from Cloudflare straight to the browser, no server in between.' },
    ],
    stack: ['Next.js 16', 'TypeScript', 'Supabase', 'Stripe', 'Cloudflare R2', 'Resend', 'Netlify'],
    ai: ['Claude API'],
    engineering: {
      summary: 'tested · CI-gated · observability',
      stats: [
        { value: '86%', label: 'money-path cov' },
        { value: '34', label: 'tests · CI gate' },
        { value: 'Sentry', label: 'errors · p95' },
      ],
      note: 'Vitest + Playwright · GitHub Actions blocking merges · RLS default-deny',
    },
    cover: '/images/beat-store.webp',
    links: [
      { label: 'visit store ↗', href: 'https://ffinnico.netlify.app' },
    ],
  },
  {
    id: 'company-brain',
    title: 'Company Brain',
    category: 'Hackathon',
    filters: ['Hackathons'],
    featured: true,
    badge: '★ Top 10',
    oneliner: 'An AI agent that answers questions about a company’s real data — exact numbers, nothing made up.',
    bullets: [
      { lead: 'Answers from real data', body: 'ask in plain language about clients, orders or calls — the agent reads the CRM, the ERP and the documents and cites its sources.' },
      { lead: 'Math done by code, not the AI', body: 'the model only picks where to look and how to explain; the numbers are always exact.' },
      { lead: 'Top 10 at Cursor × Yellow Tech', body: 'qualified for the Italian National Hackathon League.' },
    ],
    stack: ['Python', 'FastAPI', 'Docker', 'Render'],
    ai: ['LLM tool-calling (Mistral via Regolo)', 'BM25 retrieval'],
    cover: '/images/company_brain_cover.svg',
    links: [
      { label: 'live demo ↗', href: 'https://company-brain-alberto.onrender.com' },
      { label: 'code ↗', href: 'https://github.com/albedimaria/company-brain-alberto' },
    ],
  },
  {
    id: 'dance-voice-agent',
    title: 'Ritmo Tropicale Voice Agent',
    category: 'Client work',
    filters: ['Client work', 'Voice AI'],
    featured: true,
    oneliner: 'A dance school’s AI phone assistant: answers 24/7, books, reschedules, informs.',
    bullets: [
      { lead: 'Handles the call on its own', body: 'recognises the student, gives course info, books, cancels and reschedules — and hands to a human when needed.' },
      { lead: 'Italian and Spanish, no talk-over', body: 'answers instantly; confirmations and reminders go out by SMS.' },
      { lead: 'Tested before going live', body: '9/9 real scenarios passed, with a panel tracking the time and cost of every call.' },
    ],
    stack: ['Python', 'FastAPI', 'Twilio', 'Supabase', 'Next.js', 'Render', 'Vercel'],
    ai: ['GPT-4o', 'Deepgram', 'ElevenLabs'],
    engineering: {
      summary: 'evaluated · instrumented · cost-tracked',
      stats: [
        { value: '9/9', label: 'scenario evals' },
        { value: '4.2s', label: 'p50 latency' },
        { value: '6.3s', label: 'p95 latency' },
      ],
      note: 'fixed-scenario eval runner on the live LLM + DB · per-turn token/cost metrics · /observability + /evals dashboards',
    },
    cover: '/images/dance_voice_agent_cover.svg',
    links: [
      { label: 'demo ↗', href: 'https://dance-voice-agent-dashboard.vercel.app' },
      { label: 'dashboard ↗', href: 'https://dance-voice-agent-dashboard.vercel.app/dashboard' },
    ],
  },
  {
    id: 'shy-order',
    title: 'Shy Order',
    category: 'Products',
    filters: ['Products', 'Voice AI'],
    featured: false,
    oneliner: 'Autonomous voice agent with outbound calling.',
    bullets: [
      { lead: 'Collects the booking in-browser', body: 'chats with the user to gather the details before calling.' },
      { lead: 'Calls the restaurant itself', body: 'autonomously dials via Twilio and handles the full phone conversation end-to-end.' },
      { lead: 'Remembers you', body: 'persistent cross-session memory that survives ElevenLabs’ stateless calls — recognises returning customers and proposes “the usual”.' },
      { lead: 'Admin dashboard', body: 'session analytics and revenue tracking.' },
    ],
    stack: ['Python', 'FastAPI', 'Twilio', 'Supabase', 'Stripe', 'Next.js', 'Vercel'],
    ai: ['ElevenLabs Conversational AI'],
    engineering: {
      summary: 'evaluated · observable',
      stats: [
        { value: '7/7', label: 'offline evals' },
        { value: '4', label: 'online criteria' },
        { value: 'p50·p95', label: 'latency tracked' },
      ],
      note: 'ground-truth extraction evals · ElevenLabs online eval criteria · /observability latency dashboard',
    },
    cover: '/images/shy_order_cover.svg',
    links: [
      { label: 'demo ↗', href: 'https://shy-order.onrender.com' },
      { label: 'dashboard ↗', href: 'https://shy-order-dashboard.vercel.app' },
    ],
  },
  {
    id: 'beat-agent',
    title: 'Beat Agent',
    category: 'Products',
    filters: ['Products', 'Automation'],
    featured: false,
    badge: 'v1',
    oneliner: 'AI publishing pipeline for Beat Store.',
    bullets: [
      { lead: 'Headless CLI', body: 'point it at a producer’s drop folder and it publishes each beat to Beat Store through the store’s authenticated API.' },
      { lead: 'AI metadata + SEO', body: 'enrichment via Claude API; idempotent, resumable upload pipeline.' },
      { lead: 'You confirm before publish', body: 'it reviews every drop in the terminal and asks first.' },
    ],
    stack: ['Python', 'httpx', 'Supabase Auth', 'Cloudflare R2', 'keyring'],
    ai: ['Claude API'],
    cover: '/images/beat_agent_cover.svg',
    links: [
      { label: 'part of Beat Store ↗', href: 'https://ffinnico.netlify.app' },
    ],
  },
  {
    id: 'beyond-space',
    title: 'Beyond Space',
    category: 'Research',
    filters: ['Research', 'Audio / ML'],
    featured: false,
    oneliner: 'Audio generation via RAVE latent-space interpolation.',
    bullets: [
      { lead: 'Interpolate in latent space', body: 'upload up to 4 audio files and blend their RAVE latent encodings via a 2D board.' },
      { lead: 'Barycentric weighting', body: 'click position sets the blend across all inputs simultaneously.' },
      { lead: 'FastAPI + TorchScript', body: 'backend on HF Spaces, React frontend on Vercel.' },
    ],
    stack: ['Python', 'FastAPI', 'Librosa', 'React'],
    ai: ['RAVE', 'PyTorch', 'TorchScript'],
    cover: '/images/rave_presentation.webp',
    links: [{ label: 'demo ↗', href: 'https://beyond-space-kappa.vercel.app' }],
  },
  {
    id: 'thesis',
    title: 'Geometry in Music',
    category: 'Research',
    filters: ['Research', 'Audio / ML'],
    featured: false,
    oneliner: 'MSc thesis: from audio analysis to music generation.',
    bullets: [
      { lead: 'Analysis → generation', body: 'a three-client pipeline: 3D mood visualization → emotion mapping → prompt-free AI generation, looping in real time.' },
      { lead: 'Sacred geometry as interface', body: 'Metatron’s Cube and Platonic solids map emotions to audio features in an interactive 3D client.' },
      { lead: 'Prompt-free generation', body: 'via Suno API; comparative benchmark of generative models (Suno, RAVE, MusicGen, Jukebox).' },
    ],
    stack: ['Python', 'Flask', 'SocketIO', 'React Three Fiber'],
    ai: ['Essentia', 'TensorFlow (MIR)', 'Suno API'],
    cover: '/images/thesis.webp',
    links: [{ label: 'learn more ↗', href: 'https://youtu.be/2TnS3kzFt2c' }],
  },
  {
    id: 'wdf-h9000',
    title: 'Wave Digital Filters on Eventide H9000',
    category: 'Research',
    filters: ['Research'],
    featured: false,
    oneliner: 'Analog circuit modeling on dedicated effects hardware.',
    bullets: [
      { lead: 'First WDF on the H9000', body: 'a Wave Digital Filter algorithm modeling linear and nonlinear circuits directly on the hardware via VSig3.' },
      { lead: 'Nonlinearities via CPWL', body: 'a Canonical PieceWise-Linear representation; validated end-to-end with a diode-clipper circuit.' },
      { lead: 'No prior art', body: 'built within VSig3’s low-level limits with no examples in the literature.' },
    ],
    stack: ['MATLAB', 'VSig3'],
    hardware: ['Eventide H9000'],
    cover: '/images/project-course-presentation.webp',
    links: [{ label: 'learn more ↗', href: 'https://github.com/albedimaria/WDF-on-H9000' }],
  },
  {
    id: 'invoice-agent',
    title: 'Invoice Agent',
    category: 'Products',
    filters: ['Products', 'Automation'],
    featured: false,
    oneliner: 'Teaching-management automation system.',
    bullets: [
      { lead: 'Automates invoicing', body: 'via Fiscozen, and sends personalized client emails.' },
      { lead: 'Syncs & books', body: 'Google Calendar sessions → Notion; auto-books on third-party platforms.' },
      { lead: 'Runs daily', body: 'across invoicing, email dispatch, session logging and booking.' },
    ],
    stack: ['Python', 'Playwright', 'Notion API', 'Google Calendar API', 'Gmail SMTP'],
    cover: '/images/invoice_agent_cover_v3.svg',
    links: [],
  },
  {
    id: 'skyitalia-voice-agent',
    title: 'SkyItalia Voice Agent',
    category: 'Hackathon',
    filters: ['Hackathons', 'Voice AI'],
    featured: false,
    oneliner: 'Dual voice-agent airline support with live escalation — Yellow Tech × ElevenLabs.',
    bullets: [
      { lead: 'Two agents, live escalation', body: 'Aria handles passengers on the front line and escalates complex cases to Marco, a supervisor agent.' },
      { lead: 'Multilingual', body: 'conversational support (IT / EN / ES / FR) on ElevenLabs Conversational AI.' },
      { lead: 'Hackathon build', body: 'made at Yellow Tech × ElevenLabs.' },
    ],
    stack: ['REST APIs'],
    ai: ['ElevenLabs', 'Gemini'],
    cover: '/images/frontend-voice-agent.webp',
    links: [
      {
        label: 'learn more ↗',
        href: 'https://elevenlabs.io/app/talk-to?agent_id=agent_6201kk3y614yfjxv05r3tjhj1zzt&branch_id=agtbrch_4801kk3y61ybe138m1vnv9x1p3kc',
      },
    ],
  },
  {
    id: 'music-genre-classifier',
    title: 'Deep Learning for Music Genre Classification',
    category: 'Research',
    filters: ['Research', 'Audio / ML'],
    featured: false,
    oneliner: 'Deep-learning music genre classification (NN / CNN / RNN-LSTM).',
    bullets: [
      { lead: 'Genre from MFCCs', body: 'classifies tracks with librosa features, trained on the GTZAN dataset.' },
      { lead: 'NN vs CNN vs RNN-LSTM', body: 'compared with accuracy/loss evaluation; scalable to other datasets and models.' },
    ],
    stack: ['Python'],
    ai: ['TensorFlow', 'Keras'],
    cover: '/images/cnn.webp',
    links: [{ label: 'learn more ↗', href: 'https://github.com/albedimaria/music_genre_classifier' }],
  },
  {
    id: 'save-the-world',
    title: 'SaveTheWorld',
    category: 'Experiments',
    filters: ['Experiments'],
    featured: false,
    oneliner: 'Interactive installation on the eco-impact of daily actions.',
    bullets: [
      { lead: 'Act, see the impact', body: 'users mimic everyday actions and watch their CO₂ and climate impact in real time on a responsive 3D globe.' },
      { lead: 'Gesture → visuals → sound', body: 'Python gesture recognition + TouchDesigner real-time 3D + SuperCollider generative soundscapes.' },
    ],
    stack: ['Python', 'TouchDesigner', 'SuperCollider'],
    cover: '/images/bigliettoCPAC.webp',
    links: [{ label: 'learn more ↗', href: 'https://github.com/RobertoAlessandri/SaveTheWorld' }],
  },
];

const frameLabelOverrides: Record<string, string> = {
  thesis: 'MSc · Politecnico di Milano',
  'invoice-agent': 'internal automation',
  'wdf-h9000': 'MATLAB · VSig3 · H9000',
  'music-genre-classifier': 'github.com',
  'save-the-world': 'audio-visual installation',
  'skyitalia-voice-agent': 'elevenlabs.io',
  'beat-agent': 'CLI · part of Beat Store',
};

/** Short label shown in the cover's browser-frame chrome bar. */
export function frameLabelFor(p: Project): string {
  if (frameLabelOverrides[p.id]) return frameLabelOverrides[p.id];
  const href = p.links[0]?.href;
  if (href) {
    try {
      return new URL(href).hostname.replace(/^www\./, '');
    } catch {
      /* fall through */
    }
  }
  return p.category;
}

export const workFilters = ['All', 'Client work', 'Hackathons', 'Voice AI', 'Audio / ML', 'Research'] as const;

export const featuredProjects = projects.filter((p) => p.featured);
export const gridProjects = projects.filter((p) => !p.featured);
