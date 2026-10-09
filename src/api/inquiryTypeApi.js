import publicApi from './publicaxiosConfig';

export const getInquiryTypes = async (settings = { page: 0, elementPerPage: 100, direction: 'asc', key: 'id' }) => {
  const params = settings;
  const res = await publicApi.get('/api/v1/inquiries/types/', { params });
  return res.data;
};

export const getInquiryTypeById = async (inquiryTypeId) => {
  const res = await publicApi.get(`/api/v1/inquiries/types/ids/${encodeURIComponent(inquiryTypeId)}`);
  return res.data;
};