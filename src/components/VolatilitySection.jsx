// src/components/VolatilitySection.jsx
import VolatilityBar from "./VolatilityBar";
import "./VolatilitySection.css";

export default function VolatilitySection({ volatility }) {
  return (
    <div className="volatility-section">
      <VolatilityBar volatility={volatility || { level: 0 }} />
    </div>
  );
}
