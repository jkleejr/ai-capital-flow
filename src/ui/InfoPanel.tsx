/** Explanatory panel toggled by the "i" key (or the bottom-left trigger). */
export function InfoPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="info-panel" role="dialog" aria-label="About this visualization">
      <div className="info-head">
        <span className="info-title">about this map</span>
        <button className="info-close" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>

      <p className="info-lead">
        A live map of where capital is moving through the AI buildout — the money
        circulating between AI labs, hyperscalers, chips, memory, optics, data
        centers, power and foundries.
      </p>

      <div className="info-group">
        <div className="info-group-title">controls</div>
        <ul className="info-list">
          <li>
            <b>Drag</b> any node to move it — the nodes around it react.
          </li>
          <li>
            <b>Click</b> a node for details — market cap, capital in, capital
            out, and every flow with its dollar value.
          </li>
          <li>
            <b>Hover</b> a node to light up its flows — circular-financing loops
            glow gold.
          </li>
        </ul>
      </div>

      <div className="info-group">
        <div className="info-group-title">two lenses</div>
        <ul className="info-list">
          <li>
            <b>structure</b> — the supply chain: who funds and buys from whom.
            Node size = market capitalization (private labs sized by their latest
            valuation); arrows and particles show the direction money moves.
          </li>
          <li>
            <b>momentum</b> — a market-heat overlay on the same map: green = money
            flowing in, red = flowing out, brighter = stronger.
          </li>
        </ul>
      </div>

      <div className="info-foot">
        Illustrative sourced snapshot · mid-2026 · not investment advice
      </div>
    </div>
  )
}
