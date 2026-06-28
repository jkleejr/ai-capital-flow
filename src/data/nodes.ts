import type { RawNode } from './types'

// 44 nodes — see research/MASTER-dataset.md for sourcing.
// Sizes are NOT stored here: node radius is derived from capital flow volume
// (sum of incident edge weights) in graph/flow.ts.
export const NODES: RawNode[] = [
  // ── AI labs (the spark) ───────────────────────────────────────────
  { id: 'openai',    name: 'OpenAI',    sector: 'labs', note: '~$25B ARR; >$1.4T vendor commitments' },
  { id: 'anthropic', name: 'Anthropic', sector: 'labs', note: '~$47B ARR run-rate' },
  { id: 'xai',       name: 'xAI',       sector: 'labs', note: 'Colossus 2 buildout' },

  // ── Hyperscalers / end-demand (core) ──────────────────────────────
  { id: 'MSFT',  name: 'Microsoft', ticker: 'MSFT',  sector: 'hyperscaler', note: '~$190B FY26 capex; 27% of OpenAI' },
  { id: 'GOOGL', name: 'Alphabet',  ticker: 'GOOGL', sector: 'hyperscaler', note: '$175–190B capex; TPU via Broadcom' },
  { id: 'AMZN',  name: 'Amazon',    ticker: 'AMZN',  sector: 'hyperscaler', note: '~$200B capex' },
  { id: 'META',  name: 'Meta',      ticker: 'META',  sector: 'hyperscaler', note: '$115–145B capex' },
  { id: 'ORCL',  name: 'Oracle',    ticker: 'ORCL',  sector: 'hyperscaler', note: 'Stargate partner' },

  // ── Compute / chips ───────────────────────────────────────────────
  { id: 'NVDA', name: 'Nvidia',   ticker: 'NVDA', sector: 'chips', note: 'DC rev $75.2B/qtr; the hub' },
  { id: 'AVGO', name: 'Broadcom', ticker: 'AVGO', sector: 'chips', note: 'custom ASICs; Google TPU' },
  { id: 'AMD',  name: 'AMD',      ticker: 'AMD',  sector: 'chips', note: 'MI450; 6 GW OpenAI deal' },
  { id: 'ARM',  name: 'Arm',      ticker: 'ARM',  sector: 'chips', note: 'Stargate tech partner' },
  { id: 'INTC', name: 'Intel',    ticker: 'INTC', sector: 'chips', note: 'Nvidia $5B stake' },
  { id: 'MRVL', name: 'Marvell',  ticker: 'MRVL', sector: 'chips', note: 'custom silicon / optical DSPs' },

  // ── Memory & storage ──────────────────────────────────────────────
  { id: 'SSNLF', name: 'Samsung',  ticker: '005930.KS', sector: 'memory', note: '~22% HBM share' },
  { id: 'HXSCL', name: 'SK Hynix', ticker: '000660.KS', sector: 'memory', note: '~57% HBM share; HBM4 leader' },
  { id: 'MU',    name: 'Micron',   ticker: 'MU',        sector: 'memory', note: '~$22B prepaid; HBM sold out' },
  { id: 'SNDK',  name: 'SanDisk',  ticker: 'SNDK',      sector: 'memory', note: 'NAND/AI storage; ~$42B backlog' },

  // ── Optics / networking ───────────────────────────────────────────
  { id: 'ANET', name: 'Arista',      ticker: 'ANET', sector: 'optics', note: '$9B FY25; MSFT ~26%' },
  { id: 'ALAB', name: 'Astera Labs', ticker: 'ALAB', sector: 'optics', note: 'PCIe/CXL retimers' },
  { id: 'COHR', name: 'Coherent',    ticker: 'COHR', sector: 'optics', note: 'transceivers 800G/1.6T' },
  { id: 'CIEN', name: 'Ciena',       ticker: 'CIEN', sector: 'optics', note: 'coherent optics / DCI' },
  { id: 'LITE', name: 'Lumentum',    ticker: 'LITE', sector: 'optics', note: 'laser/EML chips' },
  { id: 'CRDO', name: 'Credo',       ticker: 'CRDO', sector: 'optics', note: 'AECs; Amazon ~86% of a qtr' },
  { id: 'FN',   name: 'Fabrinet',    ticker: 'FN',   sector: 'optics', note: 'builds optics; Nvidia 27.6%' },

  // ── Data center / neocloud / infra ────────────────────────────────
  { id: 'DELL', name: 'Dell',        ticker: 'DELL', sector: 'datacenter', note: 'AI servers' },
  { id: 'VRT',  name: 'Vertiv',      ticker: 'VRT',  sector: 'datacenter', note: 'thermal/power infra' },
  { id: 'EQIX', name: 'Equinix',     ticker: 'EQIX', sector: 'datacenter', note: 'colocation; Bloom fuel cells' },
  { id: 'NBIS', name: 'Nebius',      ticker: 'NBIS', sector: 'datacenter', note: 'neocloud; Nvidia $2B warrant' },
  { id: 'DLR',  name: 'Digital Realty', ticker: 'DLR', sector: 'datacenter', note: 'data-center REIT' },
  { id: 'CRWV', name: 'CoreWeave',   ticker: 'CRWV', sector: 'datacenter', note: 'Nvidia 11.5% + $6.3B backstop' },
  { id: 'SMCI', name: 'Super Micro', ticker: 'SMCI', sector: 'datacenter', note: 'AI servers' },

  // ── Power / energy ────────────────────────────────────────────────
  { id: 'GEV', name: 'GE Vernova',   ticker: 'GEV', sector: 'power', note: 'gas turbines / grid' },
  { id: 'ETN', name: 'Eaton',        ticker: 'ETN', sector: 'power', note: 'electrical gear for DCs' },
  { id: 'CEG', name: 'Constellation', ticker: 'CEG', sector: 'power', note: 'nuclear; MSFT Crane restart' },
  { id: 'VST', name: 'Vistra',       ticker: 'VST', sector: 'power', note: 'nuclear+gas; KKR/Nvidia >$10B' },
  { id: 'BE',  name: 'Bloom Energy', ticker: 'BE',  sector: 'power', note: 'SOFC fuel cells; Oracle 2.8 GW' },
  { id: 'TLN', name: 'Talen',        ticker: 'TLN', sector: 'power', note: 'nuclear; Amazon $18B PPA' },
  { id: 'OKLO', name: 'Oklo',        ticker: 'OKLO', sector: 'power', note: 'SMR; Meta 1.2 GW' },

  // ── Foundry / equipment ───────────────────────────────────────────
  { id: 'TSM',  name: 'TSMC',             ticker: 'TSM',  sector: 'foundry', note: '2026 capex $52–56B; ~60% CoWoS to Nvidia' },
  { id: 'ASML', name: 'ASML',             ticker: 'ASML', sector: 'foundry', note: 'EUV; WFE leader' },
  { id: 'AMAT', name: 'Applied Materials', ticker: 'AMAT', sector: 'foundry', note: 'WFE' },
  { id: 'LRCX', name: 'Lam Research',     ticker: 'LRCX', sector: 'foundry', note: 'WFE' },
  { id: 'KLAC', name: 'KLA',              ticker: 'KLAC', sector: 'foundry', note: 'process control' },
]
