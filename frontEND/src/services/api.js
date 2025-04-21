import axios from "axios";

const API_URL = "http://localhost:5005/api";

/**
 * Crée un nouveau profil utilisateur.
 * @param {Object} userData - Les données de l'utilisateur (firstName, lastName, etc.).
 * @returns {Promise<Object>} La réponse du serveur en JSON.
 */
export async function createProfile(userData) {
  try {
    const response = await fetch(`${API_URL}/auth/profil`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // pour envoyer/recevoir les cookies (sessions)
      body: JSON.stringify(userData),
    });

    // Tenter de parser la réponse
    const data = await response.json();

    if (!response.ok) {
      // Si le serveur renvoie un statut d'erreur, on lève une exception
      throw new Error(data.error || "Erreur lors de la création du profil.");
    }
    return data;
  } catch (error) {
    // On renvoie l'erreur pour que le composant qui appelle la fonction puisse la gérer
    throw error;
  }
}

/**
 * Connecte un utilisateur existant.
 * @param {Object} loginData - Les données de connexion (login, password, rememberMe).
 * @returns {Promise<Object>} La réponse du serveur en JSON.
 */
export async function loginUser(loginData) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erreur lors de la connexion.");
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getActivities() {
  try {
    const response = await axios.get("http://localhost:5005/api/activities", {
      withCredentials: true,
      headers: { "Cache-Control": "no-cache" },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export function getMembers() {
  // GET /api/members
  return axios.get(`${API_URL}/members`, { withCredentials: true });
}
