import { Link } from 'react-router-dom';
import { sessions, sports } from '../data/userData';
import { useState, useEffect } from 'react';
import '../styles/Home.css'; // vamos criar o CSS depois

function Home() {
  const [featuredSessions, setFeaturedSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento dos dados
    setTimeout(() => {
      // Mostra as 6 sessões mais recentes ou aleatórias
      const shuffled = [...sessions].sort(() => 0.5 - Math.random());
      setFeaturedSessions(shuffled.slice(0, 6));
      setLoading(false);
    }, 600);
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Encontra parceiros para praticar desporto</h1>
          <p className="hero-subtitle">
            Junta-te a sessões perto de ti ou cria a tua própria atividade.
          </p>
          <div className="hero-buttons">
            <Link to="/explore" className="btn-primary">
              Explorar Sessões
            </Link>
            <Link to="/create" className="btn-secondary">
              Criar Sessão
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop"
            alt="Grupo de pessoas a praticar desporto"
          />
        </div>
      </section>

      {/* Desportos Populares */}
      <section className="sports-section">
        <div className="container">
          <h2>Desportos Populares</h2>
          <div className="sports-grid">
            {sports.slice(0, 8).map((sport, index) => (
              <Link key={index} to={`/explore?sport=${sport}`} className="sport-card">
                <div className="sport-icon">
                  {/* Ícones simples com emoji – podes substituir por SVGs depois */}
                  {sport === "Futebol" && "⚽"}
                  {sport === "Basquetebol" && "🏀"}
                  {sport === "Ténis" && "🎾"}
                  {sport === "Padel" && "🏓"}
                  {sport === "Corrida" && "🏃"}
                  {sport === "Ciclismo" && "🚴"}
                  {sport === "Natação" && "🏊"}
                  {sport === "Yoga" && "🧘"}
                  {!["Futebol","Basquetebol","Ténis","Padel","Corrida","Ciclismo","Natação","Yoga"].includes(sport) && "🏅"}
                </div>
                <p>{sport}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sessões em Destaque */}
      <section className="featured-sessions">
        <div className="container">
          <h2>Sessões em Destaque</h2>
          {loading ? (
            <p className="loading">A carregar sessões...</p>
          ) : (
            <div className="sessions-grid">
              {featuredSessions.length === 0 ? (
                <p>Ainda não há sessões criadas. Sê o primeiro a criar uma!</p>
              ) : (
                featuredSessions.map(session => (
                  <Link key={session.id} to={`/session/${session.id}`} className="session-card">
                    <div className="session-sport">{session.sport}</div>
                    <h3>{session.title}</h3>
                    <p className="session-info">
                      📍 {session.location}
                    </p>
                    <p className="session-info">
                      📅 {session.date} às {session.time}
                    </p>
                    <p className="participants">
                      👥 {session.participants.length}/{session.maxParticipants} participantes
                    </p>
                  </Link>
                ))
              )}
            </div>
          )}
          <div className="view-all">
            <Link to="/explore">Ver todas as sessões →</Link>
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="cta-section">
        <div className="container">
          <h2>Pronto para começar?</h2>
          <p>Junta-te à comunidade e marca a tua próxima atividade desportiva.</p>
          <Link to="/create" className="btn-primary large">
            Criar a Minha Primeira Sessão
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;