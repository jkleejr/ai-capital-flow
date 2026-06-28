import type { RawEdge } from './types'

// Directional capital flows. `from` pays/funds/invests in `to`.
// `w` = visual weight 1-5. `loop` marks circular-financing edges (the hero story).
// `usd` = dollar magnitude in $B; `basis` = 'deal' (announced total/commitment) or
// 'annual' (run-rate); `approx` = rough illustrative estimate (not a sourced figure).
// Derived from research/MASTER-dataset.md. Estimates are flagged so the UI can mark them.
export const EDGES: RawEdge[] = [
  // ── Group 1: circular-financing loops (HERO) ──────────────────────
  { from: 'NVDA', to: 'openai', w: 5, type: 'equity', loop: true, usd: 100, basis: 'deal', label: 'equity (up to $100B)' },
  { from: 'openai', to: 'NVDA', w: 5, type: 'chip',   loop: true, usd: 110, basis: 'deal', approx: true, label: '≥10 GW systems' },
  { from: 'openai', to: 'AMD',  w: 4, type: 'chip',   loop: true, usd: 90,  basis: 'deal', label: '6 GW Instinct' },
  { from: 'AMD', to: 'openai',  w: 4, type: 'equity', loop: true, usd: 35,  basis: 'deal', approx: true, label: '160M-share warrant' },
  { from: 'NVDA', to: 'CRWV',   w: 4, type: 'equity', loop: true, usd: 6.3, basis: 'deal', label: '11.5% stake + backstop' },
  { from: 'CRWV', to: 'NVDA',   w: 3, type: 'chip',   loop: true, usd: 15,  basis: 'annual', approx: true, label: 'GPU purchases' },
  { from: 'NVDA', to: 'xai',    w: 3, type: 'equity', loop: true, usd: 2,   basis: 'deal', label: 'Series E equity' },
  { from: 'NVDA', to: 'NBIS',   w: 3, type: 'equity', loop: true, usd: 2,   basis: 'deal', label: 'warrant (~7.7%)' },
  { from: 'NVDA', to: 'INTC',   w: 3, type: 'equity', usd: 5, basis: 'deal', label: '~4% stake' },

  // ── Group 2: compute / cloud contracts ────────────────────────────
  { from: 'openai', to: 'MSFT', w: 5, type: 'compute', usd: 250, basis: 'deal', label: 'Azure (to 2032)' },
  { from: 'openai', to: 'ORCL', w: 5, type: 'compute', usd: 300, basis: 'deal', label: 'Stargate' },
  { from: 'openai', to: 'AVGO', w: 5, type: 'asic',    usd: 350, basis: 'deal', label: 'custom accelerators' },
  { from: 'openai', to: 'AMZN', w: 3, type: 'compute', usd: 38,  basis: 'deal', label: '7-year AWS' },
  { from: 'openai', to: 'CRWV', w: 3, type: 'compute', usd: 22,  basis: 'deal', label: 'compute capacity' },
  { from: 'MSFT',   to: 'NBIS', w: 3, type: 'compute', usd: 18,  basis: 'deal', label: 'multiyear' },
  { from: 'anthropic', to: 'AMZN', w: 3, type: 'compute', usd: 30, basis: 'deal', approx: true, label: 'Trainium / Rainier' },
  { from: 'anthropic', to: 'GOOGL', w: 3, type: 'compute', usd: 20, basis: 'deal', approx: true, label: 'TPU 1GW+' },

  // ── Group 3: hyperscaler/investor → AI-lab equity ─────────────────
  { from: 'MSFT', to: 'openai',    w: 5, type: 'equity', loop: true, usd: 13, basis: 'deal', label: '27% stake' },
  { from: 'AMZN', to: 'anthropic', w: 4, type: 'equity', loop: true, usd: 25, basis: 'deal', label: 'up to $25B' },
  { from: 'GOOGL', to: 'anthropic', w: 4, type: 'equity', loop: true, usd: 40, basis: 'deal', label: 'up to $40B' },

  // ── Hyperscaler → chips (the biggest real GPU/ASIC purchases) ─────
  { from: 'MSFT', to: 'NVDA', w: 4, type: 'chip', usd: 40, basis: 'annual', approx: true, label: 'GPU capex' },
  { from: 'META', to: 'NVDA', w: 4, type: 'chip', usd: 35, basis: 'annual', approx: true, label: 'GPU capex' },
  { from: 'GOOGL', to: 'NVDA', w: 3, type: 'chip', usd: 15, basis: 'annual', approx: true, label: 'GPU capex' },
  { from: 'AMZN', to: 'NVDA', w: 3, type: 'chip', usd: 20, basis: 'annual', approx: true, label: 'GPU capex' },
  { from: 'ORCL', to: 'NVDA', w: 3, type: 'chip', usd: 15, basis: 'annual', approx: true, label: 'GPU capex' },
  { from: 'GOOGL', to: 'AVGO', w: 3, type: 'asic', usd: 8, basis: 'annual', label: 'TPU silicon' },
  { from: 'META', to: 'AVGO', w: 2, type: 'asic', usd: 5, basis: 'annual', approx: true, label: 'custom ASIC' },

  // ── Group 4: chips → memory (HBM) & storage ───────────────────────
  { from: 'NVDA', to: 'HXSCL', w: 4, type: 'hbm', usd: 28, basis: 'annual', label: '>2/3 of HBM4' },
  { from: 'NVDA', to: 'MU',    w: 3, type: 'hbm', usd: 22, basis: 'deal', label: 'prepaid' },
  { from: 'NVDA', to: 'SSNLF', w: 2, type: 'hbm', usd: 8,  basis: 'annual', approx: true, label: 'HBM (~22% share)' },
  { from: 'AMD',  to: 'HXSCL', w: 2, type: 'hbm', usd: 4,  basis: 'annual', approx: true, label: 'HBM' },
  { from: 'AMZN', to: 'SNDK',  w: 2, type: 'storage', usd: 42, basis: 'deal', label: 'NAND/SSD backlog' },

  // ── Group 5: chips → foundry → equipment ──────────────────────────
  { from: 'NVDA', to: 'TSM', w: 4, type: 'foundry', usd: 23, basis: 'annual', label: '~60% of CoWoS' },
  { from: 'AMD',  to: 'TSM', w: 2, type: 'foundry', usd: 4,  basis: 'annual', approx: true, label: '~11% CoWoS' },
  { from: 'AVGO', to: 'TSM', w: 2, type: 'foundry', usd: 5,  basis: 'annual', approx: true, label: '~15% CoWoS' },
  { from: 'TSM', to: 'ASML', w: 3, type: 'equipment', usd: 15, basis: 'annual', approx: true, label: 'EUV lithography' },
  { from: 'TSM', to: 'AMAT', w: 2, type: 'equipment', usd: 8,  basis: 'annual', approx: true, label: 'deposition/etch' },
  { from: 'TSM', to: 'LRCX', w: 2, type: 'equipment', usd: 6,  basis: 'annual', approx: true, label: 'etch/clean' },
  { from: 'TSM', to: 'KLAC', w: 2, type: 'equipment', usd: 4,  basis: 'annual', approx: true, label: 'process control' },

  // ── Group 6: data center → power (PPAs, nuclear, fuel cells) ───────
  { from: 'AMZN', to: 'TLN', w: 4, type: 'power', usd: 18, basis: 'deal', label: '1,920 MW nuclear' },
  { from: 'NVDA', to: 'VST', w: 3, type: 'power', usd: 10, basis: 'deal', label: 'KKR/Nvidia capital' },
  { from: 'ORCL', to: 'BE',  w: 3, type: 'fuelcell', usd: 9, basis: 'deal', approx: true, label: 'up to 2.8 GW SOFC' },
  { from: 'MSFT', to: 'CEG', w: 3, type: 'power', usd: 16, basis: 'deal', approx: true, label: '835 MW Crane' },
  { from: 'META', to: 'CEG', w: 2, type: 'power', usd: 20, basis: 'deal', approx: true, label: '1,121 MW Clinton' },
  { from: 'META', to: 'OKLO', w: 2, type: 'power', usd: 5, basis: 'deal', approx: true, label: '1.2 GW SMR' },
  { from: 'AMZN', to: 'VST', w: 2, type: 'power', usd: 5, basis: 'deal', approx: true, label: 'nuclear' },
  { from: 'EQIX', to: 'BE',  w: 2, type: 'fuelcell', usd: 1, basis: 'deal', approx: true, label: '19 sites' },
  { from: 'CRWV', to: 'VST', w: 2, type: 'power', usd: 2, basis: 'annual', approx: true, label: 'power load' },
  { from: 'EQIX', to: 'CEG', w: 1, type: 'power', usd: 1, basis: 'annual', approx: true, label: 'power load' },

  // ── Group 7: chips/networking → optics ────────────────────────────
  { from: 'NVDA', to: 'FN',   w: 3, type: 'optics', usd: 1,   basis: 'annual', label: '27.6% of revenue' },
  { from: 'NVDA', to: 'COHR', w: 3, type: 'optics', usd: 2,   basis: 'annual', approx: true, label: 'transceivers' },
  { from: 'MSFT', to: 'ANET', w: 3, type: 'optics', usd: 2.3, basis: 'annual', approx: true, label: 'switching' },
  { from: 'AMZN', to: 'CRDO', w: 2, type: 'optics', usd: 1.1, basis: 'annual', approx: true, label: 'active cables' },
  { from: 'NVDA', to: 'LITE', w: 2, type: 'optics', usd: 1,   basis: 'annual', approx: true, label: 'laser / EML' },
  { from: 'NVDA', to: 'ALAB', w: 2, type: 'optics', usd: 0.8, basis: 'annual', approx: true, label: 'scale-up fabric' },
  { from: 'META', to: 'ANET', w: 2, type: 'optics', usd: 1.5, basis: 'annual', approx: true, label: 'switching' },
  { from: 'COHR', to: 'CIEN', w: 1, type: 'optics', usd: 0.3, basis: 'annual', approx: true, label: 'coherent optics' },

  // ── Data-center infra (servers, cooling) ──────────────────────────
  { from: 'MSFT', to: 'CRWV', w: 3, type: 'infra', usd: 10, basis: 'deal', approx: true, label: 'capacity' },
  { from: 'MSFT', to: 'VRT',  w: 2, type: 'infra', usd: 3,  basis: 'annual', approx: true, label: 'cooling / power' },
  { from: 'META', to: 'VRT',  w: 2, type: 'infra', usd: 3,  basis: 'annual', approx: true, label: 'cooling / power' },
  { from: 'CRWV', to: 'DELL', w: 2, type: 'infra', usd: 5,  basis: 'annual', approx: true, label: 'servers' },
  { from: 'CRWV', to: 'SMCI', w: 2, type: 'infra', usd: 4,  basis: 'annual', approx: true, label: 'servers' },

  // ── Second-tier flows (CPU IP, custom silicon, REITs, grid gear) ──
  { from: 'NVDA', to: 'ARM',  w: 2, type: 'asic', usd: 0.5, basis: 'annual', approx: true, label: 'Grace CPU / Arm IP' },
  { from: 'AMZN', to: 'ARM',  w: 2, type: 'asic', usd: 0.4, basis: 'annual', approx: true, label: 'Graviton royalties' },
  { from: 'AMZN', to: 'MRVL', w: 3, type: 'asic', usd: 3,   basis: 'annual', approx: true, label: 'custom silicon' },
  { from: 'MRVL', to: 'TSM',  w: 2, type: 'foundry', usd: 2, basis: 'annual', approx: true, label: 'wafers' },
  { from: 'MSFT', to: 'DLR',  w: 2, type: 'infra', usd: 2, basis: 'annual', approx: true, label: 'colocation' },
  { from: 'ORCL', to: 'DLR',  w: 1, type: 'infra', usd: 1, basis: 'annual', approx: true, label: 'colocation' },
  { from: 'VST',  to: 'GEV',  w: 2, type: 'power', usd: 2, basis: 'deal', approx: true, label: 'gas turbines' },
  { from: 'CEG',  to: 'GEV',  w: 1, type: 'power', usd: 1, basis: 'deal', approx: true, label: 'grid equipment' },
  { from: 'MSFT', to: 'ETN',  w: 2, type: 'infra', usd: 2, basis: 'annual', approx: true, label: 'electrical gear' },
  { from: 'AMZN', to: 'ETN',  w: 2, type: 'infra', usd: 2, basis: 'annual', approx: true, label: 'electrical gear' },
]
