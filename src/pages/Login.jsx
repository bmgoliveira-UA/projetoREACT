import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import '../styles/GeneralStyles.css';
import Logo from '../components/Logo.jsx'
import { login } from '../utils/auth.js'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate()

const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
        setError('Preenche ambos os campos');
        return;
    }
    
    const user = login(email, password)

    if (user) {
        console.log(user);
        navigate('/')
    } else {
        setError('Dados Incorretos')
    }
  };

  return (
    <div className='auth-container'>
        <div className='logo-container'>
            <div className='logo-adjustment'>
                <Logo />
                <p className='logo-frase'>Build Friendships <br /> Start Sporting</p>
            </div>
        </div>
        <div className='card-container'>
            <div className='card'>
                <h1>Iniciar Sessão</h1>
                <p className='subtitle'>Encontra parceiros para o teu desporto favorito</p>

                <form onSubmit={handleSubmit} className='auth-form'>

                {/* Mensagem de erro */}
                {error && <p className='error-message'>{error}</p>}

                {/* Email */}
                <div className='input-container' id='email-container'>
                        <label htmlFor="email">
                            Email
                            <input
                                name='email'
                                type='email'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className='input'
                            />
                        </label>
                    </div>

                {/* Password */}
                <div className='input-container' id='password-container'>
                    <label htmlFor='password'>
                        Password
                        <input
                            name='password' 
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className='input'
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