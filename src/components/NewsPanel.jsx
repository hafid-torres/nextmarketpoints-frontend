import './NewsPanel.css';

export default function NewsPanel({ news }) {
  // Mantém somente as 10 últimas notícias
  const latestNews = news.slice(0, 10);

  return (
    <div className="news-panel">
      <div className="news-header">
        BREAKING NEWS
      </div>
      <div className="news-list">
        {latestNews.map((n, index) => (
          <a 
            key={index} 
            href={n.url || n.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="news-item"
          >
            <div className="news-title">{n.title || n.titulo}</div>
            <div className="news-meta">
              <span className="news-source">{n.source || 'Unknown'}</span>
              <span className="news-time">{n.publishedAt || n.horario}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
