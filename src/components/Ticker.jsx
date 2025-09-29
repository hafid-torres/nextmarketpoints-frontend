import { useEffect, useRef } from "react";
import "./Ticker.css";

const SYMBOLS = [
  { symbol: 'GOLD', name: 'GOLD' }, { symbol: 'SILVER', name: 'SILVER' },
  { symbol: 'EURUSD', name: 'EURUSD' }, { symbol: 'GBPUSD', name: 'GBPUSD' },
  { symbol: 'USDJPY', name: 'USDJPY' }, { symbol: 'AUDUSD', name: 'AUDUSD' },
  { symbol: 'USDCAD', name: 'USDCAD' }, { symbol: 'NZDUSD', name: 'NZDUSD' },
  { symbol: 'USDCHF', name: 'USDCHF' }, { symbol: 'EURJPY', name: 'EURJPY' },
  { symbol: 'BTCUSD', name: 'BTCUSD' }, { symbol: 'ETHUSD', name: 'ETHUSD' },
  { symbol: 'LTCUSD', name: 'LTCUSD' }, { symbol: 'XRPUSD', name: 'XRPUSD' },
  { symbol: 'BCHUSD', name: 'BCHUSD' }, { symbol: 'US500Cash', name: 'US500Cash' },
  { symbol: 'US30Cash', name: 'US30Cash' }, { symbol: 'US100Cash', name: 'US100Cash' },
  { symbol: 'US2000Cash', name: 'US2000Cash' }, { symbol: 'UK100Cash', name: 'UK100Cash' },
  { symbol: 'GER40Cash', name: 'GER40Cash' }, { symbol: 'JP225Cash', name: 'JP225Cash' },
  { symbol: 'NIKKEI', name: 'NIKKEI' }, { symbol: 'HK50Cash', name: 'HK50Cash' },
  { symbol: 'ChinaHCash', name: 'ChinaHCash' }, { symbol: 'Apple', name: 'Apple' },
  { symbol: 'Microsoft', name: 'Microsoft' }, { symbol: 'Amazon', name: 'Amazon' },
  { symbol: 'Google', name: 'Google' }, { symbol: 'Tesla', name: 'Tesla' },
  { symbol: 'Facebook', name: 'Facebook' }, { symbol: 'Nvidia', name: 'Nvidia' },
  { symbol: 'Netlix', name: 'Netlix' }, { symbol: 'JPMorgan', name: 'JPMorgan' },
  { symbol: 'OILCash', name: 'OILCash' }, { symbol: 'NGASCash', name: 'NGASCash' },
  { symbol: 'XPTUSD', name: 'XPTUSD' }, { symbol: 'XPDUSD', name: 'XPDUSD' },
  { symbol: 'VIX-OCT25', name: 'VIX-OCT25' }
];

export default function Ticker({ prices = {} }) {
  const scrollRef = useRef();
  const requestRef = useRef();
  const prevPricesRef = useRef({});

  // Debug: log
  useEffect(() => {
    console.log("📈 Ticker recebido:", prices);
  }, [prices]);

  // Loop de scroll suave
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let pos = 0;
    const speed = 0.25;

    const step = () => {
      pos += speed;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.style.transform = `translateX(-${pos}px)`;
      requestRef.current = requestAnimationFrame(step);
    };

    requestRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const loopSymbols = [...SYMBOLS, ...SYMBOLS];

  return (
    <div className="ticker-wrapper">
      <div className="ticker-scroll" ref={scrollRef}>
        {loopSymbols.map((s, idx) => {
          const current = prices[s.symbol];
          const prev = prevPricesRef.current[s.symbol] || { price: 0 };

          const priceNum = current?.price ?? prev.price ?? 0;
          const price = priceNum.toFixed(2);

          const change = current?.price != null ? priceNum - prev.price : 0;

          const up = change > 0;
          const arrow = up ? '▲' : change < 0 ? '▼' : '';
          const color = up ? '#00ff7f' : change < 0 ? '#ff4c4c' : '#fff';

          // Atualiza prevPrices somente após cálculo
          prevPricesRef.current[s.symbol] = { price: priceNum };

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
