import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { addUser } from '../data/userData';
import { addLoginCredential } from '../data/login';
import { login } from '../utils/auth'
import '../styles/Register.css';
import '../styles/GeneralStyles.css';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'O nome é obrigatório';
    if (!formData.email.trim()) newErrors.email = 'O email é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.password) newErrors.password = 'A password é obrigatória';
    else if (formData.password.length < 6) newErrors.password = 'A password deve ter pelo menos 6 caracteres';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As passwords não coincidem';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    // Cria o novo utilizador
    const newUser = addUser({
      name: formData.name,
      email: formData.email
    });

    // Adiciona credenciais de login
    addLoginCredential(newUser.id, formData.email, formData.password);

    console.log('Novo utilizador criado:', newUser);

    //Login Automático
    const loggedInUser = login(formData.email, formData.password)
    
    if (loggedInUser) {
      setLoading(false);
      setSuccess(true);
      
      // Redireciona para edit-profile com o novo ID
      setTimeout(() => {
        navigate(`/profile/edit?userId=${newUser.id}`);
      }, 2000);
    } else {
      setErrors('Não consguiu iniciar a sessão de forma automática')
      setLoading(false)
    }

  };

  return (
    <div className="auth-container">
      {/* Lado esquerdo - Logo */}
      <div className="logo-container">
        <div className="logo-adjustment">
          <Logo />
          <p className="logo-frase">Build Friendships <br /> Start Sporting</p>
        </div>
      </div>

      {/* Lado direito - Formulário */}
      <div className="card-container">
        <div className="card">
          <h1>Criar Conta</h1>
          <p className="subtitle">Junta-te ao SportConnect e encontra parceiros para o teu desporto favorito</p>

          {success && (
            <div className="success-message">
              <p>✅ Conta criada com sucesso!</p>
              <p>A redirecionar para configuração do perfil...</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="register-form">
            {/* Nome */}
            <div className="input-container">
              <label htmlFor="name">Nome completo</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: João Silva"
                className="input"
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className="input-container">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="exemplo@email.com"
                className="input"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
                className="input"
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            {/* Confirmar Password */}
            <div className="input-container">
              <label htmlFor="confirmPassword">Confirmar Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repete a password"
                className="input"
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>

            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? 'A criar conta...' : 'Criar Conta'}
            </button>

            <p className="login-link">
              Já tens conta? <Link to="/login">Inicia sessão</Link>
            </p>

            <p className="terms">
              Ao criares conta, aceitas os nossos{' '}
              <Link to="#">Termos de Utilização</Link> e{' '}
              <Link to="#">Política de Privacidade</Link>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;