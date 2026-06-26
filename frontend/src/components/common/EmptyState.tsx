import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      py={8}
      px={3}
      sx={{
        borderRadius: 4,
        border: '1px dashed rgba(255, 255, 255, 0.1)',
        bgcolor: 'rgba(255, 255, 255, 0.02)'
      }}
    >
      <Box sx={{ color: 'text.secondary', mb: 2, transform: 'scale(1.5)' }}>
        {icon}
      </Box>
      <Typography variant="h6" fontWeight="bold" gutterBottom color="text.primary">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mb: 3 }}>
        {description}
      </Typography>
      {actionText && onAction && (
        <Button variant="outlined" onClick={onAction} sx={{ borderRadius: 8 }}>
          {actionText}
        </Button>
      )}
    </Box>
  );
};
