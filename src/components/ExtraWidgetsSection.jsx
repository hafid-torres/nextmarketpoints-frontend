// src/components/ExtraWidgetsSection.jsx
import React, { useEffect, useRef, memo } from "react";
import './ExtraWidgetsSection.css';

export default function ExtraWidgetsSection() {
  // 🔹 Ref para o Calendário Econômico
  const calendarRef = useRef();

  useEffect(() => {
    if (calendarRef.current) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "colorTheme": "dark",
          "isTransparent": false,
          "locale": "br",
          "countryFilter": "ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu",
          "importanceFilter": "-1,0,1",
          "width": "100%",
          "height": 550
        }`;
      calendarRef.current.appendChild(script);
    }
  }, []);

  // 🔹 Ref para o Mercado Cripto
  const cryptoRef = useRef();
  useEffect(() => {
    if (cryptoRef.current) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "dataSource": "Crypto",
          "blockSize": "market_cap_calc",
          "blockColor": "24h_close_change|5",
          "locale": "br",
          "symbolUrl": "",
          "colorTheme": "dark",
          "hasTopBar": true,
          "isDataSetEnabled": true,
          "isZoomEnabled": true,
          "hasSymbolTooltip": true,
          "isMonoSize": false,
          "width": "100%",
          "height": 550
        }`;
      cryptoRef.current.appendChild(script);
    }
  }, []);

  // 🔹 Ref para o Mercado de Stocks
  const stocksRef = useRef();
  useEffect(() => {
    if (stocksRef.current) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "exchange": "US",
          "colorTheme": "dark",
          "dateRange": "12M",
          "showChart": true,
          "locale": "br",
          "largeChartUrl": "",
          "isTransparent": false,
          "showSymbolLogo": true,
          "showFloatingTooltip": false,
          "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
          "plotLineColorFalling": "rgba(41, 98, 255, 1)",
          "gridLineColor": "rgba(240, 243, 250, 0)",
          "scaleFontColor": "#DBDBDB",
          "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
          "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
          "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
          "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
          "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
          "width": "100%",
          "height": 550
        }`;
      stocksRef.current.appendChild(script);
    }
  }, []);

  return (
    <section className="widgets-section">
      
      {/* 🔹 Primeiro widget: Calendário Econômico */}
      <div className="widget">
        <h3 className="widget-title">Calendário Econômico</h3>
        <div className="tradingview-widget-container" ref={calendarRef}>
          <div className="tradingview-widget-container__widget"></div>
          <div className="tradingview-widget-copyright">
            <a
              href="https://br.tradingview.com/economic-calendar/"
              rel="noopener nofollow"
              target="_blank"
            >
              <span className="blue-text">Track all markets on TradingView</span>
            </a>
          </div>
        </div>
      </div>

      {/* 🔹 Segundo widget: Mercado Cripto */}
      <div className="widget">
        <h3 className="widget-title">Mercado Cripto</h3>
        <div className="tradingview-widget-container" ref={cryptoRef}>
          <div className="tradingview-widget-container__widget"></div>
          <div className="tradingview-widget-copyright">
            <a
              href="https://br.tradingview.com/heatmap/crypto/"
              rel="noopener nofollow"
              target="_blank"
            >
              <span className="blue-text">Track all markets on TradingView</span>
            </a>
          </div>
        </div>
      </div>

      {/* 🔹 Terceiro widget: Mercado de Stocks */}
      <div className="widget">
        <h3 className="widget-title">Mercado de Stocks</h3>
        <div className="tradingview-widget-container" ref={stocksRef}>
          <div className="tradingview-widget-container__widget"></div>
          <div className="tradingview-widget-copyright">
            <a
              href="https://br.tradingview.com/markets/stocks-usa/"
              rel="noopener nofollow"
              target="_blank"
            >
              <span className="blue-text">Track all markets on TradingView</span>
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
