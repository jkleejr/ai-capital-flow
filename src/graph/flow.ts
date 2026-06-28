import type { RawEdge, RawNode } from '../data/types'

const R_MIN = 7
const R_MAX = 36

/**
 * Capital flow volume = sum of incident edge weights.
 * Node radius is a sqrt-scaled mapping of flow volume (so area ~ flow).
 */
export function buildFlow(nodes: RawNode[], edges: RawEdge[]) {
  const flow = new Map<string, number>()
  for (const n of nodes) flow.set(n.id, 0)
  for (const e of edges) {
    if (!flow.has(e.from) || !flow.has(e.to)) {
      throw new Error(`edge references unknown node: ${e.from} -> ${e.to}`)
    }
    flow.set(e.from, flow.get(e.from)! + e.w)
    flow.set(e.to, flow.get(e.to)! + e.w)
  }

  const vals = [...flow.values()]
  const sqMin = Math.sqrt(Math.min(...vals))
  const sqMax = Math.sqrt(Math.max(...vals))

  const radiusFor = (id: string) => {
    const v = flow.get(id) ?? 0
    const t = sqMax === sqMin ? 0.5 : (Math.sqrt(v) - sqMin) / (sqMax - sqMin)
    return R_MIN + t * (R_MAX - R_MIN)
  }

  return { flow, radiusFor }
}
