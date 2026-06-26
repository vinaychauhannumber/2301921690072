import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, useTheme, useMediaQuery } from '@mui/material';
import { Dashboard as DashboardIcon, Person as PersonIcon, Settings as SettingsIcon, Timeline as TimelineIcon } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 260;

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
    { text: 'Activity Logs', icon: <TimelineIcon />, path: '/activity' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const drawerContent = (
    <Box sx={{ overflow: 'auto', mt: 2, px: 2 }}>
      <List>
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) handleDrawerToggle();
                }}
                sx={{
                  borderRadius: 2,
                  bgcolor: active ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                  color: active ? 'primary.main' : 'text.primary',
                  '&:hover': {
                    bgcolor: 'rgba(99, 102, 241, 0.15)',
                  },
                  transition: 'all 0.2s',
                }}
              >
                <ListItemIcon sx={{ color: active ? 'primary.main' : 'text.secondary', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ fontWeight: active ? 600 : 500 }} 
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar />
        {drawerContent}
      </Drawer>
      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        <Toolbar />
        {drawerContent}
      </Drawer>
    </Box>
  );
};
