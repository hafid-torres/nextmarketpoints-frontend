import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

export default function useSocket(url = import.meta.env.VITE_BACKEND_SOCKET) {
  const [ticker, setTicker] = useState({});
  const [volatility, setVolatility] = useState({});
  const [signals, setSignals] = useState([]);
  const [news, setNews] = useState([]);

  const socketRef = useRef(null);
  const tickerRef = useRef({}); // Para manter o estado atual do ticker

  useEffect(() => {
    if (!url) {
      console.error("⚠️ useSocket: URL do backend não definida!");
      return;
    }

    if (socketRef.current) return; // Evita múltiplas conexões

    const socket = io(url, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000
    });

    socketRef.current = socket;

    // -------------------------------
    // Handlers
    // -------------------------------
    const handleTicker = (data) => {
      if (!data || !data.symbol) return;
      const symbol = data.symbol;
      const price = data.price ?? data.close ?? 0;
      const prevPrice = tickerRef.current[symbol]?.price ?? price;
      const change = data.change ?? +(price - prevPrice).toFixed(2);

      tickerRef.current[symbol] = { price, change };
      setTicker({ ...tickerRef.current });
    };

    const handleVolatility = (data) => {
      if (!data) return;
      setVolatility(prev => ({ ...prev, ...data }));
    };

    const handleSignal = (data) => {
      if (!data || !data.id) return;
      setSignals(prev => {
        const exists = prev.find(s => s.id === data.id);
        if (exists) return prev;
        return [data, ...prev].slice(0, 50);
      });
    };

    const handleNews = (data) => {
      if (!data) return;
      const newsArray = Array.isArray(data) ? data : [data];
      setNews(prev => {
        const combined = [...newsArray, ...prev];
        const unique = Array.from(new Map(combined.map(n => [n.id || n.title, n])).values());
        return unique.slice(0, 10);
      });
    };

    // -------------------------------
    // Eventos do Socket
    // -------------------------------
    socket.on("connect", () => console.log("✅ Conectado ao backend via Socket.IO!"));
    socket.on("disconnect", () => console.log("⚠️ Desconectado do backend!"));

    socket.on("ticker", handleTicker);
    socket.on("candle", handleTicker); // atualiza ticker via candle também
    socket.on("volatility", handleVolatility);
    socket.on("signal", handleSignal);
    socket.on("news", handleNews);

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

  return { ticker, volatility, signals, news };
}
