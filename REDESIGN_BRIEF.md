# Brief redesign — Portfolio CV di Alberto Di Maria

> Incolla questo file (o il suo contenuto) all'inizio di una chat nuova.
> È autosufficiente: non dipende dalla memoria automatica né dal recall del vault.

## Obiettivo
Redesign estetico del mio portfolio personale, allo stesso **livello di qualità** del
redesign fatto per il sito di Laura Zanchetta (`D:\Projects\laura-portfolio`, branch
`redesign-v2`) — che ho promosso a standard. **NON** una landing page basic.

## REGOLA DURA — niente copia
Il redesign di Laura è il *pavimento di qualità e il set di principi*, **non un template
da clonare**. Il mio sito deve avere identità PROPRIA (palette, font, concept, layout
diversi da Laura: lì verde profondo + lime, qui NO). Riusare i principi, non gli stili.
Copiare = fallimento, si riparte da capo.

## Le guidelines (principi da reinterpretare sul MIO sito)
- **Sistema tipografico con tensione**: display grande/audace + parola-accento in font di
  contrasto (es. serif italic) come firma. Gerarchia netta, non un solo font piatto.
- **Struttura editoriale**: sezioni numerate (01/02/03), hairline rows sottili, indici/numeri,
  label uppercase tracked. Full-width con margini coerenti — mai contenuto boxato che galleggia.
- **Griglie con intenzione**: sfalsate/asimmetriche, caption-row. Niente pill o elementi
  sparsi "buttati lì".
- **Micro-interazioni curate come l'estetica**: hover ricchi e informativi, transizioni
  morbide, dettagli (marquee, CTA giganti, accenti). La UX conta quanto il look.
- **Momenti forti**: hero d'impatto, footer con CTA gigante, un'interazione memorabile.
- **Accessibilità sempre inclusa**: skip-link, `:focus-visible`, `aria-*`,
  `prefers-reduced-motion`, contrasti adeguati. Non opzionale.
- **Navigazione/stato senza rotture**: es. switch lingua in-place senza reset scroll o
  replay animazioni (le pagine IT/EN/ES non devono ri-renderizzare).
- **Verifica reale**: build tra le fasi + guardare i pixel veri (screenshot/preview),
  iterare — non scrivere alla cieca.

## Il MIO gusto personale (questo sito è per ME)
Dark romantic: Loputyn neo-gothic + Co-Star experience-first, nero + rosso sangue, **NON crema**.
Voglio guidare io le reference. (memoria `alberto-design-taste-dark-romantic`)

## Contesto tecnico del portfolio (verificato dal vault, 2026-07)
- **Repo**: `D:\Projects\html5up-solid-state` (nome cartella invariato) →
  github.com/albedimaria/albedimaria.github.io → **LIVE su GitHub Pages** (albedimaria.github.io).
- **Stack**: **Astro 5 + Tailwind v4** statico (0 KB JS first-party), font self-hosted
  (Fraunces · JetBrains Mono · Inter). Deploy via GitHub Action `withastro/action`.
- **Identità attuale da EVOLVERE (non buttare)**: palette **Oxblood & Bone** — dark caldo
  `#16100F` + oxblood `#7A1228` + bone `#E8DFD3`; **onde-firma** (`#line-wave`); brand mark
  **octaedro 3D rotante**. Taglio freelance/client-first ("let's work together", "What I build",
  card case-study label-first).
- **i18n**: pagine statiche per-locale `/`, `/it/`, `/es/` con `hreflang`
  (`src/i18n/content.ts` + `src/i18n/project-text.ts`).
- Progetti in `src/data/projects.ts` (+ card con blocco engineering a scomparsa `<details>`).
- Agente vocale ElevenLabs D10S embedded (lazy on-interaction).
- Vecchio sito archiviato in `public/legacy/`.

## Vincoli di workflow
- **Sito LIVE sul mio CV** → lavorare SEMPRE su **branch dedicato**, `main` resta deployabile.
- Ogni push a `main` = una build/deploy Pages → committa libero, PUSHA una volta per batch.
- Verificare il render vero (preview → fallback Chrome headless se il preview screenshot va in
  timeout) prima di consegnare.

## Reference estetica (la fornisco io a mano)
- Livello citato in passato: diventaredesigner.com, matteobarchiesi.com, caffe.design.
- SITO REFERENCE PER QUESTO REDESIGN: __________________  ← (incollo io l'URL)

## Dove sta il resto (secondo cervello)
- Auto-memoria: `aesthetic-site-baseline`, `alberto-design-taste-dark-romantic`,
  `laura-zanchetta-design-standards`, `ui-work-method-no-blind`, `never-bluff-check-vault-first`.
- Vault: `wiki/entities/Portfolio CV.md`, log del redesign di Laura (2026-07-03/04).
- Prima di rispondere su tool/prodotti che uso: **grep il vault, non indovinare.**
