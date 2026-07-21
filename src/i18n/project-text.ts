import type { Lang } from './content';
import type { Bullet } from '../data/projects';

export interface ProjectText {
  oneliner: string;
  bullets: Bullet[];
}

// IT/ES overrides for project copy. EN lives in src/data/projects.ts.
// Reuses Alberto's existing translations (languages/it.json, es.json) where the EN matches.
export const projectText: Partial<Record<Lang, Record<string, ProjectText>>> = {
  it: {
    'parlando': {
      oneliner: 'Un tutor di lingue con cui si parla — un’app Android che ascolta, corregge e si ricorda di te.',
      bullets: [
        { lead: 'Impari parlando', body: 'una conversazione vera, a voce, in inglese o spagnolo — dal primo minuto. Quasi senza testo, di proposito.' },
        { lead: 'Si ricorda di te', body: 'da ogni chiamata estrae gli errori che hai fatto davvero; la ripetizione spaziata li fa riemergere e sceglie lo scenario di domani.' },
        { lead: 'Esercizi dai tuoi errori', body: 'scrittura, traduzione e lessico nascono dagli errori che hai fatto davvero — corretti da un LLM, e solo le valutazioni sicure entrano nella tua memoria.' },
        { lead: 'Quattro agenti, non un prompt', body: 'chi parte da zero ha un agente tutto suo: voce più lenta, ripeti-dopo-di-me, zero correzioni.' },
      ],
    },
    'lyra': {
      oneliner: 'Scoperta musicale lyrics-first — una playlist che attraversa le tue emozioni.',
      bullets: [
        { lead: 'Descrivi uno stato d’animo', body: 'a parole o tocca una ruota di 12 emozioni — un agente Claude lo risolve e Lyra costruisce la playlist come una traiettoria, non una lista piatta.' },
        { lead: 'Scelte dai testi', body: 'embedding sentence-transformer collocano ogni traccia su una tassonomia valenza × energia; il verso esatto che ha fatto match viene mostrato.' },
        { lead: 'Guidi dal vivo', body: 'more like this / change the mood / raise the energy — rimodelli la coda senza tagliare il brano; una bussola 3D si orienta e traccia il percorso.' },
      ],
    },
    'beat-store': {
      oneliner: 'Il negozio online di un producer: beat in vendita con anteprima, licenze e pagamento in pagina.',
      bullets: [
        { lead: 'Pagamento in pagina', body: 'anteprima audio a waveform, carrello multi-licenza (MP3 / WAV / stems / exclusive) e Stripe senza uscire dalla pagina.' },
        { lead: 'Si consegna da solo', body: 'ogni acquisto manda link di download privati, validi solo per chi ha comprato.' },
        { lead: 'Costi ridotti all’osso', body: 'l’audio viaggia da Cloudflare direttamente al browser, senza server in mezzo.' },
      ],
    },
    'alex-bartok': {
      oneliner: 'Il sito di un musicista che funzionava male, ricostruito da zero — veloce, sicuro, trilingue, con area clienti a pagamento.',
      bullets: [
        { lead: 'Ricostruito come app moderna', body: 'sito pubblico + area clienti riservata, in tre lingue (IT/EN/ES) — da un sito che funzionava male.' },
        { lead: 'Ogni progetto ha la sua stanza', body: 'audio versionati, commenti puntati al secondo esatto, download riservati a chi ha pagato.' },
        { lead: 'Consegnato blindato', body: 'controlli automatici a ogni modifica, sicurezza rinforzata, form contatti anti-spam; due falle di accesso trovate e chiuse.' },
      ],
    },
    'company-brain': {
      oneliner: 'Un agente AI che risponde a domande sui dati veri dell’azienda — numeri esatti, niente di inventato.',
      bullets: [
        { lead: 'Risponde dai dati veri', body: 'chiedi in linguaggio naturale su clienti, ordini o chiamate — l’agente consulta CRM, gestionale e documenti e cita le fonti.' },
        { lead: 'I conti li fa il codice, non l’AI', body: 'il modello sceglie solo dove guardare e come spiegare; i numeri sono sempre esatti.' },
        { lead: 'Top 10 all’hackathon Cursor × Yellow Tech', body: 'qualificato alla Lega Nazionale Italiana degli Hackathon.' },
      ],
    },
    'dance-voice-agent': {
      oneliner: 'L’assistente telefonico AI di una scuola di ballo: risponde 24/7, prenota, sposta, informa.',
      bullets: [
        { lead: 'Gestisce la chiamata da solo', body: 'riconosce lo studente, dà info sui corsi, prenota, disdice e sposta lezioni — e passa a una persona quando serve.' },
        { lead: 'Italiano e spagnolo, senza sovrapporsi', body: 'risponde al volo; conferme e promemoria arrivano via SMS.' },
        { lead: 'Testato prima di andare in linea', body: '9/9 scenari reali superati, con un pannello che tiene d’occhio tempi e costi di ogni chiamata.' },
      ],
    },
    'shy-order': {
      oneliner: 'Agente vocale autonomo con chiamate in uscita.',
      bullets: [
        { lead: 'Raccoglie via browser', body: 'conversa con l’utente per i dettagli della prenotazione.' },
        { lead: 'Chiama il ristorante da solo', body: 'compone via Twilio e gestisce l’intera telefonata end-to-end.' },
        { lead: 'Si ricorda di te', body: 'memoria cross-sessione che sopravvive alle chiamate stateless di ElevenLabs — riconosce i clienti di ritorno e propone «il solito».' },
        { lead: 'Dashboard admin', body: 'analytics sulle sessioni e tracking dei ricavi.' },
      ],
    },
    'beat-agent': {
      oneliner: 'Pipeline di pubblicazione AI per Beat Store.',
      bullets: [
        { lead: 'CLI headless', body: 'gli indichi la cartella di drop del producer e pubblica ogni beat su Beat Store tramite l’API autenticata dello store.' },
        { lead: 'Metadati + SEO AI', body: 'arricchimento via Claude API; pipeline di upload idempotente e ripristinabile.' },
        { lead: 'Conferma prima di pubblicare', body: 'mostra ogni drop nel terminale e chiede l’ok.' },
      ],
    },
    'beyond-space': {
      oneliner: 'Generazione audio tramite interpolazione nello spazio latente RAVE.',
      bullets: [
        { lead: 'Interpola nel latente', body: 'carichi fino a 4 file audio e mescoli le loro codifiche latenti RAVE tramite una board 2D.' },
        { lead: 'Ponderazione baricentrica', body: 'la posizione del click imposta il blend tra tutti gli input insieme.' },
        { lead: 'FastAPI + TorchScript', body: 'backend su HF Spaces, frontend React su Vercel.' },
      ],
    },
    thesis: {
      oneliner: 'Tesi magistrale: dall’analisi audio alla generazione musicale.',
      bullets: [
        { lead: 'Analisi → generazione', body: 'pipeline a tre client: visualizzazione 3D mood-based → mappatura emozioni → generazione senza prompt, in loop real-time.' },
        { lead: 'Geometria sacra come interfaccia', body: 'il Cubo di Metatron e i solidi platonici mappano le emozioni sulle feature audio in un client 3D interattivo.' },
        { lead: 'Generazione senza prompt', body: 'via Suno API; benchmark comparativo di modelli generativi (Suno, RAVE, MusicGen, Jukebox).' },
      ],
    },
    'wdf-h9000': {
      oneliner: 'Modellazione di circuiti analogici su hardware di effetti dedicato.',
      bullets: [
        { lead: 'Primo WDF sull’H9000', body: 'algoritmo Wave Digital Filter che modella circuiti lineari e non lineari direttamente sull’hardware tramite VSig3.' },
        { lead: 'Non-linearità via CPWL', body: 'una rappresentazione Canonical PieceWise-Linear; validato end-to-end con un circuito diode-clipper.' },
        { lead: 'Nessun precedente', body: 'sviluppato entro i limiti low-level di VSig3, senza esempi in letteratura.' },
      ],
    },
    'invoice-agent': {
      oneliner: 'Sistema di automazione per la gestione del tutoraggio.',
      bullets: [
        { lead: 'Automatizza la fatturazione', body: 'via Fiscozen, e invia email personalizzate ai clienti.' },
        { lead: 'Sincronizza e prenota', body: 'sessioni Google Calendar → Notion; prenota in automatico sulle piattaforme.' },
        { lead: 'Gira ogni giorno', body: 'fatturazione, email, log sessioni e prenotazioni.' },
      ],
    },
    'skyitalia-voice-agent': {
      oneliner: 'Supporto aereo a due voice-agent con escalation dal vivo — Yellow Tech × ElevenLabs.',
      bullets: [
        { lead: 'Due agenti, escalation live', body: 'Aria gestisce i passeggeri in prima linea e passa i casi complessi a Marco, un agente supervisore.' },
        { lead: 'Multilingue', body: 'supporto conversazionale (IT / EN / ES / FR) su ElevenLabs Conversational AI.' },
        { lead: 'Da hackathon', body: 'realizzato a Yellow Tech × ElevenLabs.' },
      ],
    },
    'music-genre-classifier': {
      oneliner: 'Classificazione di genere musicale con deep learning (NN / CNN / RNN-LSTM).',
      bullets: [
        { lead: 'Genere dagli MFCC', body: 'classifica i brani con feature librosa, addestrato sul dataset GTZAN.' },
        { lead: 'NN vs CNN vs RNN-LSTM', body: 'confrontate con valutazione accuracy/loss; scalabile ad altri dataset e modelli.' },
      ],
    },
    'save-the-world': {
      oneliner: 'Installazione interattiva sull’impatto ecologico delle azioni quotidiane.',
      bullets: [
        { lead: 'Agisci, vedi l’impatto', body: 'gli utenti imitano azioni quotidiane e vedono l’impatto su CO₂ e clima in tempo reale su un globo 3D reattivo.' },
        { lead: 'Gesti → visual → suono', body: 'riconoscimento gesti Python + 3D real-time TouchDesigner + soundscape generativi SuperCollider.' },
      ],
    },
  },
  es: {
    'parlando': {
      oneliner: 'Un tutor de idiomas con el que se habla — una app Android que escucha, corrige y se acuerda de ti.',
      bullets: [
        { lead: 'Aprendes hablando', body: 'una conversación de verdad, en voz alta, en inglés o español — desde el primer minuto. Casi sin texto, a propósito.' },
        { lead: 'Se acuerda de ti', body: 'de cada llamada extrae los errores que cometiste de verdad; la repetición espaciada los hace resurgir y elige el escenario de mañana.' },
        { lead: 'Ejercicios de tus errores', body: 'escritura, traducción y vocabulario nacen de los errores que cometiste de verdad — corregidos por un LLM, y solo las valoraciones seguras entran en tu memoria.' },
        { lead: 'Cuatro agentes, no un prompt', body: 'quien empieza de cero tiene su propio agente: voz más lenta, escucha-y-repite, cero correcciones.' },
      ],
    },
    'lyra': {
      oneliner: 'Descubrimiento musical desde la letra — una playlist que recorre tus emociones.',
      bullets: [
        { lead: 'Describe un estado de ánimo', body: 'con palabras o toca una rueda de 12 emociones — un agente Claude lo resuelve y Lyra construye la playlist como una trayectoria, no una lista plana.' },
        { lead: 'Elegidas por las letras', body: 'embeddings sentence-transformer sitúan cada tema en una taxonomía valencia × energía; el verso exacto que encajó con tu ánimo se muestra.' },
        { lead: 'Diriges en directo', body: 'more like this / change the mood / raise the energy — remodelas la cola sin cortar la canción; una brújula 3D gira y traza el camino.' },
      ],
    },
    'beat-store': {
      oneliner: 'La tienda online de un producer: beats a la venta con preescucha, licencias y pago en página.',
      bullets: [
        { lead: 'Pago en página', body: 'preescucha en waveform, carrito multi-licencia (MP3 / WAV / stems / exclusive) y Stripe sin salir de la página.' },
        { lead: 'Se entrega sola', body: 'cada compra manda enlaces de descarga privados, válidos solo para quien ha comprado.' },
        { lead: 'Costes al mínimo', body: 'el audio viaja de Cloudflare directo al navegador, sin servidor en medio.' },
      ],
    },
    'alex-bartok': {
      oneliner: 'La web de un músico que funcionaba mal, reconstruida desde cero — rápida, segura, trilingüe, con área de clientes de pago.',
      bullets: [
        { lead: 'Reconstruida como app moderna', body: 'sitio público + área de clientes reservada, en tres idiomas (IT/EN/ES) — desde una web que funcionaba mal.' },
        { lead: 'Cada proyecto tiene su sala', body: 'audio versionado, comentarios fijados al segundo exacto, descargas reservadas a quien ha pagado.' },
        { lead: 'Entregada reforzada', body: 'controles automáticos en cada cambio, seguridad reforzada, formulario anti-spam; dos fugas de acceso encontradas y cerradas.' },
      ],
    },
    'company-brain': {
      oneliner: 'Un agente de IA que responde preguntas sobre los datos reales de la empresa — números exactos, nada inventado.',
      bullets: [
        { lead: 'Responde con datos reales', body: 'pregunta en lenguaje natural sobre clientes, pedidos o llamadas — el agente consulta el CRM, el gestor y los documentos y cita las fuentes.' },
        { lead: 'Las cuentas las hace el código, no la IA', body: 'el modelo solo elige dónde mirar y cómo explicarlo; los números son siempre exactos.' },
        { lead: 'Top 10 en Cursor × Yellow Tech', body: 'clasificado para la Liga Nacional Italiana de Hackathons.' },
      ],
    },
    'dance-voice-agent': {
      oneliner: 'El asistente telefónico IA de una escuela de baile: responde 24/7, reserva, cambia, informa.',
      bullets: [
        { lead: 'Gestiona la llamada solo', body: 'reconoce al alumno, informa de cursos, reserva, cancela y cambia clases — y pasa a una persona cuando hace falta.' },
        { lead: 'Italiano y español, sin pisar', body: 'responde al instante; confirmaciones y recordatorios llegan por SMS.' },
        { lead: 'Probado antes de salir en vivo', body: '9/9 escenarios reales superados, con un panel que vigila tiempos y costes de cada llamada.' },
      ],
    },
    'shy-order': {
      oneliner: 'Agente de voz autónomo con llamadas salientes.',
      bullets: [
        { lead: 'Recopila vía navegador', body: 'conversa con el usuario para los detalles de la reserva.' },
        { lead: 'Llama al restaurante solo', body: 'marca vía Twilio y gestiona toda la llamada end-to-end.' },
        { lead: 'Se acuerda de ti', body: 'memoria entre sesiones que sobrevive a las llamadas stateless de ElevenLabs — reconoce a los clientes recurrentes y propone «lo de siempre».' },
        { lead: 'Dashboard de administración', body: 'analíticas de sesiones y seguimiento de ingresos.' },
      ],
    },
    'beat-agent': {
      oneliner: 'Pipeline de publicación con IA para Beat Store.',
      bullets: [
        { lead: 'CLI headless', body: 'le indicas la carpeta de drop del productor y publica cada beat en Beat Store mediante la API autenticada de la tienda.' },
        { lead: 'Metadatos + SEO con IA', body: 'enriquecimiento con Claude API; pipeline de subida idempotente y reanudable.' },
        { lead: 'Confirmas antes de publicar', body: 'muestra cada drop en la terminal y pide el ok.' },
      ],
    },
    'beyond-space': {
      oneliner: 'Generación de audio mediante interpolación en el espacio latente RAVE.',
      bullets: [
        { lead: 'Interpola en el latente', body: 'cargas hasta 4 archivos de audio y mezclas sus codificaciones latentes RAVE mediante un tablero 2D.' },
        { lead: 'Ponderación baricéntrica', body: 'la posición del clic define la mezcla entre todas las entradas a la vez.' },
        { lead: 'FastAPI + TorchScript', body: 'backend en HF Spaces, frontend React en Vercel.' },
      ],
    },
    thesis: {
      oneliner: 'Tesis de máster: del análisis de audio a la generación musical.',
      bullets: [
        { lead: 'Análisis → generación', body: 'un sistema de tres clientes: visualización 3D basada en el mood → mapeo de emociones → generación sin prompts, en bucle en tiempo real.' },
        { lead: 'Geometría sagrada como interfaz', body: 'el Cubo de Metatrón y los sólidos platónicos mapean emociones a características de audio en un cliente 3D interactivo.' },
        { lead: 'Generación sin prompts', body: 'mediante la API de Suno; benchmark comparativo de modelos generativos (Suno, RAVE, MusicGen, Jukebox).' },
      ],
    },
    'wdf-h9000': {
      oneliner: 'Modelado de circuitos analógicos en hardware de efectos dedicado.',
      bullets: [
        { lead: 'Primer WDF en el H9000', body: 'un algoritmo Wave Digital Filter que modela circuitos lineales y no lineales directamente en el hardware mediante VSig3.' },
        { lead: 'No linealidades vía CPWL', body: 'una representación Canonical PieceWise-Linear; validado de extremo a extremo con un circuito diode-clipper.' },
        { lead: 'Sin precedentes', body: 'desarrollado dentro de los límites de bajo nivel de VSig3, sin ejemplos en la literatura.' },
      ],
    },
    'invoice-agent': {
      oneliner: 'Sistema de automatización para la gestión de tutorías.',
      bullets: [
        { lead: 'Automatiza la facturación', body: 'vía Fiscozen, y envía correos personalizados a los clientes.' },
        { lead: 'Sincroniza y reserva', body: 'sesiones de Google Calendar → Notion; reserva en automático en las plataformas.' },
        { lead: 'Corre a diario', body: 'facturación, correos, registro de sesiones y reservas.' },
      ],
    },
    'skyitalia-voice-agent': {
      oneliner: 'Soporte aéreo con dos agentes de voz y escalado en vivo — Yellow Tech × ElevenLabs.',
      bullets: [
        { lead: 'Dos agentes, escalado en vivo', body: 'Aria atiende a los pasajeros en primera línea y escala los casos complejos a Marco, un agente supervisor.' },
        { lead: 'Multilingüe', body: 'soporte conversacional (IT / EN / ES / FR) en ElevenLabs Conversational AI.' },
        { lead: 'De hackathon', body: 'construido en Yellow Tech × ElevenLabs.' },
      ],
    },
    'music-genre-classifier': {
      oneliner: 'Clasificación de género musical con deep learning (NN / CNN / RNN-LSTM).',
      bullets: [
        { lead: 'Género desde MFCC', body: 'clasifica pistas con características librosa, entrenado en el dataset GTZAN.' },
        { lead: 'NN vs CNN vs RNN-LSTM', body: 'comparadas con evaluación de accuracy/loss; escalable a otros datasets y modelos.' },
      ],
    },
    'save-the-world': {
      oneliner: 'Instalación interactiva sobre el impacto ecológico de las acciones diarias.',
      bullets: [
        { lead: 'Actúa, ve el impacto', body: 'los usuarios imitan acciones cotidianas y ven su impacto en CO₂ y clima en tiempo real sobre un globo 3D reactivo.' },
        { lead: 'Gestos → visuales → sonido', body: 'reconocimiento de gestos Python + 3D en tiempo real TouchDesigner + paisajes sonoros generativos SuperCollider.' },
      ],
    },
  },
};
