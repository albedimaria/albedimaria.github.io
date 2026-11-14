export type Lang = 'en' | 'it' | 'es';

/** Order of the language switcher: English first (root), then Spanish, then Italian. */
export const langs: Lang[] = ['en', 'es', 'it'];
export const defaultLang: Lang = 'en';
export const langLabels: Record<Lang, string> = { en: 'EN', it: 'IT', es: 'ES' };

/** English lives at the root; Spanish and Italian are prefixed. */
export const localizedHome: Record<Lang, string> = { en: '/', es: '/es/', it: '/it/' };

export const ogLocale: Record<Lang, string> = { en: 'en_US', it: 'it_IT', es: 'es_ES' };

/** "Book a call" target. Swap for the calendar URL as soon as there is one:
 *  until then the button lands on the contact section. */
export const BOOK_URL = '#contact';

export const seo: Record<Lang, { title: string; description: string }> = {
  en: {
    title: 'Alberto Di Maria — AI Product Engineer',
    description: 'Voice agents, AI automations, sites and platforms. I build AI products end-to-end.',
  },
  it: {
    title: 'Alberto Di Maria — AI Product Engineer',
    description: 'Voice agent, automazioni AI, siti e piattaforme. Costruisco prodotti AI end-to-end.',
  },
  es: {
    title: 'Alberto Di Maria — AI Product Engineer',
    description: 'Agentes de voz, automatizaciones con IA, webs y plataformas. Construyo productos de IA end-to-end.',
  },
};

export interface TimelineItem {
  title: string;
  meta: string;
  desc: string;
}

export interface BlockCard {
  /** id in src/data/projects.ts: cover and link come from there */
  id: string;
  title: string;
  text: string;
}

export interface Block {
  id: 'voice' | 'automations' | 'sites';
  /** two lines, so the three titles share one rhythm */
  title: [string, string];
  lead: string;
  cards: [BlockCard, BlockCard];
  /** smaller work in the same category: project id + display name */
  also: { id: string; name: string }[];
}

interface Copy {
  skip: string;
  nav: { work: string; agencies: string; about: string; book: string; menuOpen: string; menuClose: string; language: string };
  hero: {
    h1: [string, string];
    /** rendered as: <em>D10S</em>{d10sLine} */
    d10sLine: string;
    ask: string;
    askLabel: string;
    talk: string;
    sphere: string;
    /** the same line on a phone, where the sphere is the only control */
    d10sLineMobile: [string, string];
    cats: [string, string, string];
    cueTop: string;
    cue: string;
  };
  call: {
    quote: string;
    line: string;
    play: string;
    pause: string;
    speed: string;
    seek: string;
    answersIn: string;
    bookingAt: string;
    caller: string;
    agent: string;
    silence: string;
    interrupted: string;
    translated: string;
    original: string;
    transcriptLabel: string;
    whole: string;
  };
  blocks: { label: string; alsoLabel: string; moreLabel: string; items: Block[] };
  agencies: { label: string; title: string; line: string };
  about: {
    title: string;
    lead: string;
    body: [string, string];
    facts: { label: string; value: string }[];
    cv: string;
    photoAlt: string;
    certifications: string;
    experience: string;
    education: string;
  };
  contact: {
    title: [string, string];
    lines: [string, string];
    formIntro: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    orEmail: string;
    errName: string;
    errEmail: string;
    errMessage: string;
  };
  footer: string;
}

export const copy: Record<Lang, Copy> = {
  en: {
    skip: 'Skip to content',
    nav: { work: 'Work', agencies: 'For agencies', about: 'About', book: 'Book a call', menuOpen: 'Open menu', menuClose: 'Close menu', language: 'Change language' },
    hero: {
      h1: ['I build AI products', 'end-to-end.'],
      d10sLine: ', my voice agent, will show you around the site.',
      ask: 'Talk or write to D10S',
      askLabel: 'Write to D10S',
      talk: 'Talk to D10S',
      sphere: 'Open D10S',
      d10sLineMobile: ['Talk or write to ', ', my voice agent.'],
      cats: ['Voice agents', 'AI automations', 'Sites & platforms'],
      cueTop: 'Scroll',
      cue: 'Hear a real call',
    },
    call: {
      quote: '“The Thursday in two weeks, not this one.”',
      line: 'A test call to the phone agent I built for a dance school.',
      play: 'Play the call',
      pause: 'Pause the call',
      speed: 'Playback speed',
      seek: 'Position in the call',
      answersIn: 'Answers in',
      bookingAt: 'Booking written at',
      caller: 'Caller',
      agent: 'Agent',
      silence: '(silence)',
      interrupted: 'interrupted',
      translated: 'Translated from Italian.',
      original: 'Read the original',
      transcriptLabel: 'Transcript of the call',
      whole: 'Show the whole call',
    },
    blocks: {
      label: 'Work',
      alsoLabel: 'Also:',
      moreLabel: 'More:',
      items: [
        {
          id: 'voice',
          title: ['Voice', 'agents'],
          lead: 'Phone agents that answer and call out, or voice inside your app.',
          cards: [
            { id: 'dance-voice-agent', title: 'Phone agent for a dance school', text: 'Recognises the caller, books, cancels and reschedules. Answers in 0.9 seconds.' },
            { id: 'shy-order', title: 'Shy Order', text: 'Takes your booking in the browser, then phones the restaurant itself.' },
          ],
          also: [{ id: 'collaudio', name: 'Collaudio' }, { id: 'parlando', name: 'Parlando' }],
        },
        {
          id: 'automations',
          title: ['AI', 'automations'],
          lead: 'Automations that close repetitive work.',
          cards: [
            { id: 'company-brain', title: 'Company Brain', text: 'An agent that answers questions on a company’s real data. Hackathon, Top 10 of 80+.' },
            { id: 'zero-to-hubspot', title: 'Zero to HubSpot', text: '15 years of CRM data migrated in 35 seconds. National final, Top 25.' },
          ],
          also: [{ id: 'beat-agent', name: 'Beat Agent' }, { id: 'invoice-agent', name: 'Invoice Agent' }],
        },
        {
          id: 'sites',
          title: ['Sites &', 'platforms'],
          lead: 'A new site from scratch, or an existing one updated and fixed.',
          cards: [
            { id: 'beat-store', title: 'Beat Store', text: 'A producer’s online store, designed with Laura Zanchetta and built from her Figma file.' },
            { id: 'alex-bartok', title: 'Alex Bartok Music', text: 'A musician’s broken website rebuilt from scratch, with a paid client area.' },
          ],
          also: [{ id: 'filoconduttore', name: 'filoconduttore' }],
        },
      ],
    },
    agencies: { label: 'For agencies', title: 'Voice agents for agencies.', line: 'Tested by automated calls, verified by hand.' },
    about: {
      title: 'About',
      lead: 'I trained as an audio engineer, and voice is the area I keep coming back to.',
      body: [
        'I studied Music and Acoustic Engineering at Politecnico di Milano, then worked on generative models and music analysis at Anecoica Studio in Berlin. Over the last two years I have built AI products end-to-end: phone agents, automations and sites for clients.',
        'Testing a voice agent by hand meant making calls after every change. So I built a tester that calls the agent itself and checks what it said against the database. I also teach: more than 30 university students in computer science and electronics.',
      ],
      facts: [
        { label: 'Languages', value: 'Italian, English, Spanish' },
        { label: 'Where', value: 'Remote, US hours' },
        { label: 'Degree', value: 'MSc, Politecnico di Milano' },
      ],
      cv: 'Download CV',
      photoAlt: 'Alberto Di Maria',
      certifications: 'Certifications',
      experience: 'Experience',
      education: 'Education',
    },
    contact: {
      title: ['Let’s work', 'together.'],
      lines: ['The first call is free.', 'I usually reply within a day.'],
      formIntro: 'Or write to me.',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send message',
      sending: 'Sending…',
      success: 'Thanks, your message is on its way.',
      error: 'Something went wrong. Try again, or email me directly.',
      orEmail: 'or email me directly',
      errName: 'Your name?',
      errEmail: 'A valid email, please',
      errMessage: 'A line or two?',
    },
    footer: 'Remote, US hours',
  },

  it: {
    skip: 'Vai al contenuto',
    nav: { work: 'Lavori', agencies: 'Per agenzie', about: 'Chi sono', book: 'Prenota una call', menuOpen: 'Apri il menu', menuClose: 'Chiudi il menu', language: 'Cambia lingua' },
    hero: {
      h1: ['Costruisco prodotti AI', 'end-to-end.'],
      d10sLine: ', il mio agente vocale, ti accompagna nel sito.',
      ask: 'Parla o scrivi a D10S',
      askLabel: 'Scrivi a D10S',
      talk: 'Parla con D10S',
      sphere: 'Apri D10S',
      d10sLineMobile: ['Parla o scrivi a ', ', il mio agente vocale.'],
      cats: ['Voice agent', 'Automazioni AI', 'Siti e piattaforme'],
      cueTop: 'Scorri',
      cue: 'Ascolta una chiamata vera',
    },
    call: {
      quote: '«Il giovedì fra due settimane, non questo giovedì.»',
      line: 'Una chiamata di prova all’agente telefonico che ho costruito per una scuola di ballo.',
      play: 'Ascolta la chiamata',
      pause: 'Metti in pausa',
      speed: 'Velocità di ascolto',
      seek: 'Posizione nella chiamata',
      answersIn: 'Risponde in',
      bookingAt: 'Prenotazione scritta a',
      caller: 'Chi chiama',
      agent: 'Agente',
      silence: '(silenzio)',
      interrupted: 'interrotto',
      translated: '',
      original: '',
      transcriptLabel: 'Trascrizione della chiamata',
      whole: 'Mostra tutta la chiamata',
    },
    blocks: {
      label: 'Lavori',
      alsoLabel: 'Anche:',
      moreLabel: 'Altro:',
      items: [
        {
          id: 'voice',
          title: ['Voice', 'agent'],
          lead: 'Agenti telefonici che rispondono e chiamano, o la voce dentro la tua app.',
          cards: [
            { id: 'dance-voice-agent', title: 'Agente telefonico per una scuola di ballo', text: 'Riconosce chi chiama, prenota, cancella e sposta. Risponde in 0,9 secondi.' },
            { id: 'shy-order', title: 'Shy Order', text: 'Prende la tua prenotazione nel browser, poi telefona lui al ristorante.' },
          ],
          also: [{ id: 'collaudio', name: 'Collaudio' }, { id: 'parlando', name: 'Parlando' }],
        },
        {
          id: 'automations',
          title: ['Automazioni', 'AI'],
          lead: 'Automazioni che chiudono il lavoro ripetitivo.',
          cards: [
            { id: 'company-brain', title: 'Company Brain', text: 'Un agente che risponde sui dati veri di un’azienda. Hackathon, Top 10 su 80+.' },
            { id: 'zero-to-hubspot', title: 'Zero to HubSpot', text: '15 anni di dati di un CRM migrati in 35 secondi. Finale nazionale, Top 25.' },
          ],
          also: [{ id: 'beat-agent', name: 'Beat Agent' }, { id: 'invoice-agent', name: 'Invoice Agent' }],
        },
        {
          id: 'sites',
          title: ['Siti e', 'piattaforme'],
          lead: 'Un sito nuovo da zero, o uno esistente aggiornato e sistemato.',
          cards: [
            { id: 'beat-store', title: 'Beat Store', text: 'Lo store online di un producer, disegnato con Laura Zanchetta e costruito dal suo file Figma.' },
            { id: 'alex-bartok', title: 'Alex Bartok Music', text: 'Il sito rotto di un musicista rifatto da zero, con un’area clienti a pagamento.' },
          ],
          also: [{ id: 'filoconduttore', name: 'filoconduttore' }],
        },
      ],
    },
    agencies: { label: 'Per agenzie', title: 'Voice agent per agenzie.', line: 'Testati con chiamate automatiche, verificati a mano.' },
    about: {
      title: 'Chi sono',
      lead: 'Mi sono formato come ingegnere del suono, e la voce è l’area a cui torno sempre.',
      body: [
        'Ho studiato Music and Acoustic Engineering al Politecnico di Milano, poi ho lavorato su modelli generativi e analisi musicale ad Anecoica Studio, a Berlino. Negli ultimi due anni ho costruito prodotti AI end-to-end: agenti telefonici, automazioni e siti per clienti.',
        'Testare un voice agent a mano voleva dire fare chiamate dopo ogni modifica. Così ho costruito un tester che chiama lui l’agente e confronta quello che ha detto con il database. Insegno anche: più di 30 studenti universitari in informatica ed elettronica.',
      ],
      facts: [
        { label: 'Lingue', value: 'Italiano, inglese, spagnolo' },
        { label: 'Dove', value: 'Da remoto, orari USA' },
        { label: 'Laurea', value: 'MSc, Politecnico di Milano' },
      ],
      cv: 'Scarica il CV',
      photoAlt: 'Alberto Di Maria',
      certifications: 'Certificazioni',
      experience: 'Esperienze',
      education: 'Studi',
    },
    contact: {
      title: ['Lavoriamo', 'insieme.'],
      lines: ['La prima call è gratuita.', 'Di solito rispondo in giornata.'],
      formIntro: 'Oppure scrivimi.',
      name: 'Nome',
      email: 'Email',
      message: 'Messaggio',
      send: 'Invia messaggio',
      sending: 'Invio…',
      success: 'Grazie, il messaggio è partito.',
      error: 'Qualcosa è andato storto. Riprova, o scrivimi direttamente.',
      orEmail: 'oppure scrivimi direttamente',
      errName: 'Il tuo nome?',
      errEmail: 'Un’email valida, per favore',
      errMessage: 'Due righe?',
    },
    footer: 'Da remoto, orari USA',
  },

  es: {
    skip: 'Ir al contenido',
    nav: { work: 'Trabajo', agencies: 'Para agencias', about: 'Sobre mí', book: 'Reserva una llamada', menuOpen: 'Abrir el menú', menuClose: 'Cerrar el menú', language: 'Cambiar idioma' },
    hero: {
      h1: ['Construyo productos de IA', 'end-to-end.'],
      d10sLine: ', mi agente de voz, te enseña el sitio.',
      ask: 'Habla o escribe a D10S',
      askLabel: 'Escribe a D10S',
      talk: 'Habla con D10S',
      sphere: 'Abrir D10S',
      d10sLineMobile: ['Habla o escribe a ', ', mi agente de voz.'],
      cats: ['Agentes de voz', 'Automatizaciones con IA', 'Webs y plataformas'],
      cueTop: 'Desliza',
      cue: 'Escucha una llamada real',
    },
    call: {
      quote: '«El jueves dentro de dos semanas, no este.»',
      line: 'Una llamada de prueba al agente telefónico que construí para una escuela de baile.',
      play: 'Escuchar la llamada',
      pause: 'Pausar la llamada',
      speed: 'Velocidad de reproducción',
      seek: 'Posición en la llamada',
      answersIn: 'Responde en',
      bookingAt: 'Reserva escrita en',
      caller: 'Quien llama',
      agent: 'Agente',
      silence: '(silencio)',
      interrupted: 'interrumpido',
      translated: 'Traducido del italiano.',
      original: 'Leer el original',
      transcriptLabel: 'Transcripción de la llamada',
      whole: 'Ver toda la llamada',
    },
    blocks: {
      label: 'Trabajo',
      alsoLabel: 'También:',
      moreLabel: 'Más:',
      items: [
        {
          id: 'voice',
          title: ['Agentes', 'de voz'],
          lead: 'Agentes telefónicos que responden y llaman, o voz dentro de tu app.',
          cards: [
            { id: 'dance-voice-agent', title: 'Agente telefónico para una escuela de baile', text: 'Reconoce a quien llama, reserva, cancela y cambia. Responde en 0,9 segundos.' },
            { id: 'shy-order', title: 'Shy Order', text: 'Toma tu reserva en el navegador y luego llama él al restaurante.' },
          ],
          also: [{ id: 'collaudio', name: 'Collaudio' }, { id: 'parlando', name: 'Parlando' }],
        },
        {
          id: 'automations',
          title: ['Automatizaciones', 'con IA'],
          lead: 'Automatizaciones que cierran el trabajo repetitivo.',
          cards: [
            { id: 'company-brain', title: 'Company Brain', text: 'Un agente que responde sobre los datos reales de una empresa. Hackathon, Top 10 de 80+.' },
            { id: 'zero-to-hubspot', title: 'Zero to HubSpot', text: '15 años de datos de un CRM migrados en 35 segundos. Final nacional, Top 25.' },
          ],
          also: [{ id: 'beat-agent', name: 'Beat Agent' }, { id: 'invoice-agent', name: 'Invoice Agent' }],
        },
        {
          id: 'sites',
          title: ['Webs y', 'plataformas'],
          lead: 'Una web nueva desde cero, o una existente actualizada y arreglada.',
          cards: [
            { id: 'beat-store', title: 'Beat Store', text: 'La tienda online de un productor, diseñada con Laura Zanchetta y construida desde su archivo Figma.' },
            { id: 'alex-bartok', title: 'Alex Bartok Music', text: 'La web rota de un músico rehecha desde cero, con un área de clientes de pago.' },
          ],
          also: [{ id: 'filoconduttore', name: 'filoconduttore' }],
        },
      ],
    },
    agencies: { label: 'Para agencias', title: 'Agentes de voz para agencias.', line: 'Probados con llamadas automáticas, verificados a mano.' },
    about: {
      title: 'Sobre mí',
      lead: 'Me formé como ingeniero de audio, y la voz es el área a la que siempre vuelvo.',
      body: [
        'Estudié Music and Acoustic Engineering en el Politecnico di Milano y luego trabajé en modelos generativos y análisis musical en Anecoica Studio, en Berlín. En los últimos dos años he construido productos de IA end-to-end: agentes telefónicos, automatizaciones y webs para clientes.',
        'Probar un agente de voz a mano significaba hacer llamadas después de cada cambio. Así que construí un tester que llama él al agente y compara lo que dijo con la base de datos. También enseño: más de 30 estudiantes universitarios de informática y electrónica.',
      ],
      facts: [
        { label: 'Idiomas', value: 'Italiano, inglés, español' },
        { label: 'Dónde', value: 'En remoto, horario de EE. UU.' },
        { label: 'Título', value: 'MSc, Politecnico di Milano' },
      ],
      cv: 'Descargar CV',
      photoAlt: 'Alberto Di Maria',
      certifications: 'Certificaciones',
      experience: 'Experiencia',
      education: 'Estudios',
    },
    contact: {
      title: ['Trabajemos', 'juntos.'],
      lines: ['La primera llamada es gratis.', 'Suelo responder en un día.'],
      formIntro: 'O escríbeme.',
      name: 'Nombre',
      email: 'Email',
      message: 'Mensaje',
      send: 'Enviar mensaje',
      sending: 'Enviando…',
      success: 'Gracias, tu mensaje está en camino.',
      error: 'Algo salió mal. Inténtalo de nuevo, o escríbeme directamente.',
      orEmail: 'o escríbeme directamente',
      errName: '¿Tu nombre?',
      errEmail: 'Un email válido, por favor',
      errMessage: '¿Dos líneas?',
    },
    footer: 'En remoto, horario de EE. UU.',
  },
};

/** "More" line under the three blocks: research and side work, by project id. */
export const moreProjects: { id: string; name: Record<Lang, string> }[] = [
  { id: 'lyra', name: { en: 'Lyra', it: 'Lyra', es: 'Lyra' } },
  { id: 'thesis', name: { en: 'MSc thesis', it: 'Tesi magistrale', es: 'Tesis de máster' } },
  { id: 'beyond-space', name: { en: 'Beyond Space', it: 'Beyond Space', es: 'Beyond Space' } },
  { id: 'wdf-h9000', name: { en: 'Wave Digital Filters on the Eventide H9000', it: 'Wave Digital Filters su Eventide H9000', es: 'Wave Digital Filters en el Eventide H9000' } },
];

// D10S panel — static shell (zero JS) and the React island share these.
export const voiceUi: Record<Lang, { talk: string; type: string; chips: string[] }> = {
  en: { talk: 'talk', type: 'type', chips: ['play me the real call', 'show me a project for a client', 'write the message to Alberto for me'] },
  it: { talk: 'parla', type: 'scrivi', chips: ['fammi sentire la chiamata vera', 'mostrami un lavoro per un cliente', 'scrivi tu il messaggio per Alberto'] },
  es: { talk: 'habla', type: 'escribe', chips: ['ponme la llamada real', 'muéstrame un proyecto de cliente', 'escribe tú el mensaje para Alberto'] },
};

export const d10sShell: Record<Lang, { greeting: string; tryLabel: string; inputPh: string; mic: string; minimise: string; dock: string; sealTop: string; sealBottom: string; shortcuts: string }> = {
  en: { greeting: 'Hi, I’m D10S. Tell me what you need.', tryLabel: 'try asking', inputPh: 'type a message…', mic: 'Talk to D10S', minimise: 'Minimise D10S', dock: 'Ask D10S', sealTop: 'any questions?', sealBottom: 'ask the agent', shortcuts: 'Page shortcuts' },
  it: { greeting: 'Ciao, sono D10S. Dimmi di cosa hai bisogno.', tryLabel: 'prova a chiedere', inputPh: 'scrivi un messaggio…', mic: 'Parla con D10S', minimise: 'Riduci D10S', dock: 'Chiedi a D10S', sealTop: 'hai domande?', sealBottom: 'chiedi all’agente', shortcuts: 'Scorciatoie pagina' },
  es: { greeting: 'Hola, soy D10S. Dime qué necesitas.', tryLabel: 'prueba a preguntar', inputPh: 'escribe un mensaje…', mic: 'Habla con D10S', minimise: 'Reducir D10S', dock: 'Pregunta a D10S', sealTop: '¿alguna duda?', sealBottom: 'pregunta al agente', shortcuts: 'Atajos de página' },
};

export const certifications: Record<Lang, TimelineItem[]> = {
  en: [
    { title: 'Creative Machine Learning', meta: 'IRCAM / ACIDS · 2025', desc: 'ML for audio: neural networks, generative models and transformers. Score 96/100.' },
    { title: 'Audio Signal Processing for Music Applications', meta: 'Universitat Pompeu Fabra · 2025', desc: 'Analysis, transformation and synthesis of musical signals.' },
    { title: 'Generative Music AI Workshop', meta: 'Music Technology Group & Sound of AI · 2025', desc: 'Generative AI for music, with a team project. In person, 1 week.' },
  ],
  it: [
    { title: 'Creative Machine Learning', meta: 'IRCAM / ACIDS · 2025', desc: 'ML per l’audio: reti neurali, modelli generativi e transformer. Voto 96/100.' },
    { title: 'Audio Signal Processing for Music Applications', meta: 'Universitat Pompeu Fabra · 2025', desc: 'Analisi, trasformazione e sintesi di segnali musicali.' },
    { title: 'Generative Music AI Workshop', meta: 'Music Technology Group & Sound of AI · 2025', desc: 'AI generativa per la musica, con un progetto in team. In presenza, 1 settimana.' },
  ],
  es: [
    { title: 'Creative Machine Learning', meta: 'IRCAM / ACIDS · 2025', desc: 'ML para audio: redes neuronales, modelos generativos y transformers. Nota 96/100.' },
    { title: 'Audio Signal Processing for Music Applications', meta: 'Universitat Pompeu Fabra · 2025', desc: 'Análisis, transformación y síntesis de señales musicales.' },
    { title: 'Generative Music AI Workshop', meta: 'Music Technology Group & Sound of AI · 2025', desc: 'IA generativa para la música, con un proyecto en equipo. Presencial, 1 semana.' },
  ],
};

export const experience: Record<Lang, TimelineItem[]> = {
  en: [
    { title: 'Freelance AI Developer', meta: '2026 – Present · Remote', desc: 'AI systems for clients, end-to-end: LLM agents, backend APIs and full-stack products.' },
    { title: 'Audio Developer — Anecoica Studio', meta: 'Berlin · 2023 – 2024', desc: 'Generative audio models, music information retrieval and a full-stack prototype in React, Flask and Python.' },
    { title: 'Private Tutor — il-Cubo.it and filoconduttore.it', meta: '2021 – Present', desc: 'Tutored 30+ bachelor and master students in computer science and electronics.' },
    { title: 'STEM Instructor — Bricks4Kidz', meta: 'Milan · 2025 – 2026', desc: 'STEM for primary-school children: LEGO Technic and an introduction to programming.' },
  ],
  it: [
    { title: 'Sviluppatore AI freelance', meta: '2026 – Presente · Da remoto', desc: 'Sistemi AI per clienti, end-to-end: agenti LLM, API backend e prodotti full-stack.' },
    { title: 'Audio Developer — Anecoica Studio', meta: 'Berlino · 2023 – 2024', desc: 'Modelli audio generativi, music information retrieval e un prototipo full-stack con React, Flask e Python.' },
    { title: 'Docente privato — il-Cubo.it e filoconduttore.it', meta: '2021 – Presente', desc: 'Tutorato di 30+ studenti triennali e magistrali in informatica ed elettronica.' },
    { title: 'Istruttore STEM — Bricks4Kidz', meta: 'Milano · 2025 – 2026', desc: 'STEM per bambini della scuola primaria: LEGO Technic e introduzione alla programmazione.' },
  ],
  es: [
    { title: 'Desarrollador de IA freelance', meta: '2026 – Presente · En remoto', desc: 'Sistemas de IA para clientes, end-to-end: agentes LLM, APIs backend y productos full-stack.' },
    { title: 'Audio Developer — Anecoica Studio', meta: 'Berlín · 2023 – 2024', desc: 'Modelos de audio generativos, music information retrieval y un prototipo full-stack con React, Flask y Python.' },
    { title: 'Profesor particular — il-Cubo.it y filoconduttore.it', meta: '2021 – Presente', desc: 'Tutorías a 30+ estudiantes de grado y máster en informática y electrónica.' },
    { title: 'Instructor STEM — Bricks4Kidz', meta: 'Milán · 2025 – 2026', desc: 'STEM para niños de primaria: LEGO Technic e introducción a la programación.' },
  ],
};

export const education: Record<Lang, TimelineItem[]> = {
  en: [
    { title: 'MSc Music and Acoustic Engineering', meta: 'Politecnico di Milano · 2024', desc: 'Thesis: a system that goes from audio analysis to music generation.' },
    { title: 'BSc Electronic Engineering', meta: 'Università di Padova · 2020', desc: '' },
  ],
  it: [
    { title: 'Laurea magistrale in Music and Acoustic Engineering', meta: 'Politecnico di Milano · 2024', desc: 'Tesi: un sistema che va dall’analisi audio alla generazione musicale.' },
    { title: 'Laurea triennale in Ingegneria Elettronica', meta: 'Università di Padova · 2020', desc: '' },
  ],
  es: [
    { title: 'Máster en Music and Acoustic Engineering', meta: 'Politecnico di Milano · 2024', desc: 'Tesis: un sistema que va del análisis de audio a la generación musical.' },
    { title: 'Grado en Ingeniería Electrónica', meta: 'Università di Padova · 2020', desc: '' },
  ],
};
