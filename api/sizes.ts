// Node sizing source, refreshed daily. A Vercel Cron (see vercel.json) warms
// this; the response is also edge-cached so live visitors are served the
// cached snapshot instead of waiting on ~39 upstream calls.
//
// Sizes come from each public company's market capitalization (Finnhub free
// tier, US-listed tickers). Private labs and foreign-listed names (Samsung,
// SK Hynix) have no usable market cap here and keep their curated client-side
// value (src/data/nodes.ts), which is the source of truth for those.
//
// Self-contained on purpose: this used to `import { NODES }` from ../src,
// which crashed the deployed function (cross-boundary bundling). The US ticker
// list is inlined below — keep it in sync with src/data/nodes.ts. For these
// names the node id equals the ticker, so the response keys match node ids.
const US_TICKERS = [
  'MSFT', 'GOOGL', 'AMZN', 'META', 'ORCL',
  'NVDA', 'AVGO', 'AMD', 'ARM', 'INTC', 'MRVL',
  'MU', 'SNDK',
  'ANET', 'ALAB', 'COHR', 'CIEN', 'LITE', 'CRDO', 'FN',
  'DELL', 'VRT', 'EQIX', 'NBIS', 'DLR', 'CRWV', 'SMCI',
  'GEV', 'ETN', 'CEG', 'VST', 'BE', 'TLN', 'OKLO',
  'TSM', 'ASML', 'AMAT', 'LRCX', 'KLAC',
]

export default async function handler(_req: unknown, res: ResLike) {
  const marketCaps: Record<string, number> = {}
  try {
    const key = process.env.FINNHUB_KEY || process.env.VITE_FINNHUB_KEY
    if (key) {
      await Promise.allSettled(
        US_TICKERS.map(async (t) => {
          try {
            const r = await fetch(
              `https://finnhub.io/api/v1/stock/profile2?symbol=${t}&token=${key}`,
            )
            if (!r.ok) return
            const p = (await r.json()) as { marketCapitalization?: number; currency?: string }
            // Finnhub reports market cap in the company's REPORTING currency,
            // not always USD — e.g. TSM in TWD (~30x), ASML in EUR. Only trust
            // USD-denominated values; non-USD ADRs fall back to the curated cap
            // (src/data/nodes.ts) rather than being mis-scaled. Value is $ millions.
            if (
              p.currency === 'USD' &&
              typeof p.marketCapitalization === 'number' &&
              p.marketCapitalization > 0
            ) {
              marketCaps[t] = p.marketCapitalization
            }
          } catch {
            /* skip this ticker; others still resolve */
          }
        }),
      )
    }
  } catch {
    /* never 500 — fall through to whatever caps we gathered (possibly none),
       and the client keeps its curated sizing. */
  }

  // Cache at the CDN for 1 day (serve stale up to 7 while revalidating) so a
  // corrected key / fresh caps propagate within a day, not a week. `count`
  // makes it easy to tell a working response from an empty (no-key) one.
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=604800')
  res.status(200).json({
    updatedAt: new Date().toISOString(),
    count: Object.keys(marketCaps).length,
    marketCaps,
  })
}

// Minimal shape of the Vercel response object we use — avoids a hard dependency
// on @vercel/node types (this file is built by Vercel, not the app tsconfig).
interface ResLike {
  setHeader(name: string, value: string): void
  status(code: number): { json(body: unknown): void }
}
