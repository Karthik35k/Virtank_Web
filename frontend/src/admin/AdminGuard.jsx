import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from './auth/AdminAuthContext';

const AdminGuard = ({ children }) => {
  const { isAuthenticated } = useAdminAuth();
  const location = useLocation();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace state={{ from: location }} />;
  return children;
};

export default AdminGuard;


