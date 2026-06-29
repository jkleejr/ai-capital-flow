import { NODES } from '../data/nodes'
import { EDGES } from '../data/edges'
import { SECTORS } from '../data/sectors'
import { getMomentum } from '../graph/momentum'
import { marketCapFor } from '../graph/sizing'
import { edgeAmount, formatUsd, sumUsd } from '../data/format'
import type { RawEdge } from '../data/types'

const nameOf = new Map(NODES.map((n) => [n.id, n.name]))

function FlowRow({ edge, dir }: { edge: RawEdge; dir: 'in' | 'out' }) {
  const otherId = dir === 'in' ? edge.from : edge.to
  const otherNode = NODES.find((n) => n.id === otherId)!
  const amount = edgeAmount(edge)
  return (
    <li className="flow-row">
      <span className="flow-bar" style={{ background: SECTORS[otherNode.sector].color }} />
      <span className="flow-text">
        <span className="flow-name">{nameOf.get(otherId)}</span>
        {edge.label && <span className="flow-label">{edge.label}</span>}
      </span>
      <span className="flow-meta">
        {amount && <span className="flow-amount">{amount}</span>}
        {edge.loop && <span className="flow-loop">loop</span>}
      </span>
    </li>
  )
}

export function NodePanel({ id, onClose }: { id: string; onClose: () => void }) {
  const node = NODES.find((n) => n.id === id)
  if (!node) return null
  const meta = SECTORS[node.sector]
  const inbound = EDGES.filter((e) => e.to === id)
  const outbound = EDGES.filter((e) => e.from === id)
  const inUsd = sumUsd(inbound)
  const outUsd = sumUsd(outbound)
  const m = getMomentum(id)
  const cap = marketCapFor(id)
  const isPrivate = !node.ticker
  const isLoop = [...inbound, ...outbound].some((e) => e.loop)

  // sort flows by dollar magnitude, biggest first
  const byUsd = (a: RawEdge, b: RawEdge) => (b.usd ?? 0) - (a.usd ?? 0)
  inbound.sort(byUsd)
  outbound.sort(byUsd)

  return (
    <div className="panel">
      <button className="panel-close" onClick={onClose} aria-label="Close">
        ×
      </button>
      <div className="panel-head">
        <span className="panel-chip" style={{ background: meta.color }} />
        <div>
          <div className="panel-name">{node.name}</div>
          <div className="panel-meta">
            {node.ticker ? `${node.ticker} · ` : ''}
            {meta.label}
            {isLoop && <span className="panel-loopbadge">financing loop</span>}
          </div>
        </div>
      </div>

      {node.note && <p className="panel-note">{node.note}</p>}

      <div className="panel-stats">
        {cap != null && (
          <div>
            <span className="stat-num" style={{ color: '#e8edf6' }}>{formatUsd(cap)}</span>
            <span className="stat-lbl">{isPrivate ? 'valuation' : 'market cap'}</span>
          </div>
        )}
        <div>
          <span className="stat-num" style={{ color: '#34d399' }}>{formatUsd(inUsd)}</span>
          <span className="stat-lbl">capital in ←</span>
        </div>
        <div>
          <span className="stat-num" style={{ color: '#5b9dff' }}>{formatUsd(outUsd)}</span>
          <span className="stat-lbl">capital out →</span>
        </div>
        <div>
          <span className="stat-num" style={{ color: m >= 0 ? '#34d399' : '#f87171' }}>
            {m >= 0 ? '+' : ''}
            {(m * 100).toFixed(0)}%
          </span>
          <span className="stat-lbl">momentum*</span>
        </div>
      </div>

      {inbound.length > 0 && (
        <div className="panel-section">
          <div className="panel-section-title">Capital in ←</div>
          <ul className="flow-list">
            {inbound.map((e, i) => (
              <FlowRow key={i} edge={e} dir="in" />
            ))}
          </ul>
        </div>
      )}
      {outbound.length > 0 && (
        <div className="panel-section">
          <div className="panel-section-title">Capital out →</div>
          <ul className="flow-list">
            {outbound.map((e, i) => (
              <FlowRow key={i} edge={e} dir="out" />
            ))}
          </ul>
        </div>
      )}

      <div className="panel-foot">
        $ figures blend announced commitments &amp; annual run-rates · ~ = estimate · illustrative
      </div>
    </div>
  )
}
