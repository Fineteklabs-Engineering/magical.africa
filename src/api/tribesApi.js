import api from './axiosConfig';

export const getTribes = async (settings = { page: 1, elementPerPage: 20, direction: 'asc', key: 'publicId' }) => {
  const params = settings;
  const res = await api.get('/api/v1/tribes', { params });
  return res.data;
};

export const getTribeByName = async (name) => {
  const res = await api.get(`/api/v1/tribes/name/${encodeURIComponent(name)}`);
  return res.data;
};

export const getTribeByPublicId = async (publicId) => {
  const res = await api.get(`/api/v1/tribes/${encodeURIComponent(publicId)}`);
  return res.data;
};
