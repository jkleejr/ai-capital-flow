import { useEffect, useState } from 'react'

/**
 * Opening overture: a brief title card stating the thesis, which lifts away to
 * reveal the graph as the nodes fly out and settle. Respects reduced-motion
 * (renders nothing) and is dismissable by click / any key / after the timed run.
 */
export function Overture() {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [phase, setPhase] = useState<'in' | 'hold' | 'out' | 'done'>(reduce ? 'done' : 'in')

  useEffect(() => {
    if (reduce) return
    const timers = [
      window.setTimeout(() => setPhase('hold'), 60),
      window.setTimeout(() => setPhase('out'), 2600),
      window.setTimeout(() => setPhase('done'), 3500),
    ]
    return () => timers.forEach(clearTimeout)
  }, [reduce])

  useEffect(() => {
    if (phase === 'done') return
    const skip = () => setPhase('out')
    window.addEventListener('keydown', skip)
    return () => window.removeEventListener('keydown', skip)
  }, [phase])

  if (phase === 'done') return null

  return (
    <div
      className={`overture overture-${phase}`}
      onClick={() => setPhase('out')}
      aria-hidden="true"
    >
      <div className="overture-inner">
        <div className="overture-eyebrow">2026 · the AI buildout</div>
        <h1 className="overture-title">AI CAPITAL FLOW</h1>
        <p className="overture-thesis">
          Hundreds of billions are circulating between the companies building
          artificial intelligence — chips, compute, power, memory, optics.
          <br />
          Watch where the money moves.
        </p>
        <div className="overture-hint">click to enter</div>
      </div>
    </div>
  )
}
