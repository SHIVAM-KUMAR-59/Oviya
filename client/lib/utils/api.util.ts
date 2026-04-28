import axios, { AxiosError } from 'axios';
import { BASE_API_URL } from '../config/constants.config';

const api = axios.create({
  baseURL: `${BASE_API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor — handles 401 globally (optional, uncomment if needed)
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       delete api.defaults.headers.common['Authorization'];
//       window.location.href = '/auth/login';
//     }
//     return Promise.reject(error);
//   }
// );

export const getErrorMessage = (err: unknown): string => {
  if (err instanceof AxiosError) {
    return err.response?.data?.message ?? err.message;
  }
  if (err instanceof Error) return err.message;
  return 'Unknown error';
};

export default api;
