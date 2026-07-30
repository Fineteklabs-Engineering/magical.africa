import axios from 'axios';

const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.milazetu.com',
  timeout: 30000,
  defaultHeaders: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Tenant': 'magicalafrica',
  },
};

const publicApi = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.defaultHeaders,
});


export default publicApi;