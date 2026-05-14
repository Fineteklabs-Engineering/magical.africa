import axios from 'axios';

const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.MODE === 'development' ? '/' : 'https://api.nakkei.com'), 
  timeout: 30000,
  defaultHeaders: {
    'Content-Type': 'application/json',
    'Accept': 'application/hal+json',
    'X-Tenant': 'magicalafrica',
  },
};

const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.defaultHeaders,
});



const savedToken = localStorage.getItem('ma_token');
if (savedToken) {
  api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
}


export default api;