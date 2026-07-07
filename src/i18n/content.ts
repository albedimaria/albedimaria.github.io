export type Lang = 'en' | 'it' | 'es';

export const langs: Lang[] = ['en', 'it', 'es'];
export const defaultLang: Lang = 'en';
export const langLabels: Record<Lang, string> = { en: 'EN', it: 'IT', es: 'ES' };

/** Path for a locale: en at root, it/es prefixed. */
export const localizedHome: Record<Lang, string> = { en: '/', it: '/it/', es: '/es/' };

export const ogLocale: Record<Lang, string> = { en: 'en_US', it: 'it_IT', es: 'es_ES' };

export const seo: Record<Lang, { title: string; description: string }> = {
  en: {
    title: 'Alberto Di Maria — AI Product Engineer',
    description: 'Freelance AI product engineer in Milan. I design and ship agentic AI products — voice agents, full-stack platforms and audio tools.',
  },
  it: {
    title: 'Alberto Di Maria — AI Product Engineer',
    description: 'AI product engineer freelance a Milano. Progetto e realizzo prodotti AI agentici — voice agent, piattaforme full-stack e strumenti audio.',
  },
  es: {
    title: 'Alberto Di Maria — AI Product Engineer',
    description: 'AI product engineer freelance en Milán. Diseño y entrego productos de IA agéntica — agentes de voz, plataformas full-stack y herramientas de audio.',
  },
};

export const contactReply: Record<Lang, string> = {
  en: 'I usually reply within a day.',
  it: 'Di solito rispondo in giornata.',
  es: 'Suelo responder en un día.',
};

export const servicesCta: Record<Lang, string> = {
  en: 'See it live ↗',
  it: 'Guardalo live ↗',
  es: 'Míralo en vivo ↗',
};

// Hero line that ties the name to the agent — the "equation" explained in one
// sentence. `accent` is rendered in Fraunces italic oxblood.
export const heroLine: Record<Lang, { pre: string; accent: string; post: string }> = {
  en: { pre: 'I build AI products end-to-end — and ', accent: 'D10S', post: ', right here, is one of them.' },
  it: { pre: 'Costruisco prodotti AI end-to-end — e ', accent: 'D10S', post: ', qui accanto, è uno di loro.' },
  es: { pre: 'Construyo productos de IA end-to-end — y ', accent: 'D10S', post: ', aquí mismo, es uno de ellos.' },
};

// D10S guide claim — heading + sub of the hero's right column.
export const voiceDemo: Record<Lang, { title: string; desc: string }> = {
  en: {
    title: "I'm D10S — your AI voice assistant and guide to this site.",
    desc: '',
  },
  it: {
    title: 'Sono D10S — il tuo assistente vocale AI e la tua guida al sito.',
    desc: '',
  },
  es: {
    title: 'Soy D10S — tu asistente de voz IA y tu guía del sitio.',
    desc: '',
  },
};

// Voice panel labels + chips — shared by the static Astro shell (renders with
// zero JS) and the React island (mounted on first interaction).
export const voiceUi: Record<Lang, { talk: string; type: string; chips: string[] }> = {
  en: { talk: 'talk', type: 'type', chips: ['show me the projects', 'why do I need a voice agent?', 'how do we work together?'] },
  it: { talk: 'parla', type: 'scrivi', chips: ['fammi vedere i progetti', 'perché mi serve un voice agent?', 'come si lavora insieme?'] },
  es: { talk: 'habla', type: 'escribe', chips: ['enséñame los proyectos', '¿por qué necesito un agente de voz?', '¿cómo trabajamos juntos?'] },
};

// Contact headline split so the last word carries the italic accent.
export const contactHeadline: Record<Lang, { pre: string; accent: string }> = {
  en: { pre: "Let's work ", accent: 'together.' },
  it: { pre: 'Lavoriamo ', accent: 'insieme.' },
  es: { pre: 'Trabajemos ', accent: 'juntos.' },
};

export const filterCanonical = ['All', 'Client work', 'Hackathons', 'Voice AI', 'Audio / ML', 'Research'] as const;

interface UI {
  nav: { work: string; services: string; about: string; contact: string };
  nav_cta: string;
  hero_available: string;
  hero_role: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  hero_cta_cv: string;
  work_title: string;
  work_lead: string;
  filter_labels: Record<string, string>;
  filter_desc: Record<string, string>;
  show_all: string;
  services_title: string;
  services_lead: string;
  services: { title: string; desc: string }[];
  about_title: string;
  about_text: string;
  about_closing: string;
  experience_title: string;
  training_title: string;
  contact_title: string;
  contact_headline: string;
  contact_lead: string;
  contact_email: string;
  footer_built: string;
}

export const ui: Record<Lang, UI> = {
  en: {
    nav: { work: 'work', services: 'services', about: 'about', contact: 'contact' },
    nav_cta: "let's work together",
    hero_available: 'available for new projects',
    hero_role: 'AI PRODUCT ENGINEER · agentic AI, voice agents & audio',
    hero_cta_primary: "Let's work together →",
    hero_cta_secondary: 'View work ↓',
    hero_cta_cv: 'Download CV',
    work_title: 'Selected work',
    work_lead: 'A few things I’ve shipped — products in production, research and experiments.',
    filter_labels: { All: 'All', 'Client work': 'Client work', Hackathons: 'Hackathons', 'Voice AI': 'Voice AI', 'Audio / ML': 'Audio / ML', Research: 'Research' },
    filter_desc: {
      All: '',
      'Client work': 'commissioned, sold client projects',
      Hackathons: 'competition builds — placed & awarded',
      'Voice AI': 'real-time conversational phone agents',
      'Audio / ML': 'audio analysis & generative models',
      Research: 'academic & advanced technical work',
    },
    show_all: 'Show all projects',
    services_title: 'What I build',
    services_lead: 'End-to-end AI products — from the model and the data to the interface your users actually touch.',
    services: [
      { title: 'AI voice agents', desc: 'Inbound & outbound phone agents that book, qualify and handle real conversations end-to-end — STT → LLM tool-calling → TTS on Twilio.' },
      { title: 'Full-stack AI products', desc: 'Production web apps from database to UI — e-commerce, dashboards, auth, payments — shipped, secured and maintained.' },
      { title: 'Automation & agents', desc: 'Agentic pipelines and CLI tools that remove manual work: data enrichment, publishing, invoicing and integrations.' },
      { title: 'Audio & ML', desc: 'Generative audio, music information retrieval and deep-learning models — from research prototype to interactive demo.' },
    ],
    about_title: 'About',
    about_text: 'MSc in Music and Acoustic Engineering. I build agentic AI products: full-stack, voice agents, and automation pipelines. Background in deep learning for audio, generative models, and signal analysis. Also active as a trainer in computer science and electronics.',
    about_closing: 'Currently freelance and open to new projects, based in Milan.',
    experience_title: 'Experience',
    training_title: 'Training',
    contact_title: 'Contact',
    contact_headline: 'Let’s work together.',
    contact_lead: 'Available for freelance projects — voice agents, full-stack AI products and audio tools. Based in Milan, working remotely.',
    contact_email: 'Email me',
    footer_built: 'Milan, Italy · built with Astro',
  },
  it: {
    nav: { work: 'lavori', services: 'servizi', about: 'chi sono', contact: 'contatti' },
    nav_cta: 'lavoriamo insieme',
    hero_available: 'disponibile per nuovi progetti',
    hero_role: 'AI PRODUCT ENGINEER · AI agentica, voice agent & audio',
    hero_cta_primary: 'Lavoriamo insieme →',
    hero_cta_secondary: 'Vedi i lavori ↓',
    hero_cta_cv: 'Scarica il CV',
    work_title: 'Lavori selezionati',
    work_lead: 'Qualche cosa che ho spedito — prodotti in produzione, ricerca ed esperimenti.',
    filter_labels: { All: 'Tutti', 'Client work': 'Su commissione', Hackathons: 'Hackathon', 'Voice AI': 'Voice AI', 'Audio / ML': 'Audio / ML', Research: 'Ricerca' },
    filter_desc: {
      All: '',
      'Client work': 'progetti su commissione, venduti',
      Hackathons: 'progetti da competition — premiati',
      'Voice AI': 'agenti telefonici conversazionali real-time',
      'Audio / ML': 'analisi audio e modelli generativi',
      Research: 'lavoro accademico e tecnico avanzato',
    },
    show_all: 'Mostra tutti i progetti',
    services_title: 'Cosa costruisco',
    services_lead: 'Prodotti AI end-to-end — dal modello e dai dati fino all’interfaccia che i tuoi utenti toccano davvero.',
    services: [
      { title: 'Agenti vocali AI', desc: 'Agenti telefonici inbound e outbound che prenotano, qualificano e gestiscono conversazioni reali end-to-end — STT → LLM tool-calling → TTS su Twilio.' },
      { title: 'Prodotti AI full-stack', desc: 'Web app in produzione dal database alla UI — e-commerce, dashboard, auth, pagamenti — spedite, sicure e mantenute.' },
      { title: 'Automazione e agenti', desc: 'Pipeline agentiche e tool CLI che eliminano il lavoro manuale: arricchimento dati, pubblicazione, fatturazione e integrazioni.' },
      { title: 'Audio e ML', desc: 'Audio generativo, music information retrieval e modelli deep-learning — dal prototipo di ricerca alla demo interattiva.' },
    ],
    about_title: 'Chi sono',
    about_text: 'Laureato magistrale in Music and Acoustic Engineering. Sviluppo prodotti AI agentici: full-stack, voice agent, pipeline di automazione. Background in deep learning per audio, modelli generativi e analisi del segnale. Attivo anche come formatore in ambito informatico ed elettronico.',
    about_closing: 'Attualmente freelance e aperto a nuovi progetti, con base a Milano.',
    experience_title: 'Esperienze',
    training_title: 'Formazione',
    contact_title: 'Contatti',
    contact_headline: 'Lavoriamo insieme.',
    contact_lead: 'Disponibile per progetti freelance — voice agent, prodotti AI full-stack e strumenti audio. Con base a Milano, lavoro da remoto.',
    contact_email: 'Scrivimi →',
    footer_built: 'Milano, Italia · costruito con Astro',
  },
  es: {
    nav: { work: 'trabajo', services: 'servicios', about: 'sobre mí', contact: 'contacto' },
    nav_cta: 'trabajemos juntos',
    hero_available: 'disponible para nuevos proyectos',
    hero_role: 'AI PRODUCT ENGINEER · IA agéntica, agentes de voz & audio',
    hero_cta_primary: 'Trabajemos juntos →',
    hero_cta_secondary: 'Ver proyectos ↓',
    hero_cta_cv: 'Descargar CV',
    work_title: 'Trabajos seleccionados',
    work_lead: 'Algunas cosas que he entregado — productos en producción, investigación y experimentos.',
    filter_labels: { All: 'Todos', 'Client work': 'Por encargo', Hackathons: 'Hackathons', 'Voice AI': 'Voice AI', 'Audio / ML': 'Audio / ML', Research: 'Investigación' },
    filter_desc: {
      All: '',
      'Client work': 'proyectos por encargo, vendidos',
      Hackathons: 'proyectos de competición — premiados',
      'Voice AI': 'agentes telefónicos conversacionales en tiempo real',
      'Audio / ML': 'análisis de audio y modelos generativos',
      Research: 'trabajo académico y técnico avanzado',
    },
    show_all: 'Ver todos los proyectos',
    services_title: 'Qué construyo',
    services_lead: 'Productos de IA end-to-end — del modelo y los datos a la interfaz que tus usuarios tocan de verdad.',
    services: [
      { title: 'Agentes de voz IA', desc: 'Agentes telefónicos inbound y outbound que reservan, cualifican y gestionan conversaciones reales end-to-end — STT → LLM tool-calling → TTS en Twilio.' },
      { title: 'Productos de IA full-stack', desc: 'Apps web en producción de la base de datos a la UI — e-commerce, dashboards, auth, pagos — entregadas, seguras y mantenidas.' },
      { title: 'Automatización y agentes', desc: 'Pipelines agénticas y herramientas CLI que eliminan el trabajo manual: enriquecimiento de datos, publicación, facturación e integraciones.' },
      { title: 'Audio y ML', desc: 'Audio generativo, music information retrieval y modelos de deep-learning — del prototipo de investigación a la demo interactiva.' },
    ],
    about_title: 'Sobre mí',
    about_text: 'Máster en Music and Acoustic Engineering. Desarrollo productos de IA agéntica: full-stack, agentes de voz y pipelines de automatización. Formación en deep learning para audio, modelos generativos y análisis de señal. También activo como formador en informática y electrónica.',
    about_closing: 'Actualmente freelance y abierto a nuevos proyectos, con base en Milán.',
    experience_title: 'Experiencia',
    training_title: 'Formación',
    contact_title: 'Contacto',
    contact_headline: 'Trabajemos juntos.',
    contact_lead: 'Disponible para proyectos freelance — agentes de voz, productos de IA full-stack y herramientas de audio. Con base en Milán, trabajo en remoto.',
    contact_email: 'Escríbeme →',
    footer_built: 'Milán, Italia · hecho con Astro',
  },
};

export interface TimelineItem {
  title: string;
  meta: string;
  desc: string;
}

export const experience: Record<Lang, TimelineItem[]> = {
  en: [
    { title: 'Freelance Developer — AI-Powered Audio Tools', meta: '2026 – Present · Milan, Italy', desc: 'End-to-end AI web tools for the music industry: e-commerce, automation agents and voice interfaces.' },
    { title: 'Audio Developer — Anecoica Studio', meta: 'Berlin, Germany · 2023 – 2024', desc: 'Music information retrieval, 3D interfaces and generative audio; full-stack prototype in React, Flask and Python.' },
    { title: 'Private Tutor — il-Cubo.it', meta: 'Milan, Italy · 2021 – Present', desc: 'Tutored 30+ bachelor and master students in CS and electronics; later coordinated a team of tutors.' },
    { title: 'STEM Instructor — Bricks4Kidz', meta: 'Milan, Italy · 2025 – 2026', desc: 'STEM for primary-school children: LEGO Technic and an introduction to programming.' },
  ],
  it: [
    { title: 'Sviluppatore Freelance — Strumenti Audio AI per Produttori Musicali', meta: '2026 – Presente · Milano, Italia', desc: 'Sviluppo end-to-end di strumenti web basati su AI per l’industria musicale: piattaforme e-commerce, agenti di automazione e interfacce vocali.' },
    { title: 'Audio Developer — Anecoica Studio', meta: 'Berlino, Germania · 2023 – 2024', desc: 'Music Information Retrieval, interfacce 3D e modelli audio generativi; prototipo full-stack con React, Flask e Python.' },
    { title: 'Docente privato — il-Cubo.it', meta: 'Milano, Italia · 2021 – Presente', desc: 'Tutorato di 30+ studenti triennali e magistrali in informatica ed elettronica; ruolo espanso al coordinamento di un team di tutor.' },
    { title: 'Istruttore STEM — Bricks4Kidz', meta: 'Milano, Italia · 2025 – 2026', desc: 'Formatore STEM per bambini della scuola primaria: LEGO Technic e introduzione alla programmazione.' },
  ],
  es: [
    { title: 'Desarrollador Freelance — Herramientas de Audio con IA para Productores', meta: '2026 – Presente · Milán, Italia', desc: 'Desarrollo end-to-end de herramientas web con IA para la industria musical: plataformas e-commerce, agentes de automatización e interfaces de voz.' },
    { title: 'Audio Developer — Anecoica Studio', meta: 'Berlín, Alemania · 2023 – 2024', desc: 'Music Information Retrieval, interfaces 3D y modelos de audio generativos; prototipo full-stack con React, Flask y Python.' },
    { title: 'Profesor particular — il-Cubo.it', meta: 'Milán, Italia · 2021 – Presente', desc: 'Tutorías a 30+ estudiantes de grado y máster en informática y electrónica; rol ampliado a la coordinación de un equipo de tutores.' },
    { title: 'Instructor STEM — Bricks4Kidz', meta: 'Milán, Italia · 2025 – 2026', desc: 'Instructor STEM para niños de primaria: LEGO Technic y programación introductoria.' },
  ],
};

export const training: Record<Lang, TimelineItem[]> = {
  en: [
    { title: 'Agent Harness Workshop — Datapizza & Cosmico', meta: '2026 · Milan · 1 day', desc: 'Built a custom LLM agent harness from scratch: tool-calling loop, parallel subagents, RAG vs grep over a Markdown knowledge base. No frameworks.' },
    { title: 'Generative Music AI Workshop — MTG & Sound of AI', meta: '2025 · Barcelona · 1 week · certificate', desc: 'GenAI for music creation with team-based project development.' },
    { title: 'Artificial Intelligence Tutor — AIFIA', meta: '2025 · online · certificate', desc: 'Certified AI trainer with advanced GenAI skills and a commitment to ethical AI.' },
    { title: 'Audio Signal Processing for Music Applications — UPF', meta: '2025 · online · 10 weeks', desc: 'Analysis, transformation and synthesis of musical signals.' },
    { title: 'Creative Machine Learning — IRCAM / ACIDS', meta: '2025 · online · 10 weeks · 96/100', desc: 'ML for audio: fundamentals, neural networks, generative models and transformers.' },
  ],
  it: [
    { title: 'Workshop Agent Harness — Datapizza & Cosmico', meta: '2026 · Milano · 1 giorno', desc: 'Costruito un agent harness LLM da zero: loop di tool-calling, subagenti paralleli e ricerca RAG vs Grep su knowledge base Markdown. Nessun framework.' },
    { title: 'Generative Music AI Workshop — MTG & Sound of AI', meta: '2025 · Barcellona · 1 settimana · certificato', desc: 'GenAI per generare musica con sviluppo di un progetto in team.' },
    { title: 'Tutor di Intelligenza Artificiale — AIFIA', meta: '2025 · online · certificato', desc: 'Certificazione come tutor qualificato di IA con abilità avanzate in GenAI e impegno per l’uso etico dell’IA.' },
    { title: 'Audio Signal Processing for Music Applications — UPF', meta: '2025 · online · 10 settimane', desc: 'Analisi, trasformazione e sintesi di segnali musicali.' },
    { title: 'Creative Machine Learning — IRCAM / ACIDS', meta: '2025 · online · 10 settimane · 96/100', desc: 'ML per l’audio: fondamenti, reti neurali, modelli generativi e transformer.' },
  ],
  es: [
    { title: 'Workshop de Agent Harness — Datapizza & Cosmico', meta: '2026 · Milán · 1 día', desc: 'Construcción de un agent harness LLM desde cero: bucle de tool-calling, subagentes paralelos y búsqueda RAG vs Grep sobre base de conocimiento Markdown. Sin frameworks.' },
    { title: 'Generative Music AI Workshop — MTG & Sound of AI', meta: '2025 · Barcelona · 1 semana · certificado', desc: 'GenAI para la creación musical con desarrollo de proyectos en equipo.' },
    { title: 'Tutor de Inteligencia Artificial — AIFIA', meta: '2025 · en línea · certificado', desc: 'Certificación como formador cualificado en IA con habilidades avanzadas en GenAI y uso ético de la IA.' },
    { title: 'Audio Signal Processing for Music Applications — UPF', meta: '2025 · en línea · 10 semanas', desc: 'Análisis, transformación y síntesis de señales musicales.' },
    { title: 'Creative Machine Learning — IRCAM / ACIDS', meta: '2025 · en línea · 10 semanas · 96/100', desc: 'ML para audio: fundamentos, redes neuronales, modelos generativos y transformers.' },
  ],
};
