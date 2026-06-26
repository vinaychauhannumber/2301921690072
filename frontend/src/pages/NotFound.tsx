import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SentimentDissatisfied as SadIcon } from '@mui/icons-material';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={3}>
      <Paper elevation={0} sx={{ p: 5, textAlign: 'center', maxWidth: 400, borderRadius: 4, bgcolor: 'rgba(255,255,255,0.05)' }}>
        <SadIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          404
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>
          The page you are looking for doesn't exist or has been moved.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Return Home
        </Button>
      </Paper>
    </Box>
  );
};

export default NotFound;
