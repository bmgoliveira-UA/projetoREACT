import '../styles/Logo.css';
import { Link } from 'react-router-dom';

function Logo() {
    return <Link to="/" className="logo">
          <span className="logo-icon">🏃‍♂️</span>
          <span className="logo-text">SportConnect</span>
        </Link>
}

export default Logo