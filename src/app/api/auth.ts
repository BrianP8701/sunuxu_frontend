// src/app/api/authService.ts
import axios from 'axios';

const API_BASE_URL = 'https://your-azure-function-url.azurewebsites.net';

export const signupUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Failed to sign up:', error);
    throw error;
  }
}

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Failed to login:', error);
    throw error;
  }
};
