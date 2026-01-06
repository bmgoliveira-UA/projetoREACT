import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { currentUser } from '../data/login';
import { sessions, updateSession } from '../data/sessionData';
import '../styles/SessionManagement.css'; // reutiliza o mesmo CSS da CreateSession com pequenas alterações

function EditSession() {
  const { id } = useParams(); // :id da sessão
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
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
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  const sportsList = [
    "Futebol", "Basquetebol", "Ténis", "Padel", "Corrida", "Ciclismo",
    "Natação", "Voleibol", "Yoga", "Fitness", "Andebol", "Surf"
  ];

  const levels = ["Todos os níveis", "Principiante", "Intermédio", "Avançado"];

  useEffect(() => {
    const foundSession = sessions.find(s => s.id === parseInt(id));
    if (foundSession) {
      setSession(foundSession);
      setFormData({
        title: foundSession.title,
        sport: foundSession.sport,
        date: foundSession.date,
        time: foundSession.time,
        location: foundSession.location,
        description: foundSession.description,
        maxParticipants: foundSession.maxParticipants,
        level: foundSession.level
      });

      // Verifica se o utilizador logado é o criador
      if (currentUser && currentUser.id === foundSession.creatorId) {
        setIsOwner(true);
      }
    }
    setLoading(false);
  }, [id]);

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
    if (formData.maxParticipants < session.participants.length) {
      newErrors.maxParticipants = `Não pode ser menor que o número atual de participantes (${session.participants.length})`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const updatedData = {
      id: session.id,
      ...formData,
      maxParticipants: parseInt(formData.maxParticipants)
    };

    const updatedSession = updateSession(updatedData);

    if (!updatedSession) {
      alert('Erro ao atualizar a sessão');
      return;
    }

    setSuccess(true);

    setTimeout(() => {
      navigate(`/session/${id}`);
    }, 2000);
  };

  if (loading) {
    return <div className="loading">A carregar sessão...</div>;
  }

  if (!session) {
    return <div className="not-found">Sessão não encontrada.</div>;
  }

  if (!isOwner) {
    return (
      <div className="access-denied">
        <h2>Acesso negado</h2>
        <p>Só o organizador da sessão pode editá-la.</p>
        <Link to={`/session/${id}`} className="btn-back">Voltar aos detalhes</Link>
      </div>
    );
  }

  return (
    <div className="session-form-container">
      <div className="session-form-card">
        <h1>Editar Sessão</h1>
        <p className="subtitle">Modifica os detalhes da tua sessão de {formData.sport || 'desporto'}</p>

        {success && (
          <div className="success-message">
            <p>✅ Sessão atualizada com sucesso!</p>
            <p>A redirecionar para os detalhes...</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="session-form">
          {/* Os campos são iguais ao CreateSession */}
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

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Data *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min="2025-12-23" // permite datas passadas se necessário
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

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="maxParticipants">Máximo de Participantes</label>
              <input
                type="number"
                id="maxParticipants"
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={handleChange}
                min={session.participants.length} // não pode ser menor que atuais
                max="50"
              />
              {errors.maxParticipants && <span className="error-text">{errors.maxParticipants}</span>}
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

          <div className="form-actions">
            <button type="submit" className="btn-save">
              Guardar Alterações
            </button>
            <Link to={`/session/${id}`} className="btn-cancel">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSession;