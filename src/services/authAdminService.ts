import axios from 'axios';

const API_URL = 'http://localhost:3000/authAdmin';

const axiosInstance = axios.create({
  baseURL: API_URL
});
axiosInstance.interceptors.response.use(
  (response: any) => response,
  (error: { response: { status: number } }) => {
    // Gérer les erreurs de manière silencieuse
    if (error.response && error.response.status === 401) {
      // Erreur 401 (Unauthorized), ne rien faire
      return Promise.resolve({ data: false });
    }
    return Promise.reject(error);
  }
);

export const loginAdmin = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login-admin`, { email, password });
  return response.data as boolean;
};
export const adminVerif = async (token: string) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/verify-admin`,
      {},
      {
        headers: {
          Authorization: `${token}`
        }
      }
    );

    return response.data;
  } catch (error) {
    // erreur silencieuse
  }
};
export const registerAdmin = async (adminName: String, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register-admin`, {
      name: adminName,
      email,
      password
    });
    return response.data; // Retourne les données de l'API
  } catch (error: Error | any) {
    // Gestion des erreurs
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Erreur lors de l'enregistrement de l'administrateur."
      );
    } else {
      throw new Error('Impossible de se connecter au serveur.');
    }
  }
};
const verifyPasswordUpdated = async (email: string): Promise<boolean> => {
  const response = await axios.post(`${API_URL}/verify-password-updated`, { email });
  return response.data;
};

export const checkPasswordUpdated = async (email: string) => {
  const isUpdated = await verifyPasswordUpdated(email);
  return isUpdated;
};

export const updatePasswordAdmin = async (token: string, password: string) => {
  try {
    const response = await axiosInstance.patch(
      `${API_URL}/update-password`,
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

export const getValidatedForm = async (email: string) => {
  try {
    console.log("api",email);
    
    const response = await axios.get(`${API_URL}/answerFormUser`, {
      params: { email }, // Ajouter l'email en tant que paramètre d'URL
       headers: {
          Authorization: `${localStorage.getItem('token')}`
        }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du formulaire:', error);
    return false; // Retourner false ou gérer l'erreur de manière appropriée
  }
};

export const postValidatedForm = async (email: string, answers:any) => {
  try {
    const response = await axios.post(`${API_URL}/answerFormUser`,{ email , answers},  
      {
        headers: {
          Authorization: `${localStorage.getItem('token')}`
        }
      }
    );
  } catch (error) {
    console.error('Erreur lors de la récupération du formulaire:', error);
  }
};

export const validatedFormCompleted = async (email: string) : Promise<boolean>=> {
  try {
    const response = await axios.get(`${API_URL}/validatedFormUser`,  {
        params: { email },
      
        headers: {
          Authorization: `${localStorage.getItem('token')}`
        
      }
    });
    return response.data as boolean;
  } catch (error) {
    console.error('Erreur lors de la récupération du formulaire:', error);
    return false;
  }
}

export const getCompanyList = async () => {
  try {
    const response = await axios.get(`${API_URL}/allcompanies`,{
       
        headers: {
          Authorization: `${localStorage.getItem('token')}`
        
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la liste des entreprises:', error);
    return [];
  }
};

