import axios from 'axios';

const API_URL = 'http://localhost:3000/authCompany';

export const loginCompany = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login-company`, { email, password });
    return response.data;
};
export const registerCompany = async (name: String, email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/register-company`, {name, email, password });
        return response.data; // Retourne les données de l'API
    } catch (error) {
        // Gestion des erreurs
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Erreur lors de l\'enregistrement de la company.');
        } else {
            throw new Error('Impossible de se connecter au serveur.');
        }
    }
};