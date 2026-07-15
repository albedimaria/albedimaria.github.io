import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
const require = createRequire('D:/Projects/html5up-solid-state/');
const sharp = require('sharp');

// Brand octahedron as a favicon: ONE static, FRONT-ON pose. Viewed straight down
// an axis the octahedron reads as the iconic gem — a diamond outline with four
// triangular facets meeting at the centre. Symmetric, unmistakable at 16px, and
// far cleaner than a tilted view (whose shaded faces turn to mush that small).
// Lit from top-left: upper/left facets brighter, lower/right darker. Rose edges
// on top. Fills ~96% of the square (old icon: ~55% inside black bands), on a
// TRANSPARENT background so it reads on any tab colour, light or dark.

const C = 50, R = 48;                       // centre, radius (96% of a 100 box)
// diamond corners (equator projected), clockwise from top
const TOP = [C, C - R], RIGHT = [C + R, C], BOT = [C, C + R], LEFT = [C - R, C];
const MID = [C, C];                          // front apex projects to centre

// four facets, each centre → two adjacent corners. Shade: top-left lit.
const OX_DARK = '#57101d', OX = '#7a1228', OX_MID = '#8f2436', OX_LIT = '#ab3049';
const facets = [
  { pts: [MID, TOP, LEFT], fill: OX_LIT },   // upper-left  → brightest
  { pts: [MID, TOP, RIGHT], fill: OX_MID },  // upper-right
  { pts: [MID, BOT, LEFT], fill: OX },       // lower-left
  { pts: [MID, BOT, RIGHT], fill: OX_DARK }, // lower-right → darkest
];
const poly = facets.map(f =>
  `<polygon points="${f.pts.map(p => p.join(',')).join(' ')}" fill="${f.fill}"/>`).join('');

const EDGE = '#edb9c2';
const corners = [TOP, RIGHT, BOT, LEFT];
const rim = `<polygon points="${corners.map(p => p.join(',')).join(' ')}" fill="none" stroke="${EDGE}" stroke-width="3" stroke-linejoin="round"/>`;
// the four spokes centre→corner, a touch softer than the rim
const spokes = corners.map(p =>
  `<line x1="${MID[0]}" y1="${MID[1]}" x2="${p[0]}" y2="${p[1]}" stroke="${EDGE}" stroke-width="1.8" stroke-linecap="round" opacity="0.65"/>`).join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${poly}${spokes}${rim}</svg>`;
writeFileSync('D:/Projects/html5up-solid-state/public/favicon.svg', svg);
console.log('favicon.svg scritto');

const buf = Buffer.from(svg);
for (const size of [16, 32, 192, 512]) {
  const name = size === 192 ? 'android-chrome-192x192' : size === 512 ? 'android-chrome-512x512' : `favicon-${size}x${size}`;
  await sharp(buf, { density: 512 }).resize(size, size).png().toFile(`D:/Projects/html5up-solid-state/public/${name}.png`);
  console.log(name + '.png', size);
}
// apple touch icon: iOS masks corners over a background → give it the ink bg
await sharp({ create: { width: 180, height: 180, channels: 4, background: '#16100f' } })
  .composite([{ input: await sharp(buf, { density: 512 }).resize(158, 158).png().toBuffer(), gravity: 'center' }])
  .png().toFile('D:/Projects/html5up-solid-state/public/apple-touch-icon.png');
console.log('apple-touch-icon con bg ink');
