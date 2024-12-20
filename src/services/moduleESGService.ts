import axios from 'axios';

const API_URL = 'http://localhost:3000/question';

export const getAllQuestions = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};
