import { KEYS } from '../context/authContext'

// Carrega todos os perfis do localStorage (ou retorna vazio)
function getProfiles() {
  const data = localStorage.getItem(KEYS.PROFILES);
  return data ? JSON.parse(data) : [];
}

// Guarda todos os perfis no localStorage
function saveProfiles(profiles) {
  localStorage.setItem(KEYS.PROFILES, JSON.stringify(profiles));
}

// 1. Adiciona um novo perfil (quando o utilizador é novo e ainda não existe)
export function addNewProfile(userId, profileData) {
  const profiles = getProfiles();

  // Verifica se já existe (segurança extra)
  if (profiles.some(p => p.userId === userId)) {
    console.warn('Perfil já existe para este userId. Use updateProfile.');
    return null;
  }

  const newProfile = {
    userId,
    ...profileData, // ex: { name, bio, location, sports, level, avatar }
    createdAt: new Date().toISOString()
  };

  profiles.push(newProfile);
  saveProfiles(profiles);

  console.log('Novo perfil adicionado:', newProfile);
  return newProfile;
}

// 2. Atualiza um perfil existente
export function updateProfile(userId, updatedData) {
  const profiles = getProfiles();
  const index = profiles.findIndex(p => p.userId === userId);

  if (index === -1) {
    console.warn('Perfil não encontrado para atualização. Use addNewProfile.');
    return null;
  }

  const updatedProfile = {
    ...profiles[index],
    ...updatedData,
    updatedAt: new Date().toISOString()
  };

  profiles[index] = updatedProfile;
  saveProfiles(profiles);

  console.log('Perfil atualizado:', updatedProfile);
  return updatedProfile;
}

// Função auxiliar: Obtém o perfil de um userId
export function getProfileByUserId(userId) {
  const profiles = getProfiles();
  return profiles.find(p => p.userId === userId) || null;
}