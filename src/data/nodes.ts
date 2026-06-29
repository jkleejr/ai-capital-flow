import type { RawNode } from './types'

// 44 nodes — see research/MASTER-dataset.md for edge sourcing.
// `marketCap` (public) / `valuation` (private labs) are in US$ billions and
// drive node radius (sqrt scale, graph/sizing.ts).
//
// Values re-audited against current quotes on 2026-06-29 (stockanalysis.com,
// companiesmarketcap.com, Google/Yahoo Finance), cross-checked across two
// independent research passes. IMPORTANT: the 2025-26 AI memory/compute
// supercycle has driven genuinely extreme valuations — these high numbers are
// real, not scraping errors (e.g. SanDisk ~$310B, up ~5,000% YoY; the memory
// cohort is near $1T+). Do NOT "sanity-check" them down. The live /api/sizes
// (Finnhub) feed refreshes US-listed caps when a valid key is configured;
// foreign listings (Samsung, SK Hynix) and the private labs rely on these.
export const NODES: RawNode[] = [
  // ── AI labs (the spark) ───────────────────────────────────────────
  { id: 'openai',    name: 'OpenAI',    sector: 'labs', valuation: 850, note: '~$25B ARR; >$1.4T vendor commitments' },
  { id: 'anthropic', name: 'Anthropic', sector: 'labs', valuation: 965, note: '~$47B ARR run-rate' },
  { id: 'xai',       name: 'xAI',       sector: 'labs', valuation: 230, note: '$20B Series E (~$230B val); Colossus 2 buildout', sources: ['https://x.ai/news/series-e'] },

  // ── Hyperscalers / end-demand (core) ──────────────────────────────
  { id: 'MSFT',  name: 'Microsoft', ticker: 'MSFT',  sector: 'hyperscaler', marketCap: 2770, note: '~$190B FY26 capex; 27% of OpenAI' },
  { id: 'GOOGL', name: 'Alphabet',  ticker: 'GOOGL', sector: 'hyperscaler', marketCap: 4120, note: '$175–190B capex; TPU via Broadcom' },
  { id: 'AMZN',  name: 'Amazon',    ticker: 'AMZN',  sector: 'hyperscaler', marketCap: 2500, note: '~$200B capex' },
  { id: 'META',  name: 'Meta',      ticker: 'META',  sector: 'hyperscaler', marketCap: 1400, note: '$115–145B capex' },
  { id: 'ORCL',  name: 'Oracle',    ticker: 'ORCL',  sector: 'hyperscaler', marketCap: 450,  note: 'Stargate partner' },

  // ── Compute / chips ───────────────────────────────────────────────
  { id: 'NVDA', name: 'Nvidia',   ticker: 'NVDA', sector: 'chips', marketCap: 4660, note: 'DC rev $75.2B/qtr; the hub' },
  { id: 'AVGO', name: 'Broadcom', ticker: 'AVGO', sector: 'chips', marketCap: 1740, note: 'custom ASICs; Google TPU' },
  { id: 'AMD',  name: 'AMD',      ticker: 'AMD',  sector: 'chips', marketCap: 850,  note: 'MI450; 6 GW OpenAI deal' },
  { id: 'ARM',  name: 'Arm',      ticker: 'ARM',  sector: 'chips', marketCap: 370,  note: 'Stargate tech partner' },
  { id: 'INTC', name: 'Intel',    ticker: 'INTC', sector: 'chips', marketCap: 645,  note: 'Nvidia $5B stake' },
  { id: 'MRVL', name: 'Marvell',  ticker: 'MRVL', sector: 'chips', marketCap: 233,  note: 'custom silicon / optical DSPs' },

  // ── Memory & storage ──────────────────────────────────────────────
  { id: 'SSNLF', name: 'Samsung',  ticker: '005930.KS', sector: 'memory', marketCap: 1400, note: '~22% HBM share' },
  { id: 'HXSCL', name: 'SK Hynix', ticker: '000660.KS', sector: 'memory', marketCap: 1220, note: '~57% HBM share; HBM4 leader' },
  { id: 'MU',    name: 'Micron',   ticker: 'MU',        sector: 'memory', marketCap: 1280, note: '~$22B prepaid; HBM sold out' },
  { id: 'SNDK',  name: 'SanDisk',  ticker: 'SNDK',      sector: 'memory', marketCap: 310,  note: 'NAND/AI storage; ~$42B backlog' },

  // ── Optics / networking ───────────────────────────────────────────
  { id: 'ANET', name: 'Arista',      ticker: 'ANET', sector: 'optics', marketCap: 198, note: '$9B FY25; MSFT ~26%' },
  { id: 'ALAB', name: 'Astera Labs', ticker: 'ALAB', sector: 'optics', marketCap: 67,  note: 'PCIe/CXL retimers' },
  { id: 'COHR', name: 'Coherent',    ticker: 'COHR', sector: 'optics', marketCap: 74,  note: 'transceivers 800G/1.6T' },
  { id: 'CIEN', name: 'Ciena',       ticker: 'CIEN', sector: 'optics', marketCap: 68,  note: 'coherent optics / DCI' },
  { id: 'LITE', name: 'Lumentum',    ticker: 'LITE', sector: 'optics', marketCap: 64,  note: 'laser/EML chips' },
  { id: 'CRDO', name: 'Credo',       ticker: 'CRDO', sector: 'optics', marketCap: 44,  note: 'AECs; Amazon ~86% of a qtr' },
  { id: 'FN',   name: 'Fabrinet',    ticker: 'FN',   sector: 'optics', marketCap: 19,  note: 'builds optics; Nvidia 27.6%' },

  // ── Data center / neocloud / infra ────────────────────────────────
  { id: 'DELL', name: 'Dell',        ticker: 'DELL', sector: 'datacenter', marketCap: 280, note: 'AI servers' },
  { id: 'VRT',  name: 'Vertiv',      ticker: 'VRT',  sector: 'datacenter', marketCap: 117, note: 'thermal/power infra' },
  { id: 'EQIX', name: 'Equinix',     ticker: 'EQIX', sector: 'datacenter', marketCap: 105, note: 'colocation; Bloom fuel cells' },
  { id: 'NBIS', name: 'Nebius',      ticker: 'NBIS', sector: 'datacenter', marketCap: 62,  note: 'neocloud; Nvidia $2B warrant' },
  { id: 'DLR',  name: 'Digital Realty', ticker: 'DLR', sector: 'datacenter', marketCap: 67, note: 'data-center REIT' },
  { id: 'CRWV', name: 'CoreWeave',   ticker: 'CRWV', sector: 'datacenter', marketCap: 53,  note: 'Nvidia 11.5% + $6.3B backstop' },
  { id: 'SMCI', name: 'Super Micro', ticker: 'SMCI', sector: 'datacenter', marketCap: 20,  note: 'AI servers' },

  // ── Power / energy ────────────────────────────────────────────────
  { id: 'GEV', name: 'GE Vernova',   ticker: 'GEV', sector: 'power', marketCap: 281, note: 'gas turbines / grid' },
  { id: 'ETN', name: 'Eaton',        ticker: 'ETN', sector: 'power', marketCap: 156, note: 'electrical gear for DCs' },
  { id: 'CEG', name: 'Constellation', ticker: 'CEG', sector: 'power', marketCap: 94, note: 'nuclear; MSFT Crane restart' },
  { id: 'VST', name: 'Vistra',       ticker: 'VST', sector: 'power', marketCap: 56,  note: 'nuclear+gas; KKR/Nvidia >$10B' },
  { id: 'BE',  name: 'Bloom Energy', ticker: 'BE',  sector: 'power', marketCap: 72,  note: 'SOFC fuel cells; Oracle 2.8 GW' },
  { id: 'TLN', name: 'Talen',        ticker: 'TLN', sector: 'power', marketCap: 18,  note: 'nuclear; Amazon $18B PPA' },
  { id: 'OKLO', name: 'Oklo',        ticker: 'OKLO', sector: 'power', marketCap: 9, note: 'SMR; Meta 1.2 GW' },

  // ── Foundry / equipment ───────────────────────────────────────────
  { id: 'TSM',  name: 'TSMC',             ticker: 'TSM',  sector: 'foundry', marketCap: 1930, note: '2026 capex $52–56B; ~60% CoWoS to Nvidia' },
  { id: 'ASML', name: 'ASML',             ticker: 'ASML', sector: 'foundry', marketCap: 693,  note: 'EUV; WFE leader' },
  { id: 'AMAT', name: 'Applied Materials', ticker: 'AMAT', sector: 'foundry', marketCap: 498, note: 'WFE' },
  { id: 'LRCX', name: 'Lam Research',     ticker: 'LRCX', sector: 'foundry', marketCap: 474,  note: 'WFE' },
  { id: 'KLAC', name: 'KLA',              ticker: 'KLAC', sector: 'foundry', marketCap: 325,  note: 'process control' },
]
