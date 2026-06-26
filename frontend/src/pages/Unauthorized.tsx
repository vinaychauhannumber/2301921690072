import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Lock as LockIcon } from '@mui/icons-material';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={3}>
      <Paper elevation={0} sx={{ p: 5, textAlign: 'center', maxWidth: 400, borderRadius: 4, bgcolor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
        <LockIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h4" fontWeight="bold" color="error" gutterBottom>
          401
        </Typography>
        <Typography variant="h6" color="text.primary" gutterBottom>
          Unauthorized Access
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>
          You do not have permission to view this page. Please log in to continue.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
          Go to Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Unauthorized;
