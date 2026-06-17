import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const W = 1200, H = 630;

// brand-mark octahedron (top-right), bone wireframe
const cx = 1055, cy = 150, r = 58;
const octa = `
  <g stroke="#e8dfd3" fill="none" stroke-width="2" stroke-linejoin="round">
    <g opacity="0.3">
      <path d="M${cx} ${cy - r} L${cx} ${cy - 22}"/>
      <path d="M${cx} ${cy + r} L${cx} ${cy - 22}"/>
      <path d="M${cx - 50} ${cy} L${cx} ${cy - 22}"/>
      <path d="M${cx + 50} ${cy} L${cx} ${cy - 22}"/>
    </g>
    <path d="M${cx} ${cy - r} L${cx - 50} ${cy} L${cx} ${cy + 24} L${cx + 50} ${cy} Z"/>
    <path d="M${cx} ${cy + r} L${cx - 50} ${cy}"/>
    <path d="M${cx} ${cy + r} L${cx + 50} ${cy}"/>
    <path d="M${cx} ${cy + r} L${cx} ${cy + 24}"/>
  </g>`;

const waves = `
  <g fill="none" stroke="#7a1228">
    <path d="M0 540 q75 -34 150 0 t150 0 t150 0 t150 0 t150 0 t150 0 t150 0 t150 0" stroke-width="3" opacity="0.5"/>
    <path d="M0 558 q90 28 180 0 t180 0 t180 0 t180 0 t180 0 t180 0 t180 0" stroke-width="2.4" stroke="#9c3340" opacity="0.32"/>
    <path d="M0 528 q105 -24 210 0 t210 0 t210 0 t210 0 t210 0 t210 0" stroke-width="2" opacity="0.2"/>
  </g>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#16100f"/>
  ${waves}
  ${octa}
  <text x="90" y="250" font-family="monospace" font-size="26" letter-spacing="4" fill="#a89a8f">AI PRODUCT ENGINEER</text>
  <text x="88" y="350" font-family="Georgia, 'Times New Roman', serif" font-size="96" font-weight="700" fill="#f4ece3">Alberto Di Maria</text>
  <text x="90" y="412" font-family="monospace" font-size="28" fill="#b7a89d">agentic AI · voice agents · audio</text>
  <text x="90" y="470" font-family="monospace" font-size="21" fill="#a89a8f">Beat Store — acquired   ·   Company Brain — Top 15   ·   voice agents in production</text>
</svg>`;

mkdirSync('public', { recursive: true });
await sharp(Buffer.from(svg)).png().toFile('public/og.png');
console.log('og.png written');
