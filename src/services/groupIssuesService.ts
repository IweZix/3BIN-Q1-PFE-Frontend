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
  const response = await axios.post(`${API_URL}/create-groupIssue`, data);
  return response.data;
};

export const updateGroupIssue = async (groupIssueName: string, newGroupIssueName: string) => {
  console.log("updateGroupIssue",groupIssueName, newGroupIssueName);
  const response = await axios.patch(`${API_URL}/patch-groupIssueName/${groupIssueName}`, 
  {
    newGroupIssueName
  });
  return response.data;
};

export const deleteGroupIssue = async (groupIssueName: string) => {
  const response = await axios.delete(`${API_URL}/delete-groupIssue/${groupIssueName}`);
  return response.data;
}