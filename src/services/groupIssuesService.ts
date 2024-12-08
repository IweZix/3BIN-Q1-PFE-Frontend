import axios from 'axios';

const API_URL = 'http://localhost:3000/groupIssue';

export const getGroupIssues = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

export const getGroupIssueById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createGroupIssues = async (data: any) => {
  const response = await axios.post(`${API_URL}/`, data);
  return response.data;
};

export const updateGroupIssue = async (id: string, data: any) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};
