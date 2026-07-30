import api from './axiosConfig';
import publicApi from './publicAxiosConfig';
// ⬆️ adjust these import paths to match wherever axiosConfig.js and
// publicAxiosConfig.js actually live in your project (same folder as
// tribeApi.js, based on what you shared)
//
// signup/login/refresh use publicApi (no token attached) — if a token
// from a previous session is sitting in localStorage, the regular `api`
// instance auto-attaches it to EVERY request, including these. That
// broke a second signup attempt for a teammate who was already logged
// in from a first one. publicApi never attaches a token, so these calls
// stay clean no matter what's in localStorage.

/* ---------------------------------------------------------
   USERNAME RULE
   Milazetu requires a `username` field that Firebase never had.
   Assumption: username = firstName + secondName, no spaces, lowercased.
   e.g. "John" + " Doe" -> "johndoe"
   Change this function if you want a different rule (e.g. add numbers,
   check availability, let the user pick their own, etc.)
--------------------------------------------------------- */
export const buildUsername = (firstName, secondName) => {
  return `${firstName}${secondName}`.replace(/\s+/g, '').toLowerCase();
};

/* ---------------------------------------------------------
   SIGNUP  ->  POST /api/v1/auth/generate
   Returns { token, refresh_token, username }
--------------------------------------------------------- */
export const signup = async ({ firstName, secondName, email, password, gender, telephone }) => {
  const username = buildUsername(firstName, secondName);

  const payload = {
    firstName,
    lastName: secondName,
    otherNames: '',
    code: '',
    passportNumber: '',
    governmentNumber: '',
    // NOTE: sending null instead of "" here — an empty string was likely
    // crashing the backend trying to parse it as a date. Change back to ''
    // if the backend actually wants a string.
    dob: null,
    // NOTE: telephone has a UNIQUE constraint in their DB. null is safe
    // (Postgres allows multiple NULLs under a unique constraint), but ''
    // is not — every signup without a phone number would collide.
    telephone: telephone || null,
    email,
    // customerCategoryId intentionally omitted (not even sent as null).
    // Sending null triggered "No value present" — a Java
    // Optional.get() called on an empty Optional — likely because
    // their backend does categoryRepo.findById(id).get() without
    // checking isPresent() first. If this field turns out to be required,
    // ask the backend team for a valid default category ID to use here.
    active: true,
    password,
    // NOTE: swagger only showed "MALE" as an example value.
    // If "OTHER" isn't a valid enum on the backend, this call will 400 —
    // worth a quick test once you're ready.
    gender: gender ? gender.toUpperCase() : '',
    username,
    countryCode: '',
    imageUrl: '',
  };

  const res = await publicApi.post('/api/v1/auth/generate', payload);
  return { ...res.data, username };
};

/* ---------------------------------------------------------
   LOGIN  ->  POST /api/v1/auth/authenticate
   Takes username (not email!) + password
   Returns { token, refresh_token }
--------------------------------------------------------- */
export const login = async (userName, password) => {
  const res = await publicApi.post('/api/v1/auth/authenticate', { userName, password });
  return res.data;
};

/* ---------------------------------------------------------
   REFRESH TOKEN  ->  POST /api/v1/auth/refreshToken
--------------------------------------------------------- */
export const refreshAuthToken = async (token) => {
  const res = await publicApi.post('/api/v1/auth/refreshToken', { token });
  return res.data;
};

/* ---------------------------------------------------------
   GET USER BY USERNAME  ->  GET /users/names/{username}/
--------------------------------------------------------- */
export const getUserByUsername = async (username) => {
  const res = await api.get(`/users/names/${encodeURIComponent(username)}/`);
  return res.data;
};

/* ---------------------------------------------------------
   ROLE STORAGE (client-side only, no admin role API in use yet)
   Keyed per-username so different accounts on the same browser
   don't clash.
--------------------------------------------------------- */
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