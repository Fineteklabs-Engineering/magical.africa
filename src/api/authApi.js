import api from './axiosConfig';
import publicApi from './publicaxiosConfig';

export const buildUsername = (firstName, secondName) => {
  return `${firstName}${secondName}`.replace(/\s+/g, '').toLowerCase();
};


export const signup = async ({ firstName, secondName, email, password, gender, telephone }) => {
  const username = email.trim().toLowerCase();

  const payload = {
    firstName,
    lastName: secondName,
    otherNames: '',
    code: '',
    dob: null,
    telephone: telephone || null,
    email,
    active: true,
    password,
    gender: gender ? gender.toUpperCase() : '',
    username,
    countryCode: '',
    imageUrl: '',
  };

  const res = await publicApi.post('/api/v1/auth/generate', payload);
  return { ...res.data, username };
};

export const login = async (userName, password) => {
  const normalized = userName.trim().toLowerCase();
  const res = await publicApi.post('/api/v1/auth/authenticate', { userName: normalized, password });
  return res.data;
};

export const refreshAuthToken = async (token) => {
  const res = await publicApi.post('/api/v1/auth/refreshToken', { token });
  return res.data;
};


export const getCustomerCategories = async (
  settings = { page: 0, elementPerPage: 100, direction: 'asc', key: 'publicId' }
) => {
  const res = await api.get('/api/v1/customers/categories', { params: settings });
  return res.data?.['customer-categories'] ?? [];
};


export const getCustomerByUsername = async (username) => {
  const res = await api.get(`/api/v1/customers/usernames/${encodeURIComponent(username)}/`);
  return res.data;
};


export const updateCustomer = async (customerId, body) => {
  const res = await api.put(`/api/v1/customers/ids/${encodeURIComponent(customerId)}/`, body);
  return res.data;
};


export const getUserByUsername = async (username) => {
  const res = await api.get(`/users/names/${encodeURIComponent(username)}/`);
  return res.data;
};


export const ROLE_TO_CODE = { learner: 'LEARNER', teacher: 'TUTOR', creator: 'CREATOR' };
export const CODE_TO_ROLE = { LEARNER: 'learner', TUTOR: 'teacher', CREATOR: 'creator' };

// Find the category publicId for a picked role, matching on the stable CODE
// (not name — names can be reworded). Returns null if not found.
export const findCategoryIdForRole = (categories, role) => {
  const code = ROLE_TO_CODE[role];
  if (!code) return null;
  const match = (categories || []).find((c) => String(c?.code || '').toUpperCase() === code);
  return match?.publicId || null;
};


export const findRoleForCategoryId = (categories, customerCategoryId) => {
  if (!customerCategoryId) return null;
  const match = (categories || []).find((c) => c?.publicId === customerCategoryId);
  const code = match?.code ? String(match.code).toUpperCase() : null;
  return code ? (CODE_TO_ROLE[code] || null) : null;
};

const ROLE_KEY_PREFIX = 'ma_role_';
const SUBJECT_KEY_PREFIX = 'ma_subject_';

export const saveLocalRole = (username, role, subject) => {
  if (!username) return;
  localStorage.setItem(`${ROLE_KEY_PREFIX}${username}`, role);
  if (subject) {
    localStorage.setItem(`${SUBJECT_KEY_PREFIX}${username}`, subject);
  }
};

export const getLocalRole = (username) => {
  if (!username) return null;
  return localStorage.getItem(`${ROLE_KEY_PREFIX}${username}`);
};