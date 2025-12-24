import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { currentUser, users } from '../data/userData';
import '../styles/EditProfile.css';

function EditProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    sports: [],
    level: 'Intermédio'
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const allSports = [
    "Futebol", "Basquetebol", "Ténis", "Padel", "Corrida", "Ciclismo",
    "Natação", "Voleibol", "Yoga", "Fitness", "Andebol", "Surf"
  ];

  const levels = ["Principiante", "Intermédio", "Avançado", "Todos os níveis"];

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setFormData({
      name: currentUser.name || '',
      bio: currentUser.bio || '',
      location: currentUser.location || '',
      sports: currentUser.sports || [],
      level: currentUser.level || 'Intermédio'
    });
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSportsChange = (sport) => {
    setFormData(prev => {
      const sports = prev.sports.includes(sport)
        ? prev.sports.filter(s => s !== sport)
        : [...prev.sports, sport];
      return { ...prev, sports };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'O nome é obrigatório';
    if (!formData.location.trim()) newErrors.location = 'A localização é obrigatória';
    if (formData.sports.length === 0) newErrors.sports = 'Escolhe pelo menos um desporto';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Simula atualização do perfil
    const updatedUser = {
      ...currentUser,
      ...formData
    };

    console.log('Perfil atualizado:', updatedUser);
    // Em projeto real: atualizarias currentUser ou enviarias para backend

    setSuccess(true);

    setTimeout(() => {
      navigate(`/profile/${currentUser.id}`);
    }, 2000);
  };

  if (loading) {
    return <div className="loading">A carregar perfil...</div>;
  }

  if (!currentUser) {
    return <div className="not-found">Utilizador não encontrado.</div>;
  }

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-card">
        <h1>Editar Perfil</h1>
        <p className="subtitle">Atualiza as tuas informações pessoais</p>

        {/* Avatar atual (não editável neste projeto simples) */}
        <div className="current-avatar">
          <img src={currentUser.avatar} alt={currentUser.name} />
          <p>Foto de perfil (não editável nesta versão)</p>
        </div>

        {success && (
          <div className="success-message">
            <p>✅ Perfil atualizado com sucesso!</p>
            <p>A redirecionar...</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="edit-form">
          {/* Nome */}
          <div className="form-group">
            <label htmlFor="name">Nome *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
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
              placeholder="Ex: Lisboa, Porto, Coimbra..."
              className={errors.location ? 'error' : ''}
            />
            {errors.location && <span className="error-text">{errors.location}</span>}
          </div>

          {/* Bio */}
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              placeholder="Fala um pouco sobre ti e os teus interesses desportivos..."
            />
          </div>

          {/* Desportos favoritos */}
          <div className="form-group">
            <label>Desportos favoritos * (clica para selecionar)</label>
            <div className="sports-checkboxes">
              {allSports.map(sport => (
                <label key={sport} className="sport-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.sports.includes(sport)}
                    onChange={() => handleSportsChange(sport)}
                  />
                  <span>{sport}</span>
                </label>
              ))}
            </div>
            {errors.sports && <span className="error-text">{errors.sports}</span>}
          </div>

          {/* Nível */}
          <div className="form-group">
            <label htmlFor="level">Nível Geral</label>
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

          {/* Botões */}
          <div className="form-actions">
            <button type="submit" className="btn-save">
              Guardar Alterações
            </button>
            <Link to={`/profile/${currentUser.id}`} className="btn-cancel">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;