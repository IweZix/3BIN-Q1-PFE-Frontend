import axios from 'axios';

const API_URL = 'http://localhost:3000/issue';

export const getIssues = async (): Promise<any[]> => {
    const response = await axios.get(`${API_URL}`);
    return response.data as any[];
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

export const getIssuesByGroup = async (groupIssueName: string) => {
  const response = await getIssues();
  console.log(response);
  const responseFilter = [];
  for (let i = 0; i < response.length; i++) {
    console.log(response[i].group_name);
    if (response[i].group_name === groupIssueName) {
      responseFilter.push(response[i]);
    }
  }
  console.log(responseFilter);
  return responseFilter;
}