import { useState } from "react";
import './ActiveSignalsPanel.css';

export default function ActiveSignalsPanel({ signals }) {
  const [tab, setTab] = useState("ativos");
  const [filter, setFilter] = useState("");
  const [selectedSignal, setSelectedSignal] = useState(null);

  const ativos = signals
    .filter(s => s.status === "ativo")
    .filter(s => s.ativo.toLowerCase().includes(filter.toLowerCase()));
    
  const fechados = signals
    .filter(s => s.status === "fechado")
    .filter(s => s.ativo.toLowerCase().includes(filter.toLowerCase()));

  const closePopup = () => setSelectedSignal(null);

  return (
    <div className="active-signals-panel">
      {/* Header com abas */}
      <div className="panel-header">
        <button 
          className={`tab ${tab === "ativos" ? "active" : ""}`} 
          onClick={() => setTab("ativos")}
        >
          Sinais Ativos
        </button>
        <button 
          className={`tab ${tab === "fechado" ? "active" : ""}`} 
          onClick={() => setTab("fechado")}
        >
          Sinais Fechados
        </button>
      </div>

      {/* Conteúdo principal */}
      <div className="signals-list scrollable">
        {tab === "ativos" && ativos.map(s => (
          <div 
            key={s.id} 
            className="signal-item open"
            onClick={() => setSelectedSignal(s)}
          >
            <span className="symbol">{s.ativo}</span>
            <span className={`direcao ${s.direcao.toLowerCase()}`}>
              {s.direcao} - {s.preco}
            </span>
            <span className="hora">{s.hora}</span>
            <span className="status-icon">▲</span>
          </div>
        ))}
        {tab === "fechado" && fechados.map(s => (
          <div key={s.id} className="signal-item closed">
            <span className="symbol">{s.ativo}</span>
            <span className={`direcao ${s.direcao.toLowerCase()}`}>
              {s.direcao} - {s.preco}
            </span>
            <span className="hora">{s.hora}</span>
            <span className="status-icon">■</span>
          </div>
        ))}
      </div>

      {/* Footer com filtro */}
      <div className="panel-footer">
        <input 
          className="panel-search" 
          placeholder="Filtrar por ativo..." 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* 🔹 Popup de detalhes do sinal */}
      {selectedSignal && (
        <div className="signal-popup" onClick={closePopup}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <span className="popup-close" onClick={closePopup}>✖</span>

            <h4 className="popup-title">
              {selectedSignal.ativo} - <span className={`popup-tipo ${selectedSignal.direcao.toLowerCase()}`}>{selectedSignal.direcao}</span>
            </h4>

            <div className="popup-dashboard">
              <div className="dashboard-box entrada">
                <strong>Entrada</strong>
                <p>{selectedSignal.preco}</p>
              </div>
              <div className="dashboard-box stop">
                <strong>Stop Loss</strong>
                <p>{selectedSignal.stopLoss || 'N/A'}</p>
              </div>
              <div className="dashboard-box alvo">
                <strong>Alvos</strong>
                <p>{selectedSignal.targets || 'N/A'}</p>
              </div>
            </div>

            <div className="popup-info">
              <p><strong>Timeframe:</strong> {selectedSignal.timeframe || 'N/A'}</p>
              <p><strong>Lots recomendados:</strong> {selectedSignal.lots || 'Ex: 0.1 (Risco 2%)'}</p>
              <p><strong>Status:</strong> <span className={`popup-status ${selectedSignal.status?.toLowerCase()}`}>{selectedSignal.status || 'ATIVO'}</span></p>
              <p><strong>Horário do sinal:</strong> {selectedSignal.hora}</p>
            </div>

            <div className="popup-info-detail">
              <p><strong>Motivo do sinal:</strong> {selectedSignal.info || 'Sem info'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
