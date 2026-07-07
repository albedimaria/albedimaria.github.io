import { createRoot } from 'react-dom/client';
import VoiceChat from './VoiceChat';

type Lang = 'en' | 'it' | 'es';

// Lazy entry: imported (with React + the ElevenLabs SDK) only on the first
// interaction with the static panel shell. Clears the shell and mounts the
// live island in its place, firing whatever the visitor clicked.
export function mount(el: HTMLElement, lang: Lang, autostart: string) {
  el.replaceChildren();
  createRoot(el).render(<VoiceChat lang={lang} autostart={autostart} />);
}
