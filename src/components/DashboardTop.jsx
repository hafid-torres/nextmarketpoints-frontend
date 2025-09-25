// src/components/DashboardTop.jsx
import MarketForcePanel from "./MarketForcePanel";
import IndexFearPanel from "./IndexFearPanel";
import VolatilityBar from "./VolatilityBar";
import TopAssetsPanel from "./TopAssetsPanel";

import "./DashboardTop.css";

export default function DashboardTop({ volatility, marketForce, fearIndex, topAssets }) {
  return (
    <div className="dashboard-top">
      {/* Painel Esquerda: Market Force */}
      <div className="dashboard-panel left-panel">
        <MarketForcePanel data={marketForce} />
        <IndexFearPanel data={fearIndex} />
      </div>

      {/* Painel Meio: Volatilidade */}
      <div className="dashboard-panel center-panel">
        <VolatilityBar volatility={volatility} />
      </div>

      {/* Painel Direita: Top Assets */}
      <div className="dashboard-panel right-panel">
        <TopAssetsPanel assets={topAssets} />
      </div>
    </div>
  );
}
