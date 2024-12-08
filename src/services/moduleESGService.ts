import axios from 'axios';

const API_URL = 'http://localhost:3000/question';

export const getAllQuestions = async () => {
  const response = await axios.get(`${API_URL}`);
  console.log(response.data, 'response.data moduleESGService');
  return response.data;
};
