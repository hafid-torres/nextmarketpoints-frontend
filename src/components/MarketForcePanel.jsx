import "./MarketForcePanel.css";

export default function MarketForcePanel({ data }) {
  const { fearIndex, sentiment } = data;

  return (
    <div className="market-force-panel">
      <div className="panel-header">FORÇA DO MERCADO</div>
      <div className="fear-index">
        <span>Índice do Medo:</span>
        <div className="fear-bar">
          <div className="fear-fill" style={{ width: `${fearIndex}%` }}></div>
        </div>
        <span className="fear-value">{fearIndex}%</span>
      </div>
      <div className="market-sentiment">
        <span>Sentimento:</span>
        <div className={`sentiment-indicator ${sentiment >= 0 ? 'bullish' : 'bearish'}`}>
          {sentiment >= 0 ? `📈 +${(sentiment*100).toFixed(0)}%` : `📉 ${(sentiment*100).toFixed(0)}%`}
        </div>
      </div>
    </div>
  );
}
