import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function useSocket(url = import.meta.env.VITE_BACKEND_SOCKET) {
  const [state, setState] = useState({
    ticker: {},
    volatility: {},
    signals: [],
    news: []
  });

  useEffect(() => {
    if (!url) {
      console.error("⚠️ useSocket: URL do backend não definida!");
      return;
    }

    const socket = io(url, { transports: ["websocket"] });

    const handleTicker = data =>
      setState(prev => ({ ...prev, ticker: data || {} }));

    const handleVolatility = data =>
      setState(prev => ({ ...prev, volatility: data || {} }));

    const handleSignal = data => {
      if (!data) return;
      setState(prev => ({
        ...prev,
        signals: [data, ...(prev.signals || [])].slice(0, 50)
      }));
    };

    const handleNews = data => {
      if (!data) return;
      const newsArray = Array.isArray(data) ? data : [data];
      setState(prev => ({
        ...prev,
        news: [...newsArray, ...(prev.news || [])].slice(0, 10)
      }));
    };

    socket.on("connect", () => console.log("✅ Conectado ao backend via Socket.IO!"));
    socket.on("disconnect", () => console.log("⚠️ Desconectado do backend!"));

    socket.on("ticker", handleTicker);
    socket.on("volatility", handleVolatility);
    socket.on("signal", handleSignal);
    socket.on("news", handleNews);

    return () => socket.disconnect();
  }, [url]);

  return state;
}
