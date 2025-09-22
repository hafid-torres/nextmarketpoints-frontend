import './SignalsPanel.css';
import { useState } from 'react';

export default function SignalsPanel({ signals }) {
  const [selectedSignal, setSelectedSignal] = useState(null);
  const [filter, setFilter] = useState('');

  const filteredSignals = signals.filter(sig =>
    sig.ativo?.toLowerCase().includes(filter.toLowerCase())
  );

  const onClickSignal = (sig) => setSelectedSignal(sig);
  const closePopup = () => setSelectedSignal(null);

  return (
    <div className="signals-panel">
      <div className="signals-header">
        SINAIS CONFIRMADOS <span className="live-indicator">🔴 LIVE</span>
      </div>

      <input
        type="text"
        placeholder="Filtrar por ativo..."
        className="signals-filter"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />

      <div className="signals-table-header">
        <span>ATIVO</span>
        <span>DIREÇÃO</span>
        <span>PREÇO</span>
        <span>HORARIO</span>
        <span>STATUS</span>
      </div>

      <div className="signals-list">
        {filteredSignals.map(sig => {
          const ativo = sig.ativo || 'N/A';
          const tipo = sig.tipo || sig.direcao || 'N/A';
          const preco = sig.preco || 'N/A';
          const horario = sig.horario || sig.hora || 'N/A';
          const status = sig.status === "INATIVO" ? "INATIVO" : "ATIVO";

          return (
            <div
              key={sig.id}
              className="signal-item"
              onClick={() => onClickSignal(sig)}
            >
              <div className="signal-row">
                <span title={ativo}>{ativo}</span>
                <span className={`signal-tipo ${tipo.toLowerCase()}`}>
                  {tipo.toUpperCase() === 'BUY' || tipo.toUpperCase() === 'COMPRA' ? 'BUY' : 'SELL'}
                </span>
                <span>{preco}</span>
                <span>{horario}</span>
                <span className={`signal-status ${status.toLowerCase()}`}>{status}</span>
              </div>
            </div>
          );
        })}
      </div>

      {selectedSignal && (
        <div className="signal-popup" onClick={closePopup}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <span className="popup-close" onClick={closePopup}>✖</span>

            <h4 className="popup-title">
              {selectedSignal.ativo} - <span className={`popup-tipo ${selectedSignal.tipo?.toLowerCase() || selectedSignal.direcao?.toLowerCase()}`}>{(selectedSignal.tipo || selectedSignal.direcao)?.toUpperCase()}</span>
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
              <p><strong>Horário do sinal:</strong> {selectedSignal.horario || selectedSignal.hora}</p>
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
