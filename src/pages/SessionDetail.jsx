import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { sessions } from '../data/sessionData';
import { users, currentUser } from '../data/userData';
import '../styles/SessionDetail.css';

function SessionDetail() {
  const { id } = useParams(); // pega o :id da rota /session/:id
  const [session, setSession] = useState(null);
  const [creator, setCreator] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Encontra a sessão pelo ID
    const foundSession = sessions.find(s => s.id === parseInt(id));
    if (foundSession) {
      setSession(foundSession);

      // Encontra o criador
      const creatorUser = users.find(u => u.id === foundSession.creatorId);
      setCreator(creatorUser);

      // Encontra os participantes
      const participantUsers = users.filter(u => foundSession.participants.includes(u.id));
      setParticipants(participantUsers);

      // Verifica se o currentUser já está inscrito
      if (currentUser && foundSession.participants.includes(currentUser.id)) {
        setIsJoined(true);
      }
    }
    setLoading(false);
  }, [id]);

  // Função para juntar-se / sair da sessão (simulação)
  const handleJoinToggle = () => {
    if (!currentUser) {
      alert('Precisas de estar logado para te juntares a uma sessão!');
      return;
    }

    if (isJoined) {
      // Simula sair
      setIsJoined(false);
      alert('Saíste da sessão!');
    } else {
      // Simula juntar-se
      if (session.participants.length >= session.maxParticipants) {
        alert('Esta sessão já está cheia!');
        return;
      }
      setIsJoined(true);
      alert('Juntaste-te à sessão com sucesso!');
    }
  };

  if (loading) {
    return <div className="loading">A carregar detalhes da sessão...</div>;
  }

  if (!session) {
    return <div className="not-found">Sessão não encontrada.</div>;
  }

  return (
    <div className="session-detail-container">
      <div className="session-header">
        <div className="session-sport-tag">{session.sport}</div>
        <div className="session-level">{session.level}</div>
      </div>

      <h1>{session.title}</h1>

      <div className="session-meta">
        <p>📍 <strong>Localização:</strong> {session.location}</p>
        <p>📅 <strong>Data:</strong> {session.date} às {session.time}</p>
        <p>👥 <strong>Participantes:</strong> {session.participants.length} / {session.maxParticipants}</p>
      </div>

      <div className="session-description">
        <h2>Descrição</h2>
        <p>{session.description}</p>
      </div>

      {/* Criador da sessão */}
      {creator && (
        <div className="creator-section">
          <h2>Organizador</h2>
          <Link to={`/profile/${creator.id}`} className="creator-card">
            <img src={creator.avatar} alt={creator.name} className="creator-avatar" />
            <div>
              <h3>{creator.name}</h3>
              <p>@{creator.username} • {creator.location}</p>
            </div>
          </Link>
        </div>
      )}

      {/* Lista de participantes */}
      <div className="participants-section">
        <h2>Participantes ({session.participants.length})</h2>
        {participants.length === 0 ? (
          <p>Ainda ninguém se juntou. Sê o primeiro!</p>
        ) : (
          <div className="participants-grid">
            {participants.map(user => (
              <Link key={user.id} to={`/profile/${user.id}`} className="participant-card">
                <img src={user.avatar} alt={user.name} />
                <p>{user.name}</p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Botão de ação */}
      <div className="action-buttons">
        <button
          onClick={handleJoinToggle}
          className={`join-btn ${isJoined ? 'joined' : ''} ${
            session.participants.length >= session.maxParticipants ? 'full' : ''
          }`}
          disabled={session.participants.length >= session.maxParticipants && !isJoined}
        >
          {session.participants.length >= session.maxParticipants && !isJoined
            ? 'Sessão Cheia'
            : isJoined
            ? 'Sair da Sessão'
            : 'Juntar-me'}
        </button>

        <Link to="/explore" className="back-btn">
          ← Voltar às sessões
        </Link>
      </div>
    </div>
  );
}

export default SessionDetail;