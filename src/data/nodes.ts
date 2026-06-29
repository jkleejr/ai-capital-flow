import type { RawNode } from './types'

// 44 nodes — see research/MASTER-dataset.md for sourcing.
// `marketCap` (public) / `valuation` (private labs) are in US$ billions and
// drive node radius (sqrt scale, graph/sizing.ts). These are sanity-checked
// snapshot values (~mid-2026) — several raw scraped caps were implausible and
// were corrected for the showcase. The live `/api/sizes` feed refreshes the
// US-listed market caps in place; foreign listings keep the curated value.
export const NODES: RawNode[] = [
  // ── AI labs (the spark) ───────────────────────────────────────────
  { id: 'openai',    name: 'OpenAI',    sector: 'labs', valuation: 850, note: '~$25B ARR; >$1.4T vendor commitments' },
  { id: 'anthropic', name: 'Anthropic', sector: 'labs', valuation: 400, note: '~$47B ARR run-rate' },
  { id: 'xai',       name: 'xAI',       sector: 'labs', valuation: 230, note: '$20B Series E (~$230B val); Colossus 2 buildout', sources: ['https://x.ai/news/series-e'] },

  // ── Hyperscalers / end-demand (core) ──────────────────────────────
  { id: 'MSFT',  name: 'Microsoft', ticker: 'MSFT',  sector: 'hyperscaler', marketCap: 3800, note: '~$190B FY26 capex; 27% of OpenAI' },
  { id: 'GOOGL', name: 'Alphabet',  ticker: 'GOOGL', sector: 'hyperscaler', marketCap: 2800, note: '$175–190B capex; TPU via Broadcom' },
  { id: 'AMZN',  name: 'Amazon',    ticker: 'AMZN',  sector: 'hyperscaler', marketCap: 2400, note: '~$200B capex' },
  { id: 'META',  name: 'Meta',      ticker: 'META',  sector: 'hyperscaler', marketCap: 1700, note: '$115–145B capex' },
  { id: 'ORCL',  name: 'Oracle',    ticker: 'ORCL',  sector: 'hyperscaler', marketCap: 430,  note: 'Stargate partner' },

  // ── Compute / chips ───────────────────────────────────────────────
  { id: 'NVDA', name: 'Nvidia',   ticker: 'NVDA', sector: 'chips', marketCap: 4500, note: 'DC rev $75.2B/qtr; the hub' },
  { id: 'AVGO', name: 'Broadcom', ticker: 'AVGO', sector: 'chips', marketCap: 1500, note: 'custom ASICs; Google TPU' },
  { id: 'AMD',  name: 'AMD',      ticker: 'AMD',  sector: 'chips', marketCap: 350,  note: 'MI450; 6 GW OpenAI deal' },
  { id: 'ARM',  name: 'Arm',      ticker: 'ARM',  sector: 'chips', marketCap: 170,  note: 'Stargate tech partner' },
  { id: 'INTC', name: 'Intel',    ticker: 'INTC', sector: 'chips', marketCap: 180,  note: 'Nvidia $5B stake' },
  { id: 'MRVL', name: 'Marvell',  ticker: 'MRVL', sector: 'chips', marketCap: 110,  note: 'custom silicon / optical DSPs' },

  // ── Memory & storage ──────────────────────────────────────────────
  { id: 'SSNLF', name: 'Samsung',  ticker: '005930.KS', sector: 'memory', marketCap: 550, note: '~22% HBM share' },
  { id: 'HXSCL', name: 'SK Hynix', ticker: '000660.KS', sector: 'memory', marketCap: 230, note: '~57% HBM share; HBM4 leader' },
  { id: 'MU',    name: 'Micron',   ticker: 'MU',        sector: 'memory', marketCap: 220, note: '~$22B prepaid; HBM sold out' },
  { id: 'SNDK',  name: 'SanDisk',  ticker: 'SNDK',      sector: 'memory', marketCap: 45,  note: 'NAND/AI storage; ~$42B backlog' },

  // ── Optics / networking ───────────────────────────────────────────
  { id: 'ANET', name: 'Arista',      ticker: 'ANET', sector: 'optics', marketCap: 180, note: '$9B FY25; MSFT ~26%' },
  { id: 'ALAB', name: 'Astera Labs', ticker: 'ALAB', sector: 'optics', marketCap: 40,  note: 'PCIe/CXL retimers' },
  { id: 'COHR', name: 'Coherent',    ticker: 'COHR', sector: 'optics', marketCap: 22,  note: 'transceivers 800G/1.6T' },
  { id: 'CIEN', name: 'Ciena',       ticker: 'CIEN', sector: 'optics', marketCap: 18,  note: 'coherent optics / DCI' },
  { id: 'LITE', name: 'Lumentum',    ticker: 'LITE', sector: 'optics', marketCap: 12,  note: 'laser/EML chips' },
  { id: 'CRDO', name: 'Credo',       ticker: 'CRDO', sector: 'optics', marketCap: 12,  note: 'AECs; Amazon ~86% of a qtr' },
  { id: 'FN',   name: 'Fabrinet',    ticker: 'FN',   sector: 'optics', marketCap: 12,  note: 'builds optics; Nvidia 27.6%' },

  // ── Data center / neocloud / infra ────────────────────────────────
  { id: 'DELL', name: 'Dell',        ticker: 'DELL', sector: 'datacenter', marketCap: 140, note: 'AI servers' },
  { id: 'VRT',  name: 'Vertiv',      ticker: 'VRT',  sector: 'datacenter', marketCap: 117, note: 'thermal/power infra' },
  { id: 'EQIX', name: 'Equinix',     ticker: 'EQIX', sector: 'datacenter', marketCap: 90,  note: 'colocation; Bloom fuel cells' },
  { id: 'NBIS', name: 'Nebius',      ticker: 'NBIS', sector: 'datacenter', marketCap: 61,  note: 'neocloud; Nvidia $2B warrant' },
  { id: 'DLR',  name: 'Digital Realty', ticker: 'DLR', sector: 'datacenter', marketCap: 60, note: 'data-center REIT' },
  { id: 'CRWV', name: 'CoreWeave',   ticker: 'CRWV', sector: 'datacenter', marketCap: 53,  note: 'Nvidia 11.5% + $6.3B backstop' },
  { id: 'SMCI', name: 'Super Micro', ticker: 'SMCI', sector: 'datacenter', marketCap: 17,  note: 'AI servers' },

  // ── Power / energy ────────────────────────────────────────────────
  { id: 'GEV', name: 'GE Vernova',   ticker: 'GEV', sector: 'power', marketCap: 180, note: 'gas turbines / grid' },
  { id: 'ETN', name: 'Eaton',        ticker: 'ETN', sector: 'power', marketCap: 140, note: 'electrical gear for DCs' },
  { id: 'CEG', name: 'Constellation', ticker: 'CEG', sector: 'power', marketCap: 100, note: 'nuclear; MSFT Crane restart' },
  { id: 'VST', name: 'Vistra',       ticker: 'VST', sector: 'power', marketCap: 60,  note: 'nuclear+gas; KKR/Nvidia >$10B' },
  { id: 'BE',  name: 'Bloom Energy', ticker: 'BE',  sector: 'power', marketCap: 25,  note: 'SOFC fuel cells; Oracle 2.8 GW' },
  { id: 'TLN', name: 'Talen',        ticker: 'TLN', sector: 'power', marketCap: 20,  note: 'nuclear; Amazon $18B PPA' },
  { id: 'OKLO', name: 'Oklo',        ticker: 'OKLO', sector: 'power', marketCap: 20, note: 'SMR; Meta 1.2 GW' },

  // ── Foundry / equipment ───────────────────────────────────────────
  { id: 'TSM',  name: 'TSMC',             ticker: 'TSM',  sector: 'foundry', marketCap: 1400, note: '2026 capex $52–56B; ~60% CoWoS to Nvidia' },
  { id: 'ASML', name: 'ASML',             ticker: 'ASML', sector: 'foundry', marketCap: 400,  note: 'EUV; WFE leader' },
  { id: 'AMAT', name: 'Applied Materials', ticker: 'AMAT', sector: 'foundry', marketCap: 180, note: 'WFE' },
  { id: 'LRCX', name: 'Lam Research',     ticker: 'LRCX', sector: 'foundry', marketCap: 130,  note: 'WFE' },
  { id: 'KLAC', name: 'KLA',              ticker: 'KLAC', sector: 'foundry', marketCap: 130,  note: 'process control' },
]
