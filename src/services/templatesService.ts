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

export const createTemplate = async (name: string) => {
    try {
        const template = { name };
        const response = await axios.post(`${API_URL}/create`, template);
        return response.data;
    } catch (error) {
        // Gestion des erreurs
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Erreur lors de la création du template.');
        } else {
            throw new Error('Impossible de se connecter au serveur.');
        }
    }
};

export const getTemplateById = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        // Gestion des erreurs
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Erreur lors de la récupération du template.');
        } else {
            throw new Error('Impossible de se connecter au serveur.');
        }
    }
};

export const updateTemplate = async (id: number, name: string) => {
    try {
        const template = { name };
        const response = await axios.put(`${API_URL}/update/${id}`, template);
        return response.data;
    } catch (error) {
        // Gestion des erreurs
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Erreur lors de la mise à jour du template.');
        } else {
            throw new Error('Impossible de se connecter au serveur.');
        }
    }
};