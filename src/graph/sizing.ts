import { NODES } from '../data/nodes'
import { EDGES } from '../data/edges'
import { buildFlow, R_MIN, R_MAX } from './flow'

// ── node sizing ────────────────────────────────────────────────────
// Nodes are sized by company size (market cap, or private valuation for the
// labs), sqrt-scaled so area ~ value. Every node carries a curated snapshot
// (data/nodes.ts) so sizing is correct offline, for foreign-listed names that
// the live feed can't price, and before `/api/sizes` resolves. When the live
// feed loads, US-listed market caps are refreshed in place. The handful of
// nodes with no cap at all fall back to capital-flow volume.
const { radiusFor: flowRadius } = buildFlow(NODES, EDGES)

// raw market value ($B) per node: live market cap if loaded, else curated.
const capById = new Map<string, number>()
for (const n of NODES) {
  const cap = n.marketCap ?? n.valuation
  if (typeof cap === 'number' && cap > 0) capById.set(n.id, cap)
}

// sqrt-scale bounds across all known caps; recomputed when live data arrives.
let sqMin = 0
let sqMax = 0
function recomputeBounds() {
  const vals = [...capById.values()]
  if (vals.length === 0) return
  sqMin = Math.sqrt(Math.min(...vals))
  sqMax = Math.sqrt(Math.max(...vals))
}
recomputeBounds()

let updatedAt: string | null = null

/** sqrt-scale a value within the cap range into the [R_MIN,R_MAX] radius range. */
function scaleRadius(v: number) {
  const t = sqMax === sqMin ? 0.5 : (Math.sqrt(v) - sqMin) / (sqMax - sqMin)
  return R_MIN + t * (R_MAX - R_MIN)
}

/** current rendered radius for a node — market-cap size if known, else flow size. */
export function radiusFor(id: string) {
  const cap = capById.get(id)
  return cap !== undefined ? scaleRadius(cap) : flowRadius(id)
}

/** raw market value for a node ($B): live market cap if loaded, else curated. */
export function marketCapFor(id: string) {
  return capById.get(id)
}

/** ISO timestamp of the last successful market-data refresh, or null. */
export function sizesUpdatedAt() {
  return updatedAt
}

/**
 * Fetch live market-cap sizing from the cron-warmed `/api/sizes` endpoint and
 * merge it over the curated caps. Failure (offline, no key, local dev without
 * the function) silently keeps the curated sizing. Returns true only when at
 * least one live size was applied.
 */
export async function loadLiveSizes(): Promise<boolean> {
  try {
    const res = await fetch('/api/sizes')
    if (!res.ok) return false
    const data = (await res.json()) as { updatedAt?: string; marketCaps?: Record<string, number> }
    const caps = data.marketCaps ?? {}
    let applied = false
    for (const [id, cap] of Object.entries(caps)) {
      // `/api/sizes` reports market cap in $ millions; store as $ billions.
      if (typeof cap === 'number' && cap > 0) {
        capById.set(id, cap / 1000)
        applied = true
      }
    }
    if (!applied) return false
    recomputeBounds()
    updatedAt = data.updatedAt ?? null
    return true
  } catch {
    return false
  }
}
