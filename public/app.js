// 🔹 SOCKET.IO
const socket = io();
socket.on('connect', () => console.log('✅ Conectado ao backend'));

// -----------------------------
// 🔹 TRADINGVIEW CHART
new TradingView.widget({
  width: "100%",
  height: "100%",
  symbol: "OANDA:XAUUSD",
  interval: "15",
  timezone: "Etc/UTC",
  theme: "dark",
  style: "1",
  locale: "pt_BR",
  toolbar_bg: "#0f0f0f",
  enable_publishing: false,
  hide_top_toolbar: false,
  hide_legend: false,
  allow_symbol_change: true,
  container_id: "tv-widget"
});

// -----------------------------
// 🔹 TICKER INFINITO SUAVE (dados do backend)
const tickerEl = document.getElementById('ticker');
const TICKER_SYMBOLS = {}; // obj com todos os símbolos atuais

function createTickerItem(symbol){
  const el = document.createElement('div');
  el.className = 'ticker-item';
  el.innerHTML = `<span class="symbol">${symbol}</span>
                  <span class="price">0.00</span>
                  <span class="arrow">→</span>`;
  tickerEl.appendChild(el);
  return el;
}

let tickerItems = []; // array de elementos do DOM

// Ao receber init do backend, inicializa ticker
socket.on('init', data => {
  const symbols = data.symbols;
  symbols.forEach(s => {
    TICKER_SYMBOLS[s] = { price: 0 };
    tickerItems.push(createTickerItem(s));
  });
  // Duplica para loop infinito
  symbols.forEach(s => tickerItems.push(createTickerItem(s)));
});

// Atualiza ticker quando backend envia
socket.on('ticker', t => {
  if(!TICKER_SYMBOLS[t.symbol]) return;
  const oldPrice = TICKER_SYMBOLS[t.symbol].price;
  TICKER_SYMBOLS[t.symbol].price = t.price;

  // Atualiza todos os elementos correspondentes no carrossel
  tickerItems.forEach(el => {
    if(el.querySelector('.symbol').textContent === t.symbol){
      el.querySelector('.price').textContent = t.price.toFixed(2);
      const arrow = el.querySelector('.arrow');
      if(t.price > oldPrice){
        arrow.textContent = '▲';
        arrow.style.color = 'var(--accent)';
      } else if(t.price < oldPrice){
        arrow.textContent = '▼';
        arrow.style.color = 'var(--accent-down)';
      } else {
        arrow.textContent = '→';
        arrow.style.color = '#ccc';
      }
    }
  });
});

// Animação do ticker (loop infinito e suave)
let tickerPos = 0;
function animateTicker(){
  tickerPos -= 1; // velocidade
  if(Math.abs(tickerPos) > tickerEl.scrollWidth/2){
    tickerPos = 0;
  }
  tickerEl.style.transform = `translateX(${tickerPos}px)`;
  requestAnimationFrame(animateTicker);
}
animateTicker();

// -----------------------------
// 🔹 SIGNALS PANEL
const signalsEl = document.getElementById('signals');
socket.on('signal', s => {
  const li = document.createElement('li');
  li.className = 'signal-item';
  li.innerHTML = `<span style="color:red;">🔴 LIVE</span> <strong>${s.asset}</strong> — ${s.side.toUpperCase()} — score: ${Number(s.score).toFixed(2)}<br>
                  <small>${(s.reasons||[]).join(' • ')}</small>`;
  signalsEl.prepend(li);
  while (signalsEl.children.length > 50) signalsEl.removeChild(signalsEl.lastChild);
});

// -----------------------------
// 🔹 NEWS PANEL
const newsEl = document.getElementById('news');
socket.on('news', newsArr => {
  if(!Array.isArray(newsArr)) return;
  newsEl.innerHTML = newsArr.slice(0,8).map(n => `<div class="news-item">${n.title||n}</div>`).join('');
});

// -----------------------------
// 🔹 CLOCKS ANALÓGICOS
const clocksEl = document.getElementById('clocks');
const zones = [
  { label:'São Paulo', tz:'America/Sao_Paulo' },
  { label:'London', tz:'Europe/London' },
  { label:'New York', tz:'America/New_York' },
  { label:'Tokyo', tz:'Asia/Tokyo' },
  { label:'Frankfurt', tz:'Europe/Berlin' },
  { label:'Sydney', tz:'Australia/Sydney' }
];

function renderClocks(){
  clocksEl.innerHTML = zones.map(z=>{
    const now = new Date();
    const hoursMin = now.toLocaleTimeString('pt-BR',{timeZone:z.tz,hour:'2-digit',minute:'2-digit'});
    const hours = parseInt(now.toLocaleString('en-US',{timeZone:z.tz,hour12:false,hour:'2-digit'}));
    const status = (hours>=9 && hours<=17)?'Aberto':'Fechado';
    const color = status==='Aberto'?'var(--open)':'var(--closed)';

    return `<div class="clock">
              <div class="label">${z.label}</div>
              <canvas class="analog-clock" width="60" height="60" data-tz="${z.tz}"></canvas>
              <div class="status"><span class="dot" style="background:${color}"></span>${status}</div>
              <div class="time">${hoursMin}</div>
            </div>`;
  }).join('');

  // Atualiza ponteiros analógicos
  document.querySelectorAll('.analog-clock').forEach(c=>{
    const ctx = c.getContext('2d');
    const tz = c.dataset.tz;
    const now = new Date();
    const time = new Date(now.toLocaleString('en-US',{timeZone:tz}));
    const w = c.width, h = c.height, r = w/2;
    ctx.clearRect(0,0,w,h);
    ctx.save();
    ctx.translate(r,r);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;

    // Círculo externo
    ctx.beginPath();
    ctx.arc(0,0,r-1,0,2*Math.PI);
    ctx.stroke();

    // Ponteiros
    const sec = time.getSeconds();
    const min = time.getMinutes() + sec/60;
    const hr = time.getHours()%12 + min/60;

    // Hora
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(r*0.5*Math.sin(2*Math.PI*hr/12), -r*0.5*Math.cos(2*Math.PI*hr/12));
    ctx.stroke();

    // Minuto
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(r*0.75*Math.sin(2*Math.PI*min/60), -r*0.75*Math.cos(2*Math.PI*min/60));
    ctx.stroke();

    // Segundo
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(r*0.9*Math.sin(2*Math.PI*sec/60), -r*0.9*Math.cos(2*Math.PI*sec/60));
    ctx.stroke();

    ctx.restore();
  });
}
setInterval(renderClocks,1000);
renderClocks();

// -----------------------------
// 🔹 VOLATILIDADE
const volFill = document.getElementById('vol-fill');
function updateVolatility(vol=50){
  let color = '#ff4d4d';
  if(vol>=30 && vol<=60) color = '#ffcc00';
  else if(vol>60) color = 'var(--accent)';
  volFill.style.width = vol + '%';
  volFill.style.background = color;
}
socket.on('volatility', v => updateVolatility(Number(v)));
updateVolatility(50);
