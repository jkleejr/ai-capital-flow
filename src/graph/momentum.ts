import { NODES } from '../data/nodes'

// ── placeholder momentum (deterministic, used until/unless live data loads) ──
function hash(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

const values = new Map<string, number>(
  NODES.map((n) => [n.id, +(((hash(n.id) % 2000) / 1000 - 1)).toFixed(2)]),
)
let live = false

/** current momentum (-1..1) for a node — live if loaded, else placeholder */
export function getMomentum(id: string) {
  return values.get(id) ?? 0
}
export function isLive() {
  return live
}

/**
 * Attempt to load live daily % change from Finnhub (free tier) for US-listed
 * tickers, normalizing a ±5% day to ±1. No key / failure → keeps placeholder.
 * Private (labs) and foreign (Samsung, SK Hynix) names stay on placeholder.
 */
export async function loadLiveMomentum(): Promise<boolean> {
  const key = import.meta.env.VITE_FINNHUB_KEY
  if (!key) return false
  const fetchable = NODES.filter((n) => n.ticker && /^[A-Z]{1,5}$/.test(n.ticker))
  try {
    await Promise.allSettled(
      fetchable.map(async (n) => {
        const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${n.ticker}&token=${key}`)
        if (!res.ok) return
        const q = (await res.json()) as { dp?: number }
        if (typeof q.dp === 'number' && Number.isFinite(q.dp)) {
          values.set(n.id, Math.max(-1, Math.min(1, q.dp / 5)))
        }
      }),
    )
    live = true
    return true
  } catch {
    return false
  }
}

/** momentum (-1..1) → heat hex. positive = cyan/green inflow, negative = red outflow. */
export function heatColor(m: number) {
  let r: number, g: number, b: number
  if (m >= 0) {
    r = 52
    g = 200 + Math.round(45 * m)
    b = 150 - Math.round(70 * m)
  } else {
    r = 240
    g = 90 + Math.round(70 * (1 + m))
    b = 95
  }
  return '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('')
}
