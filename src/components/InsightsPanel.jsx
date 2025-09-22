import './InsightsPanel.css';

export default function InsightsPanel({ insights }) {
  return (
    <div className="insights-panel">
      <div className="panel-header">Insights de Mercado</div>
      <div className="panel-content scrollable">
        {insights.slice(0, 100).map(i => (
          <div key={i.id} className={`insight-item ${i.tipo}`}>
            <span className="hora">{i.hora}</span>
            <span className="icon">
              {i.tipo === "alta" && "▲"}
              {i.tipo === "queda" && "▼"}
              {i.tipo === "noticia" && "●"}
            </span>
            <span className="msg">{i.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
