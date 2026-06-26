import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Loading...' }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        bgcolor: 'background.default',
        backdropFilter: 'blur(10px)',
      }}
    >
      <CircularProgress size={48} thickness={4} color="primary" />
      <Typography variant="body1" color="text.secondary" sx={{ mt: 3, fontWeight: 500 }}>
        {message}
      </Typography>
    </Box>
  );
};
