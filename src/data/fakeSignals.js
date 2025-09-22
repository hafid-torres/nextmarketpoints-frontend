// fakeSignals.js

// Sinais fakes já existentes (ativos, notícias etc)
export const fakeActiveSignals = [
  { id: 'a1', ativo: 'XAUUSD', direcao: 'COMPRA', preco: 1925, hora: '09:00', status: 'ativo' },
  { id: 'a2', ativo: 'EURUSD', direcao: 'VENDA', preco: 1.091, hora: '09:05', status: 'ativo' },
  { id: 'a3', ativo: 'BTCUSD', direcao: 'COMPRA', preco: 27200, hora: '09:10', status: 'ativo' },
  // ...adicione mais ativos se quiser
];

// 🔹 NOVO: Sinais fechados para StatsPanel
export const fakeClosedSignals = [
  { id: '1', ativo: 'XAUUSD', direcao: 'COMPRA', preco: 1920, hora: '09:00', status: 'fechado', resultado: 'ganho' },
  { id: '2', ativo: 'EURUSD', direcao: 'VENDA', preco: 1.092, hora: '09:15', status: 'fechado', resultado: 'perda' },
  { id: '3', ativo: 'GBPUSD', direcao: 'COMPRA', preco: 1.227, hora: '09:30', status: 'fechado', resultado: 'ganho' },
  { id: '4', ativo: 'JPYUSD', direcao: 'VENDA', preco: 0.0092, hora: '09:45', status: 'fechado', resultado: 'ganho' },
  { id: '5', ativo: 'BTCUSD', direcao: 'COMPRA', preco: 27100, hora: '10:00', status: 'fechado', resultado: 'perda' },
  { id: '6', ativo: 'XAUUSD', direcao: 'VENDA', preco: 1915, hora: '10:15', status: 'fechado', resultado: 'perda' },
  { id: '7', ativo: 'EURUSD', direcao: 'COMPRA', preco: 1.088, hora: '10:30', status: 'fechado', resultado: 'ganho' },
  { id: '8', ativo: 'GBPUSD', direcao: 'VENDA', preco: 1.225, hora: '10:45', status: 'fechado', resultado: 'perda' },
  { id: '9', ativo: 'JPYUSD', direcao: 'COMPRA', preco: 0.0091, hora: '11:00', status: 'fechado', resultado: 'perda' },
  { id: '10', ativo: 'BTCUSD', direcao: 'VENDA', preco: 27050, hora: '11:15', status: 'fechado', resultado: 'ganho' },
];

// Fake de insights / notícias se quiser testar InsightsPanel
export const fakeInsights = [
  { id: 'n1', hora: '08:00', tipo: 'oportunidade', msg: 'XAUUSD em tendência de alta' },
  { id: 'n2', hora: '08:30', tipo: 'queda', msg: 'EURUSD pode corrigir após rally' },
  { id: 'n3', hora: '09:00', tipo: 'alerta', msg: 'BTCUSD alta volatilidade detectada' },
];
