# ElevenLabs — aggiornamenti & best practice per D10S (portfolio agent)
_Ultimo check: 2026-07-03 · Stack: Conversational AI platform, agente pubblico via `@elevenlabs/react` ^1.9.0 (WebRTC voce + WS testo) · TTS: `eleven_flash_v2_5` · LLM: `gemini-2.5-flash-lite` · ASR: `scribe_realtime` · turn: `turn_v3` · RAG: BM25 client-side (client tool `searchPortfolio`) · Lingue: IT/EN/ES via override_

## Stato deprecazioni (check 2026-07-03) — ✅ SAFE
- `scribe_v1` e TTS v1 rimossi il **2026-07-09** → agente già su `scribe_realtime` + `eleven_flash_v2_5`, nessuna azione.
- Config già allineata ai default nuovi (`turn_v3`). SDK react già all'ultima minor (1.9.x).

## Best practice correnti (stato dell'arte per questo stack)
- Cost guard a strati (già in atto): limite sessioni client-side + `max_duration` 120s + overage OFF su dashboard.
- **ASR keyword biasing per-conversation** (`overrides.asr.keywords`): nomi progetto passati alla sessione → il riconoscimento vocale non storpia "Shy Order", "Metatron", ecc.
- **`text_behavior_overrides` per canale**: risposta più estesa/formattata sul canale testo, concisa a voce — stessi agente, due esperienze.
- RAG client-side BM25 mantenuto (scelta deliberata: costo zero + storia architetturale vs knowledge base nativa).

## Novità rilevanti di questo giro (baseline 2026-05-18 → 2026-07-03)
| Feature | Stato | Valore | Costo | Dove serve |
|---------|:----:|:------:|------|------------|
| `text_behavior_overrides` per canale (verbosity/output_format) | GA | alto (UX testo) | ~neutro | config agente — canale text più ricco, voce concisa |
| ASR keyword biasing (`overrides.asr.keywords`, client ≥1.12) | GA | alto (nomi progetto) | neutro | `VoiceChat.tsx` → `sessionOpts` |
| Feedback per-messaggio (react 1.8/1.9, `event_id`) | GA | basso | neutro | thumbs sui messaggi text — clutter UI, non prioritario |
| `includeLanguageDetection` (react 1.7) | GA | basso | neutro | lingua già pilotata dal toggle sito |

## Non rilevanti ora
- **Sentiment/topic discovery**: analytics platform-side, nessuna superficie utente sul portfolio.
- **Widget 0.13 (entry points call/message)**: UI custom, il widget ufficiale non è usato (scelta deliberata).
- **Knowledge base nativa / RAG platform**: BM25 locale resta (costo + storia).
- **Workflows, telephony, Exotel/WhatsApp, procedures, memory**: fuori scope (agente browser-only).

## Changelog monitorato (delta)
- Baseline condivisa con gli altri progetti: vedi `D:\Projects\shy-order\ELEVENLABS_UPDATES.md` (sezione "Changelog monitorato") — fonti: elevenlabs.io/docs/changelog 2026/5/18 → 2026/6/29.
- Rilevanti qui: `text_behavior_overrides` (2026-05-25) · ASR keywords per-conversation client 1.12.0 (2026-06-22) · feedback per-message client 1.13-1.14 / react 1.8-1.9 (2026-06-29).
