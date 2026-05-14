import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  const login = useCallback(async (email, password) => {
    try {
      // Allow demo admin credentials to log in without backend
      if (email === 'admin@virtank.com' && password === 'admin123') {
        setIsAuthenticated(true);
        setAdminUser({ email: 'admin@virtank.com', id: 'demo-admin' });
        return { ok: true };
      }
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const data = await res.json().catch(()=>({}));
        return { ok: false, error: data?.error || 'Login failed' };
      }
      const data = await res.json();
      if (data?.user?.role !== 'admin') {
        return { ok: false, error: 'Not an admin account' };
      }
      setIsAuthenticated(true);
      setAdminUser({ email: data.user.email, id: data.user.id });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: 'Network error' };
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setAdminUser(null);
  }, []);

  const value = useMemo(() => ({ isAuthenticated, adminUser, login, logout }), [isAuthenticated, adminUser, login, logout]);
  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
};


