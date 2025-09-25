// src/components/VolatilityBar.jsx
import "./VolatilityBar.css";

export default function VolatilityBar({ volatility }) {
  const level = volatility?.level ?? 0; // % de 0 a 100
  let color = "#ff4c4c"; // vermelho padrão

  if (level <= 33) color = "#ff4c4c";      // baixo → vermelho
  else if (level <= 66) color = "#ffcc00"; // médio → amarelo
  else color = "#00ff7f";                  // alto → verde

  return (
    <div className="panel-box">
      <div className="volatility-panel">
        <div className="vol-header">
          <span>VOLATILIDADE DO MERCADO</span>
          <span className="live-indicator">🔴 LIVE</span>
        </div>

        <div className="vol-bar">
          <div
            className="vol-fill"
            style={{ width: `${level}%`, background: color }}
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
