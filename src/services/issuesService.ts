import axios from "axios";

const API_URL = "http://localhost:3000/issue";

export const getIssues = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getIssueById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createIssues = async (data: any) => {
  const response = await axios.post(`${API_URL}/`, data);
  return response.data;
};

export const updateIssue = async (id: string, data: any) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};