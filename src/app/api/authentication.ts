// src/app/api/authService.ts
import axios from 'axios';

import { withApiErrorHandling, generateBackendUrl } from '@/app/api/apiUtils';

export const signupUser = withApiErrorHandling(async (
  email: string, password: string, first_name: string, 
  middle_name: string, last_name: string, user_type: string, phone: string) => {
  const response = await axios.post(generateBackendUrl(`authentication/signup`), {
    email,
    password
  });
  return response.data;
});

export const signinUser = withApiErrorHandling(async (email: string, password: string) => {
  const response = await axios.post(generateBackendUrl(`authentication/signin`), {
    email,
    password
  });
  return response.data;
});
