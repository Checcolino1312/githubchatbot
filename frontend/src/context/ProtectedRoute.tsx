import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuth';

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isLoggedIn } = useAdminAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
