import axios from 'axios';

const API_URL = 'http://localhost:3000/template';

export const getTemplates = async () => {
    try {
        const response = await axios.get(`${API_URL}/`);
        return response.data;
    } catch (error) {
        // Gestion des erreurs
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Erreur lors de la récupération des templates.');
        } else {
            throw new Error('Impossible de se connecter au serveur.');
        }
    }
};