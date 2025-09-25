import "./IndexFearPanel.css";

export default function IndexFearPanel({ fearIndex = 50 }) {
  const level = fearIndex;

  // cores da barra
  let subtitle = "NEUTRO";
  let subtitleColor = "#FFC107"; // amarelo

  return (
    <div className="index-fear-panel">
      <div className="panel-title">ÍNDICE DO MEDO</div>

      <div className="fear-bar">
        <div className="fear-fill" style={{ width: `${level}%` }}>
          <span className="fear-percent">{level}%</span>
        </div>
      </div>

      <div className="fear-subtitle" style={{ color: subtitleColor }}>
        {subtitle}
      </div>
    </div>
  );
}
