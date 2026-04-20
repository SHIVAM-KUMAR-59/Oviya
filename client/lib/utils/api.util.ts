import { BASE_API_URL } from '@/lib/config/constants.config';
import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: `${BASE_API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach token before every request
// api.interceptors.request.use(
//   async (config) => {
//     const session = await getSession(); // Fetch session on each request
//     const token = session?.accessToken;

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       await signOut({ redirect: false });
//       // Redirect to signin page
//       window.location.href = "/auth/login";
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
