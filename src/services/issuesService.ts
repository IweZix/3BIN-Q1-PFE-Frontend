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

export const createIssue = async (issueName: string, issueGroupName: string) => {
  const response = await axios.post(`${API_URL}/create-issue`, {
    issueName: issueName,
    issueGroupName: issueGroupName
  });
  return response.data;
};

export const updateIssue = async (issueName: string, newIssueName:string) => {
  const response = await axios.patch(`${API_URL}/patch-issueName/${issueName}`, {
    newIssueName: newIssueName
  });
  return response.data;
};

export const getIssuesByGroup = async (groupIssueName: string) => {
  const response = await getIssues();
  const responseFilter = [];
  for (let i = 0; i < response.length; i++) {
    if (response[i].group_name === groupIssueName) {
      responseFilter.push(response[i]);
    }
  }
  return responseFilter;
}

export const deleteIssue = async (issueName:string) => {
  const response = await axios.delete(`${API_URL}/delete-issue/${issueName}`);
  return response.data;
}