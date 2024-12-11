import axios from 'axios';

const API_URL = 'http://localhost:3000/authCompany';

export const loginCompany = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login-company`, { email, password });
  return response.data;
};

export const registerCompany = async (
  name: string,
  email: string,
  password: string,
  template: string[]
) => {
  try {
    const company = { name, email, password, template };
    const response = await axios.post(`${API_URL}/register-company`, company, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error : any) {
    return error.response.data;
  }
};

export const checkPasswordUpdatedCompany = async (email: string) => {
  const response = await axios.post(`${API_URL}/verify-password-updated`, { email });
  return response.data;
};

export const changepasswordCompany = async (token: string, password: string) => {
  try {
    const response = await axios.patch(
      `${API_URL}/updatePassword`,
      { password },
      {
        headers: {
          Authorization: `${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || 'Erreur lors de la mise à jour du mot de passe.'
      );
    } else {
      throw new Error('Impossible de se connecter au serveur.');
    }
  }
};

export const answerForm = async (token: string, answers: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/answerForm`,
      { listQuestions: answers.questions },
      {
        headers: {
          Authorization: `${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Erreur lors de la réponse au formulaire.');
    } else {
      throw new Error('Impossible de se connecter au serveur.');
    }
  }
};

export const getAnswerForm = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/answerForm`, {
      headers: {
        Authorization: `${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Erreur lors de la réponse au formulaire.');
    } else {
      throw new Error('Impossible de se connecter au serveur.');
    }
  }
};

export const answerFormCompleted = async (token: string, answers: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/answerFormCompleted`,
      { listQuestions: answers.questions },
      {
        headers: {
          Authorization: `${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Erreur lors de la réponse au formulaire.');
    } else {
      throw new Error('Impossible de se connecter au serveur.');
    }
  }
};

export const checkFormCompletedESG = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/formCompleted`, {
      headers: {
        Authorization: `${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Erreur lors de la réponse au formulaire.');
    } else {
      throw new Error('Impossible de se connecter au serveur.');
    }
  }
};

export const getNAList = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/NAForm`, {
      headers: {
        Authorization: `${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Erreur lors de la réponse au formulaire.');
    } else {
      throw new Error('Impossible de se connecter au serveur.');
    }
  }
};
