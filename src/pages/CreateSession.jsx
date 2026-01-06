import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { createSession } from '../utils/sessionUtils';
import '../styles/SessionManagement.css';
import { getCurrentUser } from '../utils/auth';

function CreateSession() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  // Redirect immediately if not logged in
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const [formData, setFormData] = useState({
    title: '',
    sport: '',
    date: '',
    time: '',
    location: '',
    description: '',
    maxParticipants: 10,
    level: 'Todos os níveis'
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const sportsList = [
    "Futebol", "Basquetebol", "Ténis", "Padel", "Corrida", "Ciclismo",
    "Natação", "Voleibol", "Yoga", "Fitness", "Andebol", "Surf"
  ];

  const levels = ["Todos os níveis", "Principiante", "Intermédio", "Avançado"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'O título é obrigatório';
    if (!formData.sport) newErrors.sport = 'Escolhe um desporto';
    if (!formData.date) newErrors.date = 'A data é obrigatória';
    if (!formData.time) newErrors.time = 'A hora é obrigatória';
    if (!formData.location.trim()) newErrors.location = 'A localização é obrigatória';
    if (!formData.description.trim()) newErrors.description = 'A descrição é obrigatória';
    if (parseInt(formData.maxParticipants) < 2) {
      newErrors.maxParticipants = 'Mínimo 2 participantes';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSuccess(false);

    try {
      const newSessionId = await createSession(formData);

      if (newSessionId) {
        setSuccess(true);
        setTimeout(() => {
          navigate(`/session/${newSessionId}`);
        }, 1500);
      } else {
        alert('Erro ao criar a sessão.');
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
      alert('Ocorreu um erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="session-form-container">
      <div className="session-form-card">
        <h1>Criar Nova Sessão Desportiva</h1>
        <p className="subtitle">
          Convida pessoas para praticar {formData.sport || 'desporto'} contigo!
        </p>

        {success && (
          <div className="success-message">
            <p>✅ Sessão criada com sucesso!</p>
            <p>A redirecionar para os detalhes...</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="session-form">
          {/* Título */}
          <div className="form-group">
            <label htmlFor="title">Título da Sessão *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          {/* Desporto */}
          <div className="form-group">
            <label htmlFor="sport">Desporto *</label>
            <select
              id="sport"
              name="sport"
              value={formData.sport}
              onChange={handleChange}
              className={errors.sport ? 'error' : ''}
            >
              <option value="">Seleciona um desporto</option>
              {sportsList.map(sport => (
                <option key={sport} value={sport}>{sport}</option>
              ))}
            </select>
            {errors.sport && <span className="error-text">{errors.sport}</span>}
          </div>

          {/* Data & Hora */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Data *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={errors.date ? 'error' : ''}
              />
              {errors.date && <span className="error-text">{errors.date}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="time">Hora *</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={errors.time ? 'error' : ''}
              />
              {errors.time && <span className="error-text">{errors.time}</span>}
            </div>
          </div>

          {/* Localização */}
          <div className="form-group">
            <label htmlFor="location">Localização *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={errors.location ? 'error' : ''}
            />
            {errors.location && <span className="error-text">{errors.location}</span>}
          </div>

          {/* Descrição */}
          <div className="form-group">
            <label htmlFor="description">Descrição *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>

          {/* Máx participantes & nível */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="maxParticipants">Máximo de Participantes</label>
              <input
                type="number"
                id="maxParticipants"
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={handleChange}
                min="2"
                max="50"
              />
              {errors.maxParticipants && (
                <span className="error-text">{errors.maxParticipants}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="level">Nível Recomendado</label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Botões */}
          <div className="form-actions">
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? 'A criar...' : 'Criar Sessão'}
            </button>
            <Link to="/explore" className="btn-cancel">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateSession;
