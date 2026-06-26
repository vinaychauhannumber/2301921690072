import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logFrontendEvent } from '../utils/logger';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    logFrontendEvent('warn', 'component', `Unauthorized access attempt to ${location.pathname}`);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
