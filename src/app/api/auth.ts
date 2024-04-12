// // auth.ts
// import axios from 'axios';

// const API_URL = 'your_api_url';

// export const login = async (username: string, password: string) => {
//   try {
//     const response = await axios.post(`${API_URL}/authentication/login`, { username, password });
//     const { access_token, refresh_token } = response.data;
//     localStorage.setItem('access_token', access_token);
//     localStorage.setItem('refresh_token', refresh_token);
//     return true;
//   } catch (error) {
//     console.error('Login failed:', error);
//     return false;
//   }
// };

// export const getAccessToken = () => {
//   return localStorage.getItem('access_token');
// };

// export const getRefreshToken = () => {
//   return localStorage.getItem('refresh_token');
// };

// export const setTokens = (access_token: string, refresh_token: string) => {
//   localStorage.setItem('access_token', access_token);
//   localStorage.setItem('refresh_token', refresh_token);
// };

// export const logout = () => {
//   localStorage.removeItem('access_token');
//   localStorage.removeItem('refresh_token');
// };
