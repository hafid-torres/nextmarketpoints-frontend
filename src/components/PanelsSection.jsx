// PanelsSection.jsx
import ActiveSignalsPanel from "./ActiveSignalsPanel";
import StatsPanel from "./StatsPanel";
import InsightsPanel from "./InsightsPanel";
import { fakeActiveSignals, fakeStats, fakeInsights } from "../data/fakePanels";
import './PanelsSection.css';

export default function PanelsSection() {
  return (
    <div className="panels-section">
      <ActiveSignalsPanel signals={fakeActiveSignals} />
      <StatsPanel closedSignals={fakeStats} />
      <InsightsPanel insights={fakeInsights} />
    </div>
  );
}
