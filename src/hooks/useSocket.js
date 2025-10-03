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

    if (socketRef.current) return; // evita múltiplas conexões

    const socket = io(url, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 20,
      reconnectionDelay: 2000
    });

    socketRef.current = socket;

    console.log("🔌 Conectando ao backend via Socket.IO...");

    // ======================
    // Handlers
    // ======================
    const handleTicker = (data) => {
      if (!data || !data.symbol) return;
      setState(prev => {
        const prevPrice = prev.ticker[data.symbol]?.price ?? data.price ?? 0;
        const price = data.price ?? data.close ?? prevPrice;
        const change = data.change ?? +(price - prevPrice).toFixed(2);
        console.log(`📈 [TICKER] ${data.symbol} - Price: ${price}, Change: ${change}`);
        return {
          ...prev,
          ticker: { ...prev.ticker, [data.symbol]: { price, change } }
        };
      });
    };

    const handleVolatility = (data) => {
      if (!data) return;
      console.log("⚡ [VOLATILITY]", data);
      setState(prev => ({ ...prev, volatility: { ...prev.volatility, ...data } }));
    };

    const handleSignal = (data) => {
      if (!data || !data.id) return;
      setState(prev => {
        const exists = prev.signals.find(s => s.id === data.id);
        const newSignals = exists ? prev.signals : [data, ...prev.signals].slice(0, 50);
        console.log("⚡ [SIGNAL] Recebido:", data);
        return { ...prev, signals: newSignals };
      });
    };

    const handleNews = (data) => {
      if (!data) return;
      const newsArray = Array.isArray(data) ? data : [data];
      console.log("📰 [NEWS] Recebido:", newsArray);
      setState(prev => ({ ...prev, news: [...newsArray, ...prev.news].slice(0, 10) }));
    };

    // ======================
    // Socket Events
    // ======================
    socket.on("connect", () => {
      console.log("✅ Conectado ao backend via Socket.IO!");
      // Solicita snapshot completo dos ticks
      socket.emit("requestInitialTicks");
    });

    socket.on("disconnect", () => console.log("⚠️ Desconectado do backend!"));

    socket.on("ticker", handleTicker);
    socket.on("candle", handleTicker); // atualiza ticker via candle
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
