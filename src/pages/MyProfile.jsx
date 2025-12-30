import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { currentUser } from '../data/login';
import { sessions } from '../data/sessionData';
import '../styles/Profile.css';

function MyProfile() {
  const navigate = useNavigate();

  const [createdSessions, setCreatedSessions] = useState([]);
  const [joinedSessions, setJoinedSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Sessões criadas pelo utilizador logado
    const created = sessions.filter(s => s.creatorId === currentUser.id);
    setCreatedSessions(created);

    // Sessões em que está inscrito (exceto as que criou, para não duplicar)
    const joined = sessions.filter(
      s => s.participants.includes(currentUser.id) && s.creatorId !== currentUser.id
    );
    setJoinedSessions(joined);

    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">A carregar o teu perfil...</div>;
  }

  if (!currentUser) {
    return null; // redirecionado acima
  }

  const totalSessions = createdSessions.length + joinedSessions.length;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="user-info-container">
          <img src={currentUser.avatar} alt={currentUser.name} className="profile-avatar" />
          <div className="user-name-location">
            <h1>{currentUser.name}</h1>
            <p className="username">@{currentUser.username}</p>
            <p className="location">📍 {currentUser.location}</p>
          </div>
        </div>
        <div className="profile-main-info">
          <div className="stats">
            <div className="stat">
              <strong>{createdSessions.length}</strong>
              <span>Sessões criadas</span>
            </div>
            <div className="stat">
              <strong>{joinedSessions.length}</strong>
              <span>Sessões inscritas</span>
            </div>
            <div className="stat">
              <strong>{totalSessions}</strong>
              <span>Total de atividades</span>
            </div>
          </div>
          <Link to="/profile/edit" className="btn-edit">
            ✏️ Editar Perfil
          </Link>
        </div>
      </div>

      {/* Bio */}
      {currentUser.bio && (
        <div className="profile-bio">
          <h2>Sobre mim</h2>
          <p>{currentUser.bio}</p>
          {/* Desportos favoritos */}
          <div className="profile-sports">
            <h2>Desportos favoritos</h2>
            <div className="sports-tags">
              {currentUser.sports.map((sport, index) => (
                <span key={index} className="sport-tag">{sport}</span>
              ))}
            </div>
            <p className="level">Nível geral: <strong>{currentUser.level}</strong></p>
          </div>
        </div>
      )}

      {/* Sessões criadas */}
      <div className="profile-sessions-section">
        <div className="section-header">
          <h2>Minhas Sessões Criadas ({createdSessions.length})</h2>
        </div>

        {createdSessions.length === 0 ? (
          <p className="empty-message">
            Ainda não criaste nenhuma sessão.{' '}
            <Link to="/create">Cria a tua primeira sessão agora!</Link>
          </p>
        ) : (
          <div className="sessions-grid">
            {createdSessions.map(session => (
              <Link key={session.id} to={`/session/${session.id}`} className="session-card">
                <div className="session-sport">{session.sport}</div>
                <h3>{session.title}</h3>
                <p>📅 {session?.date || 'Data não definida'} às {session?.time || 'Hora não definida'}</p>
                <p>📍 {session.location}</p>
                <p className="participants">
                  👥 {session.participants.length}/{session.maxParticipants} participantes
                </p>
                <div className="card-actions">
                  <Link to={`/session/${session.id}/edit`} className="edit-link">
                    Editar
                  </Link>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Sessões inscritas */}
      <div className="profile-sessions-section">
        <h2>Sessões em que estou inscrito ({joinedSessions.length})</h2>

        {joinedSessions.length === 0 ? (
          <p className="empty-message">
            Ainda não te inscreveste em nenhuma sessão.{' '}
            <Link to="/explore">Explora sessões disponíveis!</Link>
          </p>
        ) : (
          <div className="sessions-grid">
            {joinedSessions.map(session => (
              <Link key={session.id} to={`/session/${session.id}`} className="session-card">
                <div className="session-sport">{session.sport}</div>
                <h3>{session.title}</h3>
                <p>📅 {session?.date || 'Data não definida'} às {session?.time || 'Hora não definida'}</p>
                <p>📍 {session.location}</p>
                <p className="participants">
                  👥 {session.participants.length}/{session.maxParticipants} participantes
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProfile;