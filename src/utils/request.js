import axios from 'axios';
import { useStore } from '../store';

export const useRequest = () => {
    
  const { token } = useStore


  const request = axios.create({
    baseURL: '/api', 
    headers: {
      'Content-Type': 'application/json',
    },
  });

 
  apiClient.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers['X-ACCESS-TOKEN'] = token; 
      }
      return config;
    },
    (error) => {
      console.error('Request error:', error);
      return Promise.reject(error);
    }
  );

 
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response } = error;

      if (response) {
        const { status, data } = response;

        switch (status) {
         

          case 403:
            console.error('403 Forbidden:', data?.message || 'Access denied.');
            break;

          case 429: 
            console.warn('429 Too Many Requests:', data?.message || 'Rate limit exceeded.');
            return new Promise((resolve) => {
              setTimeout(() => resolve(apiClient(error.config)), 3000); 
            });

          default:
            console.error(`HTTP ${status}:`, data?.message || 'An error occurred.');
            break;
        }
      } else {
        console.error('Network error:', error.message);
        alert('A network error occurred. Please try again later.');
      }

      return Promise.reject(error);
    }
  );

  return request;
};
