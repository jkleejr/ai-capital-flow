# AI Buildout Capital-Flow Dataset (current as of mid-2026)

Reconstructed from the deep-research workflow transcripts (`wf_810d4530-476`) after the
synthesis step crashed on a JSON-schema error. The directional flow visualization needs
**nodes** (sized by market cap / key figure) and **directional, dollar-weighted edges**
(who funds/pays whom).

**Provenance & confidence convention**

- **[VERIFIED]** = survived the workflow's 3-vote adversarial verification (one of the 24
  confirmed claims that reached synthesis). Primarily primary-source backed.
- **[unverified]** = recovered from the Fetch/Search phase (Source Extractor or Web Searcher
  output) but **did not appear in the final verified set**. Source quality noted inline
  (primary / secondary / blog). Use with caution; not invented — every figure here traces to
  a transcript.
- One claim was **REFUTED** (0-3): "Meta 2026 capex as high as $135B" as a hard point figure —
  use the $115–145B guidance range instead.

Most marquee figures are **announced deal totals** or **forward guidance**, NOT realized
cash already moved. The NVIDIA $100B and Stargate $500B are explicitly "intends to invest
up to" / LOIs deployed progressively — weight edges by announced totals, not deployed cash.

---

## 1. NODES (by sector)

Market caps were only captured for a handful of nodes in the transcripts (the verified claim
set contained none; a "node-sizing" search ran late and covered only some names). Missing
market caps are flagged `— not captured —` rather than invented. Tickers added for clarity.

### AI labs (private)

| Name | Ticker | Valuation | Key figure | Notes |
|---|---|---|---|---|
| OpenAI | (private) | ~$852B post-money [unverified, secondary/blog] | ~$25B annualized revenue run-rate (Feb 28, 2026) **[VERIFIED]**; >$1.4T announced compute deals **[VERIFIED]** | $122B funding round; reportedly projecting ~$14B loss in 2026 [unverified, blog]. Centerpiece demand node. |
| Anthropic | (private) | ~$965B (Series H, ~$65B raised) [unverified, secondary] | ~$47B annualized revenue run-rate (May 15, 2026) **[VERIFIED]** | Valuation nearly tripled prior $380B (Feb 2026); IPO filing reported June 1, 2026 [unverified]. |
| xAI | (private) | ~$250B implied; merged into SpaceX Feb 2026 at combined $1.25T [unverified, blog] | ~$428M annualized revenue (Q3 2025, from $107M quarterly) **[VERIFIED]** | Smallest revenue of the three labs. |

### Hyperscalers / end-demand

| Name | Ticker | Market cap | Key figure (2026 capex) | Notes |
|---|---|---|---|---|
| Microsoft | MSFT | — not captured — | ~$190B (FY26 plan); also cited ~$120B+ on an alt basis [unverified] | Part of the ~$700–725B Big-4 total **[VERIFIED]**. |
| Alphabet / Google | GOOGL | — not captured — | $175–190B [unverified] | ~$8B/yr to Broadcom on TPU silicon [unverified]. |
| Amazon | AMZN | — not captured — | ~$200B [unverified] | FCF projected to turn negative 2026 on AI build-out [unverified]. |
| Meta | META | — not captured — | $115–145B range [unverified] (hard "$135B" point figure **REFUTED 0-3**) | |
| Oracle | ORCL | — not captured — | ~$50B [unverified] | Stargate buildout partner; Bloom fuel-cell + SMR buyer. |

> Combined Big-4 (Alphabet, Microsoft, Meta, Amazon) 2026 capex **~$700–725B, +77% YoY vs ~$410B in 2025 [VERIFIED]**. Per CreditSights ~75% (~$450B) is AI-related [unverified, blog].

### Compute / chips

| Name | Ticker | Market cap | Key figure | Notes |
|---|---|---|---|---|
| Nvidia | NVDA | >$5T (world's most valuable company) [unverified, secondary] | Q1 FY2027 (qtr ended Apr 26, 2026): total rev **$81.6B (+85% YoY)**, **Data Center rev $75.2B (+92% YoY)**; Q2 guide **~$91.0B** **[VERIFIED]** | DC compute $60.4B + networking $14.8B; ~80–90% AI-accelerator share [unverified]. Zero China DC compute assumed. |
| AMD | AMD | — not captured — | DC revenue ~$10B 2025E [unverified] | MI450 series; 6GW OpenAI deal. |
| Broadcom | AVGO | — not captured — | ~$12B AI revenue FY2025; ~60% custom-ASIC share [unverified] | Google TPU silicon ~$8B/yr. |
| Marvell | MRVL | — not captured — | ~$2B custom silicon 2025E; ~35% ASIC co-design share [unverified] | |
| Arm | ARM | — not captured — | — | Stargate "key initial technology partner" **[VERIFIED]**. |
| Intel | INTC | — not captured — | — | Rumored Nvidia $5B stake NOT confirmed in transcripts (see Gaps). |

### Memory & storage

| Name | Ticker | Market cap | Key figure | Notes |
|---|---|---|---|---|
| Micron | MU | — not captured — | ~21% HBM share Q4 2025; Q2 FY2026 rev $23.86B @ 74.9% GM [unverified, blog] | |
| SK Hynix | 000660.KS | — not captured — | ~57% HBM revenue share Q4 2025; secured >2/3 of HBM4 orders for Nvidia Vera Rubin [unverified, blog] | HBM market leader. |
| Samsung | 005930.KS | — not captured — | ~22% HBM share Q4 2025 [unverified, blog] | |
| SanDisk | SNDK | — not captured — | — not captured — | NAND/AI-storage role requested but no figure recovered (see Gaps). |

> HBM market projected ~$35B (2025) → ~$58B (2026), potentially $100B by 2028 [unverified, blog].

### Optics / networking

| Name | Ticker | Market cap | Key figure | Notes |
|---|---|---|---|---|
| Arista | ANET | — not captured — | — | No verified figure recovered. |
| Coherent | COHR | — not captured — | — | No verified figure recovered. |
| Lumentum | LITE | — not captured — | — | No verified figure recovered. |
| Credo | CRDO | — not captured — | — | No verified figure recovered. |
| Astera Labs | ALAB | — not captured — | — | No verified figure recovered. |
| Ciena | CIEN | — not captured — | — | No verified figure recovered. |

> Optics/networking layer is essentially unsourced in the transcripts (see Gaps). The only
> related verified datum: Nvidia Data Center **networking** revenue $14.8B in Q1 FY27 (+199% YoY).

### Data center / neocloud / infra

| Name | Ticker | Market cap | Key figure | Notes |
|---|---|---|---|---|
| CoreWeave | CRWV | ~$52.7B (June 26, 2026) [unverified, secondary] | TTM revenue $6.23B; net income −$1.59B; levered FCF −$8.56B [unverified] | $96.58/share. Neocloud centerpiece. |
| Nebius | NBIS | ~$61B (June 26, 2026) [unverified, secondary] | TTM revenue $877.9M [unverified] | Strategic alliance with Nvidia; Microsoft $17B multiyear compute deal [unverified]. |
| Equinix | EQIX | — not captured — | — | Bloom fuel cells across 19 data centers >100MW [unverified]. |
| Digital Realty | DLR | — not captured — | — | No figure recovered. |
| Vertiv | VRT | ~$116.75B (June 26, 2026) [unverified, secondary] | +177% in one year [unverified] | Thermal/power infra. |
| Super Micro | SMCI | ~$17B [unverified, secondary] | — | |
| Dell | DELL | ~$246B [unverified, secondary] | — | |

### Power / energy

| Name | Ticker | Market cap | Key figure | Notes |
|---|---|---|---|---|
| Constellation | CEG | — not captured — | Three Mile Island Unit 1 restart, 837MW 100% to Microsoft; $1.6B restart, online ~2028 [unverified, secondary] | Renamed Crane Clean Energy Center. |
| Vistra | VST | — not captured — | — | No figure recovered. |
| GE Vernova | GEV | — not captured — | — | No figure recovered. |
| Talen | TLN | — not captured — | 17-yr ~$18B PPA w/ Amazon, up to 1,920MW from 2.5GW Susquehanna nuclear; up to $1.4B/yr at full volume [unverified, secondary] | |
| Oklo | OKLO | — not captured — | — | SMR developer (category). |
| Eaton | ETN | — not captured — | — | No figure recovered. |
| Bloom Energy | BE | — not captured — | Oracle master agreement up to 2.8GW SOFC (1.2GW contracted) **[VERIFIED]**; Brookfield $5B deployment [unverified]; AEP up to 1GW; Equinix 19 sites [unverified] | Stock rose ~31% on Oracle news. |

### Foundry / equipment

| Name | Ticker | Market cap | Key figure | Notes |
|---|---|---|---|---|
| TSMC | TSM | — not captured — | 2025 revenue $122.5B (+36% YoY); 2026 capex budget $52–56B; ~70% foundry share, ~90% leading-edge; CoWoS booked through mid-2027 [unverified, blog] | Nvidia ~60% of CoWoS allocation, AMD ~11% [unverified]. |
| ASML | ASML | — not captured — | — | Part of $133B 2025 equipment market (+13.7%), $145B forecast 2026 [unverified, blog]. |
| Applied Materials | AMAT | — not captured — | — | (same equipment-market aggregate) |
| Lam Research | LRCX | — not captured — | — | (same equipment-market aggregate) |
| KLA | KLAC | — not captured — | — | (same equipment-market aggregate) |

---

## 2. EDGES (directional capital flows)

Direction = arrow of money/funding. "Basis": **deal-total** (announced multi-year total),
**run-rate** (annualized), **estimate**. Sorted heaviest-first within each priority group.

### Group 1 — Circular financing loops (centerpiece)

| From | To | Direction | Magnitude | Type | Basis | Confidence | Source |
|---|---|---|---|---|---|---|---|
| Nvidia | OpenAI | Nvidia invests in OpenAI | up to **$100B** | equity investment (LOI, progressive per GW) | deal-total | High **[VERIFIED]** | nvidianews.nvidia.com/news/openai-and-nvidia-announce-strategic-partnership-to-deploy-10gw-of-nvidia-systems |
| OpenAI | Nvidia | OpenAI buys chips | ≥10 GW of systems (millions of GPUs); first GW H2 2026 (Vera Rubin) | chip purchase (return leg) | deal-total | High **[VERIFIED]** | (same NVIDIA release) |
| OpenAI | AMD | OpenAI buys chips | 6 GW Instinct, "tens of billions" (vendor breakdown ~$90B) | chip purchase | deal-total | High **[VERIFIED]** (warrant); magnitude $90B [unverified, blog] | ir.amd.com/news-events/press-releases/detail/1260/... |
| AMD | OpenAI | AMD grants equity to OpenAI | warrant for up to **160M AMD shares** (~10%, ex. ~$0.01) | equity warrant (vendor financing) | deal-total | High **[VERIFIED]** | ir.amd.com/.../detail/1260 ; techcrunch.com/2025/10/07/wall-street-analysts-explain-how-amds-own-stock-will-pay-for-openais-billions-in-chip-purchases |
| (aggregate) | AI supply chain | circular financing arrangements | **>$800B** across ecosystem | mixed vendor-financing | estimate | Low [unverified, blog] | blockeden.xyz/blog/2026/03/06/ai-circular-financing-loop-vendor-financing ; alatirok.com/ai-circular-financing-explained |
| Nvidia / SoftBank | OpenAI | equity (Feb 2026 round) | $30B (Nvidia) + $30B (SoftBank) of a $110B round | equity investment | deal-total | Low [unverified, blog] | blockeden.xyz/... (single blog; treat with caution) |

> **Status flag (centerpiece edge):** Nvidia's $100B OpenAI investment was, as of Jan–Feb 2026,
> an **announced LOI not yet signed/funded**, reportedly being renegotiated downward — see
> techcrunch.com/2026/01/31/nvidia-ceo-pushes-back-against-report-that-his-companys-100b-openai-investment-has-stalled. Weight as announced intent, not deployed cash.

### Group 2 — Compute / cloud contracts

| From | To | Direction | Magnitude | Type | Basis | Confidence | Source |
|---|---|---|---|---|---|---|---|
| OpenAI | Oracle (Stargate) | OpenAI contracts compute | up to **4.5 GW additional** (>5 GW & >2M chips total); ~$300B over ~5 yrs (~$60B/yr) | multi-year compute contract | deal-total | High **[VERIFIED]** for GW/chips; ~$300B [unverified, blog] | openai.com/index/stargate-advances-with-partnership-with-oracle |
| OpenAI | Microsoft (Azure) | OpenAI contracts compute | **~$250B** Azure commitment through 2032 | multi-year compute contract | deal-total | Medium [unverified, secondary] | venturebeat.com/technology/microsoft-and-openai-gut-their-exclusive-deal-freeing-openai-to-sell-on-aws-and-google-cloud |
| OpenAI | Amazon (AWS) | OpenAI contracts compute | **$38B**, 7-year (GB200/GB300 GPUs) | multi-year compute contract | deal-total | Medium [unverified, secondary] | tech-insider.org/openai-amazon-bedrock-38-billion-azure-exclusivity-end-2026 |
| OpenAI | CoreWeave | OpenAI contracts compute | **~$22B** | multi-year compute contract | deal-total | Low [unverified, blog] | blockeden.xyz/... (vendor breakdown) |
| Microsoft | Nebius | Microsoft contracts compute | **$17B** multiyear | compute contract | deal-total | Medium [unverified, secondary] | finance.yahoo.com/quote/NBIS |

> **OpenAI's $1.4T / $1.15T vendor commitments** (the demand backbone): Broadcom ~$350B,
> Oracle ~$300B, Microsoft ~$250B, Nvidia ~$100B, AMD ~$90B, AWS ~$38B, CoreWeave ~$22B
> (2025–2035). The >$1.4T total is **[VERIFIED]** (CNBC + Altman); the per-vendor split is
> [unverified, blog]. Source: cnbc.com/2026/02/06/google-microsoft-meta-amazon-ai-cash.html ; blockeden.xyz/...

### Group 3 — Hyperscaler → AI lab equity (the funding side of the loops)

| From | To | Direction | Magnitude | Type | Basis | Confidence | Source |
|---|---|---|---|---|---|---|---|
| Google | Anthropic | Google invests | **$40B** (closed March 2026) | equity investment | deal-total | Medium [unverified, secondary] | (transcript: per-company financials searcher / tech-insider.org) |
| SoftBank / MGX / Oracle / OpenAI | Stargate LLC | equity funders | $500B vehicle ($100B deploying immediately) | equity investment | deal-total | High **[VERIFIED]** | openai.com/index/announcing-the-stargate-project |
| Amazon | OpenAI | equity (Feb 2026 round) | ~$50B (part of $110B round) | equity investment | deal-total | Low [unverified, blog] | blockeden.xyz/... |
| Amazon | Anthropic | Amazon invests | **NOT recovered** (historical ~$8B not in transcripts) | equity investment | — | Gap | see Gaps |

### Group 4 — Chips → memory (HBM) and storage

| From | To | Direction | Magnitude | Type | Basis | Confidence | Source |
|---|---|---|---|---|---|---|---|
| Nvidia (Vera Rubin) | SK Hynix | Nvidia buys HBM | SK Hynix secured >2/3 of HBM4 orders; ~57% HBM share | HBM purchase | estimate | Low [unverified, blog] | quantflowlab.com/ai-semiconductor-spending |
| Nvidia / AMD | Samsung | buys HBM | ~22% HBM share | HBM purchase | estimate | Low [unverified, blog] | quantflowlab.com/... |
| Nvidia / AMD | Micron | buys HBM | ~21% HBM share | HBM purchase | estimate | Low [unverified, blog] | quantflowlab.com/... |

> HBM market sizing: ~$35B (2025) → ~$58B (2026). No discrete HBM purchase dollar-edge per buyer was captured.

### Group 5 — Chips → foundry → equipment

| From | To | Direction | Magnitude | Type | Basis | Confidence | Source |
|---|---|---|---|---|---|---|---|
| Nvidia / AMD / Broadcom | TSMC | chip designers pay foundry | TSMC 2025 rev $122.5B; Nvidia ~60% of CoWoS, AMD ~11% | foundry / wafer purchase | estimate | Low [unverified, blog] | quantflowlab.com/... ; siliconanalysts.com/research/ai-data-center-value-chain |
| TSMC | ASML / AMAT / Lam / KLA | foundry buys equipment | TSMC 2026 capex $52–56B; global WFE >$100B, equipment market ~$133B 2025 → $145B 2026 | capex (equipment) | estimate | Low [unverified, blog] | quantflowlab.com/... |
| Google | Broadcom | TPU custom-silicon spend | **~$8B/yr** | custom ASIC purchase | run-rate | Low [unverified, secondary] | siliconanalysts.com/... |

### Group 6 — Data center → power (PPAs, nuclear, fuel cells)

| From | To | Direction | Magnitude | Type | Basis | Confidence | Source |
|---|---|---|---|---|---|---|---|
| Oracle | Bloom Energy | Oracle procures fuel cells | up to **2.8 GW** (1.2 GW contracted, into 2027) | fuel-cell procurement / power | deal-total | High **[VERIFIED]** | investor.bloomenergy.com/.../Bloom-Energy-and-Oracle-Expand-Strategic-Partnership-to-Deploy-up-to-2-8-GW-... |
| Amazon (AWS) | Talen Energy | Amazon PPA (nuclear) | **~$18B**, 17-yr, up to 1,920 MW (Susquehanna); up to $1.4B/yr | PPA (nuclear) | deal-total | Medium [unverified, secondary] | powermag.com/talen-amazon-launch-18b-nuclear-ppa-... |
| Brookfield | Bloom Energy | investor funds fuel-cell deployment | **$5B** | equity/financing for SOFC | deal-total | Medium [unverified, secondary] | datacenterdynamics.com/en/news/bloom-energy-signs-5bn-partnership-with-brookfield-... |
| Microsoft | Constellation | Microsoft PPA (nuclear) | 837 MW (100%), 20-yr; $1.6B restart, online ~2028 | PPA (nuclear restart) | deal-total | Medium [unverified, secondary] | datacenterdynamics.com/en/news/three-mile-island-nuclear-power-plant-to-return-... |
| (data center) | American Electric Power | off-grid power buildout | up to 1 GW SOFC | fuel-cell deal | deal-total | Low [unverified, secondary] | datacenterdynamics.com/.../bloom-energy-signs-5bn-... |
| Equinix | Bloom Energy | fuel-cell deployment | 19 data centers, >100 MW | fuel-cell procurement | deal-total | Low [unverified, secondary] | (Bloom extractor) |
| Oracle | SMRs (3 reactors) | direct-generation design | ~1 GW data center | nuclear (SMR) | estimate | Low [unverified, secondary] | power-eng.com/nuclear/smrs/oracle-designing-data-center-to-be-powered-by-trio-of-small-modular-reactors |

### Group 7 — Networking / chips → optics

No sourced dollar-edges recovered. Only adjacency: Nvidia Data Center **networking** revenue
$14.8B in Q1 FY27 (+199% YoY) **[VERIFIED]** as a proxy for interconnect spend. See Gaps.

---

## 3. CAPITAL LOOPS (narrative — the 2–3 most important)

**Loop A — Nvidia ⇄ OpenAI (the heaviest, most-cited edge).**
Nvidia *intends to invest up to $100B in OpenAI*, released progressively as each gigawatt of
a ≥10 GW deployment (millions of GPUs, first GW H2 2026 on Vera Rubin) comes online. That
capital loops straight back to Nvidia as **chip purchases** — the vendor funds its own
customer, who buys the vendor's chips. This is the single edge that should carry the most
visual weight. Caveat: it is an LOI, not yet signed/funded, and reportedly being
renegotiated down (TechCrunch, Jan 2026), so render it as *announced intent*, not deployed
cash. *(VERIFIED — NVIDIA newsroom.)*

**Loop B — AMD ⇄ OpenAI (equity-financed chip purchases).**
OpenAI agreed to deploy **6 GW** of AMD Instinct GPUs (first 1 GW MI450 in H2 2026, "tens of
billions," ~$90B in the vendor breakdown). In return AMD issued OpenAI a **warrant for up to
160M AMD shares (~10% of AMD, exercisable ~$0.01)** vesting against deployment and AMD
share-price milestones. Analysts described it explicitly as "AMD's own stock paying for
OpenAI's chip purchases" — a textbook circular/vendor-financing loop. *(VERIFIED — AMD IR.)*

**Loop C — Stargate triangle: SoftBank/MGX/Oracle/OpenAI → Oracle buildout → Nvidia chips.**
The $500B / 10 GW Stargate vehicle (equity funders SoftBank, OpenAI, Oracle, MGX; partners
Arm, Microsoft, Nvidia, Oracle, OpenAI) routes equity into infrastructure; OpenAI then
contracts **~4.5 GW additional from Oracle (~$300B / ~5 yrs)**, which Oracle equips with
Nvidia GB200 racks — closing the A→B→C→A loop (invest → compute contract → chip purchase).
Oracle in turn buys **up to 2.8 GW of Bloom fuel cells** to power it. *(GW/chips/funders
VERIFIED; the ~$300B dollar figure is [unverified, blog].)*

---

## 4. GAPS / LOW-CONFIDENCE (still needs verification)

**Did not survive verification / not recovered with solid sourcing:**

1. **Nvidia ⇄ Intel ($5B):** explicitly searched but **not found** — the circular-financing
   searcher stated it "did not find specific information about Intel involvement or a specific
   $5 billion investment." No transcript supports this edge.
2. **Nvidia ⇄ CoreWeave and Nvidia ⇄ xAI stakes:** referenced qualitatively (IndexBox:
   "Nvidia's AI investment portfolio: CoreWeave and Nebius as key holdings 2026") but **no
   dollar magnitude** captured. xAI–Nvidia not quantified.
3. **Nvidia ⇄ Nokia:** mentioned in the research scope but **no supporting claim** in any
   transcript.
4. **Microsoft ⇄ OpenAI equity stake:** only the **$250B Azure compute** commitment was
   captured (VentureBeat). Microsoft's equity ownership %/$ in OpenAI was **not** recovered.
5. **Amazon ⇄ Anthropic equity (historically ~$8B):** **not recovered.** One transcript
   actively noted Amazon's $50B was for OpenAI's round, "not Anthropic." Google→Anthropic
   ($40B, closed Mar 2026) is the only lab-equity edge captured on the Anthropic side.
6. **Memory/storage dollar-edges:** only HBM market *shares* (SK Hynix 57% / Samsung 22% /
   Micron 21%, blog) — no per-buyer HBM purchase $ figure. **SanDisk** (NAND/AI storage):
   nothing recovered.
7. **Optics / networking layer (Arista, Coherent, Lumentum, Credo, Astera Labs, Ciena):**
   essentially **unsourced** — no market caps, no edges. Only proxy is Nvidia's $14.8B DC
   networking revenue.
8. **Foundry/equipment edges** (TSMC→ASML/AMAT/Lam/KLA; Nvidia/AMD→TSMC) rest entirely on a
   **single blog (quantflowlab)** plus a value-chain blog — low confidence, needs primary
   (TSMC IR, SEMI) confirmation.
9. **Power node market caps & most non-Bloom/Talen/Constellation power edges:** Vistra,
   GE Vernova, Oklo, Eaton have **no figures**; Meta-nuclear and Google-SMR specifics not
   recovered.
10. **Market caps broadly:** captured only for Nvidia (>$5T), CoreWeave (~$52.7B), Nebius
    (~$61B), Vertiv (~$116.75B), Super Micro (~$17B), Dell (~$246B). All other node market
    caps (chips, memory, optics, foundry, power, Equinix/Digital Realty) were **not captured**
    and should be pulled fresh given mid-2026 volatility.
11. **REFUTED (do not use):** Meta "2026 capex as high as $135B" as a hard point figure failed
    verification 0-3; use the $115–145B guidance range.
