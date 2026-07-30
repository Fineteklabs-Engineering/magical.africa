import api from './axiosConfig';

export const createInquiry = async (payload) => {
 
  const res = await api.post('/api/v1/inquiries/create', payload);
  return res.data;
};