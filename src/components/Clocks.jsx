import { useEffect } from "react";
import "./Clocks.css";

const zones = [
  { label:'São Paulo', tz:'America/Sao_Paulo', flag:'🇧🇷', open: 10, close: 17 },
  { label:'London', tz:'Europe/London', flag:'🇬🇧', open: 9, close: 17 },
  { label:'New York', tz:'America/New_York', flag:'🇺🇸', open: 9, close: 17 },
  { label:'Tokyo', tz:'Asia/Tokyo', flag:'🇯🇵', open: 9, close: 15 },
  { label:'Frankfurt', tz:'Europe/Berlin', flag:'🇩🇪', open: 9, close: 17 },
  { label:'Sydney', tz:'Australia/Sydney', flag:'🇦🇺', open: 10, close: 17 }
];

export default function Clocks() {
  useEffect(() => {
    const interval = setInterval(() => {
      document.querySelectorAll('.analog-clock').forEach(c => {
        const ctx = c.getContext('2d');
        const tz = c.dataset.tz;
        const now = new Date(new Date().toLocaleString("en-US",{timeZone:tz}));
        const w = c.width, h = c.height, r = w/2;
        ctx.clearRect(0,0,w,h);
        ctx.save();
        ctx.translate(r,r); // centraliza o zero do canvas
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;

        // círculo externo
        ctx.beginPath();
        ctx.arc(0,0,r-2,0,2*Math.PI);
        ctx.stroke();

        const sec = now.getSeconds();
        const min = now.getMinutes() + sec/60;
        const hr = now.getHours()%12 + min/60;

        // hora
        ctx.beginPath(); ctx.moveTo(0,0);
        ctx.lineTo(r*0.5*Math.sin(2*Math.PI*hr/12), -r*0.5*Math.cos(2*Math.PI*hr/12));
        ctx.stroke();

        // minuto
        ctx.beginPath(); ctx.moveTo(0,0);
        ctx.lineTo(r*0.75*Math.sin(2*Math.PI*min/60), -r*0.75*Math.cos(2*Math.PI*min/60));
        ctx.stroke();

        // segundo
        ctx.strokeStyle = 'red';
        ctx.beginPath(); ctx.moveTo(0,0);
        ctx.lineTo(r*0.9*Math.sin(2*Math.PI*sec/60), -r*0.9*Math.cos(2*Math.PI*sec/60));
        ctx.stroke();

        ctx.restore();
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isWeekend = (date, tz) => {
    const d = new Date(new Date().toLocaleString("en-US", { timeZone: tz }));
    const day = d.getDay();
    return day === 0 || day === 6;
  };

  return (
    <div className="clocks">
      {zones.map(z => {
        const now = new Date(new Date().toLocaleString("en-US",{timeZone:z.tz}));
        const hoursMin = now.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
        const hours = now.getHours();
        const weekend = isWeekend(now, z.tz);
        const status = weekend ? 'Fechado' : (hours >= z.open && hours < z.close ? 'Aberto' : 'Fechado');
        const color = status==='Aberto'?'var(--open)':'var(--closed)';

        return (
          <div key={z.tz} className="clock">
            <div className="label">{z.flag} {z.label}</div>
            <canvas className="analog-clock" width="80" height="80" data-tz={z.tz}></canvas>
            <div className="status"><span className="dot" style={{background:color}}></span>{status}</div>
            <div className="time">{hoursMin}</div>
          </div>
        );
      })}
    </div>
  );
}
