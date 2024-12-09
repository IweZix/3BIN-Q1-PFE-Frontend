import axios from 'axios';


const API_URL = 'http://localhost:3000/glossaire';

export const getAllGlossaire = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
