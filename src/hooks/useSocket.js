// useSocket.jsx
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

    socket.on("connect", () => {
      console.log("✅ Conectado ao backend via Socket.IO!");
    });

    // Recebe ticker
    socket.on("ticker", data =>
      setState(prev => ({ ...prev, ticker: data }))
    );

    // Recebe volatilidade
    socket.on("volatility", data =>
      setState(prev => ({ ...prev, volatility: data }))
    );

    // Recebe sinais
    socket.on("signal", data => {
      setState(prev => ({
        ...prev,
        signals: [data, ...prev.signals].slice(0, 50)
      }));
    });

    // Recebe notícias
    socket.on("news", data => {
      if (Array.isArray(data)) {
        setState(prev => ({
          ...prev,
          news: data.slice(0, 10)  // mantém máximo 10
        }));
      } else if (data && typeof data === "object") {
        setState(prev => ({
          ...prev,
          news: [data, ...prev.news].slice(0, 10)
        }));
      }
    });

    socket.on("disconnect", () => {
      console.log("⚠️ Desconectado do backend!");
    });

    return () => socket.disconnect();
  }, [url]);

  return state;
}
