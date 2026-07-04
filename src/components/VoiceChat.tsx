import { useEffect, useRef, useState } from 'react';
import {
  ConversationProvider,
  useConversationControls,
  useConversationStatus,
  useConversationClientTool,
} from '@elevenlabs/react';
import { searchPortfolio as ragSearch, warmRag } from '../lib/rag-client';

const AGENT_ID = 'agent_5701kw21ga79ex9b72p9fbbc6xsv';
type Lang = 'en' | 'it' | 'es';
type Line = { source: 'user' | 'ai'; text: string };

const STR: Record<Lang, Record<string, string>> = {
  en: { heading: 'talk to my work', sub: 'ask about my projects — by voice or text', talk: 'talk', type: 'type', placeholder: 'type a message…', end: 'end', limit: "You've hit today's session limit — try again tomorrow.", mic: 'Microphone blocked — use “type” or allow the mic in your browser.', disclosure: 'D10S is an AI assistant — you’re talking to an automated system, not a person.' },
  it: { heading: 'parla con il mio lavoro', sub: 'chiedi dei miei progetti — a voce o per iscritto', talk: 'parla', type: 'scrivi', placeholder: 'scrivi un messaggio…', end: 'fine', limit: 'Hai raggiunto il limite di sessioni per oggi — riprova domani.', mic: 'Microfono bloccato — usa “scrivi” o consenti il microfono.', disclosure: 'D10S è un assistente AI — parli con un sistema automatico, non con una persona.' },
  es: { heading: 'habla con mi trabajo', sub: 'pregunta por mis proyectos — por voz o texto', talk: 'habla', type: 'escribe', placeholder: 'escribe un mensaje…', end: 'fin', limit: 'Has alcanzado el límite de sesiones de hoy — vuelve mañana.', mic: 'Micrófono bloqueado — usa “escribe” o permite el micrófono.', disclosure: 'D10S es un asistente de IA — hablas con un sistema automático, no con una persona.' },
};

// Conversation starters — double duty: give the panel presence and tell the
// visitor what D10S can actually do. Clicking one starts a text session.
const CHIPS: Record<Lang, string[]> = {
  en: ['show me the projects', 'why do I need a voice agent?', 'how do we work together?'],
  it: ['fammi vedere i progetti', 'perché mi serve un voice agent?', 'come si lavora insieme?'],
  es: ['enséñame los proyectos', '¿por qué necesito un agente de voz?', '¿cómo trabajamos juntos?'],
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
  const el = document.getElementById(`proj-${id}`);
  if (!el) return false;
  if (el.getAttribute('data-extra') === 'true') (el as HTMLElement).style.display = '';
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  el.classList.add('proj-focus');
  setTimeout(() => el.classList.remove('proj-focus'), 2400);
  return true;
}

function Panel({
  lang,
  lines,
  appendUser,
}: {
  lang: Lang;
  lines: Line[];
  appendUser: (t: string) => void;
}) {
  const controls = useConversationControls();
  const { status, message } = useConversationStatus();
  const t = STR[lang];
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
          dotRef.current.style.opacity = String(0.5 + v * 0.5);
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

  const connected = status === 'connected';
  const shownErr = err ?? (status === 'error' ? message : null);

  return (
    <div className="mx-auto w-full max-w-xl rounded-[var(--radius-card)] border border-bone/10 bg-surface p-4 shadow-[0_0_50px_rgba(0,0,0,0.4)] sm:p-5">
      {connected && (
        <div className="mb-3 flex items-center gap-2">
          <span
            ref={dotRef}
            className="inline-block h-2.5 w-2.5 rounded-full bg-oxblood transition-transform"
            aria-hidden="true"
          />
          <span className="font-mono text-[12px] uppercase tracking-wider text-text-muted">
            D10S · {mode === 'voice' ? 'live' : 'chat'}
          </span>
        </div>
      )}

      {lines.some((l) => l.text.trim()) && (
        <div className="chat-scroll mb-3 max-h-56 space-y-2 overflow-y-auto pr-1.5">
          {lines.filter((l) => l.text.trim()).map((l, i) => (
            <div key={i} className={`flex ${l.source === 'ai' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[82%] rounded-2xl px-3 py-2 text-[13px] leading-snug ${
                  l.source === 'ai'
                    ? 'rounded-br-sm bg-oxblood/20 text-bone'
                    : 'rounded-bl-sm bg-bone/[0.06] text-text-muted'
                }`}
              >
                {l.text}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
      )}

      {shownErr && <p className="mb-2 px-1 font-mono text-[11px] text-oxblood-soft">{shownErr}</p>}

      {!connected ? (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={startVoice}
              disabled={status === 'connecting'}
              className="flex items-center gap-2 rounded-full bg-oxblood px-6 py-2.5 font-mono text-[13px] uppercase tracking-[0.15em] text-[#f6dfe4] transition hover:bg-oxblood/85 disabled:opacity-50"
            >
              <MicIcon />
              {status === 'connecting' ? '…' : t.talk}
            </button>
            <button
              onClick={startText}
              disabled={status === 'connecting'}
              className="flex items-center gap-2 rounded-full border border-bone/35 px-5 py-2.5 font-mono text-[13px] uppercase tracking-[0.15em] text-text-muted transition hover:border-bone/60 hover:text-bone disabled:opacity-50"
            >
              <KeysIcon />
              {t.type}
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-2 pt-0.5">
            {CHIPS[lang].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setPending(c);
                  startText();
                }}
                disabled={status === 'connecting'}
                className="rounded-full border border-bone/12 bg-bone/[0.04] px-3 py-1.5 font-mono text-[12px] text-text-muted transition hover:border-oxblood-soft/60 hover:text-bone disabled:opacity-50"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      ) : mode === 'voice' ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={stop}
            className="rounded-full border border-bone/25 px-5 py-2.5 font-mono text-[13px] uppercase tracking-[0.12em] text-bone transition hover:bg-bone/10"
          >
            {t.end}
          </button>
        </div>
      ) : (
        <form onSubmit={send} className="flex items-center gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t.placeholder}
            autoFocus
            className="min-w-0 flex-1 rounded-full border border-bone/15 bg-transparent px-4 py-2.5 font-mono text-[13px] text-bone placeholder:text-text-dim focus:border-oxblood focus:outline-none"
          />
          <button
            type="button"
            onClick={stop}
            className="shrink-0 rounded-full border border-bone/25 px-4 py-2.5 font-mono text-[13px] uppercase tracking-[0.12em] text-bone transition hover:bg-bone/10"
          >
            {t.end}
          </button>
        </form>
      )}
    </div>
  );
}

type Part = { type: 'start' | 'delta' | 'stop'; text: string };

export default function VoiceChat({ lang = 'en' }: { lang?: Lang }) {
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
      <Panel lang={lang} lines={lines} appendUser={appendUser} />
    </ConversationProvider>
  );
}
