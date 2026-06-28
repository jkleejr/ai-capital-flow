# AI Capital Flow

An interactive visualization of where capital is moving through the AI buildout —
the circulating money between AI labs, hyperscalers, chips, memory, optics, data
centers, power, and foundries, as of mid-2026.

Force-directed ecosystem: hyperscalers and AI labs at the gravitational core, the
supply chain orbiting outward, with glowing particles flowing along each edge in the
direction capital actually moves. Node size = total capital flow volume. The
circular-financing loops (Nvidia ⇄ OpenAI, AMD ⇄ OpenAI, the Stargate triangle) are
the centerpiece.

## Features

- **Flowing capital** — animated particles trace each directional money flow
- **Drag** any node to reposition it; neighbors react via the physics simulation
- **Hover** to highlight a node's flows and trace financing loops in gold
- **Click** for a detail panel: capital in / out, per-flow dollar values + descriptions
- **Structure ↔ Momentum** lens toggle; momentum can run on live market data
- Responsive, keyboard-dismissable intro, reduced-motion aware

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build to dist/
npm run preview  # serve the production build locally
```

## Live market momentum (optional)

The Momentum lens uses placeholder data by default. To show real daily price
movement, add a free [Finnhub](https://finnhub.io/) key:

```bash
cp .env.example .env.local
# then set VITE_FINNHUB_KEY=your_key
```

Without a key it falls back to illustrative momentum automatically.

## Deploy (Vercel)

```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production
```

`vercel.json` is preconfigured (Vite framework, SPA rewrite). To enable live
momentum in production, add `VITE_FINNHUB_KEY` as an environment variable in the
Vercel project settings.

## Data

All figures are an **illustrative, sourced snapshot** for design purposes — not
investment advice. The flow dataset and its sourcing live in `research/`. Some
smaller flows are rough estimates (marked `~` in the UI); the headline loops are
drawn from primary disclosures. See `research/MASTER-dataset.md`.

## Stack

React + Vite + TypeScript · d3-force · Canvas 2D rendering. No backend.
