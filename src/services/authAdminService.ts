import axios from 'axios';

const API_URL = 'http://localhost:3000/authAdmin';

export const loginAdmin = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login-admin`, { email, password });
    return response.data;
};