import './NewsPanel.css';

export default function NewsPanel({ news }) {
  const latestNews = Array.isArray(news) ? news.slice(0, 10) : [];

  return (
    <div className="news-panel">
      <div className="panel-header">BREAKING NEWS</div>
      <div className="panel-body news-list">
        {latestNews.length === 0 ? (
          <div className="news-item">Nenhuma notícia disponível</div>
        ) : (
          latestNews.map((n, index) => (
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
          ))
        )}
      </div>
    </div>
  );
}
