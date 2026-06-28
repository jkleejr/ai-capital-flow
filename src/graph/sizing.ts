import { NODES } from '../data/nodes'
import { EDGES } from '../data/edges'
import { buildFlow, R_MIN, R_MAX } from './flow'

// ── node sizing ────────────────────────────────────────────────────
// Default: capital-flow volume (sum of incident edge weights), used until/
// unless live market-cap data loads. When `/api/sizes` resolves, public
// companies are re-sized by market capitalization; private labs and foreign-
// listed names (no market cap) keep their flow-based size.
const { radiusFor: flowRadius } = buildFlow(NODES, EDGES)
const liveSizes = new Map<string, number>()
let updatedAt: string | null = null

/** current rendered radius for a node — live market-cap size if loaded, else flow size. */
export function radiusFor(id: string) {
  return liveSizes.get(id) ?? flowRadius(id)
}

/** ISO timestamp of the last successful market-data refresh, or null. */
export function sizesUpdatedAt() {
  return updatedAt
}

/** sqrt-scale a value within [min,max] into the [R_MIN,R_MAX] radius range (area ~ value). */
function scaleRadius(v: number, sqMin: number, sqMax: number) {
  const t = sqMax === sqMin ? 0.5 : (Math.sqrt(v) - sqMin) / (sqMax - sqMin)
  return R_MIN + t * (R_MAX - R_MIN)
}

/**
 * Fetch daily market-cap sizing from the cron-warmed `/api/sizes` endpoint.
 * Failure (offline, no key, local dev without the function) silently keeps the
 * flow-based sizing. Returns true only when at least one live size was applied.
 */
export async function loadLiveSizes(): Promise<boolean> {
  try {
    const res = await fetch('/api/sizes')
    if (!res.ok) return false
    const data = (await res.json()) as { updatedAt?: string; marketCaps?: Record<string, number> }
    const caps = data.marketCaps ?? {}
    const vals = Object.values(caps).filter((v) => typeof v === 'number' && v > 0)
    if (vals.length === 0) return false

    const sqMin = Math.sqrt(Math.min(...vals))
    const sqMax = Math.sqrt(Math.max(...vals))
    for (const [id, cap] of Object.entries(caps)) {
      if (typeof cap === 'number' && cap > 0) liveSizes.set(id, scaleRadius(cap, sqMin, sqMax))
    }
    updatedAt = data.updatedAt ?? null
    return true
  } catch {
    return false
  }
}
