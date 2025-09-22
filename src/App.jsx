// App.jsx
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
import ExtraWidgetsSection from './components/ExtraWidgetsSection'; // 🔹 import novo

import useSocket from './hooks/useSocket'; // ✅ usar socket real

import './styles/global.css';
import './App.css';

export default function App() {
  const { ticker, volatility, signals, news } = useSocket(import.meta.env.VITE_BACKEND_URL);

  const activeSignals = signals.filter(s => s.status === "ativo");
  const closedSignals = signals.filter(s => s.status === "fechado");

  return (
    <div className="app">
      <Header />

      {/* Ticker */}
      <Ticker ticker={ticker} />

      {/* Relógios centralizados */}
      <Clocks />

      {/* Dashboard Top */}
      <DashboardTop volatility={volatility} />

      {/* Main Grid */}
      <div className="main-grid">
        <TradingViewChart symbol="XAUUSD" />
        <div className="side-panels">
          <SignalsPanel signals={activeSignals} />
          <NewsPanel news={news} />
        </div>
      </div>

      {/* 🔹 Extra Section: 3 painéis */}
      <div className="extra-section">
        <div className="active-panel-wrapper">
          <ActiveSignalsPanel signals={signals} />
        </div>
        <div className="stats-panel-wrapper">
          <StatsPanel closedSignals={closedSignals} />
        </div>
        <div className="insights-panel-wrapper">
          <InsightsPanel insights={news} />
        </div>
      </div>

      {/* 🔹 Nova seção de widgets TradingView */}
      <ExtraWidgetsSection />

      <Footer />
    </div>
  );
}
