# AI Capital-Flow — Master Dataset (build-ready)

Consolidated from the deep-research salvage + five targeted gap-fills. This is the **source of
truth** for the visualization's `nodes` and `edges`. Current as of **mid-2026**.

> **Data posture — read this.** This is a **design showcase**, not an investment tool. Figures
> are *directionally accurate / illustrative*. Several mid-2026 scraped **market caps were
> implausible** (Micron $1.28T, Samsung $1.45T, SK Hynix $1.24T, Intel $644B, SanDisk $309B,
> Dell $246B) and have been **sanity-checked down** to credible values for node sizing —
> flagged ⚠ below. Deal/flow magnitudes are mostly real announced figures and kept as-is.
> Add a small "illustrative — not investment advice" disclaimer in the UI footer.

---

## NODES

`size` = market cap in $B used for node radius (sqrt scale). `tier` is a fallback bucket if we
prefer tiered sizing over raw caps. Sectors drive color + cluster.

### ◎ AI labs (private) — the "spark" (size = valuation)
| Name | Ticker | size $B | Key figure |
|---|---|---|---|
| OpenAI | (private) | 850 | ~$25B ARR; **>$1.4T** vendor commitments; centerpiece demand |
| Anthropic | (private) | 400 ⚠(reported $965B) | ~$47B ARR run-rate; IPO filing reported |
| xAI | (private) | 250 | merged w/ SpaceX; ~$0.4B ARR; Colossus 2 buildout |

### ★ Hyperscalers / end-demand (core)
| Name | Ticker | size $B | 2026 capex / note |
|---|---|---|---|
| Microsoft | MSFT | 3800 | ~$190B FY26 capex; 27% of OpenAI |
| Alphabet | GOOGL | 2800 | $175–190B capex; TPU silicon via Broadcom |
| Amazon | AMZN | 2400 | ~$200B capex; AWS |
| Meta | META | 1700 | $115–145B capex |
| Oracle | ORCL | 430 | Stargate partner; Bloom + SMR buyer |

> Big-4 combined 2026 capex **~$700–725B, +77% YoY** [VERIFIED].

### ● Compute / chips
| Name | Ticker | size $B | Key figure |
|---|---|---|---|
| Nvidia | NVDA | 4500 ⚠(reported >$5T) | DC rev **$75.2B/qtr** (+92% YoY); the gravitational hub |
| Broadcom | AVGO | 1500 | ~$12B AI rev; custom ASICs (Google TPU ~$8B/yr) |
| AMD | AMD | 350 | MI450; 6 GW OpenAI deal |
| Arm | ARM | 170 | Stargate tech partner |
| Intel | INTC | 180 ⚠(reported $644B) | Nvidia $5B stake; custom x86 for Nvidia |
| Marvell | MRVL | 110 | custom silicon / optical DSPs |

### ● Memory & storage
| Name | Ticker | size $B | Key figure |
|---|---|---|---|
| Samsung | 005930.KS | 550 ⚠(reported $1.45T) | ~22% HBM share |
| SK Hynix | 000660.KS | 230 ⚠(reported $1.24T) | ~57% HBM share; ~$28B/yr HBM; HBM4 leader |
| Micron | MU | 220 ⚠(reported $1.28T) | ~21% HBM; ~$22B prepaid; 2026 HBM sold out |
| SanDisk | SNDK | 45 ⚠(reported $309B) | NAND/AI storage; ~$42B multi-year backlog |

### ● Optics / networking
| Name | Ticker | size $B | Key figure |
|---|---|---|---|
| Arista | ANET | 180 | $9B FY25; MSFT ~26%; $3.5B AI-fabric target |
| Astera Labs | ALAB | 40 | PCIe/CXL retimers, scale-up fabric |
| Coherent | COHR | 22 | transceivers; networking seg $3.4B (+49%) |
| Ciena | CIEN | 18 | coherent optics / DCI |
| Lumentum | LITE | 12 | laser/EML chips; cloud +67% YoY |
| Credo | CRDO | 12 | AECs ~$1.3B (Amazon ~86% of a qtr) |
| Fabrinet | FN | 12 | builds optics; Nvidia 27.6% of rev |

### ● Data center / neocloud / infra
| Name | Ticker | size $B | Key figure |
|---|---|---|---|
| Dell | DELL | 140 ⚠(reported $246B) | AI servers |
| Vertiv | VRT | 117 | thermal/power infra (+177% YoY) |
| Equinix | EQIX | 90 | colocation; Bloom fuel cells 19 sites |
| Nebius | NBIS | 61 | neocloud; Nvidia $2B warrant; MSFT $17B/$19.4B deal |
| Digital Realty | DLR | 60 | data-center REIT |
| CoreWeave | CRWV | 53 | neocloud centerpiece; Nvidia 11.5% + $6.3B backstop |
| Super Micro | SMCI | 17 | AI servers |

### ● Power / energy
| Name | Ticker | size $B | Key figure |
|---|---|---|---|
| GE Vernova | GEV | 180 | gas turbines / grid; DC backlog |
| Eaton | ETN | 140 | electrical gear for DCs |
| Constellation | CEG | 100 | nuclear; MSFT Crane restart; Calpine M&A |
| Vistra | VST | 60 | nuclear+gas; KKR/Nvidia >$10B |
| Bloom Energy | BE | 25 | SOFC fuel cells; Oracle 2.8 GW |
| Talen | TLN | 20 | nuclear; Amazon $18B PPA |
| Oklo | OKLO | 20 | SMR developer; Meta 1.2 GW, Switch 12 GW LOI |

### ● Foundry / equipment
| Name | Ticker | size $B | Key figure |
|---|---|---|---|
| TSMC | TSM | 1400 | 2025 rev $122.5B; 2026 capex $52–56B; Nvidia ~60% CoWoS |
| ASML | ASML | 400 | EUV; WFE leader |
| Applied Materials | AMAT | 180 | WFE |
| Lam Research | LRCX | 130 | WFE |
| KLA | KLAC | 130 | process control |

---

## EDGES (directional capital flows)

`w` = visual weight 1–5 (particle density / ribbon thickness). Direction = arrow money flows.
Loop edges flagged 🔁.

### Group 1 — Circular financing loops (HERO)
| From | To | Magnitude | Type | w | Conf | Note |
|---|---|---|---|---|---|---|
| Nvidia | OpenAI | up to **$100B** (→~$30B in Feb'26 round) | equity 🔁 | 5 | Med | announced/LOI, renegotiated — render as intent |
| OpenAI | Nvidia | ≥10 GW systems (millions of GPUs) | chip purchase 🔁 | 5 | High | return leg of the loop |
| OpenAI | AMD | 6 GW Instinct (~$90B) | chip purchase 🔁 | 4 | High | |
| AMD | OpenAI | warrant **160M shares (~10%)** | equity 🔁 | 4 | High | "AMD stock pays for OpenAI's chips" |
| Nvidia | CoreWeave | **11.5%** stake + **$6.3B** capacity backstop | equity+offtake 🔁 | 4 | High | |
| CoreWeave | Nvidia | GPU purchases | chip purchase 🔁 | 3 | High | |
| Nvidia | xAI | **$2B** equity (in $20B Series E) | equity 🔁 | 3 | High | GPU-buying SPV (Colossus 2) |
| Nvidia | Intel | **$5B** (~4%) | equity | 3 | High | funded Dec'25; custom x86 for Nvidia |
| Nvidia | Nebius | **$2B** warrant (~7.7%) | equity 🔁 | 3 | High | |
| Nvidia | Nokia | **$1B** (~2.9%) | equity | 2 | High | AI-RAN |

### Group 2 — Compute / cloud contracts (demand backbone)
| From | To | Magnitude | Type | w | Conf | Note |
|---|---|---|---|---|---|---|
| OpenAI | Microsoft | **~$250B** Azure (thru 2032) | compute contract | 5 | Med | |
| OpenAI | Oracle | **~$300B** / ~4.5 GW (Stargate) | compute contract | 5 | High(GW) | $ from blog |
| OpenAI | Broadcom | **~$350B** (custom accelerators) | chip/compute | 5 | Med | largest single vendor commitment |
| OpenAI | Amazon | **$38B**, 7-yr | compute contract | 3 | Med | |
| OpenAI | CoreWeave | **~$22B** | compute contract | 3 | Low | |
| Microsoft | Nebius | **$17–19.4B** multiyear | compute contract | 3 | Med | |
| Anthropic | Amazon | AWS compute (Trainium/Rainier) | compute contract | 3 | Med | tied to Amazon's $25B equity |
| Anthropic | Google | TPU compute (1 GW+) | compute contract | 3 | Med | |

### Group 3 — Hyperscaler/investor → AI-lab equity (funding side)
| From | To | Magnitude | Type | w | Conf | Note |
|---|---|---|---|---|---|---|
| Microsoft | OpenAI | **27%** stake (~$13B in, ~$135B value) | equity 🔁 | 5 | High | |
| Amazon | Anthropic | **up to $25B** (+~$8B prior) | equity 🔁 | 4 | High | Apr'26 |
| Google | Anthropic | **up to $40B** ($10B cash + $30B) | equity 🔁 | 4 | Med | Apr'26, staged |
| SoftBank/MGX/Oracle/OpenAI | Stargate | **$500B** vehicle | equity | 4 | High | |

### Group 4 — Chips → memory (HBM) & storage
| From | To | Magnitude | Type | w | Conf | Note |
|---|---|---|---|---|---|---|
| Nvidia/AMD | SK Hynix | ~$28B/yr HBM; >2/3 HBM4 | HBM purchase | 4 | Med | leader |
| Nvidia/AMD | Micron | ~$22B prepaid; HBM sold out | HBM purchase | 3 | Med | |
| Nvidia/AMD | Samsung | ~22% HBM share | HBM purchase | 2 | Low | |
| Hyperscalers | SanDisk | ~$42B backlog (NAND/SSD) | storage purchase | 2 | Med | |

### Group 5 — Chips → foundry → equipment
| From | To | Magnitude | Type | w | Conf | Note |
|---|---|---|---|---|---|---|
| Nvidia | TSMC | **~$23B/yr** (~19% of TSMC; ~60% CoWoS) | foundry | 4 | Med | |
| AMD | TSMC | ~11% CoWoS | foundry | 2 | Med | |
| Broadcom | TSMC | ~15% CoWoS | foundry | 2 | Med | |
| Google | Broadcom | **~$8B/yr** TPU silicon | custom ASIC | 3 | Low | |
| TSMC | ASML | majority of $52–56B capex (WFE) | equipment | 3 | Med | split across 4 |
| TSMC | Applied Materials | (WFE) | equipment | 2 | Med | |
| TSMC | Lam Research | (WFE) | equipment | 2 | Med | |
| TSMC | KLA | (WFE) | equipment | 2 | Med | |

### Group 6 — Data center → power (PPAs, nuclear, fuel cells)
| From | To | Magnitude | Type | w | Conf | Note |
|---|---|---|---|---|---|---|
| Amazon | Talen | **~$18B** / 17-yr / 1,920 MW | nuclear PPA | 4 | Med | only hard-$ PPA |
| KKR/Nvidia | Vistra | **>$10B** committed | equity/power | 3 | Med | preferred provider Jun'26 |
| Oracle | Bloom Energy | up to **2.8 GW** SOFC | fuel-cell | 3 | High | $ undisclosed |
| Microsoft | Constellation | 835 MW / 20-yr (Crane restart) | nuclear PPA | 3 | Med | |
| Meta | Constellation | 1,121 MW / 20-yr (Clinton) | nuclear PPA | 2 | Med | |
| Meta | Oklo | 1.2 GW | nuclear (SMR) | 2 | Med | |
| Google | Kairos | 500 MW | nuclear (SMR) | 2 | Med | |
| Amazon/Meta | Vistra | ~3.8 GW | power | 2 | Low | reconfirm |
| Brookfield | Bloom Energy | **$5B** | financing | 2 | Med | |
| Oracle | SMRs (3) | ~1 GW | nuclear (SMR) | 1 | Low | vendor unnamed |

### Group 7 — Chips/networking → optics
| From | To | Magnitude | Type | w | Conf | Note |
|---|---|---|---|---|---|---|
| Nvidia | Fabrinet | 27.6% of $3.42B rev (~$1B+) | transceiver mfg | 3 | High | |
| Nvidia/hyperscalers | Coherent | datacom $3.4B (+49%) | transceivers | 3 | Med | 800G/1.6T |
| Hyperscalers | Arista | $9B (MSFT ~26%) | switching | 3 | Med | |
| Amazon | Credo | ~86% of a quarter | AECs | 2 | Med | |
| Nvidia/hyperscalers | Lumentum | cloud +67% YoY | laser/EML | 2 | Med | |
| Nvidia | Astera Labs | scale-up fabric / retimers | connectivity | 2 | Low | |

---

## CAPITAL LOOPS (the hero narrative)

**Loop A — Nvidia ⇄ OpenAI** (heaviest edge). Nvidia invests up to $100B in OpenAI, released
per-gigawatt; the cash returns as ≥10 GW of GPU purchases. Vendor funds customer who buys
vendor's chips. Render as *announced intent*.

**Loop B — AMD ⇄ OpenAI** (equity-financed chips). OpenAI deploys 6 GW of AMD Instinct (~$90B);
AMD grants OpenAI a 160M-share (~10%) warrant. "AMD's own stock pays for OpenAI's chips."

**Loop C — Stargate triangle.** $500B/10 GW vehicle (SoftBank/MGX/Oracle/OpenAI) → OpenAI
contracts ~4.5 GW from Oracle (~$300B) → Oracle equips with Nvidia racks + buys 2.8 GW Bloom
fuel cells. invest → compute contract → chip purchase → power.

Extended ring worth highlighting on hover: **MSFT/Amazon/Google → labs (equity) → labs →
clouds (compute) → clouds → Nvidia/AMD (chips) → chips → TSMC/HBM/optics/power.** The whole
graph is one big circulatory system; the loops are just the tightest cycles in it.

---

## STILL LOW-CONFIDENCE (don't over-trust)
- Per-buyer HBM **$** edges (only shares + prepayments disclosed).
- TSMC→individual-equipment-vendor dollar splits (not public).
- Most nuclear-PPA **$** values undisclosed (only Amazon–Talen has a hard number).
- CPO/optics dollar flows are run-rates/estimates, not contracts.
- All ⚠ market caps are sanity-checked estimates, not scraped values.
