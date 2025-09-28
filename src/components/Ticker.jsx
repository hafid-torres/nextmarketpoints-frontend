import { useEffect, useRef } from "react";
import "./Ticker.css";

const SYMBOLS = [
  { symbol: 'GOLD', name: 'GOLD' },
  { symbol: 'SILVER', name: 'SILVER' },
  { symbol: 'EURUSD', name: 'EURUSD' },
  { symbol: 'GBPUSD', name: 'GBPUSD' },
  { symbol: 'USDJPY', name: 'USDJPY' },
  { symbol: 'AUDUSD', name: 'AUDUSD' },
  { symbol: 'USDCAD', name: 'USDCAD' },
  { symbol: 'NZDUSD', name: 'NZDUSD' },
  { symbol: 'USDCHF', name: 'USDCHF' },
  { symbol: 'EURJPY', name: 'EURJPY' },
  { symbol: 'BTCUSD', name: 'BTCUSD' },
  { symbol: 'ETHUSD', name: 'ETHUSD' },
  { symbol: 'LTCUSD', name: 'LTCUSD' },
  { symbol: 'XRPUSD', name: 'XRPUSD' },
  { symbol: 'BCHUSD', name: 'BCHUSD' },
  { symbol: 'US500Cash', name: 'US500Cash' },
  { symbol: 'US30Cash', name: 'US30Cash' },
  { symbol: 'US100Cash', name: 'US100Cash' },
  { symbol: 'US2000Cash', name: 'US2000Cash' },
  { symbol: 'UK100Cash', name: 'UK100Cash' },
  { symbol: 'GER40Cash', name: 'GER40Cash' },
  { symbol: 'JP225Cash', name: 'JP225Cash' },
  { symbol: 'NIKKEI', name: 'NIKKEI' },
  { symbol: 'HK50Cash', name: 'HK50Cash' },
  { symbol: 'ChinaHCash', name: 'ChinaHCash' },
  { symbol: 'Apple', name: 'Apple' },
  { symbol: 'Microsoft', name: 'Microsoft' },
  { symbol: 'Amazon', name: 'Amazon' },
  { symbol: 'Google', name: 'Google' },
  { symbol: 'Tesla', name: 'Tesla' },
  { symbol: 'Facebook', name: 'Facebook' },
  { symbol: 'Nvidia', name: 'Nvidia' },
  { symbol: 'Netlix', name: 'Netlix' },
  { symbol: 'JPMorgan', name: 'JPMorgan' },
  { symbol: 'OILCash', name: 'OILCash' },
  { symbol: 'NGASCash', name: 'NGASCash' },
  { symbol: 'XPTUSD', name: 'XPTUSD' },
  { symbol: 'XPDUSD', name: 'XPDUSD' },
  { symbol: 'VIX-OCT25', name: 'VIX-OCT25' }
];

export default function Ticker({ prices = {} }) {
  const scrollRef = useRef();
  const requestRef = useRef();

  // Debug: ver o que chega no componente
  useEffect(() => {
    console.log("📈 Ticker recebido no componente:", prices);
  }, [prices]);

  // Loop infinito suave
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    let scrollPos = 0;
    const speed = 0.3;

    const step = () => {
      scrollPos += speed;
      if (scrollPos >= scrollEl.scrollWidth / 2) scrollPos = 0;
      scrollEl.style.transform = `translateX(-${scrollPos}px)`;
      requestRef.current = requestAnimationFrame(step);
    };

    requestRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const loopSymbols = [...SYMBOLS, ...SYMBOLS]; // duplicação para loop contínuo

  return (
    <div className="ticker-wrapper">
      <div className="ticker-scroll" ref={scrollRef}>
        {loopSymbols.map((s, idx) => {
          const p = prices[s.symbol] || {};
          const price = typeof p.price === "number" ? p.price.toFixed(2) : "0.00";
          const change = typeof p.change === "number" ? p.change : 0;

          const up = change > 0;
          const arrow = up ? '▲' : change < 0 ? '▼' : '';
          const color = up ? '#00ff7f' : change < 0 ? '#ff4c4c' : '#fff';

          return (
            <div key={idx} className="ticker-item">
              <span className="ticker-name">{s.name}</span>
              <span className="price" style={{ color }}>{price}</span>
              <span className="arrow" style={{ color }}>{arrow}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
