export type SectorId =
  | 'labs'
  | 'hyperscaler'
  | 'chips'
  | 'memory'
  | 'optics'
  | 'datacenter'
  | 'power'
  | 'foundry'

export type FlowType =
  | 'equity'
  | 'chip'
  | 'compute'
  | 'hbm'
  | 'storage'
  | 'foundry'
  | 'equipment'
  | 'asic'
  | 'power'
  | 'fuelcell'
  | 'optics'
  | 'infra'

export interface RawNode {
  id: string
  name: string
  ticker?: string
  sector: SectorId
  note?: string
}

export interface RawEdge {
  from: string
  to: string
  /** visual weight 1-5 (particle density / ribbon thickness) */
  w: number
  type: FlowType
  /** part of a circular-financing loop (the hero story) */
  loop?: boolean
  /** short descriptive qualifier, e.g. "Azure", ">2/3 HBM4", "transceivers" */
  label?: string
  /** dollar magnitude of the flow, in $ billions */
  usd?: number
  /** whether `usd` is an announced total/commitment or an annual run-rate */
  basis?: 'deal' | 'annual'
  /** true when `usd` is a rough illustrative estimate rather than a sourced figure */
  approx?: boolean
}

/** A node after the simulation/flow pass adds geometry + computed size. */
export interface SimNode extends RawNode {
  x: number
  y: number
  vx?: number
  vy?: number
  fx?: number | null
  fy?: number | null
  /** total capital flow volume through the node (sum of incident edge weights) */
  flow: number
  /** rendered radius, derived from flow */
  r: number
}
