// Single source of truth for the work section.
// English copy is canonical here; IT/ES come from the i18n dicts in Phase 4.
// Content reconciled against the live site (e.g. "Top 15", not the stale "Top 10").

export interface ProjectLink {
  label: string;
  href: string;
}

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
  category: 'Products' | 'Research' | 'Experiments';
  /** chips this project appears under in the work filter */
  filters: string[];
  featured: boolean;
  badge?: string;
  /** short subtitle, used in both featured and grid cards */
  oneliner: string;
  bullets: string[];
  stack: string[];
  ai?: string[];
  hardware?: string[];
  engineering?: Engineering;
  cover: string;
  links: ProjectLink[];
}

export const projects: Project[] = [
  {
    id: 'lyra',
    title: 'Lyra',
    category: 'Products',
    filters: ['Products', 'Audio / ML'],
    featured: true,
    badge: 'Musixmatch Musicathon',
    oneliner: 'Lyrics-first music discovery — a playlist that travels your emotions.',
    bullets: [
      'Describe a mood in plain language, or tap a 12-emotion wheel — a Claude agent resolves text and taps into one emotional state, and Lyra builds the playlist as a trajectory through that space, not a flat list.',
      'Songs are chosen by what their lyrics say: sentence-transformer embeddings place each track on a valence × energy emotion taxonomy, and the exact cited line that matched your mood is surfaced via Musixmatch lyrics/richsync.',
      'Steer live — more like this / change the mood / raise the energy — reshaping the upcoming queue without cutting the current track; a 3D react-three-fiber compass turns to your mood and traces the path travelled.',
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
    category: 'Products',
    filters: ['Products'],
    featured: true,
    badge: '✓ acquired',
    oneliner: 'Full-stack music e-commerce platform for a producer.',
    bullets: [
      'Beat catalog with waveform previews, multi-license cart (MP3 / WAV / stems / exclusive) and in-page Stripe checkout.',
      'Idempotent Stripe webhook, RLS on every table, JWT-guarded admin API, downloads via on-demand signed URLs.',
      'Zero-egress stack: audio served from Cloudflare R2 straight to the browser, CI-deployed on Netlify.',
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
    category: 'Products',
    filters: ['Products'],
    featured: true,
    badge: '★ Top 15',
    oneliner: 'Agentic AI over a company’s live business data.',
    bullets: [
      'Top 15 at the Cursor × Yellow Tech hackathon → qualified for the Italian National Hackathon League.',
      'FastAPI agent over CRM, ERP, call logs and a knowledge base: the LLM only picks tools and writes the answer while Python does every count and sum — exact figures, source provenance, zero hallucinations.',
      'Zero-infra RAG (BM25 over whole documents) plus an interactive knowledge graph; multilingual IT/EN/ES.',
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
    category: 'Products',
    filters: ['Products', 'Voice AI'],
    featured: true,
    oneliner: 'Inbound AI phone assistant for a dance school, 24/7.',
    bullets: [
      'Identifies students, books classes, schedules makeup sessions and handles trial-lesson requests — entirely over the phone.',
      'Real-time voice pipeline with barge-in: Deepgram STT → GPT-4o with parallel tool calling → ElevenLabs TTS streaming (IT/ES).',
      'Admin dashboard with call analytics, booking trends and student management.',
    ],
    stack: ['Python', 'FastAPI', 'Twilio', 'Supabase', 'Next.js', 'Render', 'Vercel'],
    ai: ['GPT-4o', 'Deepgram', 'ElevenLabs'],
    engineering: {
      summary: 'evaluated · instrumented · cost-tracked',
      stats: [
        { value: '6/6', label: 'scenario evals' },
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
      'Chats with the user in the browser to collect booking details.',
      'Autonomously calls the restaurant via Twilio, handling the full phone conversation end-to-end.',
      'Admin dashboard with session analytics and revenue tracking.',
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
      'Headless CLI: point it at a producer’s drop folder and it publishes each beat to Beat Store through the store’s authenticated API.',
      'AI metadata and SEO enrichment via Claude API; idempotent, resumable upload pipeline.',
      'Reviews every drop in the terminal and asks for confirmation before publishing.',
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
      'Upload up to 4 audio files and interpolate between their RAVE latent encodings via a 2D board.',
      'Barycentric weighting — click position sets the blend across all inputs simultaneously.',
      'FastAPI + TorchScript backend on HF Spaces, React frontend on Vercel.',
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
      'A three-client pipeline turning audio analysis into music generation — 3D mood visualization → emotion mapping → prompt-free AI generation, looping in real time.',
      'Sacred geometry as an interface (Metatron’s Cube, Platonic solids) mapping emotions to audio features in an interactive 3D client.',
      'Prompt-free generation via Suno API; comparative benchmark of generative models (Suno, RAVE, MusicGen, Jukebox).',
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
      'First successful implementation of a Wave Digital Filter (WDF) algorithm on the Eventide H9000, modeling linear and nonlinear circuits directly on the hardware via VSig3.',
      'Nonlinearities handled with a Canonical PieceWise-Linear (CPWL) representation; validated end-to-end with a diode-clipper circuit.',
      'Built within VSig3’s low-level limits with no prior examples in the literature.',
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
      'Automates invoicing via Fiscozen and sends personalized client emails.',
      'Syncs Google Calendar sessions to Notion; auto-books on third-party platforms.',
      'Runs daily across invoicing, email dispatch, session logging and booking.',
    ],
    stack: ['Python', 'Playwright', 'Notion API', 'Google Calendar API', 'Gmail SMTP'],
    cover: '/images/invoice_agent_cover_v3.svg',
    links: [],
  },
  {
    id: 'skyitalia-voice-agent',
    title: 'SkyItalia Voice Agent',
    category: 'Experiments',
    filters: ['Experiments', 'Voice AI'],
    featured: false,
    oneliner: 'Dual voice-agent airline support with live escalation — Yellow Tech × ElevenLabs.',
    bullets: [
      'Aria handles passengers on the front line and escalates complex cases to Marco, a supervisor agent.',
      'Multilingual conversational support (IT / EN / ES / FR) on ElevenLabs Conversational AI.',
      'Built at the Yellow Tech × ElevenLabs hackathon.',
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
      'Classifies tracks by genre from MFCC features (librosa) trained on the GTZAN dataset.',
      'Compares NN, CNN and RNN-LSTM architectures with accuracy/loss evaluation; scalable to other datasets and models.',
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
      'Users mimic everyday actions and see their CO₂ and climate impact in real time on a responsive 3D globe.',
      'Python gesture recognition + TouchDesigner real-time 3D visuals + SuperCollider generative soundscapes.',
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

export const workFilters = ['All', 'Products', 'Research', 'Voice AI', 'Audio / ML'] as const;

export const featuredProjects = projects.filter((p) => p.featured);
export const gridProjects = projects.filter((p) => !p.featured);
