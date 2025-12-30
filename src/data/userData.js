// src/data/mockData.js

export const sports = [
  "Futebol",
  "Basquetebol",
  "Ténis",
  "Padel",
  "Corrida",
  "Ciclismo",
  "Natação",
  "Voleibol",
  "Yoga",
  "Fitness",
  "Andebol",
  "Surf"
];

export const users = [
  {
    id: 1,
    username: "joao_runner",
    name: "João Silva",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    bio: "Adoro correr ao amanhecer! Procuro parceiro para treinos semanais.",
    location: "Lisboa",
    sports: ["Corrida", "Ciclismo"],
    level: "Intermédio"
  },
  {
    id: 2,
    username: "maria_hoops",
    name: "Maria Santos",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    bio: "Basquete é vida 🏀 Procuro equipa feminina ou mista.",
    location: "Porto",
    sports: ["Basquetebol", "Fitness"],
    level: "Avançado"
  },
  {
    id: 3,
    username: "pedro_padel",
    name: "Pedro Oliveira",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    bio: "Viciado em padel! Disponível fins de semana.",
    location: "Lisboa",
    sports: ["Padel", "Ténis"],
    level: "Principiante"
  },
  {
    id: 4,
    username: "ana_yoga",
    name: "Ana Costa",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    bio: "Yoga e meditação ao ar livre. Todos os níveis bem-vindos 🌿",
    location: "Coimbra",
    sports: ["Yoga", "Natação"],
    level: "Todos os níveis"
  },
  {
    id: 5,
    username: "tiago_footy",
    name: "Tiago Ferreira",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    bio: "Futebol de 7 ou 11, qualquer dia da semana!",
    location: "Lisboa",
    sports: ["Futebol", "Andebol"],
    level: "Intermédio"
  },
  {
    id: 6,
    username: "sofia_swim",
    name: "Sofia Mendes",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    bio: "Natação competitiva e treinos de técnica. Venham nadar!",
    location: "Faro",
    sports: ["Natação", "Corrida"],
    level: "Avançado"
  },
  {
    id: 7,
    username: "rui_tennis",
    name: "Rui Almeida",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    bio: "Ténis recreativo aos sábados. Todos bem-vindos!",
    location: "Braga",
    sports: ["Ténis", "Padel"],
    level: "Intermédio"
  },
  {
    id: 8,
    username: "catarina_fit",
    name: "Catarina Lopes",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    bio: "Aulas de grupo e treinos funcionais. Vamos suar!",
    location: "Aveiro",
    sports: ["Fitness", "Yoga"],
    level: "Todos os níveis"
  },
  {
    id: 9,
    username: "diogo_surf",
    name: "Diogo Pereira",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    bio: "Surf nas ondas da Ericeira. Procuro companhia!",
    location: "Ericeira",
    sports: ["Surf", "Ciclismo"],
    level: "Intermédio"
  },
  {
    id: 10,
    username: "ines_volley",
    name: "Inês Rodrigues",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    bio: "Voleibol de praia no verão! Equipas mistas.",
    location: "Portimão",
    sports: ["Voleibol", "Fitness"],
    level: "Principiante a Intermédio"
  }
];

let nextUserId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

export function addUser(newUserData) {
  const newUser = {
    id: nextUserId++,
    username: newUserData.email.split('@')[0], // gera username automático (podes alterar)
    name: newUserData.name,
    email: newUserData.email,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg", // avatar padrão (podes mudar)
    bio: "",
    location: "",
    sports: [],
    level: "Intermédio"
  };

  users.push(newUser);
  return newUser;
}

export function getUserById(id) {
  return users.find(u => u.id === id);
}


export function updateUser(updatedUser) {
  const index = users.findIndex(u => u.id === updatedUser.id);
  if (index !== -1) {
    users[index] = {
      ...users[index],  // mantém dados antigos
      ...updatedUser    // sobrescreve com novos
    };
    console.log('Utilizador atualizado:', users[index]);
    return users[index];
  }
  console.warn('Utilizador não encontrado para atualização');
  return null;
}