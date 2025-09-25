// src/components/TopAssetsPanel.jsx
import "./TopAssetsPanel.css";

export default function TopAssetsPanel({ assets }) {
  return (
    <div className="top-assets-panel">
      <div className="panel-title">TOP ATIVOS 🔴</div>
      <div className="assets-list">
        {assets?.map((asset, idx) => (
          <div className="asset-row" key={idx}>
            <div className="asset-symbol">{asset.symbol}</div>
            <div className="asset-price">{asset.price}</div>
            <div className="asset-trend">{asset.trend}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
