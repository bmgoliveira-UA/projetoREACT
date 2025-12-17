import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sports, users } from '../data/userData';
import { sessions } from '../data/sessionData'
import '../styles/Explore.css';

function Explore() {
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('todos');
  const [selectedLocation, setSelectedLocation] = useState('todos');
  const [loading, setLoading] = useState(true);

  // Extrai localizações únicas das sessões
  const locations = ['todos', ...Array.from(new Set(sessions.map(s => s.location)))];

  useEffect(() => {
    // Simula carregamento
    setTimeout(() => {
      setFilteredSessions(sessions);
      setLoading(false);
    }, 500);
  }, []);

  // Filtra as sessões sempre que os filtros mudam
  useEffect(() => {
    let filtered = sessions;

    // Filtro por pesquisa (título, descrição ou localização)
    if (searchTerm) {
      filtered = filtered.filter(session =>
        session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por desporto
    if (selectedSport !== 'todos') {
      filtered = filtered.filter(session => session.sport === selectedSport);
    }

    // Filtro por localização
    if (selectedLocation !== 'todos') {
      filtered = filtered.filter(session => session.location === selectedLocation);
    }

    setFilteredSessions(filtered);
  }, [searchTerm, selectedSport, selectedLocation]);

  // Função para encontrar o criador da sessão
  const getCreatorName = (creatorId) => {
    const user = users.find(u => u.id === creatorId);
    return user ? user.name : 'Desconhecido';
  };

  return (
    <div className="explore-container">
      <div className="explore-header">
        <h1>Explorar Sessões</h1>
        <p>Encontra atividades desportivas perto de ti e junta-te!</p>
      </div>

      {/* Filtros */}
      <div className="filters-bar">
        <div className="search-input">
          <input
            type="text"
            placeholder="Pesquisar por título, localização..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        <select value={selectedSport} onChange={(e) => setSelectedSport(e.target.value)}>
          <option value="todos">Todos os desportos</option>
          {sports.map(sport => (
            <option key={sport} value={sport}>{sport}</option>
          ))}
        </select>

        <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
          <option value="todos">Todas as localizações</option>
          {locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        <Link to="/create" className="btn-create">
          + Criar Sessão
        </Link>
      </div>

      {/* Conteúdo */}
      <div className="sessions-content">
        {loading ? (
          <p className="loading">A carregar sessões...</p>
        ) : filteredSessions.length === 0 ? (
          <div className="no-results">
            <p>Nenhuma sessão encontrada com os filtros atuais.</p>
            <p>Tenta alterar a pesquisa ou sê o primeiro a criar uma sessão!</p>
            <Link to="/create" className="btn-primary">Criar Sessão</Link>
          </div>
        ) : (
          <div className="sessions-grid">
            {filteredSessions.map(session => (
              <Link key={session.id} to={`/session/${session.id}`} className="session-card">
                <div className="session-header">
                  <span className="sport-tag">{session.sport}</span>
                  <span className="level-tag">{session.level}</span>
                </div>
                <h3>{session.title}</h3>
                <p className="creator">Por {getCreatorName(session.creatorId)}</p>
                <div className="session-details">
                  <p>📍 {session.location}</p>
                  <p>📅 {session.date} às {session.time}</p>
                  <p>👥 {session.participants.length}/{session.maxParticipants} participantes</p>
                </div>
                <p className="description-preview">
                  {session.description.length > 100
                    ? session.description.substring(0, 100) + '...'
                    : session.description}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Explore;