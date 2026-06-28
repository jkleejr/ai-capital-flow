import { useEffect, useState } from 'react'

/**
 * Opening overture: a title card stating the thesis. It plays an entrance, then
 * holds on screen until the user dismisses it (click anywhere, or any key) — it
 * does NOT auto-dismiss. On dismiss it fades out to reveal the graph.
 */
export function Overture() {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out' | 'done'>('in')

  // play the entrance, then hold indefinitely (no auto-dismiss timer)
  useEffect(() => {
    if (phase !== 'in') return
    const t = window.setTimeout(() => setPhase('hold'), 60)
    return () => clearTimeout(t)
  }, [phase])

  // dismiss on any key while the card is showing
  useEffect(() => {
    if (phase === 'out' || phase === 'done') return
    const onKey = () => dismiss()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase])

  function dismiss() {
    setPhase((p) => {
      if (p === 'out' || p === 'done') return p
      window.setTimeout(() => setPhase('done'), 900)
      return 'out'
    })
  }

  if (phase === 'done') return null

  return (
    <div className={`overture overture-${phase}`} onClick={dismiss} aria-hidden="true">
      <div className="overture-inner">
        <div className="overture-eyebrow">2026 · the AI buildout</div>
        <h1 className="overture-title">ai capital flow</h1>
        <p className="overture-thesis">
          Hundreds of billions are circulating between the companies building
          artificial intelligence — chips, compute, power, memory, optics.
          <br />
          Watch where the money moves.
        </p>
        <div className="overture-hint">click anywhere to enter</div>
      </div>
    </div>
  )
}
