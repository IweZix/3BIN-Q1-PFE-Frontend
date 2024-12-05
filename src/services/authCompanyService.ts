import axios from 'axios';

const API_URL = 'http://localhost:3000/authCompany';

export const loginCompany = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login-company`, { email, password });
    return response.data;
};

export const registerCompany = async (name:string, email:string, password:string, template: number[]) => {
    const company = { name, email, password, template };
    const response = await axios.post(`${API_URL}/register-company`, company);
    return response.data;
};