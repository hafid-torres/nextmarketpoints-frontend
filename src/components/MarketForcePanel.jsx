import "./MarketForcePanel.css";

export default function MarketForcePanel({ pressure = 50 }) {
  // calcula barras
  const buyPercent = pressure > 55 ? pressure : 50;
  const sellPercent = pressure < 45 ? 100 - pressure : 50;
  const isNeutral = pressure >= 45 && pressure <= 55;

  let subtitle = "NEUTRO";
  let subtitleColor = "#FFC107"; // amarelo

  if (pressure > 55) {
    subtitle = "MERCADO COMPRADOR";
    subtitleColor = "#00FF7F"; // verde
  } else if (pressure < 45) {
    subtitle = "MERCADO VENDEDOR";
    subtitleColor = "#FF4C4C"; // vermelho
  }

  return (
    <div className="market-force-panel">
      <div className="panel-title">FORÇA DO MERCADO</div>

      <div className="pressure-bar-wrapper">
        <div className="pressure-bar">
          <div
            className="pressure-buy"
            style={{ width: `${buyPercent}%` }}
          ></div>
          <div
            className="pressure-sell"
            style={{ width: `${sellPercent}%` }}
          ></div>
        </div>

        <div className="pressure-labels">
          <span className="buy-label" style={{ color: "#00FF7F" }}>BUY</span>
          <span className="sell-label" style={{ color: "#FF4C4C" }}>SELL</span>
        </div>

        <div
          className="pressure-subtitle"
          style={{ color: subtitleColor }}
        >
          {subtitle}
        </div>
      </div>
    </div>
  );
}
