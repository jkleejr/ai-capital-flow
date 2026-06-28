---
name: refresh-capital-data
description: Refresh the AI capital-flow graph data (nodes and edges) from current news. Use when the user asks to update the capital-flow data, add a newly-announced deal/investment/contract, refresh the visualization's dataset, or check for missing recent AI capital flows. Researches primary sources, verifies each change adversarially, edits src/data/edges.ts and src/data/nodes.ts in place, validates, and shows a diff for review before committing.
---

# Refresh the capital-flow data

The visualization's **node sizes** auto-update daily from market cap (`/api/sizes` + Vercel Cron). This skill refreshes the **editorial layer** — the nodes and edges (who funds / supplies / invests in whom). That data is hand-curated and is the source of the viz's credibility, so every change must be sourced and verified, never guessed.

Run this interactively in the repo (it uses the Claude Max plan via Claude Code — no API key, no charges to the separate Claude API account). **Never commit without showing the user the diff and getting approval.**

## Source of truth

- `src/data/nodes.ts` — `RawNode[]`: the companies/labs (the 44 entities).
- `src/data/edges.ts` — `RawEdge[]`: directional capital flows, grouped by `// ── Group N` comment blocks.
- `src/data/types.ts` — the `RawNode` / `RawEdge` / `SectorId` / `FlowType` definitions.
- `research/MASTER-dataset.md` and `research/capital-flows-dataset.md` — sourcing conventions and the original `[VERIFIED]` / adversarial-verification posture. Match that rigor.

## Procedure

### 1. Discover
Establish the cutoff: find when the data was last refreshed (`git log -1 --format=%cd -- src/data/edges.ts src/data/nodes.ts`). Then use **WebSearch / WebFetch** for AI capital-flow news since then across these flow kinds:
- Equity stakes / investments between labs, hyperscalers, and chipmakers
- Compute / cloud contracts (e.g. Azure, Stargate, AWS, TPU/Trainium commitments)
- Chip & HBM supply deals; foundry / WFE commitments
- Datacenter / neocloud buildouts and backstops
- Power PPAs (nuclear, gas, fuel cells, SMRs)

Scope to the **44 tracked entities** in `nodes.ts`. Note any major new player that keeps coming up (candidate new node).

### 2. Reconcile
Diff candidates against the **current** `edges.ts` / `nodes.ts`. Keep only flows that are genuinely **new** or whose figures **materially changed**. Discard anything already represented.

### 3. Verify (adversarial — do not skip)
For each surviving candidate, confirm:
- **Source is real and primary** — company newsroom, SEC filing (8-K/10-K/13G), or major financial press (Reuters, Bloomberg, CNBC, FT, WSJ). Reject blogs/aggregators as sole sources. Open the source and confirm it actually says what the candidate claims.
- **Direction is right** — in `RawEdge`, `from` pays / funds / invests in `to`. (e.g. `{ from: 'MSFT', to: 'openai', type: 'equity' }` = Microsoft invests in OpenAI.)
- **Figure & basis** — `usd` in $B; `basis: 'deal'` for an announced total/commitment, `'annual'` for a run-rate. If the number is a rough estimate, set `approx: true`.
- **Not double-counting** an existing edge.

Drop anything you cannot verify. When uncertain between two readings, prefer the more conservative (smaller `usd`, `approx: true`). Treat announced/LOI figures as commitments, not deployed cash (the dataset convention).

### 4. Edit in place
Match the existing formatting exactly (aligned single-line objects inside the right group block).

- **Edge** → add to `src/data/edges.ts` in the correct `// ── Group` block:
  ```ts
  { from: 'openai', to: 'MSFT', w: 5, type: 'compute', usd: 250, basis: 'deal', label: 'Azure (to 2032)', sources: ['https://…'] }
  ```
  Fields: `from`, `to` (must be existing node `id`s), `w` (1–5 visual weight), `type` (a `FlowType`), optional `loop` (only for genuine circular-financing edges), `label` (short qualifier shown in the panel), `usd`, `basis`, `approx`, `sources`.
- **Node** → add to `src/data/nodes.ts` **only if** a genuinely significant new company warrants it:
  ```ts
  { id: 'NEW', name: 'New Co', ticker: 'NEW', sector: 'power', note: '…', sources: ['https://…'] }
  ```
  `sector` must be a valid `SectorId`. Adding a node with no edges leaves it unconnected — add at least one verified edge too.

Always populate `sources: [...]` on each new/changed entry.

### 5. Validate
```sh
npx tsc --noEmit && npm run build
```
Referential integrity is enforced at load — `buildFlow()` in `src/graph/flow.ts` throws `edge references unknown node` if any `from`/`to` is unknown. A clean build means types and node references are valid.

### 6. Review & commit
- Show the user the `git diff` plus a short table: each change, its direction/amount, confidence, and source URL.
- Optionally run `npm run dev` and confirm the affected node's panel renders the new flows (capital in/out, label, $ amount) and edges draw between the right nodes.
- Commit **only after the user approves.** Write a clear commit message summarizing the deals added/updated. Git history is the changelog.

## Guardrails
- No fabricated relationships or figures — unsourced ⇒ excluded.
- Don't restructure the files or change unrelated entries.
- Don't touch the sizing pipeline (`api/sizes.ts`, `src/graph/sizing.ts`) — that's the separate auto-updating layer.
- Keep edits small and reviewable; when in doubt, ask the user rather than guessing.
