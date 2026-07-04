import React, { createContext, useCallback, useContext, useMemo } from 'react';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const { user, isAdmin, login, logout } = useAuth();

  const adminLogin = useCallback(async (email, password) => {
    try {
      const res = await API.post('/auth/login', { email, password });

      if (res.data.role !== 'admin') {
        return { ok: false, error: 'Not an admin account' };
      }

      login(res.data);
      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        error: err.response?.data?.message || 'Login failed',
      };
    }
  }, [login]);

  const value = useMemo(
    () => ({
      isAuthenticated: isAdmin,
      adminUser: isAdmin ? user : null,
      login: adminLogin,
      logout,
    }),
    [isAdmin, user, adminLogin, logout]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
};
