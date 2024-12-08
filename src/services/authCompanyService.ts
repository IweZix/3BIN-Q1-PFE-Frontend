import axios from 'axios';

const API_URL = 'http://localhost:3000/authCompany';

export const loginCompany = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login-company`, { email, password });
    return response.data;
};

export const registerCompany = async (name:string, email:string, password:string, template: number[]) => {
  try {
    const company = { name, email, password, template };
    const response = await axios.post(`${API_URL}/register-company`, company);
    return response.data;
    } catch (error) {
        // Gestion des erreurs
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Erreur lors de l\'enregistrement de la company.');
        } else {
            throw new Error('Impossible de se connecter au serveur.');
        }
    }
};

const verifyPasswordUpdated = async (email: string): Promise<boolean> => {
    const response = await axios.post(`${API_URL}/verify-password-updated`, { email });    
    return response.data;
};


export const checkPasswordUpdatedCompany = async (email: string) => {
    const isUpdated = await verifyPasswordUpdated(email);
    return isUpdated;
};


export const changepasswordCompany = async (token: string, password: string) => {
    try {
        const response = await axios.patch(`${API_URL}/updatePassword`, { password }, {
            headers: {
                Authorization: `${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Erreur lors de la mise à jour du mot de passe.');
        } else {
            throw new Error('Impossible de se connecter au serveur.');
        }
    }
}

export const answerForm = async (token: string, answers: any) => {
    try {
        const response = await axios.post(`${API_URL}/answerForm`, { listQuestions : answers }, {
            headers: {
                Authorization: `${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Erreur lors de la réponse au formulaire.');
        } else {
            throw new Error('Impossible de se connecter au serveur.');
        }
    }
}