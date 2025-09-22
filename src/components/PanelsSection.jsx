import ActiveSignalsPanel from "./ActiveSignalsPanel";
import StatsPanel from "./StatsPanel";
import InsightsPanel from "./InsightsPanel";
import { fakeActiveSignals, fakeStats, fakeInsights } from "../data/fakePanels";

export default function PanelsSection() {
  return (
    <div className="panels-section">
      <ActiveSignalsPanel signals={fakeActiveSignals} />
      <StatsPanel stats={fakeStats} />
      <InsightsPanel insights={fakeInsights} />
    </div>
  );
}
