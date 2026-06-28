import type { RawEdge } from './types'

/** $B number → compact currency string. 1000 → "$1.0T", 6.3 → "$6.3B", 0.8 → "$800M". */
export function formatUsd(b: number): string {
  if (b >= 1000) return `$${(b / 1000).toFixed(1)}T`
  if (b >= 10) return `$${Math.round(b)}B`
  if (b >= 1) return `$${b.toFixed(1)}B`
  return `$${Math.round(b * 1000)}M`
}

/** full display for an edge's magnitude, e.g. "$28B/yr", "~$2B", "$100B". */
export function edgeAmount(e: RawEdge): string | null {
  if (e.usd == null) return null
  const base = formatUsd(e.usd)
  const suffix = e.basis === 'annual' ? '/yr' : ''
  return `${e.approx ? '~' : ''}${base}${suffix}`
}

/** sum of dollar magnitudes over a set of edges (mixes commitments + annual; label accordingly) */
export function sumUsd(edges: RawEdge[]): number {
  return edges.reduce((s, e) => s + (e.usd ?? 0), 0)
}
