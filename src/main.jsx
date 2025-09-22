import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./styles/global.css";   // CSS global
import "./App.css";             // CSS específico do App
import "./components/TradingViewChart.css";
import "./components/SignalsPanel.css";
import "./components/NewsPanel.css";
import "./components/VolatilityBar.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
