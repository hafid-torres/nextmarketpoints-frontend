import { useEffect, useRef, useState } from "react";
import "./Ticker.css";

const SYMBOLS = [
  "GOLD","SILVER","EURUSD","GBPUSD","USDJPY","AUDUSD","USDCAD","NZDUSD","USDCHF",
  "EURJPY","BTCUSD","ETHUSD","LTCUSD","XRPUSD","BCHUSD","US500Cash","US30Cash",
  "US100Cash","US2000Cash","UK100Cash","GER40Cash","JP225Cash","NIKKEI","HK50Cash",
  "ChinaHCash","Apple","Microsoft","Amazon","Google","Tesla","Facebook","Nvidia",
  "Netlix","JPMorgan","OILCash","NGASCash","XPTUSD","XPDUSD","VIX-OCT25"
];

export default function Ticker({ prices = {} }) {
  const scrollRef = useRef();
  const prevPricesRef = useRef({});
  const [displayPrices, setDisplayPrices] = useState({});

  // ======================
  // Atualiza displayPrices suavemente
  // ======================
  useEffect(() => {
    const interval = setInterval(() => {
      const updated = {};
      SYMBOLS.forEach(symbol => {
        const target = prices[symbol]?.price ?? prevPricesRef.current[symbol] ?? 0;
        const prev = displayPrices[symbol] ?? prevPricesRef.current[symbol] ?? target;
        // interpolação suave
        const diff = target - prev;
        updated[symbol] = +(prev + diff * 0.2).toFixed(2);
      });
      setDisplayPrices(updated);
      prevPricesRef.current = updated;
    }, 50);
    return () => clearInterval(interval);
  }, [prices, displayPrices]);

  // ======================
  // Scroll contínuo
  // ======================
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let pos = 0;
    const speed = 0.3;
    let req;
    const step = () => {
      pos += speed;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.style.transform = `translateX(-${pos}px)`;
      req = requestAnimationFrame(step);
    };
    req = requestAnimationFrame(step);
    return () => cancelAnimationFrame(req);
  }, []);

  // ======================
  // Loop duplo para scroll infinito
  // ======================
  const loopSymbols = [...SYMBOLS, ...SYMBOLS];

  return (
    <div className="ticker-wrapper">
      <div className="ticker-scroll" ref={scrollRef}>
        {loopSymbols.map((symbol, idx) => {
          const price = displayPrices[symbol] ?? 0;
          const prev = prevPricesRef.current[symbol] ?? price;
          const change = +(price - prev).toFixed(2);
          const up = change > 0;
          const arrow = up ? "▲" : change < 0 ? "▼" : "";
          const color = up ? "#00ff7f" : change < 0 ? "#ff4c4c" : "#fff";

          return (
            <div key={idx} className="ticker-item">
              <span className="ticker-name">{symbol}</span>
              <span className="price" style={{ color }}>{price.toFixed(2)}</span>
              <span className="arrow" style={{ color }}>{arrow}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
