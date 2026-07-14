// Gate deterministico del restyling (loop stile Parlando).
// Uso: node scripts/restyle-gate.mjs [--phase N]
// Fase 1: verifica contrasto WCAG dei token accent + presenza favicon octaedro.
// Fasi 2+: estendere con check overflow/allineamenti (Chrome headless).
//
// Esce 0 se tutti i check passano, 1 altrimenti. Nessuna dipendenza esterna.

import { readFileSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const css = readFileSync(join(root, 'src/styles/global.css'), 'utf8');

// --- WCAG relative luminance + contrast ratio ---
const srgb = (c) => {
  const x = c / 255;
  return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
};
const lum = ([r, g, b]) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
const hex = (h) => {
  const m = h.replace('#', '').match(/.{2}/g);
  return m.map((x) => parseInt(x, 16));
};
const ratio = (a, b) => {
  const [l1, l2] = [lum(hex(a)), lum(hex(b))].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};
const tokenOf = (name) => {
  const m = css.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})`));
  return m ? m[1] : null;
};

let failed = 0;
const check = (ok, label, detail) => {
  console.log(`${ok ? '  \x1b[32m✓\x1b[0m' : '  \x1b[31m✗\x1b[0m'} ${label}${detail ? ` — ${detail}` : ''}`);
  if (!ok) failed++;
};

console.log('\n\x1b[1mRestyle gate\x1b[0m\n');

// ---- Fase 1: token accent WCAG ----
console.log('Fase 1 — token & fondamenta');
const ink = tokenOf('--color-ink');
const accentLg = tokenOf('--color-accent-lg');
const accentTxt = tokenOf('--color-accent-txt');
const oxbloodSoft = tokenOf('--color-oxblood-soft');

check(!!ink, 'token --color-ink presente', ink);
if (accentLg) {
  const r = ratio(accentLg, ink);
  check(r >= 3.0, `--color-accent-lg su ink ≥ 3:1 (large text/UI)`, `${r.toFixed(2)}:1`);
} else check(false, '--color-accent-lg mancante');
if (accentTxt) {
  const r = ratio(accentTxt, ink);
  check(r >= 4.5, `--color-accent-txt su ink ≥ 4.5:1 (testo normale)`, `${r.toFixed(2)}:1`);
} else check(false, '--color-accent-txt mancante');

// informativo: perché servono i nuovi token
if (oxbloodSoft && ink) {
  const r = ratio(oxbloodSoft, ink);
  console.log(`  \x1b[2m· nota: --oxblood-soft su ink = ${r.toFixed(2)}:1 (< 3:1 → non usare per testo)\x1b[0m`);
}

// utility griglia
check(/\.grid-12\s*\{/.test(css), 'utility .grid-12 definita');

// ---- favicon octaedro (≠ coniglietto) ----
const fav = join(root, 'public/favicon-32x32.png');
check(existsSync(fav), 'favicon-32x32.png presente', existsSync(fav) ? `${statSync(fav).size} B` : '');
// il coniglietto era ~3009 B; la nuova favicon avrà dimensione diversa.
// marker esplicito: file public/.favicon-source deve dire "octahedron"
const favSrc = join(root, 'public/.favicon-source');
check(existsSync(favSrc) && /octahedron/i.test(readFileSync(favSrc, 'utf8')), 'favicon marcata come octahedron');

console.log('');
if (failed) {
  console.log(`\x1b[31m${failed} check falliti\x1b[0m\n`);
  process.exit(1);
}
console.log('\x1b[32mgate verde\x1b[0m\n');
