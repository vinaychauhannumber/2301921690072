import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme } from './styles/theme';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { DashboardLayout } from './components/layout/DashboardLayout';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { ActivityLogs } from './pages/ActivityLogs';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <ToastProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Protected Routes Wrapped in Dashboard Layout */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Dashboard />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Profile />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Settings />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/activity"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <ActivityLogs />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />

                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
