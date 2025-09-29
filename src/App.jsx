import { useMemo, useEffect, useState } from "react";
import DashboardTop from './components/DashboardTop';
import Header from './components/Header';
import Footer from './components/Footer';
import Ticker from './components/Ticker';
import Clocks from './components/Clocks';
import TradingViewChart from './components/TradingViewChart';
import NewsPanel from './components/NewsPanel';
import SignalsPanel from './components/SignalsPanel';
import ActiveSignalsPanel from './components/ActiveSignalsPanel';
import StatsPanel from './components/StatsPanel';
import InsightsPanel from './components/InsightsPanel';
import ExtraWidgetsSection from './components/ExtraWidgetsSection';

import io from 'socket.io-client'; // Certifique-se de ter instalado: npm install socket.io-client

import './styles/global.css';
import './App.css';

export default function App() {
  const backendSocketURL = import.meta.env.VITE_BACKEND_SOCKET;
  const backendHTTPURL = import.meta.env.VITE_BACKEND_URL;

  // -------------------------------
  // Estados para dados em tempo real
  // -------------------------------
  const [ticker, setTicker] = useState({});
  const [volatility, setVolatility] = useState({});
  const [signals, setSignals] = useState([]);
  const [news, setNews] = useState([]);

  // -------------------------------
  // Inicializa conexão Socket.IO
  // -------------------------------
  useEffect(() => {
    const socket = io(backendSocketURL, { transports: ['websocket'] });

    socket.on('connect', () => console.log('✅ Conectado ao backend via Socket.IO'));
    socket.on('disconnect', () => console.log('⚠️ Desconectado do backend'));
    
    // Eventos recebidos do backend
    socket.on('ticker', data => {
      setTicker(prev => ({ ...prev, [data.symbol]: data }));
      console.log('📈 Ticker recebido:', data);
    });

    socket.on('candle', data => {
      // Você pode processar candles se necessário
      console.log('📊 Candle recebido:', data);
    });

    socket.on('volatility', data => {
      setVolatility(prev => ({ ...prev, [data.symbol]: data.level }));
      console.log('⚡ Volatilidade recebida:', data);
    });

    socket.on('signal', data => {
      setSignals(prev => {
        const exists = prev.find(s => s.id === data.id);
        if(exists) return prev.map(s => s.id === data.id ? data : s);
        return [...prev, data];
      });
      console.log('⚡ Sinal recebido:', data);
    });

    socket.on('news', data => {
      setNews(data);
      console.log('📰 Notícias recebidas:', data);
    });

    // Limpeza ao desmontar componente
    return () => socket.disconnect();
  }, [backendSocketURL]);

  // -------------------------------
  // Debug mínimo: logs para verificar dados recebidos
  // -------------------------------
  useEffect(() => console.log("📈 Ticker atualizado:", ticker), [ticker]);
  useEffect(() => console.log("⚡ Volatilidade atualizada:", volatility), [volatility]);
  useEffect(() => console.log("📊 Signals atualizadas:", signals), [signals]);
  useEffect(() => console.log("📰 News atualizadas:", news), [news]);

  // -------------------------------
  // Processamento de sinais
  // -------------------------------
  const activeSignals = useMemo(() => signals.filter(s => s.status === "ativo"), [signals]);
  const closedSignals = useMemo(() => signals.filter(s => s.status === "fechado"), [signals]);

  const insights = useMemo(() => {
    return news.map((n, idx) => {
      let tipo = "noticia";
      const title = (n.title || "").toLowerCase();
      if(title.includes("up") || title.includes("alta") || title.includes("bull")) tipo = "alta";
      else if(title.includes("down") || title.includes("queda") || title.includes("bear")) tipo = "queda";
      return { ...n, tipo, id: n.id || idx, msg: n.title || "Sem título", hora: n.publishedAt || "" };
    });
  }, [news]);

  return (
    <div className="app">
      <Header />

      {/* Ticker */}
      <Ticker prices={ticker || {}} />

      {/* Relógios centralizados */}
      <Clocks />

      {/* Dashboard Top */}
      <DashboardTop volatility={volatility || {}} />

      {/* Main Grid: Chart + Side Panels */}
      <div className="main-grid">
        <div className="chart-area">
          <TradingViewChart symbol="XAUUSD" backendURL={backendHTTPURL} />
        </div>

        <div className="side-panels">
          <SignalsPanel signals={activeSignals || []} backendURL={backendHTTPURL} />
          <NewsPanel news={news || []} backendURL={backendHTTPURL} />
        </div>
      </div>

      {/* Extra Section: Painéis ativos, stats e insights */}
      <div className="extra-section">
        <div className="active-panel-wrapper">
          <ActiveSignalsPanel signals={signals || []} backendURL={backendHTTPURL} />
        </div>
        <div className="stats-panel-wrapper">
          <StatsPanel closedSignals={closedSignals || []} backendURL={backendHTTPURL} />
        </div>
        <div className="insights-panel-wrapper">
          <InsightsPanel insights={insights || []} backendURL={backendHTTPURL} />
        </div>
      </div>

      {/* Widgets Section */}
      <ExtraWidgetsSection backendURL={backendHTTPURL} />

      <Footer />
    </div>
  );
}
