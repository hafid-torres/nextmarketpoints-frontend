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
    if (!url) return; // segurança caso a variável do .env não exista

    const socket = io(url, { transports: ['websocket'] });

    // Ticker
    socket.on("ticker", data =>
      setState(prev => ({ ...prev, ticker: data }))
    );

    // Volatilidade
    socket.on("volatility", data =>
      setState(prev => ({ ...prev, volatility: data }))
    );

    // Sinais
    socket.on("signal", data =>
      setState(prev => ({
        ...prev,
        signals: [data, ...prev.signals].slice(0, 50)
      }))
    );

    // Notícias
    socket.on("news", data => {
      if (Array.isArray(data)) {
        setState(prev => ({
          ...prev,
          news: data.slice(0, 10)
        }));
      } else if (data && typeof data === "object") {
        setState(prev => ({
          ...prev,
          news: [data, ...prev.news].slice(0, 10)
        }));
      }
    });

    return () => socket.disconnect();
  }, [url]);

  return state;
}
