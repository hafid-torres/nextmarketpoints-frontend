import "./Header.css";

export default function Header() {
  return (
    <header className="site-header">
      <div className="brand">
        <div className="logo"><span>THE NEXT</span> MARKET POINTS</div>
      </div>
      <nav className="main-nav">
        <div className="nav-item">Ferramentas ▾
          <div className="dropdown">
            <div className="dropdown-item">Calendário</div>
            <div className="dropdown-item">Indicadores</div>
          </div>
        </div>
        <div className="nav-item">Gerenciamento ▾
          <div className="dropdown">
            <div className="dropdown-item">Carteira</div>
            <div className="dropdown-item">Alertas</div>
          </div>
        </div>
        <div className="nav-item">Sobre Nós ▾
          <div className="dropdown">
            <div className="dropdown-item">Equipe</div>
            <div className="dropdown-item">Contato</div>
          </div>
        </div>
      </nav>
      <div className="auth">
        <button className="btn-primary">Registro →</button>
        <button className="btn-outline">Login →</button>
      </div>
    </header>
  );
}
