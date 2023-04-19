
import axios from 'axios';
export const login = async (email, password) => {
  try {
    const response = await axios.post('/api/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const logout = async () => {
  try {
    const response = await axios.get('/api/auth/logout');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

  