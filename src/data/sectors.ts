import type { SectorId } from './types'

export interface SectorMeta {
  id: SectorId
  label: string
  /** neon accent color */
  color: string
  /** angle (radians) of the sector cluster around the core; ring sectors ignore it */
  angle: number
  /** distance of the cluster center from the core */
  ring: number
}

const TAU = Math.PI * 2

// Outer supply-chain sectors are spaced evenly around the core.
// Core sectors (labs, hyperscaler) sit at/near the center as concentric rings.
export const SECTORS: Record<SectorId, SectorMeta> = {
  labs:        { id: 'labs',        label: 'AI Labs',      color: '#ffe9a8', angle: 0,           ring: 0 },
  hyperscaler: { id: 'hyperscaler', label: 'Hyperscalers', color: '#cfd8e8', angle: 0,           ring: 0.42 },
  chips:       { id: 'chips',       label: 'Compute / Chips', color: '#34d399', angle: (0 / 6) * TAU, ring: 1 },
  memory:      { id: 'memory',      label: 'Memory',       color: '#a78bfa', angle: (1 / 6) * TAU, ring: 1 },
  foundry:     { id: 'foundry',     label: 'Foundry / Equip', color: '#e0894a', angle: (2 / 6) * TAU, ring: 1 },
  power:       { id: 'power',       label: 'Power',        color: '#fbbf24', angle: (3 / 6) * TAU, ring: 1 },
  datacenter:  { id: 'datacenter',  label: 'Data Center',  color: '#5b9dff', angle: (4 / 6) * TAU, ring: 1 },
  optics:      { id: 'optics',      label: 'Optics',       color: '#22d3ee', angle: (5 / 6) * TAU, ring: 1 },
}

export const SECTOR_ORDER: SectorId[] = [
  'labs', 'hyperscaler', 'chips', 'memory', 'foundry', 'power', 'datacenter', 'optics',
]
