import axios from 'axios';
import { useStore } from '../store';
import { useEffect } from 'react';



export const useRequest = () => {
    
  const { access_token } = useStore()

  const request = axios.create({
    baseURL: 'https://challenge-server.tracks.run/memoapp', 
    headers: {
      'Content-Type': 'application/json',
      'x-access-token':  access_token
    },
  });


  useEffect(() => {
   
    const requestIntercept = request.interceptors.request.use(
    (config) => {
  
      if (access_token && !config.headers['x-access-token']) {  
        config.headers = {
          'x-access-token':  access_token
        }
      }
      return config;
    },
    (error) => {
      console.error('Request error:', error);
      return Promise.reject(error);
    }
  );

 
  const responseIntercept = request.interceptors.response.use(
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
              setTimeout(() => resolve(request(error.config)), 3000); 
            });

          default:
            console.error(`HTTP ${status}:`, data?.message || 'An error occurred.');
            return Promise.reject(error)
          
        }
      } else {
        console.error('Network error:', error.message);
        alert('A network error occurred. Please try again later.');
      }

      return Promise.reject(error);
    }
  );

  return () => {
    request.interceptors.request.eject(requestIntercept);
    request.interceptors.response.eject(responseIntercept);
  };

  },[access_token])
  return request;
};
