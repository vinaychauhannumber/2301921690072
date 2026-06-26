import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, InputBase, Avatar, Badge, Menu, MenuItem, Divider } from '@mui/material';
import { Search as SearchIcon, Notifications as NotificationsIcon, Logout as LogoutIcon, Person as PersonIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logFrontendEvent } from '../../utils/logger';
import { useToast } from '../../context/ToastContext';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notifAnchorEl, setNotifAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    logFrontendEvent('info', 'auth', 'User clicked logout from Navbar');
    try {
      await logout();
      showToast('Logged out successfully', 'success');
      navigate('/login');
    } catch (error) {
      logFrontendEvent('error', 'auth', 'Logout failed');
      showToast('Failed to log out', 'error');
    }
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box component="span" sx={{ color: 'primary.main', fontSize: 24 }}>✦</Box> 
          Nexus SaaS
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Search Bar */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            alignItems: 'center', 
            bgcolor: 'rgba(255, 255, 255, 0.05)', 
            borderRadius: 8, 
            px: 2, 
            py: 0.5,
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
            <InputBase
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
              sx={{ color: 'text.primary', width: 200 }}
            />
          </Box>

          <IconButton color="inherit" onClick={(e) => setNotifAnchorEl(e.currentTarget)}>
            <Badge badgeContent={3} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton
            size="small"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', fontSize: 16 }}>
              {user?.profile?.firstName?.[0]}{user?.profile?.lastName?.[0]}
            </Avatar>
          </IconButton>
          
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{ mt: 1 }}
            PaperProps={{
              sx: {
                borderRadius: 3,
                minWidth: 200,
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
                bgcolor: 'rgba(17, 17, 17, 0.95)',
                backdropFilter: 'blur(10px)',
              }
            }}
          >
            <Box px={2} py={1.5}>
              <Typography variant="subtitle1" fontWeight="bold">{user?.profile?.firstName} {user?.profile?.lastName}</Typography>
              <Typography variant="body2" color="text.secondary" noWrap>{user?.email}</Typography>
            </Box>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>
              <PersonIcon sx={{ mr: 1.5, fontSize: 20, color: 'text.secondary' }} /> Profile
            </MenuItem>
            <MenuItem onClick={() => { handleClose(); navigate('/settings'); }}>
              <SettingsIcon sx={{ mr: 1.5, fontSize: 20, color: 'text.secondary' }} /> Settings
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
              <LogoutIcon sx={{ mr: 1.5, fontSize: 20 }} /> Logout
            </MenuItem>
          </Menu>

          {/* Notifications Menu */}
          <Menu
            id="notifications-menu"
            anchorEl={notifAnchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(notifAnchorEl)}
            onClose={() => setNotifAnchorEl(null)}
            sx={{ mt: 1 }}
            PaperProps={{
              sx: {
                borderRadius: 3,
                minWidth: 320,
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
                bgcolor: 'rgba(17, 17, 17, 0.95)',
                backdropFilter: 'blur(10px)',
              }
            }}
          >
            <Box px={2} py={1.5} display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1" fontWeight="bold">Notifications</Typography>
              <Typography variant="caption" color="primary" sx={{ cursor: 'pointer' }} onClick={() => setNotifAnchorEl(null)}>Mark all as read</Typography>
            </Box>
            <Divider sx={{ my: 0 }} />
            
            <MenuItem onClick={() => setNotifAnchorEl(null)} sx={{ py: 2, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <Box>
                <Typography variant="body2" fontWeight="bold">Welcome to Nexus SaaS!</Typography>
                <Typography variant="caption" color="text.secondary">Your account has been successfully verified.</Typography>
                <Typography variant="caption" display="block" color="primary" mt={0.5}>2 hours ago</Typography>
              </Box>
            </MenuItem>
            
            <MenuItem onClick={() => setNotifAnchorEl(null)} sx={{ py: 2, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <Box>
                <Typography variant="body2" fontWeight="bold">Database Synced</Typography>
                <Typography variant="caption" color="text.secondary">Your Prisma schema is successfully connected.</Typography>
                <Typography variant="caption" display="block" color="primary" mt={0.5}>3 hours ago</Typography>
              </Box>
            </MenuItem>

            <MenuItem onClick={() => setNotifAnchorEl(null)} sx={{ py: 2 }}>
              <Box>
                <Typography variant="body2" fontWeight="bold">Security Alert</Typography>
                <Typography variant="caption" color="text.secondary">New login from Chrome on Mac OS.</Typography>
                <Typography variant="caption" display="block" color="primary" mt={0.5}>4 hours ago</Typography>
              </Box>
            </MenuItem>
            
            <Divider sx={{ my: 0 }} />
            <Box px={2} py={1.5} textAlign="center">
              <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }} onClick={() => setNotifAnchorEl(null)}>View all notifications</Typography>
            </Box>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
