import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

import { getAuth } from 'firebase/auth';

// ---------------------------------------------------------------------
// Firebase is kept here ONLY for Firestore (db) and Storage — other parts
// of the app (blog posts, image uploads, etc.) may still depend on those.
// AUTH itself no longer runs through Firebase at all — signup/login now
// happen through the Milazetu API (see authApi.js), and this context just
// reads the resulting token/profile/role out of localStorage.
// ---------------------------------------------------------------------

const firebaseConfig = {
  apiKey: "AIzaSyCqbsYKijJzA97DT4G1t9VxzVG_1P0mK7U",
  authDomain: "magical-africa2.firebaseapp.com",
  projectId: "magical-africa2",
  storageBucket: "magical-africa2.firebasestorage.app",
  messagingSenderId: "652021159840",
  appId: "1:652021159840:web:a303a36a7c83ba5d84f6c5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// Reads everything auth-related out of localStorage and assembles it into
// the same { user, userData } shape components already expect.
const readAuthFromStorage = () => {
  const token = localStorage.getItem('ma_token');
  const username = localStorage.getItem('ma_username');

  if (!token || !username) {
    return { user: null, userData: null };
  }

  const profileRaw = localStorage.getItem(`ma_profile_${username}`);
  let profile = {};
  try {
    profile = profileRaw ? JSON.parse(profileRaw) : {};
  } catch (e) {
    profile = {};
  }

  const role = localStorage.getItem(`ma_role_${username}`) || null;
  const subject = localStorage.getItem(`ma_subject_${username}`) || null;

  const firstName = profile.firstName || '';
  const lastName = profile.lastName || profile.secondName || '';
  const displayName = `${firstName} ${lastName}`.trim();

  return {
 
    user: {
      uid: username,
      username,
      token,
      email: profile.email || '',
      displayName,
      photoURL: profile.photoURL || '',
    },
    userData: { ...profile, username, role, subject },
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);


  const refreshAuth = useCallback(() => {
    const { user: u, userData: ud } = readAuthFromStorage();
    setUser(u);
    setUserData(ud);
  }, []);

  useEffect(() => {
    refreshAuth();
    setLoading(false);

   
    const handleStorage = () => refreshAuth();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [refreshAuth]);

  const logout = () => {
    const username = localStorage.getItem('ma_username');
    localStorage.removeItem('ma_token');
    localStorage.removeItem('ma_refresh_token');
    localStorage.removeItem('ma_username');
    if (username) {
      localStorage.removeItem(`ma_profile_${username}`);
      // NOTE: intentionally NOT clearing ma_role_<username> here — this
      // means if the same person logs back in later, their previously
      // picked role (learner/teacher/creator) is remembered.
    }
    setUser(null);
    setUserData(null);
  };

  const getInitials = () => {
    if (userData) {
      const firstName = userData.firstName || '';
      const lastName = userData.lastName || userData.secondName || '';
      return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
    }
    return '';
  };

  const getFullName = () => {
    if (userData) {
      return `${userData.firstName || ''} ${userData.lastName || userData.secondName || ''}`.trim();
    }
    return '';
  };

  const value = {
    user,
    userData,
    loading,
    refreshAuth,
    logout,
    getInitials,
    getFullName
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};