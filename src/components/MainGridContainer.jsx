import TradingViewChart from './TradingViewChart';
import SignalsPanel from './SignalsPanel';
import NewsPanel from './NewsPanel';
import './MainGridContainer.css';

export default function MainGridContainer({ ticker, signals, news, backendURL }) {
  return (
    <div className="main-grid-container">
      {/* Chart */}
      <div className="chart-area">
        <TradingViewChart symbol="XAUUSD" height={600} backendURL={backendURL} />
      </div>

      {/* Side Panels */}
      <div className="side-panels">
        <SignalsPanel signals={signals} />
        <NewsPanel news={news} />
      </div>
    </div>
  );
}
