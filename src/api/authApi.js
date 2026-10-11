import api from './axiosConfig';
import publicApi from './publicaxiosConfig';

export const buildUsername = (firstName, secondName) => {
  return `${firstName}${secondName}`.replace(/\s+/g, '').toLowerCase();
};

// Create a customer WITHOUT a role/category (roleless by design — the role is
// assigned afterwards on the role-picker step). Milazetu's /generate returns
// only { token, refresh_token }, so we tack `username` on for the caller.
// NOTE: passportNumber / governmentNumber were dropped — they are not part of
// the /auth/generate request body.
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

// Customer categories = the roles (Learner / Tutor / Creator). Returns the
// array out of the paged wrapper: { "total-elements", "customer-categories", "total-pages" }.
export const getCustomerCategories = async (
  settings = { page: 0, elementPerPage: 100, direction: 'asc', key: 'publicId' }
) => {
  const res = await api.get('/api/v1/customers/categories', { params: settings });
  return res.data?.['customer-categories'] ?? [];
};

// The CUSTOMER record (not the old /users/names one). It reliably returns
// customerCategoryId — note the nested `category` object comes back null from
// the backend, so DON'T read the role from category.code; use customerCategoryId.
export const getCustomerByUsername = async (username) => {
  const res = await api.get(`/api/v1/customers/usernames/${encodeURIComponent(username)}/`);
  return res.data;
};

// Full-object update. Used to attach a category (role) to an existing customer.
export const updateCustomer = async (customerId, body) => {
  const res = await api.put(`/api/v1/customers/ids/${encodeURIComponent(customerId)}/`, body);
  return res.data;
};

// Upload / replace the customer's profile PHOTO (multipart). Returns the full
// updated customer object. NOTE: this ONLY sets the photo — text fields are
// changed via updateCustomer (the full-object PUT). We clear the default
// Content-Type so the browser sets `multipart/form-data` WITH its boundary;
// if your axiosConfig forces JSON via an interceptor, that override lives there.
export const uploadCustomerProfilePhoto = async (customerId, file) => {
  const form = new FormData();
  form.append('file', file);
  const res = await api.post(
    `/api/v1/customers/ids/${encodeURIComponent(customerId)}/profile/`,
    form,
    { headers: { 'Content-Type': undefined } }
  );
  return res.data;
};

// Kept for backwards-compat — DIFFERENT endpoint (/users/names) that does NOT
// return category. Not used by the role flow.
export const getUserByUsername = async (username) => {
  const res = await api.get(`/users/names/${encodeURIComponent(username)}/`);
  return res.data;
};

// Role <-> category-code mapping. The app uses 'teacher' internally for the Tutor role.
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

// Map a customer's customerCategoryId back to a role string, by matching it
// against the categories list. This is the reliable way to read a customer's
// role — the backend returns category: null on all customer reads, but
// customerCategoryId IS populated. Returns null if not found.
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