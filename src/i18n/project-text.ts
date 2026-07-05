import type { Lang } from './content';

export interface ProjectText {
  oneliner: string;
  bullets: string[];
}

// IT/ES overrides for project copy. EN lives in src/data/projects.ts.
// Reuses Alberto's existing translations (languages/it.json, es.json) where the EN matches.
export const projectText: Partial<Record<Lang, Record<string, ProjectText>>> = {
  it: {
    'lyra': {
      oneliner: 'Scoperta musicale lyrics-first — una playlist che attraversa le tue emozioni.',
      bullets: [
        'Descrivi uno stato d’animo a parole, o tocca una ruota di 12 emozioni — un agente Claude interpreta testo e tap nello stesso stato emotivo, e Lyra costruisce la playlist come una traiettoria in quello spazio, non una lista piatta.',
        'I brani sono scelti per ciò che dicono i testi: embedding sentence-transformer collocano ogni traccia su una tassonomia emotiva valenza × energia, e viene mostrato il verso citato esatto che ha fatto match con il tuo mood, via Musixmatch lyrics/richsync.',
        'Guidi dal vivo — more like this / change the mood / raise the energy — rimodellando la coda senza tagliare il brano in riproduzione; una bussola 3D react-three-fiber si orienta al tuo mood e traccia il percorso compiuto.',
      ],
    },
    'beat-store': {
      oneliner: 'Piattaforma e-commerce musicale full-stack per un producer.',
      bullets: [
        'Catalogo di beat con preview a waveform, carrello multi-licenza (MP3 / WAV / stems / exclusive) e checkout Stripe in pagina.',
        'Webhook Stripe idempotente, RLS su tutte le tabelle, admin API protetta da JWT, download a URL firmati on-demand.',
        'Stack zero-egress: audio su Cloudflare R2 servito direttamente al browser, deployato in CI su Netlify.',
      ],
    },
    'alex-bartok': {
      oneliner: 'Cleanup vibe-coding commissionato: un sito PHP ricostruito in una React app sicura + area clienti.',
      bullets: [
        'Incaricato di ripulire e mettere in produzione il sito vibe-coded di un cliente — monolite PHP migrato a una React SPA unificata (sito pubblico + area clienti autenticata), servita statica e trilingue (IT/EN/ES).',
        'Area clienti con project room, audio versionato e feedback col timestamp, protetta da un paywall RLS (ownership + is_paid) con download a URL firmati; due fughe di lettura cross-tenant trovate e chiuse.',
        'Rilasciato con un gate CI (typecheck/lint/build/test), header hardened (HSTS/CSP) e un endpoint contatti con reCAPTCHA e rate-limit.',
      ],
    },
    'company-brain': {
      oneliner: 'AI agentica sui dati aziendali in tempo reale.',
      bullets: [
        'Top 10 all’hackathon Cursor × Yellow Tech → qualificato alla Lega Nazionale Italiana degli Hackathon.',
        'Agente FastAPI su CRM, ERP, log chiamate e knowledge base: l’LLM sceglie solo i tool e scrive la risposta mentre Python fa ogni conteggio e somma — numeri esatti, provenienza delle fonti, zero allucinazioni.',
        'RAG zero-infrastruttura (BM25 su documenti interi) più un knowledge graph interattivo; multilingua IT/EN/ES.',
      ],
    },
    'dance-voice-agent': {
      oneliner: 'Assistente telefonico AI inbound per una scuola di ballo, 24/7.',
      bullets: [
        'Identifica gli studenti, prenota lezioni, gestisce recuperi e lezioni di prova — interamente al telefono.',
        'Pipeline vocale real-time con barge-in: Deepgram STT → GPT-4o con tool calling parallelo → ElevenLabs TTS streaming (IT/ES).',
        'Dashboard admin con analytics sulle chiamate, trend prenotazioni e gestione studenti.',
      ],
    },
    'shy-order': {
      oneliner: 'Agente vocale autonomo con chiamate in uscita.',
      bullets: [
        'Conversa con l’utente via browser per raccogliere i dettagli della prenotazione.',
        'Chiama autonomamente il ristorante via Twilio, gestendo l’intera conversazione telefonica end-to-end.',
        'Dashboard admin con analytics sulle sessioni e tracking dei ricavi.',
      ],
    },
    'beat-agent': {
      oneliner: 'Pipeline di pubblicazione AI per Beat Store.',
      bullets: [
        'CLI headless: gli indichi la cartella di drop del producer e pubblica ogni beat su Beat Store tramite l’API autenticata dello store.',
        'Arricchimento di metadati e SEO via Claude API; pipeline di upload idempotente e ripristinabile.',
        'Mostra ogni drop nel terminale e chiede conferma prima di pubblicare.',
      ],
    },
    'beyond-space': {
      oneliner: 'Generazione audio tramite interpolazione nello spazio latente RAVE.',
      bullets: [
        'Carica fino a 4 file audio e interpola tra le loro codifiche latenti RAVE tramite una board 2D.',
        'Ponderazione baricentrica — la posizione del click imposta il blend tra tutti gli input simultaneamente.',
        'Backend FastAPI + TorchScript su HF Spaces, frontend React su Vercel.',
      ],
    },
    thesis: {
      oneliner: 'Tesi magistrale: dall’analisi audio alla generazione musicale.',
      bullets: [
        'Pipeline a tre client che trasforma l’analisi audio in generazione musicale — visualizzazione 3D mood-based → mappatura delle emozioni → generazione senza prompt, in loop real-time.',
        'La geometria sacra come interfaccia — il Cubo di Metatron e i solidi platonici mappano le emozioni sulle feature audio in un client 3D interattivo (React Three Fiber / Three.js).',
        'Generazione senza prompt via Suno API; benchmark comparativo di modelli generativi (Suno, RAVE, MusicGen, Jukebox).',
      ],
    },
    'wdf-h9000': {
      oneliner: 'Modellazione di circuiti analogici su hardware di effetti dedicato.',
      bullets: [
        'Prima implementazione riuscita di un algoritmo Wave Digital Filter (WDF) su Eventide H9000, modellando circuiti lineari e non lineari direttamente sull’hardware tramite VSig3.',
        'Non-linearità gestite con una rappresentazione Canonical PieceWise-Linear (CPWL); validato end-to-end con un circuito diode-clipper sul dispositivo.',
        'Sviluppato entro i limiti del linguaggio low-level di VSig3, senza esempi in letteratura.',
      ],
    },
    'invoice-agent': {
      oneliner: 'Sistema di automazione per la gestione del tutoraggio.',
      bullets: [
        'Automatizza la fatturazione via Fiscozen e invia email personalizzate ai clienti.',
        'Sincronizza le sessioni di Google Calendar su Notion; prenota automaticamente sulle piattaforme.',
        'Si aggiorna ogni giorno: fatturazione, email, log sessioni e prenotazioni.',
      ],
    },
    'skyitalia-voice-agent': {
      oneliner: 'Supporto aereo a due voice-agent con escalation dal vivo — Yellow Tech × ElevenLabs.',
      bullets: [
        'Aria gestisce i passeggeri in prima linea ed effettua l’escalation dei casi complessi a Marco, un agente supervisore.',
        'Supporto conversazionale multilingue (IT / EN / ES / FR) su ElevenLabs Conversational AI.',
        'Realizzato all’hackathon Yellow Tech × ElevenLabs.',
      ],
    },
    'music-genre-classifier': {
      oneliner: 'Classificazione di genere musicale con deep learning (NN / CNN / RNN-LSTM).',
      bullets: [
        'Classifica i brani per genere da feature MFCC (librosa), addestrato sul dataset GTZAN.',
        'Confronta architetture NN, CNN e RNN-LSTM con valutazione accuracy/loss; scalabile ad altri dataset e modelli.',
      ],
    },
    'save-the-world': {
      oneliner: 'Installazione interattiva sull’impatto ecologico delle azioni quotidiane.',
      bullets: [
        'Gli utenti imitano azioni quotidiane e vedono il loro impatto su CO₂ e clima in tempo reale su un globo 3D reattivo.',
        'Riconoscimento gesti in Python + visual 3D real-time in TouchDesigner + soundscape generativi in SuperCollider.',
      ],
    },
  },
  es: {
    'lyra': {
      oneliner: 'Descubrimiento musical desde la letra — una playlist que recorre tus emociones.',
      bullets: [
        'Describe un estado de ánimo con palabras, o toca una rueda de 12 emociones — un agente Claude interpreta texto y toques en un mismo estado emocional, y Lyra construye la playlist como una trayectoria por ese espacio, no una lista plana.',
        'Las canciones se eligen por lo que dicen sus letras: embeddings sentence-transformer sitúan cada tema en una taxonomía emocional de valencia × energía, y se muestra el verso citado exacto que encajó con tu ánimo, vía Musixmatch lyrics/richsync.',
        'Diriges en directo — more like this / change the mood / raise the energy — remodelando la cola sin cortar la canción en curso; una brújula 3D react-three-fiber gira hacia tu ánimo y traza el camino recorrido.',
      ],
    },
    'beat-store': {
      oneliner: 'Plataforma de e-commerce musical full-stack para un productor.',
      bullets: [
        'Catálogo de beats con previsualizaciones a waveform, carrito multi-licencia (MP3 / WAV / stems / exclusive) y checkout de Stripe en página.',
        'Webhook de Stripe idempotente, RLS en todas las tablas, admin API protegida con JWT, descargas con URLs firmadas bajo demanda.',
        'Stack zero-egress: audio desde Cloudflare R2 servido directamente al navegador, desplegado en CI sobre Netlify.',
      ],
    },
    'alex-bartok': {
      oneliner: 'Limpieza de vibe-coding por encargo: un sitio PHP reconstruido en una React app segura + área de clientes.',
      bullets: [
        'Contratado para limpiar y poner en producción el sitio vibe-coded de un cliente — monolito PHP migrado a una React SPA unificada (sitio público + área de clientes autenticada), servida estática y trilingüe (IT/EN/ES).',
        'Área de clientes con project rooms, audio versionado y feedback con timestamp, protegida por un paywall RLS (ownership + is_paid) con descargas por URLs firmadas; dos fugas de lectura cross-tenant encontradas y corregidas.',
        'Publicado con un gate de CI (typecheck/lint/build/test), cabeceras endurecidas (HSTS/CSP) y un endpoint de contacto con reCAPTCHA y rate-limit.',
      ],
    },
    'company-brain': {
      oneliner: 'IA agéntica sobre los datos de empresa en vivo.',
      bullets: [
        'Top 10 en el hackathon Cursor × Yellow Tech → clasificado para la Liga Nacional Italiana de Hackathons.',
        'Agente FastAPI sobre el CRM, ERP, registros de llamadas y base de conocimiento: el LLM solo elige las herramientas y redacta la respuesta mientras Python hace cada conteo y suma — cifras exactas, procedencia de las fuentes, cero alucinaciones.',
        'RAG sin infraestructura (BM25 sobre documentos completos) más un grafo de conocimiento interactivo; multilingüe IT/EN/ES.',
      ],
    },
    'dance-voice-agent': {
      oneliner: 'Asistente telefónico de IA inbound para una escuela de baile, 24/7.',
      bullets: [
        'Identifica alumnos, reserva clases, gestiona recuperaciones y lecciones de prueba — todo por teléfono.',
        'Pipeline de voz en tiempo real con barge-in: Deepgram STT → GPT-4o con tool calling paralelo → ElevenLabs TTS streaming (IT/ES).',
        'Dashboard admin con analíticas de llamadas, tendencias de reservas y gestión de alumnos.',
      ],
    },
    'shy-order': {
      oneliner: 'Agente de voz autónomo con llamadas salientes.',
      bullets: [
        'Conversa con el usuario vía navegador para recopilar los detalles de la reserva.',
        'Llama autónomamente al restaurante vía Twilio, gestionando toda la conversación telefónica end-to-end.',
        'Dashboard de administración con analíticas de sesiones y seguimiento de ingresos.',
      ],
    },
    'beat-agent': {
      oneliner: 'Pipeline de publicación con IA para Beat Store.',
      bullets: [
        'CLI headless: le indicas la carpeta de drop del productor y publica cada beat en Beat Store mediante la API autenticada de la tienda.',
        'Enriquecimiento de metadatos y SEO con Claude API; pipeline de subida idempotente y reanudable.',
        'Muestra cada drop en la terminal y pide confirmación antes de publicar.',
      ],
    },
    'beyond-space': {
      oneliner: 'Generación de audio mediante interpolación en el espacio latente RAVE.',
      bullets: [
        'Carga hasta 4 archivos de audio e interpola entre sus codificaciones latentes RAVE mediante un tablero 2D.',
        'Ponderación baricéntrica — la posición del clic define la mezcla entre todas las entradas simultáneamente.',
        'Backend FastAPI + TorchScript en HF Spaces, frontend React en Vercel.',
      ],
    },
    thesis: {
      oneliner: 'Tesis de máster: del análisis de audio a la generación musical.',
      bullets: [
        'Sistema de tres clientes que convierte el análisis de audio en generación musical — visualización 3D basada en el mood → mapeo de emociones → generación sin prompts, en bucle en tiempo real.',
        'La geometría sagrada como interfaz — el Cubo de Metatrón y los sólidos platónicos mapean emociones a características de audio en un cliente 3D interactivo (React Three Fiber / Three.js).',
        'Generación sin prompts mediante la API de Suno; benchmark comparativo de modelos generativos (Suno, RAVE, MusicGen, Jukebox).',
      ],
    },
    'wdf-h9000': {
      oneliner: 'Modelado de circuitos analógicos en hardware de efectos dedicado.',
      bullets: [
        'Primera implementación exitosa de un algoritmo Wave Digital Filter (WDF) en el Eventide H9000, modelando circuitos lineales y no lineales directamente en el hardware mediante VSig3.',
        'No linealidades tratadas con una representación Canonical PieceWise-Linear (CPWL); validado de extremo a extremo con un circuito diode-clipper en el dispositivo.',
        'Desarrollado dentro de las limitaciones del lenguaje de bajo nivel de VSig3, sin ejemplos en la literatura.',
      ],
    },
    'invoice-agent': {
      oneliner: 'Sistema de automatización para la gestión de tutorías.',
      bullets: [
        'Automatiza la facturación vía Fiscozen y envía correos personalizados a los clientes.',
        'Sincroniza sesiones de Google Calendar con Notion; reserva automáticamente en las plataformas.',
        'Se ejecuta a diario: facturación, correos, registro de sesiones y reservas.',
      ],
    },
    'skyitalia-voice-agent': {
      oneliner: 'Soporte aéreo con dos agentes de voz y escalado en vivo — Yellow Tech × ElevenLabs.',
      bullets: [
        'Aria atiende a los pasajeros en primera línea y escala los casos complejos a Marco, un agente supervisor.',
        'Soporte conversacional multilingüe (IT / EN / ES / FR) en ElevenLabs Conversational AI.',
        'Construido en el hackathon Yellow Tech × ElevenLabs.',
      ],
    },
    'music-genre-classifier': {
      oneliner: 'Clasificación de género musical con deep learning (NN / CNN / RNN-LSTM).',
      bullets: [
        'Clasifica pistas por género a partir de características MFCC (librosa), entrenado en el dataset GTZAN.',
        'Compara arquitecturas NN, CNN y RNN-LSTM con evaluación de accuracy/loss; escalable a otros datasets y modelos.',
      ],
    },
    'save-the-world': {
      oneliner: 'Instalación interactiva sobre el impacto ecológico de las acciones diarias.',
      bullets: [
        'Los usuarios imitan acciones cotidianas y ven su impacto en CO₂ y clima en tiempo real sobre un globo 3D reactivo.',
        'Reconocimiento de gestos en Python + visuales 3D en tiempo real en TouchDesigner + paisajes sonoros generativos en SuperCollider.',
      ],
    },
  },
};
