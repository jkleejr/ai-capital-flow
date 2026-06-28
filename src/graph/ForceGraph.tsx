import { useEffect, useRef, useState } from 'react'
import {
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type ForceX,
  type ForceY,
  type Simulation,
} from 'd3-force'
import { NODES } from '../data/nodes'
import { EDGES } from '../data/edges'
import { SECTORS } from '../data/sectors'
import type { RawEdge, SectorId, SimNode } from '../data/types'
import { radiusFor, loadLiveSizes, sizesUpdatedAt } from './sizing'
import { getMomentum, heatColor, loadLiveMomentum } from './momentum'
import { NodePanel } from '../ui/NodePanel'

const TAU = Math.PI * 2

type Lens = 'structure' | 'momentum'

interface SimLink {
  source: SimNode
  target: SimNode
  w: number
  loop?: boolean
  particles: number[]
}

interface Star {
  x: number
  y: number
  r: number
  a: number
  ph: number
}

// ── persistent sim state ───────────────────────────────────────────
const sim: SimNode[] = NODES.map((n) => ({ ...n, x: 0, y: 0, flow: 0, r: radiusFor(n.id) }))
const pulse = new Map(sim.map((n, i) => [n.id, (i * 2.399963) % TAU]))
const byId = new Map(sim.map((n) => [n.id, n]))
const links: SimLink[] = EDGES.map((e: RawEdge) => {
  const count = Math.max(1, Math.min(5, Math.round(e.w)))
  return {
    source: byId.get(e.from)!,
    target: byId.get(e.to)!,
    w: e.w,
    loop: e.loop,
    particles: Array.from({ length: count }, (_, i) => i / count),
  }
})
// adjacency: node id → set of neighbor ids
const neighbors = new Map<string, Set<string>>(sim.map((n) => [n.id, new Set<string>()]))
for (const e of EDGES) {
  neighbors.get(e.from)!.add(e.to)
  neighbors.get(e.to)!.add(e.from)
}

function computeTargets(width: number, height: number) {
  const cx = width / 2
  const cy = height / 2
  const R = Math.min(width, height) * 0.4
  const targets = new Map<string, { x: number; y: number }>()
  const bySector = new Map<SectorId, SimNode[]>()
  for (const n of sim) {
    const list = bySector.get(n.sector) ?? []
    list.push(n)
    bySector.set(n.sector, list)
  }
  for (const [sid, list] of bySector) {
    const meta = SECTORS[sid]
    if (meta.ring === 0) {
      list.forEach((n, i) => {
        const a = (i / list.length) * TAU
        const rr = list.length > 1 ? R * 0.12 : 0
        targets.set(n.id, { x: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr })
      })
    } else if (sid === 'hyperscaler') {
      list.forEach((n, i) => {
        const a = (i / list.length) * TAU - Math.PI / 2
        const rr = R * meta.ring
        targets.set(n.id, { x: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr })
      })
    } else {
      const a = meta.angle - Math.PI / 2
      const px = cx + Math.cos(a) * R
      const py = cy + Math.sin(a) * R
      list.forEach((n) => targets.set(n.id, { x: px, y: py }))
    }
  }
  return targets
}

function controlPoint(s: SimNode, t: SimNode) {
  const dx = t.x - s.x
  const dy = t.y - s.y
  const dist = Math.hypot(dx, dy) || 1
  const sign = s.id < t.id ? 1 : -1
  const off = dist * 0.13 * sign
  return { x: (s.x + t.x) / 2 + (-dy / dist) * off, y: (s.y + t.y) / 2 + (dx / dist) * off }
}

const LOOP_GOLD = '#ffe9a8'

export default function ForceGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  const [selected, setSelected] = useState<string | null>(null)
  const [lens, setLens] = useState<Lens>('structure')
  const [hover, setHover] = useState<{ id: string; x: number; y: number } | null>(null)
  const [live, setLive] = useState(false)
  const [sizesAt, setSizesAt] = useState<string | null>(null)

  const hoverRef = useRef<string | null>(null)
  const selectedRef = useRef<string | null>(null)
  const lensRef = useRef<Lens>('structure')
  selectedRef.current = selected
  lensRef.current = lens

  useEffect(() => {
    const canvas = canvasRef.current!
    const wrap = wrapRef.current!
    const ctx = canvas.getContext('2d')!
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    let simulation: Simulation<SimNode, undefined> | null = null
    let width = 0
    let height = 0
    let stars: Star[] = []
    let last = performance.now()

    // drag state
    let dragNode: SimNode | null = null
    let dragMoved = false
    let downX = 0
    let downY = 0
    const idleAlpha = reduceMotion ? 0 : 0.02

    // startup spread-in ramp: ease the position force up so the graph blooms
    // gently into place instead of snapping out from the center
    let xForce: ForceX<SimNode> | null = null
    let yForce: ForceY<SimNode> | null = null
    let simStart = 0

    function sizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = wrap.clientWidth
      height = wrap.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round((width * height) / 14000)
      stars = Array.from({ length: n }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.3 + Math.random() * 1.1,
        a: 0.06 + Math.random() * 0.32,
        ph: (i * 1.7) % TAU,
      }))
    }

    function start() {
      sizeCanvas()
      const targets = computeTargets(width, height)
      const cx = width / 2
      const cy = height / 2
      for (const n of sim) {
        n.x = cx + (Math.random() - 0.5) * 40
        n.y = cy + (Math.random() - 0.5) * 40
        n.vx = 0
        n.vy = 0
        // clear any drag-pins so a fresh load / resize re-lays-out from scratch
        n.fx = null
        n.fy = null
      }
      simulation?.stop()
      simulation = forceSimulation(sim)
        .force('x', forceX<SimNode>((n) => targets.get(n.id)!.x).strength(0.16))
        .force('y', forceY<SimNode>((n) => targets.get(n.id)!.y).strength(0.16))
        .force('charge', forceManyBody<SimNode>().strength(-26))
        .force('collide', forceCollide<SimNode>((n) => n.r + 4).strength(0.9))
        .force(
          'link',
          forceLink<SimNode, SimLink>(links).id((n) => n.id).distance(70).strength(0.02),
        )
        .velocityDecay(0.62)
        .alpha(1)
        .alphaTarget(reduceMotion ? 0 : 0.02)
        .stop()
      xForce = simulation.force('x') as ForceX<SimNode>
      yForce = simulation.force('y') as ForceY<SimNode>
      last = performance.now()
      simStart = reduceMotion ? 0 : last // 0 disables the ramp (instant for reduced-motion)
      cancelAnimationFrame(raf)
      loop(last)
    }

    function nodeAt(px: number, py: number, pad = 6): SimNode | null {
      let best: SimNode | null = null
      let bestD = Infinity
      for (const n of sim) {
        const d = Math.hypot(n.x - px, n.y - py)
        if (d <= n.r + pad && d < bestD) {
          best = n
          bestD = d
        }
      }
      return best
    }

    function onDown(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect()
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top
      // fingers are larger and less precise than a mouse — widen the grab target on touch
      const n = nodeAt(px, py, e.pointerType === 'touch' ? 22 : 6)
      if (!n) return
      dragNode = n
      dragMoved = false
      downX = px
      downY = py
      // pin to cursor and energize the sim so neighbors react
      n.fx = n.x
      n.fy = n.y
      canvas.setPointerCapture(e.pointerId)
      canvas.style.cursor = 'grabbing'
      simulation?.alpha(0.5).alphaTarget(0.3)
    }

    function onMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect()
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top

      if (dragNode) {
        if (Math.hypot(px - downX, py - downY) > 3) dragMoved = true
        dragNode.fx = Math.max(0, Math.min(width, px))
        dragNode.fy = Math.max(0, Math.min(height, py))
        hoverRef.current = dragNode.id
        setHover(null) // hide tooltip while dragging
        return
      }

      const n = nodeAt(px, py)
      hoverRef.current = n?.id ?? null
      canvas.style.cursor = n ? 'grab' : 'default'
      setHover(n ? { id: n.id, x: px, y: py } : null)
    }

    function onUp(e: PointerEvent) {
      if (dragNode) {
        const node = dragNode
        dragNode = null
        canvas.style.cursor = 'grab'
        try {
          canvas.releasePointerCapture(e.pointerId)
        } catch {
          /* pointer may already be released */
        }
        if (dragMoved) {
          // keep the node pinned where it was dropped; it stays until a page refresh
          node.fx = node.x
          node.fy = node.y
        } else {
          // it was a click, not a drag → don't pin, just select
          node.fx = null
          node.fy = null
          setSelected(node.id)
        }
        simulation?.alphaTarget(idleAlpha)
        return
      }
      // pointer-up with no node under it → deselect
      const rect = canvas.getBoundingClientRect()
      if (!nodeAt(e.clientX - rect.left, e.clientY - rect.top)) setSelected(null)
    }

    function onLeave() {
      if (dragNode) return
      hoverRef.current = null
      setHover(null)
    }

    const SPREAD_MS = 2600 // how long the startup bloom takes

    function loop(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      // ramp the position force from gentle → full over the first SPREAD_MS so
      // the nodes ease outward instead of snapping into place on load
      if (simStart && xForce && yForce) {
        const k = (now - simStart) / SPREAD_MS
        if (k >= 1) {
          xForce.strength(0.16)
          yForce.strength(0.16)
          simStart = 0
        } else {
          const s = k * k * (3 - 2 * k) // smoothstep ease
          const str = 0.16 * (0.18 + 0.82 * s)
          xForce.strength(str)
          yForce.strength(str)
        }
      }
      simulation?.tick()
      draw(now, dt)
      raf = requestAnimationFrame(loop)
    }

    function colorFor(n: SimNode) {
      return lensRef.current === 'momentum' ? heatColor(getMomentum(n.id)) : SECTORS[n.sector].color
    }

    function draw(now: number, dt: number) {
      const cx = width / 2
      const cy = height / 2
      const t = now * 0.001
      const focus = hoverRef.current ?? selectedRef.current
      const focusSet = focus ? neighbors.get(focus)! : null
      const momentumLens = lensRef.current === 'momentum'

      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = '#080b14'
      ctx.fillRect(0, 0, width, height)
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(width, height) * 0.5)
      core.addColorStop(0, 'rgba(58,72,120,0.42)')
      core.addColorStop(0.45, 'rgba(24,32,60,0.2)')
      core.addColorStop(1, 'rgba(5,7,14,0)')
      ctx.fillStyle = core
      ctx.fillRect(0, 0, width, height)

      // sector nebula (muted in momentum lens)
      ctx.globalCompositeOperation = 'lighter'
      if (!momentumLens) {
        const centroids = new Map<SectorId, { x: number; y: number; n: number }>()
        for (const node of sim) {
          const c = centroids.get(node.sector) ?? { x: 0, y: 0, n: 0 }
          c.x += node.x
          c.y += node.y
          c.n += 1
          centroids.set(node.sector, c)
        }
        for (const [sid, c] of centroids) {
          const x = c.x / c.n
          const y = c.y / c.n
          const rad = sid === 'labs' ? 150 : 190
          const neb = ctx.createRadialGradient(x, y, 0, x, y, rad)
          neb.addColorStop(0, hexA(SECTORS[sid].color, sid === 'labs' ? 0.16 : 0.1))
          neb.addColorStop(1, hexA(SECTORS[sid].color, 0))
          ctx.fillStyle = neb
          ctx.beginPath()
          ctx.arc(x, y, rad, 0, TAU)
          ctx.fill()
        }
      }

      for (const s of stars) {
        const a = s.a * (0.6 + 0.4 * Math.sin(t * 1.3 + s.ph))
        ctx.fillStyle = `rgba(190,205,240,${a})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, TAU)
        ctx.fill()
      }

      // edges + particles
      for (const l of links) {
        const active = !focus || l.source.id === focus || l.target.id === focus
        const cp = controlPoint(l.source, l.target)
        ctx.beginPath()
        ctx.moveTo(l.source.x, l.source.y)
        ctx.quadraticCurveTo(cp.x, cp.y, l.target.x, l.target.y)
        ctx.lineWidth = 0.5 + l.w * 0.3
        ctx.strokeStyle = SECTORS[l.source.sector].color
        const base = (l.loop ? 0.14 : 0.07) + l.w * 0.012
        ctx.globalAlpha = focus ? (active ? base * 1.6 : base * 0.18) : base
        ctx.stroke()
      }
      ctx.globalAlpha = 1
      for (const l of links) {
        const active = !focus || l.source.id === focus || l.target.id === focus
        const cp = controlPoint(l.source, l.target)
        // trace loops in gold when the focused node is on them
        const highlightLoop = !!focus && active && l.loop
        const color = highlightLoop ? LOOP_GOLD : SECTORS[l.source.sector].color
        const speed = 0.1 + l.w * 0.02
        const size = (1.2 + l.w * 0.28) * (highlightLoop ? 1.35 : 1)
        for (let i = 0; i < l.particles.length; i++) {
          if (!reduceMotion) l.particles[i] = (l.particles[i] + dt * speed) % 1
          const p = l.particles[i]
          const mt = 1 - p
          const x = mt * mt * l.source.x + 2 * mt * p * cp.x + p * p * l.target.x
          const y = mt * mt * l.source.y + 2 * mt * p * cp.y + p * p * l.target.y
          const fade = Math.sin(Math.PI * p)
          let alpha = (l.loop ? 0.95 : 0.7) * fade
          if (focus) alpha *= active ? 1 : 0.1
          if (momentumLens && !highlightLoop) alpha *= 0.5
          ctx.fillStyle = hexA(color, alpha)
          ctx.beginPath()
          ctx.arc(x, y, size, 0, TAU)
          ctx.fill()
        }
      }

      // node glows
      for (const n of sim) {
        const dim = focus && !(n.id === focus || focusSet!.has(n.id))
        const color = colorFor(n)
        const ph = pulse.get(n.id)!
        const pr = n.r * (1 + (reduceMotion ? 0 : 0.05 * Math.sin(t * 1.4 + ph)))
        let gAlpha = 0.28
        if (momentumLens) gAlpha = 0.14 + 0.34 * Math.abs(getMomentum(n.id))
        if (dim) gAlpha *= 0.18
        const gr = pr * 2.1
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, gr)
        glow.addColorStop(0, hexA(color, gAlpha))
        glow.addColorStop(0.5, hexA(color, gAlpha * 0.18))
        glow.addColorStop(1, hexA(color, 0))
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(n.x, n.y, gr, 0, TAU)
        ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'
      for (const n of sim) {
        const dim = focus && !(n.id === focus || focusSet!.has(n.id))
        const color = colorFor(n)
        ctx.globalAlpha = dim ? 0.28 : 1
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, TAU)
        ctx.fillStyle = hexA(color, 0.92)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * 0.42, 0, TAU)
        ctx.fillStyle = 'rgba(255,255,255,0.9)'
        ctx.fill()
        if (n.id === focus) {
          ctx.globalAlpha = 1
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r + 4, 0, TAU)
          ctx.lineWidth = 1.5
          ctx.strokeStyle = 'rgba(255,255,255,0.85)'
          ctx.stroke()
        }
      }
      ctx.globalAlpha = 1

      // labels
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      for (const n of sim) {
        const isFocusGroup = focus && (n.id === focus || focusSet!.has(n.id))
        const big = n.r > 15 || n.sector === 'labs' || n.sector === 'hyperscaler'
        if (!big && !isFocusGroup) continue
        ctx.globalAlpha = focus && !isFocusGroup ? 0.25 : 1
        ctx.font = '600 12px "Space Grotesk", system-ui, sans-serif'
        ctx.fillStyle = 'rgba(233,238,250,0.92)'
        ctx.shadowColor = 'rgba(0,0,0,0.6)'
        ctx.shadowBlur = 4
        ctx.fillText(n.name, n.x, n.y + n.r + 5)
        ctx.shadowBlur = 0
      }
      ctx.globalAlpha = 1

      const vig = ctx.createRadialGradient(cx, cy, Math.min(width, height) * 0.34, cx, cy, Math.max(width, height) * 0.72)
      vig.addColorStop(0, 'rgba(0,0,0,0)')
      vig.addColorStop(1, 'rgba(0,0,0,0.55)')
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, width, height)
    }

    start()

    // pull daily market-cap sizing; on success re-size nodes and re-settle layout
    let sizesCancelled = false
    loadLiveSizes().then((ok) => {
      if (sizesCancelled || !ok) return
      for (const n of sim) n.r = radiusFor(n.id)
      simulation?.alpha(0.6) // re-settle so collision spacing adapts to new radii
      setSizesAt(sizesUpdatedAt())
    })

    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup', onUp)
    canvas.addEventListener('pointerleave', onLeave)
    const ro = new ResizeObserver(() => start())
    ro.observe(wrap)

    return () => {
      sizesCancelled = true
      ro.disconnect()
      simulation?.stop()
      cancelAnimationFrame(raf)
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  // load live market momentum once on mount; silently keeps placeholder if unavailable
  useEffect(() => {
    let cancelled = false
    loadLiveMomentum().then((ok) => {
      if (!cancelled && ok) setLive(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const hoverNode = hover ? NODES.find((n) => n.id === hover.id) : null

  return (
    <div ref={wrapRef} className="graph-wrap">
      <canvas ref={canvasRef} />

      {lens === 'momentum' && (
        <div className="data-badge">
          <span className={`data-dot ${live ? 'is-live' : ''}`} />
          {live ? 'Live market data' : 'Illustrative momentum'}
        </div>
      )}

      {lens === 'structure' && sizesAt && (
        <div className="data-badge" title="Node sizes reflect market capitalization, refreshed daily.">
          <span className="data-dot is-live" />
          Sizes updated {formatDay(sizesAt)}
        </div>
      )}

      <div className="lens-toggle" role="group" aria-label="View lens">
        <button className={lens === 'structure' ? 'on' : ''} onClick={() => setLens('structure')}>
          structure
        </button>
        <button className={lens === 'momentum' ? 'on' : ''} onClick={() => setLens('momentum')}>
          momentum
        </button>
      </div>

      {hover && hoverNode && !selected && (
        <div className="tooltip" style={{ left: hover.x + 14, top: hover.y + 14 }}>
          <span className="tt-name">{hoverNode.name}</span>
          <span className="tt-sector" style={{ color: SECTORS[hoverNode.sector].color }}>
            {SECTORS[hoverNode.sector].label}
          </span>
        </div>
      )}

      {selected && <NodePanel id={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

function formatDay(iso: string) {
  const d = new Date(iso)
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function hexA(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${a})`
}
