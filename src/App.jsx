import { useMemo } from "react";
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
import useSocket from './hooks/useSocket';

import './styles/global.css';
import './App.css';

export default function App() {
  const backendHTTPURL = import.meta.env.VITE_BACKEND_URL;
  const { ticker, volatility, signals, news } = useSocket();

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
