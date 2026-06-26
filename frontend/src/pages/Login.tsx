import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Container, CircularProgress, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { logFrontendEvent } from '../utils/logger';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      logFrontendEvent('info', 'page', `Attempting login for ${email}`);
      const response = await api.post('/auth/login', { email, password });
      
      const { user, session } = response.data.data;
      login(session.access_token, user);
      
      logFrontendEvent('info', 'page', `Login successful for ${email}`);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      logFrontendEvent('error', 'page', `Login failed for ${email}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={6} sx={{ p: 4, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 3 }}>
          <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
            Welcome Back
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Link component={RouterLink} to="/signup" variant="body2" color="secondary.main">
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
