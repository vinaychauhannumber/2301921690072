import React, { useEffect } from 'react';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, ListItemSecondaryAction, Switch, Divider, Button } from '@mui/material';
import { logFrontendEvent } from '../utils/logger';
import { useToast } from '../context/ToastContext';

export const Settings: React.FC = () => {
  const { showToast } = useToast();

  useEffect(() => {
    logFrontendEvent('info', 'page', 'Settings page loaded');
  }, []);

  const handleToggle = (setting: string) => {
    logFrontendEvent('info', 'action', `Toggled setting: ${setting}`);
    showToast(`${setting} updated`, 'success');
  };

  return (
    <Box maxWidth="800px" mx="auto">
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Configure your application preferences and security.
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 0 }}>
          <List disablePadding>
            <ListItem sx={{ py: 3, px: 4 }}>
              <ListItemText 
                primary={<Typography variant="h6" fontWeight="bold">Dark Mode</Typography>} 
                secondary="Toggle between light and dark theme." 
              />
              <ListItemSecondaryAction>
                <Switch edge="end" defaultChecked color="primary" onChange={() => handleToggle('Dark Mode')} />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem sx={{ py: 3, px: 4 }}>
              <ListItemText 
                primary={<Typography variant="h6" fontWeight="bold">Email Notifications</Typography>} 
                secondary="Receive activity alerts via email." 
              />
              <ListItemSecondaryAction>
                <Switch edge="end" defaultChecked color="primary" onChange={() => handleToggle('Notifications')} />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem sx={{ py: 3, px: 4 }}>
              <ListItemText 
                primary={<Typography variant="h6" fontWeight="bold">Two-Factor Authentication</Typography>} 
                secondary="Add an extra layer of security to your account." 
              />
              <ListItemSecondaryAction>
                <Button variant="outlined" color="primary">Enable</Button>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </CardContent>
      </Card>
      
      <Typography variant="h5" fontWeight="bold" gutterBottom mt={6} color="error">
        Danger Zone
      </Typography>
      <Card sx={{ borderColor: 'error.main', borderWidth: 1, borderStyle: 'solid', bgcolor: 'rgba(239, 68, 68, 0.05)' }}>
        <CardContent sx={{ p: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6" fontWeight="bold">Delete Account</Typography>
            <Typography variant="body2" color="text.secondary">Once you delete your account, there is no going back.</Typography>
          </Box>
          <Button variant="contained" color="error">Delete Account</Button>
        </CardContent>
      </Card>
    </Box>
  );
};
