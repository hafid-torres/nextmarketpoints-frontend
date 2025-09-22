import './InsightsPanel.css';

export default function InsightsPanel({ insights = [] }) {
  const topInsights = Array.isArray(insights) ? insights.slice(0, 100) : [];

  const getIcon = (tipo) => {
    switch (tipo) {
      case "alta": return "▲";
      case "queda": return "▼";
      case "noticia": return "●";
      default: return "•";
    }
  };

  return (
    <div className="insights-panel">
      <div className="panel-header">Insights de Mercado</div>
      <div className="panel-content scrollable">
        {topInsights.map(i => (
          <div key={i.id} className={`insight-item ${i.tipo || ''}`}>
            <span className="hora">{i.hora || '-'}</span>
            <span className="icon">{getIcon(i.tipo)}</span>
            <span className="msg">{i.msg || '-'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
