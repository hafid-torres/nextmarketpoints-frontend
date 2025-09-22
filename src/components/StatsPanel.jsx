import { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import './StatsPanel.css';

export default function StatsPanel({ closedSignals = [] }) {
  const [popupData, setPopupData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");

  const ativosFixos = ["XAUUSD", "EURUSD", "GBPUSD", "JPYUSD", "BTCUSD"];

  const ativosData = ativosFixos.map(ativo => {
    const sinaisAtivo = closedSignals.filter(s => s.ativo === ativo);
    const ganhos = sinaisAtivo.filter(s => s.resultado === "ganho").length;
    const perdas = sinaisAtivo.filter(s => s.resultado === "perda").length;
    return { ativo, ganhos, perdas };
  });

  const totalGanhos = ativosData.reduce((sum, a) => sum + a.ganhos, 0);
  const totalPerdas = ativosData.reduce((sum, a) => sum + a.perdas, 0);
  const total = totalGanhos + totalPerdas;

  const pieData = [
    { name: "Ganhos", value: totalGanhos, color: "#00FF95" },
    { name: "Perdas", value: totalPerdas, color: "#FF4F4F" },
  ];

  const handleSliceClick = (entry) => {
    if (!entry) return;
    const name = entry.name;
    const filtered = closedSignals.filter(s =>
      (name === "Ganhos" && s.resultado === "ganho") ||
      (name === "Perdas" && s.resultado === "perda")
    );
    setPopupData(filtered);
    setPopupTitle(name);
    setShowPopup(true);
  };

  const percentGanhos = total ? ((totalGanhos / total) * 100).toFixed(0) : 0;
  const percentPerdas = total ? ((totalPerdas / total) * 100).toFixed(0) : 0;

  return (
    <div className="panel stats-panel">
      <div className="panel-header">
        <h3>Acertividade dos Trades</h3>
      </div>

      <div className="panel-content chart-wrapper">
        <span className="gain-label">GANHOS</span>
        <div className="pie-container">
          <PieChart width={200} height={200}>
            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={5}
              onClick={handleSliceClick}
            >
              {pieData.map((entry, i) => (
                <Cell key={`cell-${i}`} fill={entry.color} cursor="pointer" />
              ))}
            </Pie>
          </PieChart>
          <div className="pie-center-text">
            <span>{percentGanhos}%</span> / <span>{percentPerdas}%</span>
          </div>
        </div>
        <span className="loss-label">PERDAS</span>
      </div>

      <div className="panel-footer ativos-footer">
        <div className="ativos-title">Ativos Negociados:</div>
        <div className="ativos-list">
          {ativosData.map(a => (
            <div key={a.ativo} className="asset-row">
              <span className="asset-name">{a.ativo}</span>
              <span className="asset-trades">
                <span className="ganhos">{a.ganhos}</span> | <span className="perdas">{a.perdas}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h4>{popupTitle}</h4>
            <table>
              <thead>
                <tr>
                  <th>Ativo</th>
                  <th>Direção</th>
                  <th>Preço Entrada</th>
                  <th>Preço Stop</th>
                  <th>Hora</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {popupData.map(t => (
                  <tr key={t.id}>
                    <td>{t.ativo}</td>
                    <td>{t.direcao}</td>
                    <td>{t.preco}</td>
                    <td>{t.stopLoss || "-"}</td>
                    <td>{t.hora}</td>
                    <td>{t.data || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
