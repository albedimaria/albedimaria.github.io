// The call shown under the hero: ElevenLabs conversation ending in `fzfmstya`
// (6 Nov 2026, 87 s). The page plays it from second 15, where the caller starts
// speaking: the greeting and a silence before it are cut, in the audio and here.
// Every turn from there on is listed, in order, with the timings the platform
// recorded. Italian is the original; English and Spanish
// are translations. `scripts/check-call.mjs` compares this file with the
// conversation JSON and fails on any difference.
//
// - `t`        second of the ORIGINAL call at which the turn starts (the player
//              subtracts CALL_START)
// - `latency`  seconds from the caller falling silent to the agent's first
//              audio (`convai_ttf_audio_since_silence`), only on replies
// - tool rows  name, the arguments worth reading, and the tool's own latency

import type { Lang } from '../i18n/content';

export const CALL_AUDIO = '/audio/dance-call.mp3';
/** second of the original call at which the published audio starts */
export const CALL_START = 15;
/** whole seconds of the published audio (the mp3 is 71.0 s long) */
export const CALL_DURATION = 71;

export type CallRow =
  | { kind: 'caller' | 'agent'; t: number; text: Record<Lang, string>; latency?: number; interrupted?: boolean; silence?: boolean }
  | { kind: 'tool'; t: number; call: string; result?: string; latency: number };

export const callRows: CallRow[] = [
  {
    kind: 'caller', t: 15,
    text: {
      it: 'Ciao, vorrei prenotare una lezione di base il giovedì fra due settimane, non questo giovedì.',
      en: 'Hi, I’d like to book a beginner class on the Thursday in two weeks, not this Thursday.',
      es: 'Hola, quiero reservar una clase de nivel básico el jueves dentro de dos semanas, no este jueves.',
    },
  },
  {
    kind: 'agent', t: 22, latency: 1.02,
    text: {
      it: 'Ciao Marco! Allora, per il giovedì fra due settimane devo prima vedere che corsi di base ci sono. Un attimo che guardo.',
      en: 'Hi Marco! For the Thursday in two weeks I first need to see which beginner classes there are. One moment while I look.',
      es: '¡Hola Marco! Para el jueves dentro de dos semanas primero tengo que ver qué clases de nivel básico hay. Un momento que miro.',
    },
  },
  { kind: 'tool', t: 24, call: 'get_courses(p_day: giovedì, p_level: base)', latency: 0.2 },
  {
    kind: 'agent', t: 25,
    text: {
      it: 'Allora Marco, per il giovedì ci sono tre corsi base: il primo è Bachata e Salsa alle 19:00 con Marcello e Isabì, il secondo è Bachata e Salsa alle 21:00 con Alessandro, e il terzo è Bachata Moderna alle 22:00 sempre con Alessandro. Tutti sono alla sede AIDA. Quale ti interessa prenotare per giovedì 19 novembre?',
      en: 'So Marco, on Thursdays there are three beginner classes: the first is Bachata and Salsa at 19:00 with Marcello and Isabì, the second is Bachata and Salsa at 21:00 with Alessandro, and the third is Modern Bachata at 22:00, also with Alessandro. All of them are at the AIDA venue. Which one would you like to book for Thursday 19 November?',
      es: 'A ver, Marco, los jueves hay tres clases de nivel básico: la primera es Bachata y Salsa a las 19:00 con Marcello e Isabì, la segunda es Bachata y Salsa a las 21:00 con Alessandro, y la tercera es Bachata Moderna a las 22:00, también con Alessandro. Todas son en la sede AIDA. ¿Cuál quieres reservar para el jueves 19 de noviembre?',
    },
  },
  {
    kind: 'caller', t: 50,
    text: { it: 'Va bene il primo che hai detto.', en: 'The first one you said is fine.', es: 'Me vale la primera que has dicho.' },
  },
  {
    kind: 'agent', t: 53, latency: 0.88,
    text: {
      it: 'Perfetto, allora prenoto per te il corso di Bachata e Salsa base del giovedì alle 19:00 con Marcello e Isabì, per giovedì 19 novembre. Confermi?',
      en: 'Perfect, then I’ll book you the beginner Bachata and Salsa class on Thursdays at 19:00 with Marcello and Isabì, for Thursday 19 November. Do you confirm?',
      es: 'Perfecto, entonces te reservo la clase de Bachata y Salsa de nivel básico de los jueves a las 19:00 con Marcello e Isabì, para el jueves 19 de noviembre. ¿Confirmas?',
    },
  },
  { kind: 'caller', t: 64, text: { it: 'Sì.', en: 'Yes.', es: 'Sí.' } },
  {
    kind: 'agent', t: 64, latency: 0.86, interrupted: true,
    text: { it: 'Un attimo che…', en: 'One moment while…', es: 'Un momento que…' },
  },
  { kind: 'tool', t: 65, call: 'create_booking(p_date: 2026-11-19)', result: 'ok', latency: 0.28 },
  { kind: 'caller', t: 65, text: { it: 'Fermo.', en: 'Stop.', es: 'Para.' } },
  {
    kind: 'agent', t: 66, latency: 1.47,
    text: {
      it: 'Fatto Marco! La tua prenotazione per il corso di Bachata e Salsa base di giovedì 19 novembre alle 19:00 con Marcello e Isabì è confermata. Ti aspetto!',
      en: 'Done, Marco! Your booking for the beginner Bachata and Salsa class on Thursday 19 November at 19:00 with Marcello and Isabì is confirmed. See you there!',
      es: '¡Hecho, Marco! Tu reserva para la clase de Bachata y Salsa de nivel básico del jueves 19 de noviembre a las 19:00 con Marcello e Isabì está confirmada. ¡Te espero!',
    },
  },
  {
    kind: 'caller', t: 78,
    text: { it: 'Perfetto, grazie. Ciao.', en: 'Perfect, thanks. Bye.', es: 'Perfecto, gracias. Adiós.' },
  },
  {
    kind: 'agent', t: 81, latency: 0.93,
    text: {
      it: 'A te, Marco! Buona giornata e a giovedì 19!',
      en: 'Thank you, Marco! Have a good day, see you on Thursday the 19th!',
      es: '¡A ti, Marco! ¡Buen día y hasta el jueves 19!',
    },
  },
  { kind: 'tool', t: 82, call: 'end_call()', latency: 0.5 },
];

const replies = callRows.flatMap((r) => (r.kind === 'agent' && r.latency !== undefined ? [r.latency] : [])).sort((a, b) => a - b);
/** median reply time of this call, to one decimal */
export const CALL_ANSWERS_IN = Math.round(replies[Math.floor(replies.length / 2)] * 10) / 10;
/** second of the published audio at which `create_booking` is called */
export const CALL_BOOKING_AT = callRows.find((r) => r.kind === 'tool' && r.call.startsWith('create_booking'))!.t - CALL_START;

/** m:ss for the player and the facts column */
export const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
