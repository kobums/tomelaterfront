import axios, { type AxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/useAuthStore';

// Create a configured instance if needed, or simply intercept the global axios
// Here we add an interceptor to inject the token from the store

// Configure base URL if not proxied via Vite, but we are using proxy.
// We can use a custom instance to keep it clean.
const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const get = <T>(url: string, config?: AxiosRequestConfig) => {
  return api.get<T>(url, config);
};

export const post = <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
) => {
  return api.post<T>(url, data, config);
};

export const put = <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
) => {
  return api.put<T>(url, data, config);
};

export const patch = <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
) => {
  return api.patch<T>(url, data, config);
};

export const del = <T>(url: string, config?: AxiosRequestConfig) => {
  return api.delete<T>(url, config);
};

export default api;
