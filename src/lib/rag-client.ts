// Client-side RAG for the static portfolio. The corpus is tiny (28 chunks over
// 7 docs), so instead of shipping a ~48MB embedding model to the browser we use
// BM25 keyword ranking in pure JS: zero deps, instant, ~10KB corpus asset. The
// agent's queries carry the real terms (project names, "latency", "tests",
// "stack"), which BM25 matches well.

type Chunk = { id: string; source: string; text: string };

let corpusP: Promise<Chunk[]> | null = null;
const getCorpus = () => {
  if (!corpusP) corpusP = fetch('/corpus-text.json').then((r) => r.json());
  return corpusP;
};

const STOP = new Set([
  'the', 'a', 'an', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'with', 'is',
  'it', 'its', 'as', 'at', 'by', 'that', 'this', 'his', 'he', 'i', 'you',
  'di', 'il', 'la', 'le', 'lo', 'un', 'una', 'e', 'che', 'per', 'con', 'su',
  'el', 'los', 'las', 'y', 'de', 'en', 'su',
]);

const tokenize = (s: string): string[] =>
  (s.toLowerCase().match(/[a-z0-9]+/g) || []).filter((w) => w.length > 1 && !STOP.has(w));

const K1 = 1.5;
const B = 0.75;

export async function warmRag() {
  try {
    await getCorpus();
  } catch {
    /* first query will surface errors */
  }
}

export async function searchPortfolio(query: string, k = 4): Promise<string> {
  const q = tokenize(query);
  if (!q.length) return '';
  const chunks = await getCorpus();

  const docTokens = chunks.map((c) => tokenize(`${c.source} ${c.text}`));
  const avgdl = docTokens.reduce((s, d) => s + d.length, 0) / docTokens.length;

  // document frequency per query term
  const df: Record<string, number> = {};
  for (const term of new Set(q)) {
    df[term] = docTokens.filter((d) => d.includes(term)).length;
  }
  const N = chunks.length;

  const scored = chunks.map((c, i) => {
    const d = docTokens[i];
    const dl = d.length;
    let score = 0;
    for (const term of q) {
      const n = df[term];
      if (!n) continue;
      const tf = d.filter((w) => w === term).length;
      if (!tf) continue;
      const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
      score += idf * (tf * (K1 + 1)) / (tf + K1 * (1 - B + (B * dl) / avgdl));
    }
    return { c, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map(({ c }) => `[${c.source}] ${c.text}`)
    .join('\n\n');
}
