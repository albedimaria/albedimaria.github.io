// Genera le favicon octaedro dal brand mark del sito (posa fissa fedele
// alla matematica di BrandMark.astro). App-icon: quadrato ink arrotondato
// + wireframe octaedro (bone + accento oxblood sul bordo frontale).
// Output: public/favicon-32x32.png, favicon-16x16.png, apple-touch-icon.png
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

// Faceted octahedron gem — a solid, legible interpretation of the wireframe
// brand mark (favicons must read as a bold silhouette at 16px). Same gem,
// oxblood facets + bone edges, so it stays on-brand.
// 48-unit box, gem centered. Vertices:
const T = [24, 7];    // top
const M = [24, 18];   // front-ridge centre (roof depth)
const L = [7, 23];    // left
const Rr = [40, 23];  // right
const B = [24, 42];   // bottom
const poly = (pts, fill) => `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="${fill}"/>`;
const facets = [
  poly([T, M, L], '#9c3340'),   // roof-left  (lit)
  poly([T, Rr, M], '#7a1228'),  // roof-right (shade)
  poly([L, M, B], '#7a1228'),   // body-left  (shade)
  poly([Rr, B, M], '#5c0e1e'),  // body-right (deep)
].join('');
// bone edges over the facets
const edge = (a, b, w = 1.1, op = 0.9) =>
  `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#faf3e8" stroke-width="${w}" stroke-linecap="round" opacity="${op}"/>`;
const edges = [
  edge(T, L), edge(T, Rr), edge(L, B), edge(Rr, B),  // silhouette
  edge(T, M, 1.0, 0.75), edge(L, M, 1.0, 0.6), edge(Rr, M, 1.0, 0.6), edge(M, B, 1.0, 0.6), // ridges
].join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
<rect width="48" height="48" rx="11" fill="#16100f"/>
${facets}${edges}
</svg>`;

const buf = Buffer.from(svg);
// render at 4× then downsample for crisp edges
const base = await sharp(buf, { density: 384 }).resize(192, 192).png().toBuffer();

await sharp(base).resize(32, 32).png().toFile(join(pub, 'favicon-32x32.png'));
await sharp(base).resize(16, 16).png().toFile(join(pub, 'favicon-16x16.png'));
await sharp(base).resize(180, 180).png().toFile(join(pub, 'apple-touch-icon.png'));
writeFileSync(join(pub, '.favicon-source'), 'octahedron gem (faceted brand mark, legible at 16px)\n');

console.log('favicon octaedro generate: 32/16/180 + .favicon-source');
