import { useEffect, useState, useRef } from "react";
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

    // Evita múltiplas conexões
    if (socketRef.current) return;

    const socket = io(url, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000
    });

    socketRef.current = socket;

    // -------------------------------
    // Handlers para cada evento
    // -------------------------------
    const handleTicker = data => {
      if (!data) return;
      setState(prev => ({ ...prev, ticker: { ...prev.ticker, ...data } }));
    };

    const handleVolatility = data => {
      if (!data) return;
      setState(prev => ({ ...prev, volatility: { ...prev.volatility, ...data } }));
    };

    const handleSignal = data => {
      if (!data || !data.id) return;
      setState(prev => {
        const exists = prev.signals.find(s => s.id === data.id);
        const newSignals = exists
          ? prev.signals
          : [data, ...(prev.signals || [])].slice(0, 50);
        return { ...prev, signals: newSignals };
      });
    };

    const handleNews = data => {
      if (!data) return;
      const newsArray = Array.isArray(data) ? data : [data];
      setState(prev => ({
        ...prev,
        news: [...newsArray, ...(prev.news || [])].slice(0, 10)
      }));
    };

    // -------------------------------
    // Eventos do Socket
    // -------------------------------
    socket.on("connect", () => console.log("✅ Conectado ao backend via Socket.IO!"));
    socket.on("disconnect", () => console.log("⚠️ Desconectado do backend!"));

    socket.on("ticker", handleTicker);
    socket.on("volatility", handleVolatility);
    socket.on("signal", handleSignal);
    socket.on("news", handleNews);

    // Atualiza ticker automaticamente quando receber candle
    socket.on("candle", data => {
      if (!data || !data.symbol || data.close === undefined) return;
      handleTicker({ [data.symbol]: data.close });
    });

    // Cleanup ao desmontar
    return () => {
      socket.off("ticker", handleTicker);
      socket.off("volatility", handleVolatility);
      socket.off("signal", handleSignal);
      socket.off("news", handleNews);
      socket.off("candle");
      socket.disconnect();
      socketRef.current = null;
    };
  }, [url]);

  return state;
}
