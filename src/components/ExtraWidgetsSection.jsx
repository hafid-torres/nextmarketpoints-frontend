// src/components/ExtraWidgetsSection.jsx
import React, { useEffect, useRef } from "react";
import './ExtraWidgetsSection.css';

const widgetConfigs = [
  {
    title: "Calendário Econômico",
    refKey: "calendarRef",
    scriptSrc: "https://s3.tradingview.com/external-embedding/embed-widget-events.js",
    scriptConfig: {
      colorTheme: "dark",
      isTransparent: false,
      locale: "br",
      countryFilter: "ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu",
      importanceFilter: "-1,0,1",
      width: "100%",
      height: 550
    },
    link: "https://br.tradingview.com/economic-calendar/"
  },
  {
    title: "Mercado Cripto",
    refKey: "cryptoRef",
    scriptSrc: "https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js",
    scriptConfig: {
      dataSource: "Crypto",
      blockSize: "market_cap_calc",
      blockColor: "24h_close_change|5",
      locale: "br",
      colorTheme: "dark",
      hasTopBar: true,
      isDataSetEnabled: true,
      isZoomEnabled: true,
      hasSymbolTooltip: true,
      isMonoSize: false,
      width: "100%",
      height: 550
    },
    link: "https://br.tradingview.com/heatmap/crypto/"
  },
  {
    title: "Mercado de Stocks",
    refKey: "stocksRef",
    scriptSrc: "https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js",
    scriptConfig: {
      exchange: "US",
      colorTheme: "dark",
      dateRange: "12M",
      showChart: true,
      locale: "br",
      isTransparent: false,
      showSymbolLogo: true,
      width: "100%",
      height: 550
    },
    link: "https://br.tradingview.com/markets/stocks-usa/"
  }
];

export default function ExtraWidgetsSection() {
  const refs = {
    calendarRef: useRef(),
    cryptoRef: useRef(),
    stocksRef: useRef()
  };

  useEffect(() => {
    widgetConfigs.forEach(w => {
      const container = refs[w.refKey].current;
      if (container) {
        container.innerHTML = ''; // limpa antes de adicionar
        const script = document.createElement("script");
        script.src = w.scriptSrc;
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = JSON.stringify(w.scriptConfig);
        container.appendChild(script);
      }
    });
  }, []);

  return (
    <section className="widgets-section">
      {widgetConfigs.map((w, i) => (
        <div key={i} className="widget">
          <h3 className="widget-title">{w.title}</h3>
          <div className="tradingview-widget-container" ref={refs[w.refKey]}>
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright">
              <a href={w.link} target="_blank" rel="noopener nofollow">
                <span className="blue-text">Track all markets on TradingView</span>
              </a>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
