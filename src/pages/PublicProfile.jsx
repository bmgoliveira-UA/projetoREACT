import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { users } from '../data/userData';
import { sessions } from '../data/sessionData';
import '../styles/Profile.css';

function PublicProfile() {
  const { id } = useParams(); // :id da rota
  const [user, setUser] = useState(null);
  const [createdSessions, setCreatedSessions] = useState([]);
  const [joinedSessions, setJoinedSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Encontra o utilizador pelo ID
    const foundUser = users.find(u => u.id === parseInt(id));
    if (foundUser) {
      setUser(foundUser);

      // Sessões criadas por este utilizador
      const created = sessions.filter(s => s.creatorId === foundUser.id);
      setCreatedSessions(created);

      // Sessões em que está inscrito
      const joined = sessions.filter(s => s.participants.includes(foundUser.id));
      setJoinedSessions(joined);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="loading">A carregar perfil...</div>;
  }

  if (!user) {
    return <div className="not-found">Utilizador não encontrado.</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="user-info-container">
          <img src={user.avatar} alt={user.name} className="profile-avatar" />
          <div className="username-location">
            <h1>{user.name}</h1>
            <p className="username">@{user.username}</p>
            <p className="location">📍 {user.location}</p>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="profile-bio">
        <h2>Sobre mim</h2>
        <p>{user.bio || 'Este utilizador ainda não adicionou uma bio.'}</p>
        {/* Desportos favoritos */}
        <div className="profile-sports">
          <h2>Desportos favoritos</h2>
          <div className="sports-tags">
            {user.sports.map((sport, index) => (
              <span key={index} className="sport-tag">
                {sport}
              </span>
            ))}
          </div>
          <p className="level">Nível geral: <strong>{user.level}</strong></p>
        </div>
      </div>


      {/* Sessões criadas */}
      <div className="profile-sessions">
        <h2>Sessões criadas ({createdSessions.length})</h2>
        {createdSessions.length === 0 ? (
          <p>Ainda não criou nenhuma sessão.</p>
        ) : (
          <div className="sessions-grid">
            {createdSessions.map(session => (
              <Link key={session.id} to={`/session/${session.id}`} className="session-card">
                <div className="session-sport">{session.sport}</div>
                <h3>{session.title}</h3>
                <p>📅 {session.date} às {session.time}</p>
                <p>📍 {session.location}</p>
                <p className="participants">
                  👥 {session.participants.length}/{session.maxParticipants} participantes
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Sessões inscritas */}
      <div className="profile-sessions">
        <h2>Sessões em que participa ({joinedSessions.length})</h2>
        {joinedSessions.length === 0 ? (
          <p>Ainda não se inscreveu em nenhuma sessão.</p>
        ) : (
          <div className="sessions-grid">
            {joinedSessions.map(session => (
              <Link key={session.id} to={`/session/${session.id}`} className="session-card">
                <div className="session-sport">{session.sport}</div>
                <h3>{session.title}</h3>
                <p>📅 {session.date} às {session.time}</p>
                <p>📍 {session.location}</p>
                <p className="participants">
                  👥 {session.participants.length}/{session.maxParticipants} participantes
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Botão voltar */}
      <div className="back-link">
        <Link to="/explore">← Voltar à exploração</Link>
      </div>
    </div>
  );
}

export default PublicProfile;