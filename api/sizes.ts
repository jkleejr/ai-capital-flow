import { NODES } from '../src/data/nodes'

// Node sizing source, refreshed weekly. A Vercel Cron (see vercel.json) hits
// this every Monday; the response is also edge-cached for 7 days so live
// visitors are served the cached snapshot instead of waiting on ~35 upstream calls.
//
// Sizes come from each public company's market capitalization (Finnhub free
// tier, US-listed tickers). Private labs and foreign-listed names have no
// usable market cap here and are sized on the client from capital-flow volume.
export default async function handler(_req: unknown, res: ResLike) {
  const key = process.env.FINNHUB_KEY || process.env.VITE_FINNHUB_KEY
  const marketCaps: Record<string, number> = {}

  if (key) {
    const fetchable = NODES.filter((n) => n.ticker && /^[A-Z]{1,5}$/.test(n.ticker))
    await Promise.allSettled(
      fetchable.map(async (n) => {
        try {
          const r = await fetch(
            `https://finnhub.io/api/v1/stock/profile2?symbol=${n.ticker}&token=${key}`,
          )
          if (!r.ok) return
          const p = (await r.json()) as { marketCapitalization?: number }
          // Finnhub returns market cap in $ millions.
          if (typeof p.marketCapitalization === 'number' && p.marketCapitalization > 0) {
            marketCaps[n.id] = p.marketCapitalization
          }
        } catch {
          /* skip this ticker; others still resolve */
        }
      }),
    )
  }

  // Cache at the CDN for 7 days; serve stale briefly while the next refresh runs.
  res.setHeader('Cache-Control', 's-maxage=604800, stale-while-revalidate=604800')
  res.status(200).json({ updatedAt: new Date().toISOString(), marketCaps })
}

// Minimal shape of the Vercel response object we use — avoids a hard dependency
// on @vercel/node types (this file is built by Vercel, not the app tsconfig).
interface ResLike {
  setHeader(name: string, value: string): void
  status(code: number): { json(body: unknown): void }
}
