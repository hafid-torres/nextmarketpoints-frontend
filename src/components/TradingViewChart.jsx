import { useEffect, useRef } from "react";
import "./TradingViewChart.css";

export default function TradingViewChart({ symbol = "OANDA:XAUUSD" }) {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!widgetRef.current) return;

    // Limpa scripts antigos antes de adicionar novo
    widgetRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "allow_symbol_change": true,
      "calendar": false,
      "details": false,
      "hide_side_toolbar": true,
      "hide_top_toolbar": false,
      "hide_legend": false,
      "hide_volume": false,
      "hotlist": false,
      "interval": "5",
      "locale": "br",
      "save_image": true,
      "style": "1",
      "symbol": symbol,
      "theme": "dark",
      "timezone": "Etc/UTC",
      "backgroundColor": "#0F0F0F",
      "gridColor": "rgba(242, 242, 242, 0.06)",
      "autosize": true
    });

    widgetRef.current.appendChild(script);

    return () => {
      widgetRef.current.innerHTML = ""; // cleanup ao desmontar
    };
  }, [symbol]);

  return (
    <div className="tradingview-widget-container" style={{ height: "600px", width: "100%" }}>
      <div className="tradingview-widget-container__widget" ref={widgetRef}></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://br.tradingview.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
}
