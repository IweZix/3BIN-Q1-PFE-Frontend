import axios from 'axios';

const API_URL = 'http://localhost:3000/authCompany';

// getAllCompanies
export const getAllCompanies = async () => {
  const response = await axios.get(`${API_URL}/all`, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  });
  console.log("getAllCompanies",response.data);
  return response.data;
};
