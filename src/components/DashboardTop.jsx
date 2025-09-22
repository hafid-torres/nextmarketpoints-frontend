import React, { useState, useEffect } from "react";
import VolatilityBar from "./VolatilityBar";
import "./DashboardTop.css";

// Dados fake para demonstração
const fakeMarketStrength = () => Math.floor(Math.random() * 101);
const fakeFearIndex = () => Math.floor(Math.random() * 101);
const fakeTopAssets = [
  { symbol: "EURUSD", price: "1.0875", trend: "up" },
  { symbol: "GBPUSD", price: "1.2450", trend: "down" },
  { symbol: "XAUUSD", price: "1975.25", trend: "up" },
];

export default function DashboardTop({ volatility }) {
  const [marketStrength, setMarketStrength] = useState(fakeMarketStrength());
  const [fearIndex, setFearIndex] = useState(fakeFearIndex());
  const [topAssets, setTopAssets] = useState(fakeTopAssets);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketStrength(fakeMarketStrength());
      setFearIndex(fakeFearIndex());
      setTopAssets(prevAssets =>
        prevAssets.map(a => ({
          ...a,
          trend: Math.random() > 0.5 ? "up" : "down",
          price: (Number(a.price) * (1 + (Math.random() - 0.5) / 100)).toFixed(4)
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Larguras barra de pressão
  const buyerWidth = marketStrength;
  const sellerWidth = 100 - marketStrength;

  // Cor barra do medo
  let fearColor = "#00ff00"; // verde por padrão
  if (fearIndex >= 40 && fearIndex <= 55) fearColor = "#ffff00"; // amarelo
  if (fearIndex > 55) fearColor = "#ff0000"; // vermelho

  return (
    <div className="dashboard-top">

      {/* Painel esquerdo */}
      <div className="panel-box panel-left">
        <div className="panel-row">

          {/* Índice do Medo */}
          <div className="metric fear-index">
            <div className="panel-title">Índice do Medo</div>

            <div className="fear-bar">
              <div
                className="fear-fill"
                style={{ width: `${fearIndex}%`, backgroundColor: fearColor }}
              ></div>
              <span className="fear-percentage">{fearIndex}%</span>
            </div>

            <div className="panel-text fear-text">
              {fearIndex > 55
                ? "Mercado em pânico"
                : fearIndex < 40
                ? "Mercado confiante"
                : "Neutro"}
            </div>
          </div>

          {/* Força do Mercado */}
          <div className="metric market-strength">
            <div className="panel-title">Força do Mercado</div>

            <div className="pressure-bar">
              <div className="pressure-buyer" style={{ width: `${buyerWidth}%` }}></div>
              <div className="pressure-seller" style={{ width: `${sellerWidth}%` }}></div>
            </div>
            <div className="pressure-labels">
              <span>BUY</span>
              <span>SELL</span>
            </div>

            <div className="panel-text">
              {marketStrength > 50 ? "Compradores predominam" : "Vendedores predominam"}
            </div>
          </div>

        </div>
      </div>

      {/* Painel central (Volatilidade) */}
      <div className="panel-box panel-center">
        <VolatilityBar volatility={volatility} />
      </div>

      {/* Painel direito (Top Ativos) */}
      <div className="panel-box panel-right">
        <div className="panel-title">TOP ATIVOS 🔴</div>
        {topAssets.map(asset => (
          <div key={asset.symbol} className="asset-row">
            <span className="asset-symbol">{asset.symbol}</span>
            <span
              className="asset-price"
              style={{ color: asset.trend === "up" ? "#00ff7f" : "#ff4c4c" }}
            >
              {asset.price}
            </span>
            <span
              className={`asset-trend ${asset.trend}`}
              style={{ color: asset.trend === "up" ? "#00ff7f" : "#ff4c4c", marginLeft: "auto" }}
            >
              {asset.trend === "up" ? "▲" : "▼"}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
