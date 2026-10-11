import axios from 'axios';
import publicApi from './publicaxiosConfig';

// ---------------------------------------------------------------------------
// TODO: set this to your REAL login route (the path <AcademyLogin> is mounted on).
// When a session can't be recovered, the user is sent here with ?session=expired.
const LOGIN_PATH = '/login';
// ---------------------------------------------------------------------------

const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.milazetu.com',
  timeout: 30000,
  defaultHeaders: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Tenant': 'magicalafrica',
  },
};

const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.defaultHeaders,
});

// ---------------------------------------------------------------------------
// Token helpers
// ---------------------------------------------------------------------------

// Read a JWT's `exp` (seconds since epoch). Returns null if it can't be read.
function getTokenExp(token) {
  try {
    const payloadPart = token.split('.')[1];
    const base64 = payloadPart.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    return typeof payload.exp === 'number' ? payload.exp : null;
  } catch {
    return null;
  }
}

// True only when we can SEE the token is past (or within `skew` seconds of)
// expiry. If the exp can't be read, we return false and let the request go —
// the response interceptor is the backstop.
function isExpired(token, skewSeconds = 30) {
  const exp = getTokenExp(token);
  if (exp == null) return false;
  return Date.now() / 1000 >= exp - skewSeconds;
}

// ---------------------------------------------------------------------------
// Single-flight refresh — many requests firing at once share ONE refresh call.
// ---------------------------------------------------------------------------

let refreshPromise = null;

// Exchange the stored refresh_token for a fresh pair. Uses the TOKEN-LESS client
// so it can't recurse through these interceptors or be blocked by a dead token.
function refreshTokens() {
  if (refreshPromise) return refreshPromise;

  const refreshToken = localStorage.getItem('ma_refresh_token');
  if (!refreshToken) {
    return Promise.reject(new Error('No refresh token'));
  }

  refreshPromise = publicApi
    .post('/api/v1/auth/refreshToken', { token: refreshToken })
    .then((res) => {
      const { token, refresh_token } = res.data || {};
      if (!token) throw new Error('No token in refresh response');
      localStorage.setItem('ma_token', token);
      if (refresh_token) localStorage.setItem('ma_refresh_token', refresh_token);
      return token;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

// Session is unrecoverable — clear it and send the user to login.
function handleSessionExpired() {
  localStorage.removeItem('ma_token');
  localStorage.removeItem('ma_refresh_token');
  localStorage.removeItem('ma_username');
  delete api.defaults.headers.common['Authorization'];
  if (!window.location.pathname.startsWith(LOGIN_PATH)) {
    window.location.assign(`${LOGIN_PATH}?session=expired`);
  }
}

// ---------------------------------------------------------------------------
// Interceptors
// ---------------------------------------------------------------------------

// REQUEST: attach the CURRENT token on every call. If it's already expired,
// refresh FIRST so we never send a dead token — this is what prevents the
// "expired token -> 500" you were hitting on the dashboard fetch.
api.interceptors.request.use(async (config) => {
  let token = localStorage.getItem('ma_token');

  if (token && isExpired(token)) {
    try {
      token = await refreshTokens();
    } catch (err) {
      handleSessionExpired();
      return Promise.reject(err);
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// RESPONSE: backstop for a token the server rejects mid-session (401). One
// refresh + replay. We deliberately DON'T do this for:
//   - 403  -> "authenticated but not allowed" (e.g. the photo-upload permission).
//             Refreshing won't help, and we must NOT log the user out for it.
//   - 500  -> ambiguous on this backend, and replaying a POST/PUT could double-apply.
//             The request-side expiry check above already prevents the expired-token 500.
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { response, config } = error;
    if (!response || !config) return Promise.reject(error);

    if (response.status === 401 && !config._retried) {
      config._retried = true;
      try {
        const token = await refreshTokens();
        config.headers.Authorization = `Bearer ${token}`;
        return api(config); // replay the original request with the new token
      } catch (err) {
        handleSessionExpired();
        return Promise.reject(err);
      }
    }

    // Refresh already tried and the server still says 401 -> session is dead.
    if (response.status === 401 && config._retried) {
      handleSessionExpired();
    }

    return Promise.reject(error);
  }
);

export default api;