import "./VolatilityBar.css";

export default function VolatilityBar({ volatility }) {
  if (!volatility) return <p>Carregando volatilidade...</p>;

  const level = volatility.level || 0;
  let color = 'var(--accent-down)';

  if(level <= 30) color = 'red';
  else if(level <= 59) color = 'yellow';
  else color = 60 ? 'green' : color;

  return (
    <div className="panel-box panel-center"> {/* Painel igual aos outros */}
      <div className="volatility-panel">
        <div className="vol-header">
          <span>VOLATILIDADE DO MERCADO</span>
          <span className="live-indicator">🔴 LIVE</span>
        </div>
        <div className="vol-bar">
          <div
            className={`vol-fill ${level === 0 ? 'fake' : ''}`}
            style={{ width: level !== 0 ? `${level}%` : undefined, background: color }}
          ></div>
        </div>
        <div className="vol-scale">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
