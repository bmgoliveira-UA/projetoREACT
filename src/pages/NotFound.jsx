import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1>404</h1>
        <h2>Oops! Página não encontrada</h2>
        <p>Parece que a página que procuras não existe ou foi movida.</p>

        <div className="notfound-actions">
          <Link to="/" className="btn-home">
            Voltar à Página Inicial
          </Link>
          <Link to="/explore" className="btn-explore">
            Explorar Sessões
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;