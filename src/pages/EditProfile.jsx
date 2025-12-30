import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getUserById, updateUser } from '../data/userData';
import { getCurrentUser } from '../utils/auth'; // ou onde tens a função
import '../styles/EditProfile.css'; // ou o teu CSS correspondente

function EditProfile() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const userIdFromUrl = parseInt(searchParams.get('userId'));
  const current = getCurrentUser();

  // Decide qual utilizador editar: o da URL (novo user) ou o logado
  const userToEdit = userIdFromUrl 
    ? getUserById(userIdFromUrl) 
    : current;

  const [formData, setFormData] = useState({
    name: userToEdit?.name || '',
    bio: userToEdit?.bio || '',
    location: userToEdit?.location || '',
    sports: userToEdit?.sports || [],
    level: userToEdit?.level || 'Intermédio'
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // já não precisamos de loading inicial

  const allSports = [
    "Futebol", "Basquetebol", "Ténis", "Padel", "Corrida", "Ciclismo",
    "Natação", "Voleibol", "Yoga", "Fitness", "Andebol", "Surf"
  ];

  const levels = ["Principiante", "Intermédio", "Avançado", "Todos os níveis"];

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

    setLoading(true);

    // Prepara os dados atualizados
    const updatedData = {
      id: userToEdit.id,
      ...formData
    };

    // Atualiza no array global (persistência em memória)
    const updatedUser = updateUser(updatedData);

    if (updatedUser) {
      // Se for o utilizador logado, atualiza também o localStorage
      if (userToEdit.id === current?.id) {
        localStorage.setItem('sportconnect_user', JSON.stringify(updatedUser));
      }

      setSuccess(true);

      setTimeout(() => {
        // Redireciona para o perfil público (ou my-profile se preferires)
        navigate(`/profile/${userToEdit.id}`);
      }, 2000);
    } else {
      alert('Erro ao atualizar perfil');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">A guardar perfil...</div>;
  }

  if (!userToEdit) {
    return <div className="not-found">Utilizador não encontrado.</div>;
  }

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-card">
        <h1>Editar Perfil</h1>
        <p className="subtitle">Atualiza as tuas informações pessoais</p>

        {success && (
          <div className="success-message">
            <p>✅ Perfil atualizado com sucesso!</p>
            <p>A redirecionar...</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="edit-form">
          {/* Nome */}
          <div className="form-group">
            <label htmlFor="name">Nome</label>
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
            <label htmlFor="location">Localização</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Ex: Lisboa, Porto..."
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
            <label>Desportos favoritos (clica para selecionar)</label>
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
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? 'A guardar...' : 'Guardar Alterações'}
            </button>
            <Link to={`/profile/${userToEdit.id}`} className="btn-cancel">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;