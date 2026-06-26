import React from 'react';
import { Card, CardContent, Typography, Box, alpha, useTheme } from '@mui/material';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'error';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
  color = 'primary'
}) => {
  const theme = useTheme();
  
  // @ts-ignore - safe index access for theme palette colors
  const mainColor = theme.palette[color]?.main || theme.palette.primary.main;

  return (
    <Card>
      <CardContent sx={{ p: 3, position: 'relative', overflow: 'hidden' }}>
        <Box 
          sx={{ 
            position: 'absolute', 
            top: -20, 
            right: -20, 
            width: 100, 
            height: 100, 
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(mainColor, 0.2)} 0%, ${alpha(mainColor, 0)} 70%)`,
            zIndex: 0
          }} 
        />
        
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" position="relative" zIndex={1}>
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight="600" gutterBottom textTransform="uppercase" letterSpacing={1}>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="text.primary" sx={{ mb: 1 }}>
              {value}
            </Typography>
            {description && (
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            )}
          </Box>
          <Box 
            sx={{ 
              p: 1.5, 
              borderRadius: 3, 
              bgcolor: alpha(mainColor, 0.1),
              color: mainColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 4px 12px ${alpha(mainColor, 0.2)}`
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
