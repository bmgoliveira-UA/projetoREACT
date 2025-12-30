import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { currentUser } from '../data/login';
import '../styles/Header.css';
import Logo from '../components/Logo'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    // Simula logout (em projeto real: limpar token/localStorage)
    console.log('Utilizador desconectado');
    alert('Sessão terminada com sucesso!');
    navigate('/login');
    setIsMenuOpen(false)
  };

  return (
    <header className="header">
      <div className="header-container">
        
        <Logo />
        
        {/* Botão hamburguer para mobile */}
        <button className="menu-toggle" onClick={toggleMenu} aria-label={isMenuOpen ? 'Fechar Menu' : 'Abrir Menu'}>
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        {/* Menu desktop */}
        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/explore" onClick={toggleMenu}>Explorar</Link></li>
            <li><Link to="/create" onClick={toggleMenu}>Criar Sessão</Link></li>

            {currentUser ? (
              <>
                <li><Link to="/mysessions" onClick={toggleMenu}>As Minhas Sessões</Link></li>
                <li><Link to="/myprofile" onClick={toggleMenu}>Perfil</Link></li>
                <li>
                  <button className="logout-btn" onClick={handleLogout}>
                    Terminar Sessão
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" onClick={toggleMenu}>Iniciar Sessão</Link></li>
                <li><Link to="/register" className="register-link" onClick={toggleMenu}>Criar Conta</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;