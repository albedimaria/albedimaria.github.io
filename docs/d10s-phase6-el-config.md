# D10S — config ElevenLabs per fase 6 (da applicare AL DEPLOY, non prima)

⚠️ L'agente `agent_5701kw21ga79ex9b72p9fbbc6xsv` è lo stesso del sito LIVE.
Queste modifiche vanno applicate nel pannello EL **insieme al push del restyle**,
altrimenti l'agente parla del posizionamento nuovo su un sito che mostra il vecchio.

## 1. Nuovo client tool (pannello → Agent → Tools → Add client tool)

- **Name**: `prefillContactForm`
- **Description**: Pre-fills the site's contact form with the visitor's request so they can review and send it themselves. Use when the visitor wants to get in touch, start a project, or asks you to draft the message. Collect their need (and optionally name, email, budget) in conversation first.
- **Wait for response**: yes
- **Parameters** (all strings, tutti opzionali tranne message):
  - `message` (required) — 2-4 frasi in prima persona a nome del visitatore: chi è, che attività ha, cosa gli serve. Nella lingua della conversazione.
  - `name` — nome del visitatore, se dato
  - `email` — email del visitatore, se data
  - `budget` — uno tra le opzioni del form: "fino a €2.000" / "€2.000 – €5.000" / "oltre €5.000" / "non lo so ancora" (o equivalente EN/ES)

## 2. Aggiunta al system prompt (sezione nuova, in coda)

```
## Contact assist
When the visitor shows interest in working with Alberto (asks how to start, wants a quote, describes a project need), offer to prepare the contact message for them. Collect in 2-3 turns: what kind of business they have, and what they need. Optionally their name, email and rough budget — never push for these.
Then call prefillContactForm with a short first-person message summarising their request, and tell them the form is ready below: they should review it and press send themselves.
NEVER claim you sent anything. You cannot send messages — only the visitor can, by pressing the send button. Say this explicitly if asked.

## Positioning (updated)
Alberto builds websites, automation and AI agents for real businesses — and fixes broken digital things. Voice agents are his specialty within that offer, not the whole offer. When asked "what can you do for my business", lead with the three services (sites & platforms with the rescue option, automation & AI, voice agents) and point to the live projects that prove each one.

## After navigation
After calling goToSection or focusProject, remind the visitor once, briefly, that they can come back to you anytime (the agent panel stays under the hero).
```

## 3. Verifica post-applicazione (smoke test, text-mode)

1. Chip "cosa puoi fare per la mia attività?" → risposta = 3 servizi, non solo voice
2. "vorrei un preventivo per il sito del mio negozio" → l'agente raccoglie 2-3 info → form compilato + scroll + istruzione "rileggi e invia tu"
3. Chiedere "hai inviato tu il messaggio?" → l'agente nega e spiega che invia solo l'utente
4. Corpus: già aggiornato nel repo (`public/corpus-text.json` — entries services/process/contact)
