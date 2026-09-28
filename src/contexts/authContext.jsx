/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api, setAuthToken } from '../services/api';

const AuthContext = createContext();

const readTokenPayload = (token) => {
  try {
    const payload = token.split('.')[1];
    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(normalizedPayload));
  } catch {
    return null;
  }
};

const createSession = (token) => {
  const payload = readTokenPayload(token);
  const isExpired = payload?.exp && payload.exp * 1000 <= Date.now();

  if (!payload?.id || isExpired) return null;

  return { token, userId: payload.id };
};

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(() => createSession(localStorage.getItem('authToken')));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!session) {
      localStorage.removeItem('authToken');
      setAuthToken(null);
      return;
    }

    setAuthToken(session.token);
    localStorage.setItem('authToken', session.token);

    let isMounted = true;
    api.get(`/usuario/${session.userId}`)
      .then((response) => {
        if (isMounted) setUser(response.data);
      })
      .catch(() => {
        if (isMounted) setUser(null);
      });

    return () => {
      isMounted = false;
    };
  }, [session]);

  const login = (token) => {
    const nextSession = createSession(token);
    if (!nextSession) throw new Error('Token de autenticação inválido ou expirado.');
    setSession(nextSession);
  };

  const logout = () => {
    setUser(null);
    setSession(null);
  };

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(session),
    login,
    logout,
  }), [user, session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};