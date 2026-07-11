# Restyling freelance — PLAN (loop a gate, stile Parlando)

Branch `freelance-restyle`. `main` resta deployabile (il workflow Pages scatta solo su `main`).
Standard estetico congelato: `mockups/fase0-hero-spotlight.html` (v4.1).

## Regole del loop
- Ogni fase ha un **contratto** (input → output → gate). Si itera finché il gate è verde.
- **Gate oggettivi** via `node scripts/restyle-gate.mjs` (contrasto WCAG + build + overflow/allineamenti dove applicabile).
- **Circuit breaker**: 5 iterazioni senza gate verde → fermarsi e portare il problema ad Alberto.
- **Confine loop/umano**: layout/a11y/build = loop; feel/estetica = checkpoint pixel di Alberto a fine fase.
- Commit per fase. Nessun push fino a fine batch (regola build-minutes + review finale).

## Fasi

| # | Fase | Output | Gate |
|---|------|--------|------|
| 1 | **Fondamenta** | token `--accent-lg`/`--accent-txt`, utility `.grid-12`, favicon octaedro | build 0 · contrasto AA dei nuovi token · favicon ≠ coniglietto |
| 2 | Hero + foto + banda D10S | Hero.astro nuovo, foto crop quadrata, banda D10S full-width, freccia contestuale | overflow 0 @375/768/1440 · foto-top = h1-top ±2px · contrasto AA |
| 3 | Servizi (3 card banda) | Services.astro rifatto (card superfici, no proof ingegneristiche) | card equidistanti · righe interne allineate · touch ≥44px |
| 4 | Work copy pass + route IT default | copy cliente (tecnico nei cassetti), root→IT, EN→/en, hreflang | build 0 · hreflang coerente · nessun link rotto |
| 5 | About rework + strip processo in Contact + budget select | bio persona-first, credential strip, 4-step in Contact, select budget | contrasto AA · label form · floor 16px sui contenuti |
| 6 | D10S: tool `prefillContactForm` + sys prompt + corpus + chips | client tool + handler VoiceChat.tsx, sys prompt contact-assist, corpus/chips servizi | tool registrato · invio solo umano · smoke text-mode |
| 7 | Audit finale | axe zero-violations, Lighthouse, tastiera, contrasto | axe 0 · LH a11y ≥95 · focus visibile ovunque |
| 8 | Dominio + push | CNAME/DNS/Pages, push batch unico | HTTPS ok · redirect vecchi URL |

## Confini
- Onde, octaedro, palette oxblood/bone, Fraunces/Inter/JetBrains = DNA intatto.
- v2 parcheggiati: dock flottante D10S, slot proposti da calendario.
- Glifi card = draft, si rifiniscono in fase motion (post-v1).
