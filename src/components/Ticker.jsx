import { useEffect, useState, useRef } from "react";
import "./Ticker.css";

const SYMBOLS = [
  { symbol: 'XAUUSD', name: 'XAUUSD' },
  { symbol: 'XAGUSD', name: 'XAGUSD' },
  { symbol: 'EURUSD', name: 'EURUSD' },
  { symbol: 'USDJPY', name: 'USDJPY' },
  { symbol: 'GBPUSD', name: 'GBPUSD' },
  { symbol: 'BTCUSD', name: 'BTCUSD' },
  { symbol: 'ETHUSD', name: 'ETHUSD' },
  { symbol: 'SPXUSD', name: 'SPXUSD' },
  { symbol: 'NSXUSD', name: 'NSXUSD' }
];

export default function Ticker() {
  const [prices, setPrices] = useState({});
  const scrollRef = useRef();
  const requestRef = useRef();

  const generateFakePrices = (prevPrices) => {
    const newPrices = {};
    SYMBOLS.forEach(s => {
      const prev = prevPrices[s.symbol]?.price || 1000;
      const change = (Math.random() - 0.5) * 10;
      newPrices[s.symbol] = { price: +(prev + change).toFixed(2), change: +(change.toFixed(2)) };
    });
    return newPrices;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => generateFakePrices(prev));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Loop infinito via scroll JS suave
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    let scrollPos = 0;
    const speed = 0.3; // pixels por frame, ajustável

    const step = () => {
      scrollPos += speed;
      if (scrollPos >= scrollEl.scrollWidth / 2) scrollPos = 0;
      scrollEl.style.transform = `translateX(-${scrollPos}px)`;
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
          const p = prices[s.symbol] || { price: 0, change: 0 };
          const up = p.change > 0;
          const arrow = up ? '▲' : p.change < 0 ? '▼' : '';
          const color = up ? 'green' : p.change < 0 ? 'red' : 'white';
          return (
            <div key={idx} className="ticker-item">
              <span className="ticker-name">{s.name}</span>
              <span className="price" style={{ color }}>
                {p.price.toFixed(2)}
              </span>
              <span className="arrow" style={{ color }}>{arrow}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
