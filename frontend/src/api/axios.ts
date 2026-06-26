import axios, { AxiosError } from 'axios';
import { logFrontendEvent } from '../utils/logger';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Don't log the log requests themselves to prevent infinite loops
  if (config.url && !config.url.includes('/logs')) {
    logFrontendEvent('info', 'api', `API Request: ${config.method?.toUpperCase()} ${config.url}`);
  }
  
  return config;
}, (error) => {
  logFrontendEvent('error', 'api', `API Request Error: ${error.message}`);
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  if (response.config.url && !response.config.url.includes('/logs')) {
    logFrontendEvent('info', 'api', `API Success: ${response.config.method?.toUpperCase()} ${response.config.url} (${response.status})`);
  }
  return response;
}, (error: AxiosError) => {
  const isLogRequest = error.config?.url?.includes('/logs');
  
  if (!isLogRequest) {
    logFrontendEvent('error', 'api', `API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url} - ${error.message}`);
  }
  
  // Handle global 401 Unauthorized
  if (error.response?.status === 401) {
    // Optionally trigger a logout or token refresh here
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return Promise.reject(error);
});

export default api;
