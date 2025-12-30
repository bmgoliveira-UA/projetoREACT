import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { currentUser } from '../data/login';
import { sessions } from '../data/sessionData';
import '../styles/MySessions.css';

function MySessions() {
  const navigate = useNavigate();

  const [createdSessions, setCreatedSessions] = useState([]);
  const [joinedSessions, setJoinedSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Sessões criadas
    const created = sessions.filter(s => s.creatorId === currentUser.id);
    setCreatedSessions(created);

    // Sessões em que estou inscrito (excluindo as criadas para não duplicar)
    const joined = sessions.filter(
      s => s.participants.includes(currentUser.id) && s.creatorId !== currentUser.id
    );
    setJoinedSessions(joined);

    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">A carregar as tuas sessões...</div>;
  }

  if (!currentUser) {
    return null; // já redirecionado
  }

  return (
    <div className="mysessions-container">
      <h1>As Minhas Sessões</h1>
      <p className="subtitle">Tudo o que criaste ou em que estás inscrito</p>

      {/* Sessões Criadas */}
      <section className="sessions-section">
        <h2>Sessões que Criei ({createdSessions.length})</h2>

        {createdSessions.length === 0 ? (
          <div className="empty-state">
            <p>Ainda não criaste nenhuma sessão.</p>
            <Link to="/create" className="btn-create">
              + Criar a Minha Primeira Sessão
            </Link>
          </div>
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
                <div className="card-actions">
                  <Link to={`/session/${session.id}/edit`} className="edit-btn">
                    ✏️ Editar
                  </Link>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Sessões Inscritas */}
      <section className="sessions-section">
        <h2>Sessões em que Estou Inscrito ({joinedSessions.length})</h2>

        {joinedSessions.length === 0 ? (
          <div className="empty-state">
            <p>Ainda não te juntaste a nenhuma sessão.</p>
            <Link to="/explore" className="btn-explore">
              Explorar Sessões Disponíveis
            </Link>
          </div>
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
                <div className="card-actions">
                  <span className="creator-tag">Criado por {session.creatorName}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default MySessions;