import axios from 'axios';

const API_URL = 'http://localhost:3000/authCompany';

export const loginCompany = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login-company`, { email, password });
    return response.data;
};