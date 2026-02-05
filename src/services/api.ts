import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:9410/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor - add JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('gym_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('gym_token');
      localStorage.removeItem('gym_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default apiClient;

// Helper function for GET requests
export const get = <T>(url: string, config?: any) => {
  return apiClient.get<T>(url, config);
};

// Helper function for POST requests
export const post = <T>(url: string, data?: unknown, config?: any) => {
  return apiClient.post<T>(url, data, config);
};

// Helper function for PUT requests
export const put = <T>(url: string, data?: unknown, config?: any) => {
  return apiClient.put<T>(url, data, config);
};

export const patch = <T>(url: string, data?: unknown, config?: any) => {
  return apiClient.patch<T>(url, data, config);
};

// Helper function for DELETE requests
export const del = <T>(url: string, config?: any) => {
  return apiClient.delete<T>(url, config);
};
