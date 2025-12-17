import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import Logo from '../assets/react.svg'
import '../data/login.js'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password)
    
    if (!email || !password) {
      setError('Preenche ambos os campos');
      return;
    }

    console.log('Login attempt:', { email, password });
    setError('');

  };

  return (
    <div className='login-general-container'>
        <div className='logo-container'>
            <div className='logo-adjustment'>
                <Link to='/' className='logo'>
                    <img src={Logo} alt=""/>
                </Link>
                <p className='logo-frase'>Build Friendships <br /> Start Sporting</p>
            </div>
        </div>
        <div className='auth-container'>
            <div className='auth-card'>
                <h1>Iniciar Sessão</h1>
                <p className='subtitle'>Encontra parceiros para o teu desporto favorito</p>

                <form onSubmit={handleSubmit} className='auth-form'>

                {/* Mensagem de erro */}
                {error && <p className='error-message'>{error}</p>}

                {/* Email */}
                <div className='auth-input-container' id='email-container'>
                        <label htmlFor="email">
                            Email
                            <input
                                name='email'
                                type='email'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className='auth-input'
                            />
                        </label>
                    </div>

                {/* Password */}
                <div className='auth-input-container' id='password-container'>
                    <label htmlFor='password'>
                        Password
                        <input
                            name='password' 
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className='auth-input'
                        />
                    </label>
                </div>

                <div className='forgot-password'>
                    <Link to='/forgot-password'>Esqueci-me da password</Link>
                </div>

                {/* Botão Login */}
                <button type='submit' className='login-btn' onClick={handleSubmit}>
                    Iniciar Sessão
                </button>

                <p className='signup-link'>
                    Novo no SportConnect?{' '}
                    <Link to='/register'>Criar conta gratuita</Link>
                </p>
                </form>

                <p className='terms'>
                Ao iniciares sessão, aceitas os nossos{' '}
                <a href='#'>Termos</a> e <a href='#'>Privacidade</a>.
                </p>
            </div>
        </div>
    </div>
  );
}

export default Login;