import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, TextField, Button, Avatar, CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { logFrontendEvent } from '../utils/logger';
import { useToast } from '../context/ToastContext';

import api from '../api/axios';

export const Profile: React.FC = () => {
  const { user, login } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: user?.profile?.firstName || '',
    lastName: user?.profile?.lastName || '',
    phone: '7017217707',
  });

  useEffect(() => {
    logFrontendEvent('info', 'page', 'Profile page loaded');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    logFrontendEvent('info', 'api', 'Updating profile details');
    try {
      const response = await api.put('/profile', {
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      
      if (response.data.success && user) {
        const updatedUser = {
          ...user,
          profile: {
            firstName: formData.firstName,
            lastName: formData.lastName,
          }
        };
        const token = localStorage.getItem('token');
        if (token) login(token, updatedUser);
        showToast('Profile updated successfully!', 'success');
      }
    } catch (error) {
      showToast('Failed to update profile.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth="800px" mx="auto">
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Profile
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Manage your personal information and preferences.
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <Box display="flex" alignItems="center" gap={3} mb={5}>
            <Avatar sx={{ width: 100, height: 100, fontSize: 40, bgcolor: 'primary.main', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
              {formData.firstName?.[0]}{formData.lastName?.[0]}
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight="bold">{formData.firstName} {formData.lastName}</Typography>
              <Typography variant="body1" color="text.secondary">{user?.email}</Typography>
              <Box mt={1}>
                <Typography variant="caption" sx={{ px: 1.5, py: 0.5, bgcolor: 'rgba(99, 102, 241, 0.2)', color: 'primary.main', borderRadius: 4, fontWeight: 'bold' }}>
                  {user?.role}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Email Address" value={user?.email || ''} disabled helperText="Email cannot be changed." />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Authentication Provider" value="Supabase" disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="User ID" value={user?.id || ''} disabled />
            </Grid>
          </Grid>

          <Box mt={5} display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" color="inherit">Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleSave} disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
