// Pass-bar gate for the client-first home page. Run after `npm run build`:
//   node scripts/client-first-gate.mjs
// Every check must FIND something to check: an empty match is a failure, not a pass.
//
// The transcript check needs the ElevenLabs conversation JSON, which is private
// and lives outside git (refs/call/conversation-fzfmstya.json). Without it the
// gate fails, unless --skip-call is passed on purpose.

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const DIST = 'dist';
const skipCall = process.argv.includes('--skip-call');
const fails = [];
const ok = (name, cond, detail = '') => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${detail ? '  ' + detail : ''}`);
  if (!cond) fails.push(name);
};
const read = (p) => readFileSync(p, 'utf8');
const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
/** visible text of an HTML file: no scripts, styles, tags or attributes */
const visible = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ');

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('dist/index.html not found: run `npm run build` first');
  process.exit(1);
}
const home = read(join(DIST, 'index.html'));
const homeText = visible(home);

// ---- 1. languages ---------------------------------------------------------
ok('root is English', /<html[^>]*lang="en"/.test(home));
for (const l of ['es', 'it']) {
  const p = join(DIST, l, 'index.html');
  ok(`/${l}/ exists with lang="${l}"`, existsSync(p) && new RegExp(`<html[^>]*lang="${l}"`).test(read(p)));
}
const enRedirect = existsSync(join(DIST, 'en', 'index.html')) ? read(join(DIST, 'en', 'index.html')) : '';
ok('/en/ redirects to /', /http-equiv="refresh"[^>]*url=\/"|url=\/["' ]/i.test(enRedirect) && !/lang="en"[\s\S]*<main/.test(enRedirect));
ok('x-default points to /', /hreflang="x-default" href="https:\/\/albertodimaria\.com\/"/.test(home));

// ---- 2. banned strings ----------------------------------------------------
// public/legacy is the old static site, kept as it was: it is listed apart so
// its findings are visible without hiding the rest.
const BANNED = ['1.6', '1,6', 'Top 15', 'acquired', 'first client', 'real clients', 'in production', 'Freelance in Milan', 'Milan, Italy', 'Colombia', 'Deepgram', 'GPT-4o'];
const TEXT_EXT = new Set(['.html', '.txt', '.json', '.xml', '.svg', '.webmanifest']);
const textFiles = walk(DIST).filter((p) => TEXT_EXT.has(extname(p)));
ok('banned-string scan has files to read', textFiles.length >= 6, `${textFiles.length} files`);
const hits = [];
for (const p of textFiles) {
  // HTML is judged on what a visitor reads; an SVG path full of "1.6" is not a claim
  const body = extname(p) === '.html' ? visible(read(p)) : extname(p) === '.svg' ? visible('<x>' + read(p).replace(/<(?!text|tspan|\/text|\/tspan)[^>]*>/g, ' ') + '</x>') : read(p);
  for (const b of BANNED) if (body.includes(b)) hits.push(`${p.replace(/\\/g, '/')}: "${b}"`);
}
const legacyHits = hits.filter((h) => h.includes('/legacy/'));
const liveHits = hits.filter((h) => !h.includes('/legacy/'));
ok('no banned strings in the site', liveHits.length === 0, liveHits.join(' | '));
ok('no banned strings in /legacy/', legacyHits.length === 0, legacyHits.join(' | '));
// our own strings inside the JS bundles (word-like ones only: minified code is full of "1.6")
const jsFiles = walk(join(DIST, '_astro')).filter((p) => extname(p) === '.js');
const jsHits = [];
// "acquired" is left out here: it is an ordinary word inside the voice SDK ("lock acquired")
for (const p of jsFiles) for (const b of BANNED.filter((b) => /[a-z]{4}/i.test(b) && b !== 'acquired')) if (read(p).includes(b)) jsHits.push(`${p}: "${b}"`);
ok('no banned strings in the JS bundles', jsFiles.length > 0 && jsHits.length === 0, jsHits.join(' | '));
ok('no Italian interface strings on /', !/\bapri\b|mostra altri|Lavoriamo insieme|Chi sono/.test(homeText));

// ---- 3. every number on / is on the list ----------------------------------
// Source of each number: SPEC.md, "Numeri ammessi su /".
const ALLOWED = new Set([
  // the call: reply times, tool times, player, dates and hours spoken in it
  '0.9', '1.0', '1.5', '0.20', '0.28', '0.50', '0:00', '1:05', '1:27', '19', '19:00', '21:00', '22:00', '2026-11-19', '19th',
  '1×', '2×',
  // work
  '10', '80+', '15', '35', '25',
  // about: students, certifications, experience, education (CV)
  '30', '30+', '96/100', '1', '2020', '2021', '2023', '2024', '2025', '2026',
  // names
  'D10S', 'H9000', 'Bricks4Kidz',
]);
const numbers = [...new Set(homeText.match(/[A-Za-z]*\d[\d.,:×+/\-]*[A-Za-z0-9×+]*/g) ?? [])].map((n) => n.replace(/[.,:]$/, ''));
const unknown = numbers.filter((n) => !ALLOWED.has(n));
ok('numbers found on /', numbers.length >= 10, `${numbers.length} distinct`);
ok('every number on / is allowed', unknown.length === 0, unknown.join(' '));

// ---- 4. corpus ------------------------------------------------------------
const corpus = read(join(DIST, 'corpus-text.json'));
for (const name of ['Parlando', 'filoconduttore', 'Zero to HubSpot', 'Collaudio']) ok(`corpus names ${name}`, corpus.includes(name));

// ---- 5. "Book a call" -----------------------------------------------------
const section = (id) => (home.match(new RegExp(`<section[^>]*id="${id}"[\\s\\S]*?</section>`)) ?? [''])[0];
ok('"Book a call" in the hero', /Book a call/.test(section('top')));
ok('"Book a call" in contact', /Book a call/.test(section('contact')));
const bookUrl = (read('src/i18n/content.ts').match(/BOOK_URL = '([^']+)'/) ?? [])[1] ?? '';
ok('"Book a call" points to a calendar', /^https:\/\//.test(bookUrl), `BOOK_URL = ${bookUrl}`);

// ---- 6. the transcript equals the conversation ----------------------------
const CALL_JSON = 'refs/call/conversation-fzfmstya.json';
if (skipCall) {
  console.log('SKIP  transcript vs conversation JSON (--skip-call)');
} else if (!existsSync(CALL_JSON)) {
  ok('transcript vs conversation JSON', false, `${CALL_JSON} not found (private, outside git)`);
} else {
  const conv = JSON.parse(read(CALL_JSON));
  const clean = (s) => s.replace(/\[[^\]]*\]\s*/g, '').replace(/\s+/g, ' ').replace(/’/g, "'").replace(/\s*(\.\.\.|…)/g, '…').trim();
  const expected = [];
  const calledAt = {};
  for (const t of conv.transcript) {
    const m = t.conversation_turn_metrics?.metrics ?? {};
    if (t.message) {
      const lat = t.role === 'agent' ? m.convai_ttf_audio_since_silence?.elapsed_time : undefined;
      // the greeting has a time-to-audio too, but nobody spoke before it: not a reply
      const isReply = lat !== undefined && (m.convai_turn_silence_before_initiation?.elapsed_time ?? 0) > 0;
      expected.push({ kind: t.role === 'user' ? 'caller' : 'agent', t: t.time_in_call_secs, text: clean(t.message), latency: isReply ? +lat.toFixed(2) : undefined, interrupted: !!t.interrupted });
    }
    // a tool row sits at the second the tool is CALLED; its latency comes with the result
    for (const c of t.tool_calls ?? []) calledAt[c.tool_name] = t.time_in_call_secs;
    for (const r of t.tool_results ?? []) expected.push({ kind: 'tool', t: calledAt[r.tool_name] ?? t.time_in_call_secs, name: r.tool_name, latency: +r.tool_latency_secs.toFixed(2) });
  }
  // published rows, read from the source file
  const src = read('src/data/call.ts');
  const rowsSrc = src.slice(src.indexOf('export const callRows'));
  const published = [];
  // a row is either one line or a block that opens with `  {` and closes with `  },`
  const re = /^  \{ kind: '(caller|agent|tool)', t: (\d+)(.*)\},$|^  \{\n    kind: '(caller|agent|tool)', t: (\d+)([\s\S]*?)\n  \},$/gm;
  for (const m of rowsSrc.matchAll(re)) {
    const kind = m[1] ?? m[4];
    const t = Number(m[2] ?? m[5]);
    const rest = m[3] ?? m[6];
    const lat = (rest.match(/latency: ([\d.]+)/) ?? [])[1];
    if (kind === 'tool') published.push({ kind, t, name: (rest.match(/call: '([a-z_]+)/) ?? [])[1], latency: Number(lat) });
    else published.push({ kind, t, text: clean((rest.match(/it: '((?:[^'\\]|\\.)*)'/) ?? [])[1] ?? ''), latency: lat ? Number(lat) : undefined, interrupted: /interrupted: true/.test(rest) });
  }
  ok('transcript: same number of rows', published.length === expected.length && expected.length >= 15, `${published.length} published, ${expected.length} in the conversation`);
  const diffs = [];
  expected.forEach((e, i) => {
    const p = published[i];
    if (!p) return;
    if (p.kind !== e.kind || p.t !== e.t) diffs.push(`row ${i}: ${p.kind}@${p.t} vs ${e.kind}@${e.t}`);
    else if (e.kind === 'tool' ? p.name !== e.name || p.latency !== e.latency : p.text !== e.text || p.latency !== e.latency || p.interrupted !== e.interrupted)
      diffs.push(`row ${i} (${e.kind}@${e.t}): published ${JSON.stringify(p)} vs ${JSON.stringify(e)}`);
  });
  ok('transcript: every row matches', diffs.length === 0, diffs.join(' || '));
}

console.log(fails.length ? `\n${fails.length} FAILED: ${fails.join('; ')}` : '\nALL PASS');
process.exit(fails.length ? 1 : 0);
