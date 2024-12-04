import axios from 'axios';

const API_URL = 'http://localhost:3000/authAdmin';

export const loginAdmin = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login-admin`, { email, password });
    return response.data;
};
export const adminVerif = async (token: string) => {
    const response = await axios.post(`${API_URL}/verify-admin`, { token });
    return response.data;
};
export const registerAdmin = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/register-admin`, { email, password });
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