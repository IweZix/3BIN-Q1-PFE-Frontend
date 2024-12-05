import axios from 'axios';

const API_URL = 'http://localhost:3000/authAdmin';

const axiosInstance = axios.create();
axiosInstance.interceptors.response.use(
    response => response,
    error => {
      // Gérer les erreurs de manière silencieuse
      if (error.response && error.response.status === 401) {
        // Erreur 401 (Unauthorized), ne rien faire
        return Promise.resolve({ data: false });
      }
      return Promise.reject(error);
    }
  );

export const loginAdmin = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login-admin`, { email, password });
    return response.data;
};
export const adminVerif = async (token: string) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/verify-admin`, { token });
        return response.data;
    } catch (error) {
        // erreur silencieuse
    }
};
export const registerAdmin = async (adminName: String, email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/register-admin`, {adminName, email, password });
        return response.data; // Retourne les données de l'API
    } catch (error) {
        // Gestion des erreurs
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Erreur lors de l\'enregistrement de l\'administrateur.');
        } else {
            throw new Error('Impossible de se connecter au serveur.');
        }
    }
};
const verifyPasswordUpdated = async (email: string): Promise<boolean> => {
    const response = await axios.post(`${API_URL}/verify-password-updated`, { email });
    return response.data;
};


export const checkPasswordUpdated = async (email: string) => {
    const isUpdated = await verifyPasswordUpdated(email);
    return isUpdated;
};