export const loginCredentials = [
  { userId: 1, email: "user1@email.com", password: "password" },
  { userId: 2, email: "user2@email.com", password: "password" },
  { userId: 3, email: "user3@email.com", password: "password" },
  { userId: 4, email: "user4@email.com", password: "password" },
  { userId: 5, email: "user5@email.com", password: "password" },
  { userId: 6, email: "user6@email.com", password: "password" },
  { userId: 7, email: "user7@email.com", password: "password" },
  { userId: 8, email: "user8@email.com", password: "password" },
  { userId: 9, email: "user9@email.com", password: "password" },
  { userId: 10, email: "user10@email.com", password: "password" }
];

export let currentUser = null;

export const setCurrentUser = (currentUsarData) => {
  currentUser = currentUsarData
}


export function addLoginCredential(userId, email, password) {
  loginCredentials.push({ userId, email, password });
}