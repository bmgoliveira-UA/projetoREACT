import { KEYS } from "../config/constants";

export const initialSessions = [
  {
    id: 1,
    title: "Corrida Matinal no Parque da Cidade",
    sport: "Corrida",
    creatorId: 1, // João Silva
    creatorName: "João Silva",
    date: "2025-12-20",
    time: "07:30",
    location: "Parque da Cidade, Porto",
    description: "Corrida leve de 8km com aquecimento e alongamentos. Todos os ritmos bem-vindos! Vamos correr juntos e terminar com um café.",
    maxParticipants: 12,
    participants: [1, 2, 6], // IDs dos utilizadores inscritos
    level: "Todos os níveis"
  },
  {
    id: 2,
    title: "Jogo de Padel - Duplas Mistos",
    sport: "Padel",
    creatorId: 3, // Pedro Oliveira
    creatorName: "Pedro Oliveira",
    date: "2025-12-21",
    time: "18:00",
    location: "Clube de Padel Oeiras, Lisboa",
    description: "Procuro parceiro ou dupla para jogo amistoso. Nível principiante/intermédio. Depois podemos jantar juntos!",
    maxParticipants: 4,
    participants: [3],
    level: "Principiante a Intermédio"
  },
  {
    id: 3,
    title: "Basquete 3x3 no Jardim da Estrela",
    sport: "Basquetebol",
    creatorId: 2, // Maria Santos
    creatorName: "Maria Santos",
    date: "2025-12-22",
    time: "17:30",
    location: "Jardim da Estrela, Lisboa",
    description: "Jogo descontraído de 3x3. Tragam boa disposição e energia! Todos os níveis são bem-vindos.",
    maxParticipants: 6,
    participants: [2, 5, 1],
    level: "Intermédio"
  },
  {
    id: 4,
    title: "Sessão de Yoga ao Nascer do Sol",
    sport: "Yoga",
    creatorId: 4, // Ana Costa
    creatorName: "Ana Costa",
    date: "2025-12-23",
    time: "06:45",
    location: "Praia de Carcavelos, Cascais",
    description: "Prática de Vinyasa Flow na praia. Tragam tapete, água e boa energia. Meditação final incluída.",
    maxParticipants: 15,
    participants: [4, 8, 1, 10],
    level: "Todos os níveis"
  },
  {
    id: 5,
    title: "Futebol 7 Semanal",
    sport: "Futebol",
    creatorId: 5, // Tiago Ferreira
    creatorName: "Tiago Ferreira",
    date: "2025-12-24",
    time: "20:00",
    location: "Complexo Desportivo de Telheiras, Lisboa",
    description: "Jogo semanal de futebol 7 em campo sintético. Precisamos de mais jogadores! Venham divertir-se.",
    maxParticipants: 14,
    participants: [5, 3, 1, 7],
    level: "Intermédio"
  },
  {
    id: 6,
    title: "Treino de Natação - Técnica",
    sport: "Natação",
    creatorId: 6, // Sofia Mendes
    creatorName: "Sofia Mendes",
    date: "2025-12-25",
    time: "09:00",
    location: "Piscina Municipal de Faro",
    description: "Sessão focada em técnica de crawl e costas. Ideal para quem quer melhorar o estilo. Material necessário: óculos e touca.",
    maxParticipants: 8,
    participants: [6, 4],
    level: "Avançado"
  },
  {
    id: 7,
    title: "Ténis Recreativo - Iniciantes",
    sport: "Ténis",
    creatorId: 7, // Rui Almeida
    creatorName: "Rui Almeida",
    date: "2025-12-27",
    time: "10:00",
    location: "Clube de Ténis de Braga",
    description: "Jogo descontraído para iniciantes e intermédios. Aluguer de raquetes disponível no local.",
    maxParticipants: 4,
    participants: [7, 3],
    level: "Principiante a Intermédio"
  },
  {
    id: 8,
    title: "Treino Funcional ao Ar Livre",
    sport: "Fitness",
    creatorId: 8, // Catarina Lopes
    creatorName: "Catarina Lopes",
    date: "2025-12-28",
    time: "18:30",
    location: "Parque Urbano de Aveiro",
    description: "Treino HIIT com peso corporal. Vamos suar e divertir-nos! Tragam garrafa de água e toalha.",
    maxParticipants: 20,
    participants: [8, 2, 10, 1],
    level: "Todos os níveis"
  },
  {
    id: 9,
    title: "Surf Matinal na Ericeira",
    sport: "Surf",
    creatorId: 9, // Diogo Pereira
    creatorName: "Diogo Pereira",
    date: "2025-12-29",
    time: "08:00",
    location: "Praia de Ribeira d'Ilhas, Ericeira",
    description: "Sessão de surf para intermédios. Pranchas disponíveis para aluguer. Depois café na praia!",
    maxParticipants: 6,
    participants: [9],
    level: "Intermédio"
  },
  {
    id: 10,
    title: "Voleibol de Praia - Equipas Mistas",
    sport: "Voleibol",
    creatorId: 10, // Inês Rodrigues
    creatorName: "Inês Rodrigues",
    date: "2025-12-30",
    time: "16:00",
    location: "Praia da Rocha, Portimão",
    description: "Jogo de voleibol de praia 4x4 ou 6x6. Equipas mistas e boa disposição obrigatória!",
    maxParticipants: 12,
    participants: [10, 8, 5],
    level: "Principiante a Intermédio"
  }
];


const savedSessions = localStorage.getItem(KEYS.SESSIONS);

export const sessions = savedSessions 
  ? JSON.parse(savedSessions) 
  : [...initialSessions]; 

export const saveSessions = () => {
  localStorage.setItem('sportconnect_sessions', JSON.stringify(sessions));
};


export function updateSession(updatedSession) {
  const index = sessions.findIndex(s => s.id === updatedSession.id);

  if (index === -1) return null;

  sessions[index] = {
    ...sessions[index],
    ...updatedSession
  };

  saveSessions();
  return sessions[index];
}
