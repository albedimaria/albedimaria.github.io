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
  en: { heading: 'talk to my work', sub: 'ask about my projects — by voice or text', talk: '🎙 talk', type: '⌨ type', placeholder: 'type a message…', end: '○ end', limit: "You've hit today's session limit — try again tomorrow.", mic: 'Microphone blocked — use “type” or allow the mic in your browser.' },
  it: { heading: 'parla con il mio lavoro', sub: 'chiedi dei miei progetti — a voce o per iscritto', talk: '🎙 parla', type: '⌨ scrivi', placeholder: 'scrivi un messaggio…', end: '○ fine', limit: 'Hai raggiunto il limite di sessioni per oggi — riprova domani.', mic: 'Microfono bloccato — usa “scrivi” o consenti il microfono.' },
  es: { heading: 'habla con mi trabajo', sub: 'pregunta por mis proyectos — por voz o texto', talk: '🎙 habla', type: '⌨ escribe', placeholder: 'escribe un mensaje…', end: '○ fin', limit: 'Has alcanzado el límite de sesiones de hoy — vuelve mañana.', mic: 'Micrófono bloqueado — usa “escribe” o permite el micrófono.' },
};

const DAILY_LIMIT = 6;
const SESSION_MAX_MS = 110_000;

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

  // pulse the speaking dot from output volume (direct DOM mutation, no setState)
  useEffect(() => {
    const loop = () => {
      try {
        const v = controls.getOutputVolume?.() ?? 0;
        if (dotRef.current) {
          dotRef.current.style.transform = `scale(${1 + v * 1.6})`;
          dotRef.current.style.opacity = String(0.5 + v * 0.5);
        }
      } catch {}
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [controls]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
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

  const sessionOpts = (textOnly: boolean, connectionType: 'webrtc' | 'websocket') =>
    ({ agentId: AGENT_ID, connectionType, textOnly, overrides: { agent: { language: lang } } }) as Parameters<typeof controls.startSession>[0];

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
      <div className="mb-3 flex items-center gap-2">
        <span
          ref={dotRef}
          className="inline-block h-2.5 w-2.5 rounded-full bg-oxblood transition-transform"
          aria-hidden="true"
        />
        <span className="font-mono text-[11px] uppercase tracking-wider text-text-dim">
          {connected ? `D10S · ${mode === 'voice' ? 'live' : 'chat'}` : 'D10S'}
        </span>
      </div>

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
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={startVoice}
            disabled={status === 'connecting'}
            className="rounded-full border border-oxblood px-4 py-2 font-mono text-[12px] uppercase tracking-[0.15em] text-bone transition hover:bg-oxblood/15 disabled:opacity-50"
          >
            {status === 'connecting' ? '…' : t.talk}
          </button>
          <button
            onClick={startText}
            disabled={status === 'connecting'}
            className="rounded-full border border-bone/20 px-4 py-2 font-mono text-[12px] uppercase tracking-[0.15em] text-text-muted transition hover:bg-bone/5 disabled:opacity-50"
          >
            {t.type}
          </button>
        </div>
      ) : mode === 'voice' ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={stop}
            className="rounded-full border border-bone/25 px-4 py-2 font-mono text-[12px] uppercase tracking-[0.12em] text-bone transition hover:bg-bone/10"
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
            className="min-w-0 flex-1 rounded-full border border-bone/15 bg-transparent px-4 py-2 font-mono text-[12px] text-bone placeholder:text-text-dim focus:border-oxblood focus:outline-none"
          />
          <button
            type="button"
            onClick={stop}
            className="shrink-0 rounded-full border border-bone/25 px-3.5 py-2 font-mono text-[12px] uppercase tracking-[0.12em] text-bone transition hover:bg-bone/10"
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
