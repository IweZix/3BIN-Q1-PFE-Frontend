import axios from 'axios';

const API_URL = 'http://localhost:3000/authCompany';

export const getAllCompanies = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Erreur lors de la récupération des entreprises.');
        } else {
            throw new Error('Impossible de se connecter au serveur.');
        }
    }
}