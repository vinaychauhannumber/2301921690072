import React, { useEffect } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { History as HistoryIcon } from '@mui/icons-material';
import { logFrontendEvent } from '../utils/logger';

export const ActivityLogs: React.FC = () => {

  useEffect(() => {
    logFrontendEvent('info', 'page', 'Activity Logs page loaded');
  }, []);

  return (
    <Box maxWidth="800px" mx="auto">
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Activity Timeline
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Track your recent actions and security events.
      </Typography>

      <Card>
        <CardContent sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
          <HistoryIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
          <Typography variant="h6" fontWeight="bold" color="text.primary" gutterBottom>
            No activity to show
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Your recent activity logs will appear here once they are available. Currently, activity tracking is disabled.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
