import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Divider, Avatar, Card, CardContent } from '@mui/material';
import { 
  CheckCircle as CheckCircleIcon, 
  Storage as StorageIcon, 
  Api as ApiIcon, 
  Security as SecurityIcon 
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { logFrontendEvent } from '../utils/logger';
import { StatsCard } from '../components/common/StatsCard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    logFrontendEvent('info', 'page', 'Dashboard loaded');
    setCurrentDate(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <Box sx={{ pb: 6 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom color="text.primary">
          Welcome back, {user?.profile?.firstName || 'User'}! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {currentDate} • Here's what's happening with your account today.
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard 
            title="Account Status" 
            value="Active" 
            icon={<CheckCircleIcon />} 
            color="success" 
            description="Fully verified"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard 
            title="Database" 
            value="Connected" 
            icon={<StorageIcon />} 
            color="primary" 
            description="PostgreSQL active"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard 
            title="Backend API" 
            value="Online" 
            icon={<ApiIcon />} 
            color="secondary" 
            description="Node.js running"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard 
            title="Logging" 
            value="Active" 
            icon={<SecurityIcon />} 
            color="info" 
            description="Middleware tracking"
          />
        </Grid>
      </Grid>

      {/* Main Content Area */}
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Recent Activity Preview
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              {[
                { action: 'Dashboard Viewed', time: 'Just now', color: '#8d6e63' },
                { action: 'Logged In', time: '2 minutes ago', color: '#10b981' },
                { action: 'Profile Created', time: '1 hour ago', color: '#bcaaa4' },
              ].map((item, index) => (
                <Box key={index} display="flex" alignItems="center" mb={2}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: item.color, mr: 2 }} />
                  <Box flexGrow={1}>
                    <Typography variant="body1" fontWeight="500">{item.action}</Typography>
                    <Typography variant="body2" color="text.secondary">{item.time}</Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%', background: 'linear-gradient(135deg, rgba(141, 110, 99, 0.1) 0%, rgba(93, 64, 55, 0.1) 100%)' }}>
            <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: 'primary.main', fontSize: 32, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
                {user?.profile?.firstName?.[0]}{user?.profile?.lastName?.[0]}
              </Avatar>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {user?.profile?.firstName} {user?.profile?.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {user?.role === 'ADMIN' ? 'Administrator' : 'Standard User'}
              </Typography>
              <Box sx={{ mt: 2, px: 2, py: 1, borderRadius: 8, bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Typography variant="body2" fontFamily="monospace">
                  ID: {user?.id.split('-')[0]}...
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
