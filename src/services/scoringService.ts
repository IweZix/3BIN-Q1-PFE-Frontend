import axios from "axios";

const API_URL = 'http://localhost:3000/scoring';

export const getScoringByEmail = async (email: string) => {
    const response = await axios.get(`${API_URL}/${email}`, {
        headers: {
            'Authorization': `${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};



export const createScoring = async (data: any) => {
    const response = await axios.post(`${API_URL}/`, data, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${localStorage.getItem('token')}`,
        }
    });
    return response.data;
}
