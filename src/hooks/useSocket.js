import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function useSocket(url = import.meta.env.VITE_BACKEND_SOCKET) {
  const [state, setState] = useState({
    ticker: {},
    volatility: {},
    signals: [],
    news: []
  });

  const socketRef = useRef(null);

  useEffect(() => {
    if (!url) {
      console.error("⚠️ useSocket: URL do backend não definida!");
      return;
    }

    if (socketRef.current) return;

    const socket = io(url, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 20,
      reconnectionDelay: 2000
    });

    socketRef.current = socket;

    console.log("🔌 Conectando ao backend via Socket.IO...");

    // Handlers
    const handleTicker = (data) => {
      if (!data || !data.symbol) return;
      setState(prev => {
        const prevPrice = prev.ticker[data.symbol]?.price ?? data.price ?? 0;
        const price = data.price ?? data.close ?? prevPrice;
        const change = data.change ?? +(price - prevPrice).toFixed(2);
        return {
          ...prev,
          ticker: { ...prev.ticker, [data.symbol]: { price, change } }
        };
      });
    };

    const handleVolatility = (data) => {
      if (!data) return;
      setState(prev => ({ ...prev, volatility: { ...prev.volatility, ...data } }));
    };

    const handleSignal = (data) => {
      if (!data || !data.id) return;
      setState(prev => {
        const exists = prev.signals.find(s => s.id === data.id);
        const newSignals = exists ? prev.signals.map(s => s.id === data.id ? data : s) : [data, ...prev.signals].slice(0, 50);
        return { ...prev, signals: newSignals };
      });
    };

    const handleNews = (data) => {
      if (!data) return;
      const newsArray = Array.isArray(data) ? data : [data];
      setState(prev => ({ ...prev, news: [...newsArray, ...prev.news].slice(0, 10) }));
    };

    // Socket events
    socket.on("connect", () => {
      console.log("✅ Conectado ao backend via Socket.IO!");
      socket.emit("requestInitialTicks");
    });

    socket.on("disconnect", () => console.log("⚠️ Desconectado do backend!"));

    socket.on("ticker", handleTicker);
    socket.on("candle", handleTicker);
    socket.on("volatility", handleVolatility);
    socket.on("signal", handleSignal);
    socket.on("news", handleNews);

    // Cleanup
    return () => {
      socket.off("ticker", handleTicker);
      socket.off("candle", handleTicker);
      socket.off("volatility", handleVolatility);
      socket.off("signal", handleSignal);
      socket.off("news", handleNews);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [url]);

  return state;
}
