import api from './axiosConfig';
import publicApi from './publicaxiosConfig';

export const buildUsername = (firstName, secondName) => {
  return `${firstName}${secondName}`.replace(/\s+/g, '').toLowerCase();
};


export const signup = async ({ firstName, secondName, email, password, gender, telephone }) => {
  const username = buildUsername(firstName, secondName);

  const payload = {
    firstName,
    lastName: secondName,
    otherNames: '',
    code: '',
    passportNumber: '',
    governmentNumber: '',
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
  const res = await publicApi.post('/api/v1/auth/authenticate', { userName, password });
  return res.data;
};


export const refreshAuthToken = async (token) => {
  const res = await publicApi.post('/api/v1/auth/refreshToken', { token });
  return res.data;
};


export const getUserByUsername = async (username) => {
  const res = await api.get(`/users/names/${encodeURIComponent(username)}/`);
  return res.data;
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