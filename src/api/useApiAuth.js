import { useEffect } from 'react';
import { signin } from './marketplaceApi';




const API_EMAIL = '';
const API_PASSWORD = '';

const useApiAuth = () => {
  useEffect(() => {
    const authenticate = async () => {
      console.log('Attempting signin with:', API_EMAIL);

     
      localStorage.removeItem('ma_token');

      try {
        const result = await signin(API_EMAIL, API_PASSWORD);
        console.log('Signin success! Token:', result.token);
      } catch (error) {
        console.error('Auth failed:', error.response?.data || error.message);
      }
    };

    authenticate();
  }, []);
};

export default useApiAuth;