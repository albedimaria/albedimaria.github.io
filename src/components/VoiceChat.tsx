import { useEffect, useRef, useState } from 'react';
import {
  ConversationProvider,
  useConversationControls,
  useConversationStatus,
  useConversationClientTool,
} from '@elevenlabs/react';
import { searchPortfolio as ragSearch, warmRag } from '../lib/rag-client';
import { voiceUi } from '../i18n/content';

const AGENT_ID = 'agent_5701kw21ga79ex9b72p9fbbc6xsv';
type Lang = 'en' | 'it' | 'es';
/** What to trigger on mount: 'voice', 'text', or a chip's text. */
type AutoStart = 'voice' | 'text' | (string & {}) | null;
type Line = { source: 'user' | 'ai'; text: string };

const STR: Record<Lang, Record<string, string>> = {
  en: { heading: 'talk to my work', sub: 'ask about my projects — by voice or text', talk: 'talk', type: 'type', placeholder: 'type a message…', end: 'end', limit: "You've hit today's session limit — try again tomorrow.", mic: 'Microphone blocked — use “type” or allow the mic in your browser.', disclosure: 'D10S is an AI assistant — you’re talking to an automated system, not a person.' },
  it: { heading: 'parla con il mio lavoro', sub: 'chiedi dei miei progetti — a voce o per iscritto', talk: 'parla', type: 'scrivi', placeholder: 'scrivi un messaggio…', end: 'fine', limit: 'Hai raggiunto il limite di sessioni per oggi — riprova domani.', mic: 'Microfono bloccato — usa “scrivi” o consenti il microfono.', disclosure: 'D10S è un assistente AI — parli con un sistema automatico, non con una persona.' },
  es: { heading: 'habla con mi trabajo', sub: 'pregunta por mis proyectos — por voz o texto', talk: 'habla', type: 'escribe', placeholder: 'escribe un mensaje…', end: 'fin', limit: 'Has alcanzado el límite de sesiones de hoy — vuelve mañana.', mic: 'Micrófono bloqueado — usa “escribe” o permite el micrófono.', disclosure: 'D10S es un asistente de IA — hablas con un sistema automático, no con una persona.' },
};

const MicIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0" />
    <path d="M12 18v3" />
  </svg>
);
const KeysIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <rect x="3" y="7" width="18" height="11" rx="2" />
    <path d="M7 11h.01M11 11h.01M15 11h.01M17 11h.01M7 15h10" />
  </svg>
);
const SendIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

const DAILY_LIMIT = 6;
const SESSION_MAX_MS = 110_000;

// ASR keyword biasing (client SDK >=1.12): proper nouns the recognizer would
// otherwise mangle when visitors ask about them by voice.
const ASR_KEYWORDS = [
  'Alberto Di Maria',
  'D10S',
  'Dance Voice Agent',
  'Shy Order',
  'Company Brain',
  'Beat Store',
  'Lyra',
  'Metatron',
  'Anecoica',
  'Beyond Space',
];

// client-side soft cost guard (per browser). Hard cap = overage-off on the
// ElevenLabs dashboard + the agent's 120s max_duration.
function sessionAllowed(): boolean {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const raw = JSON.parse(localStorage.getItem('vc_sessions') || '[]') as string[];
    const todays = raw.filter((d) => d === today);
    if (todays.length >= DAILY_LIMIT) return false;
    localStorage.setItem('vc_sessions', JSON.stringify([...todays, today]));
    return true;
  } catch {
    return true;
  }
}

function focusProjectCard(id: string): boolean {
  // The work section is a carousel now: prefer its controller, which activates
  // the right slide (switching filter if needed) before scrolling.
  const go = (window as unknown as { workGoToProject?: (id: string) => void }).workGoToProject;
  if (typeof go === 'function') {
    go(id);
    return true;
  }
  const el = document.getElementById(`proj-${id}`);
  if (!el) return false;
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  el.classList.add('proj-focus');
  setTimeout(() => el.classList.remove('proj-focus'), 2400);
  return true;
}

function Panel({
  lang,
  lines,
  appendUser,
  autostart,
}: {
  lang: Lang;
  lines: Line[];
  appendUser: (t: string) => void;
  autostart?: AutoStart;
}) {
  const controls = useConversationControls();
  const { status, message } = useConversationStatus();
  const t = STR[lang];
  const vu = voiceUi[lang];
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'voice' | 'text' | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useConversationClientTool('focusProject', (p: { projectId?: string }) => {
    const ok = focusProjectCard(p?.projectId ?? '');
    return ok ? `focused ${p?.projectId}` : `not on this page: ${p?.projectId}`;
  });
  useConversationClientTool('searchPortfolio', async (p: { query?: string }) => {
    try {
      return (await ragSearch(p?.query ?? '')) || 'no relevant information found.';
    } catch {
      return 'retrieval failed.';
    }
  });
  // Guide powers: D10S can physically move the visitor around the page.
  useConversationClientTool('goToSection', (p: { section?: string }) => {
    const map: Record<string, string> = {
      work: 'work', projects: 'work', portfolio: 'work',
      services: 'services', service: 'services',
      about: 'about', bio: 'about',
      experience: 'experience', training: 'experience', background: 'experience',
      contact: 'contact', email: 'contact',
      top: 'top', hero: 'top', home: 'top',
    };
    const id = map[(p?.section ?? '').trim().toLowerCase()];
    const el = id ? document.getElementById(id) : null;
    if (!el) return `unknown section: ${p?.section}. valid: work, services, about, experience, contact, top`;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return `navigated to ${id}`;
  });
  useConversationClientTool('openCV', () => {
    window.open('/cv.pdf', '_blank', 'noopener');
    return 'CV opened in a new tab';
  });
  // Contact assist: pre-fill the contact form with what the visitor told the
  // agent. The agent NEVER sends — the visitor reviews and presses send.
  useConversationClientTool(
    'prefillContactForm',
    (p: { name?: string; email?: string; budget?: string; message?: string }) => {
      const form = document.getElementById('contact-form') as HTMLFormElement | null;
      if (!form) return 'contact form not found on this page';
      const set = (sel: string, v?: string) => {
        if (!v) return;
        const el = form.querySelector<HTMLInputElement | HTMLTextAreaElement>(sel);
        if (el) el.value = v;
      };
      set('input[name="name"]', p?.name);
      set('input[name="email"]', p?.email);
      set('textarea[name="message"]', p?.message);
      if (p?.budget) {
        const s = form.querySelector<HTMLSelectElement>('select[name="budget"]');
        const opt = s && [...s.options].find((o) => o.value === p.budget || o.text.toLowerCase().includes(p.budget!.toLowerCase()));
        if (s && opt) s.value = opt.value;
      }
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      form.classList.add('proj-focus');
      setTimeout(() => form.classList.remove('proj-focus'), 2400);
      return 'form pre-filled — tell the visitor to review it and press send themselves';
    }
  );

  // pulse the speaking dot from output volume (direct DOM mutation, no setState)
  // and drive the hero waves: --d10s-vol makes the signature waves breathe
  // with the agent's voice (see WaveSignature.astro).
  useEffect(() => {
    let smooth = 0;
    const root = document.documentElement;
    const loop = () => {
      try {
        const v = controls.getOutputVolume?.() ?? 0;
        smooth = smooth * 0.82 + v * 0.18; // low-pass: waves sway, never jitter
        if (dotRef.current) {
          dotRef.current.style.transform = `scale(${1 + v * 1.6})`;
          dotRef.current.style.opacity = String(0.7 + v * 0.3);
        }
        root.style.setProperty('--d10s-vol', smooth.toFixed(3));
      } catch {}
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      root.style.setProperty('--d10s-vol', '0');
    };
  }, [controls]);

  useEffect(() => {
    // Keep the transcript pinned to the bottom WITHOUT moving the page — the
    // panel lives in the hero now, so scrollIntoView() would yank the whole
    // page back up (and fight focusProject/goToSection). Scroll the box only.
    const box = endRef.current?.parentElement;
    if (box) box.scrollTop = box.scrollHeight;
  }, [lines]);

  const stop = () => {
    controls.endSession();
    setMode(null);
  };

  useEffect(() => {
    if (status !== 'connected') return;
    const id = setTimeout(() => stop(), SESSION_MAX_MS);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // deliver a queued chip question once the text session is up
  useEffect(() => {
    if (status === 'connected' && mode === 'text' && pending) {
      controls.sendUserMessage(pending);
      appendUser(pending);
      setPending(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, mode, pending]);

  const sessionOpts = (textOnly: boolean, connectionType: 'webrtc' | 'websocket') =>
    ({
      agentId: AGENT_ID,
      connectionType,
      textOnly,
      overrides: {
        agent: { language: lang },
        ...(textOnly ? {} : { asr: { keywords: ASR_KEYWORDS } }),
      },
    }) as Parameters<typeof controls.startSession>[0];

  const guard = (): boolean => {
    if (!sessionAllowed()) {
      setErr(t.limit);
      return false;
    }
    warmRag();
    return true;
  };

  const startVoice = async () => {
    setErr(null);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setErr(t.mic);
      return;
    }
    if (!guard()) return;
    controls.startSession(sessionOpts(false, 'webrtc'));
    setMode('voice');
  };
  const startText = async () => {
    setErr(null);
    if (!guard()) return;
    controls.startSession(sessionOpts(true, 'websocket'));
    setMode('text');
  };
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const v = text.trim();
    if (!v) return;
    controls.sendUserMessage(v);
    appendUser(v);
    setText('');
  };

  // Fire the action the visitor clicked in the static shell, once, on mount.
  const started = useRef(false);
  useEffect(() => {
    if (started.current || !autostart) return;
    started.current = true;
    if (autostart === 'voice') startVoice();
    else if (autostart === 'text') startText();
    else {
      setPending(autostart);
      startText();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connected = status === 'connected';
  const shownErr = err ?? (status === 'error' ? message : null);
  const barLabel = connected ? (mode === 'voice' ? 'live' : 'chat') : status === 'connecting' ? '…' : 'online';

  return (
    <div className="d10s-live-root">
      {/* status bar — same language as the presentation shell, always present */}
      <div className="d10s-bar">
        <span
          ref={dotRef}
          className="inline-block h-[7px] w-[7px] rounded-full bg-oxblood-soft transition-transform"
          aria-hidden="true"
        />
        <span><b>D10S</b> · {barLabel}</span>
      </div>

      {/* transcript fills the middle and scrolls internally — the panel height
          never changes */}
      <div className="chat-scroll mt-3.5 min-h-0 flex-1 space-y-2 overflow-y-auto pr-1.5">
        {lines.filter((l) => l.text.trim()).map((l, i) => (
          <div key={i} className={`flex ${l.source === 'ai' ? 'justify-start' : 'justify-end'}`}>
            <div
              className={`max-w-[82%] rounded-2xl px-3 py-2 text-[13px] leading-snug ${
                l.source === 'ai'
                  ? 'rounded-bl-sm bg-oxblood/20 text-bone'
                  : 'rounded-br-sm bg-bone/[0.06] text-text-muted'
              }`}
            >
              {l.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {shownErr && <p className="mt-2 px-1 font-mono text-[11px] text-oxblood-soft">{shownErr}</p>}

      {/* controls pinned to the bottom */}
      <div className="mt-3.5">
        {!connected ? (
          <>
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={startVoice}
                disabled={status === 'connecting'}
                className="btn-primary font-mono text-[13px] uppercase tracking-[0.12em] disabled:opacity-50"
              >
                <MicIcon />
                {status === 'connecting' ? '…' : vu.talk}
              </button>
              <button
                onClick={startText}
                disabled={status === 'connecting'}
                className="btn-ghost font-mono text-[13px] uppercase tracking-[0.12em] disabled:opacity-50"
              >
                <KeysIcon />
                {vu.type}
              </button>
            </div>
            <div className="d10s-sugg">
              {vu.chips.map((c) => (
                <button
                  key={c}
                  type="button"
                  disabled={status === 'connecting'}
                  onClick={() => {
                    setPending(c);
                    startText();
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </>
        ) : mode === 'voice' ? (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={stop}
              className="btn-ghost font-mono text-[13px] uppercase tracking-[0.12em]"
            >
              {t.end}
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={send} className="d10s-input !mt-0">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t.placeholder}
                autoFocus
                className="min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-[13px] text-bone placeholder:text-text-dim focus:outline-none"
              />
              <button type="submit" className="d10s-mic" aria-label={t.type}>
                <SendIcon />
              </button>
            </form>
            <button
              type="button"
              onClick={stop}
              className="mt-2.5 block w-full text-center font-mono text-[11px] uppercase tracking-[0.14em] text-text-dim transition hover:text-bone"
            >
              {t.end}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

type Part = { type: 'start' | 'delta' | 'stop'; text: string };

export default function VoiceChat({ lang = 'en', autostart = null }: { lang?: Lang; autostart?: AutoStart }) {
  const [lines, setLines] = useState<Line[]>([]);
  const t = STR[lang];

  const appendUser = (text: string) =>
    setLines((p) => [...p.slice(-8), { source: 'user', text }]);

  const onPart = (p: Part) => {
    if (p.type === 'start') setLines((prev) => [...prev.slice(-8), { source: 'ai', text: '' }]);
    else if (p.type === 'delta' && p.text)
      setLines((prev) => {
        const next = [...prev];
        const i = next.length - 1;
        if (i >= 0 && next[i].source === 'ai') next[i] = { source: 'ai', text: next[i].text + p.text };
        return next;
      });
  };
  const onMessage = (m: { message: string; source: 'user' | 'ai' }) => {
    if (m.source === 'ai') setLines((prev) => [...prev.slice(-8), { source: 'ai', text: m.message }]);
  };

  void t;
  return (
    <ConversationProvider
      onMessage={onMessage}
      onAgentChatResponsePart={onPart as (p: unknown) => void}
    >
      <Panel lang={lang} lines={lines} appendUser={appendUser} autostart={autostart} />
    </ConversationProvider>
  );
}
