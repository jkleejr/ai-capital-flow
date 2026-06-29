import { useEffect, useRef, useState } from 'react'
import ForceGraph from './graph/ForceGraph'
import { SECTORS, SECTOR_ORDER } from './data/sectors'
import { Overture } from './ui/Overture'
import { InfoPanel } from './ui/InfoPanel'

type Pos = { x: number; y: number }

export default function App() {
  const [infoOpen, setInfoOpen] = useState(false)

  // Draggable legend: null = default CSS anchor (right-center); once moved it
  // sticks to an absolute position, persisted across reloads.
  const [legendPos, setLegendPos] = useState<Pos | null>(() => {
    try {
      const s = localStorage.getItem('legendPos')
      return s ? (JSON.parse(s) as Pos) : null
    } catch {
      return null
    }
  })
  const dragRef = useRef<{ dragging: boolean; dx: number; dy: number }>({
    dragging: false,
    dx: 0,
    dy: 0,
  })

  useEffect(() => {
    if (!legendPos) return
    try {
      localStorage.setItem('legendPos', JSON.stringify(legendPos))
    } catch {
      /* ignore quota / private-mode errors */
    }
  }, [legendPos])

  function onLegendDown(e: React.PointerEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    dragRef.current = { dragging: true, dx: e.clientX - rect.left, dy: e.clientY - rect.top }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  function onLegendMove(e: React.PointerEvent<HTMLElement>) {
    if (!dragRef.current.dragging) return
    const el = e.currentTarget
    const maxX = window.innerWidth - el.offsetWidth
    const maxY = window.innerHeight - el.offsetHeight
    const x = Math.max(0, Math.min(e.clientX - dragRef.current.dx, maxX))
    const y = Math.max(0, Math.min(e.clientY - dragRef.current.dy, maxY))
    setLegendPos({ x, y })
  }
  function onLegendUp(e: React.PointerEvent<HTMLElement>) {
    dragRef.current.dragging = false
    e.currentTarget.releasePointerCapture(e.pointerId)
  }

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

      <aside
        className="hud legend reveal"
        title="Drag to move"
        style={
          legendPos
            ? { animationDelay: '0.45s', left: legendPos.x, top: legendPos.y, right: 'auto', transform: 'none' }
            : { animationDelay: '0.45s' }
        }
        onPointerDown={onLegendDown}
        onPointerMove={onLegendMove}
        onPointerUp={onLegendUp}
      >
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
