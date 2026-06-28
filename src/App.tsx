import { useEffect, useState } from 'react'
import ForceGraph from './graph/ForceGraph'
import { SECTORS, SECTOR_ORDER } from './data/sectors'
import { Overture } from './ui/Overture'
import { InfoPanel } from './ui/InfoPanel'

export default function App() {
  const [infoOpen, setInfoOpen] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'i' || e.key === 'I') setInfoOpen((v) => !v)
      else if (e.key === 'Escape') setInfoOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="app">
      <ForceGraph />

      <header className="hud hud-top reveal" style={{ animationDelay: '0.2s' }}>
        <div className="title">
          <span className="title-main">ai capital flow</span>
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
        {!infoOpen && (
          <button className="info-trigger" onClick={() => setInfoOpen(true)}>
            press <kbd>i</kbd> for information
          </button>
        )}
      </footer>

      {infoOpen && <InfoPanel onClose={() => setInfoOpen(false)} />}

      <Overture />
    </div>
  )
}
