import ForceGraph from './graph/ForceGraph'
import { SECTORS, SECTOR_ORDER } from './data/sectors'
import { Overture } from './ui/Overture'

export default function App() {
  return (
    <div className="app">
      <ForceGraph />

      <header className="hud hud-top reveal" style={{ animationDelay: '0.2s' }}>
        <div className="title">
          <span className="title-main">AI CAPITAL FLOW</span>
          <span className="title-sub">where the money moves through the AI buildout</span>
        </div>
      </header>

      <aside className="hud legend reveal" style={{ animationDelay: '0.45s' }}>
        {SECTOR_ORDER.map((id) => (
          <div className="legend-row" key={id}>
            <span className="legend-dot" style={{ background: SECTORS[id].color }} />
            <span className="legend-label">{SECTORS[id].label}</span>
          </div>
        ))}
      </aside>

      <footer className="hud hud-bottom reveal" style={{ animationDelay: '0.6s' }}>
        <span className="foot-hint">
          Drag nodes to explore · click for detail · arrows show direction of capital
        </span>
        <span className="disclaimer">Illustrative — not investment advice · mid-2026</span>
      </footer>

      <Overture />
    </div>
  )
}
