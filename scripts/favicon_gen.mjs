import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
const require = createRequire('D:/Projects/html5up-solid-state/');
const sharp = require('sharp');

// Brand octahedron, ONE static pose. A favicon can't animate and thin wireframe
// lines vanish at 16px — so the mark is drawn as a filled gem: the 3D octahedron
// with its front faces shaded (lit left, dark right), rose edges on top. It fills
// ~92% of the square (the old icon sat at ~55% with black bands around it) and the
// background is transparent, so it reads on any tab colour, light or dark.

const R = 46;
const V = [[R,0,0],[-R,0,0],[0,R,0],[0,-R,0],[0,0,R],[0,0,-R]];
// a pose picked to look like a cut gem: tilted so 4 faces face us
const ay = Math.PI/4, ax = 0.34;
const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
const P = V.map(([x,y,z]) => {
  const x1 = x*cy + z*sy, z1 = -x*sy + z*cy;
  const y1 = y*cx - z1*sx, z2 = y*sx + z1*cx;
  return [50 + x1, 50 - y1, z2];      // project to a 100×100 box, centre 50,50
});
// 8 faces = one equator vertex (2,3) + one pole (4,5) + ... actually: each face
// joins one of {top/bottom = idx 2/3} with two adjacent equator verts (0,1,4,5)
const EQ = [4,0,5,1];                 // equator ring order (front,right,back,left)
const faces = [];
for (const apex of [2,3])             // top, bottom
  for (let k=0;k<4;k++) faces.push([apex, EQ[k], EQ[(k+1)%4]]);

// depth-sort, keep the ones facing us
const shaded = faces.map(f => {
  const [a,b,c] = f.map(i=>P[i]);
  const zMid = (a[2]+b[2]+c[2])/3;
  // face normal z (screen) to pick lit vs shadow side
  const nx = (b[0]-a[0])*(c[1]-a[1]) - (b[1]-a[1])*(c[0]-a[0]);
  return { f, zMid, front: zMid > -4, lit: nx > 0 };
}).filter(s => s.front).sort((s,t)=>s.zMid-t.zMid);

const OX_DARK = '#5e0f1f', OX = '#7a1228', OX_LIT = '#a83049';
const EDGE = '#e9b3bd';
const poly = shaded.map(s => {
  const pts = s.f.map(i=>`${P[i][0].toFixed(1)},${P[i][1].toFixed(1)}`).join(' ');
  return `<polygon points="${pts}" fill="${s.lit?OX_LIT:OX_DARK}"/>`;
}).join('');
// silhouette outline (the 4 outer equator→pole edges) for a crisp rose rim
const rim = [];
for (const apex of [2,3]) for (const e of EQ) rim.push(`${P[apex][0].toFixed(1)},${P[apex][1].toFixed(1)} ${P[e][0].toFixed(1)},${P[e][1].toFixed(1)}`);
const edges = rim.map(l=>`<polyline points="${l}" fill="none" stroke="${EDGE}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>`).join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${poly}${edges}</svg>`;
writeFileSync('D:/Projects/html5up-solid-state/public/favicon.svg', svg);
console.log('favicon.svg scritto');

const buf = Buffer.from(svg);
for (const size of [16, 32, 180, 192, 512]) {
  const name = size===180 ? 'apple-touch-icon' : size===192 ? 'android-chrome-192x192' : size===512 ? 'android-chrome-512x512' : `favicon-${size}x${size}`;
  await sharp(buf, { density: 384 }).resize(size, size).png().toFile(`D:/Projects/html5up-solid-state/public/${name}.png`);
  console.log(name + '.png', size);
}
// apple touch icon: platforms mask corners on a background, so give it the ink bg
await sharp({ create: { width: 180, height: 180, channels: 4, background: '#16100f' } })
  .composite([{ input: await sharp(buf, { density: 384 }).resize(150,150).png().toBuffer(), gravity: 'center' }])
  .png().toFile('D:/Projects/html5up-solid-state/public/apple-touch-icon.png');
console.log('apple-touch-icon rifatto con bg ink');
