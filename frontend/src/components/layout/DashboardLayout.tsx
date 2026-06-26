import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

interface Props {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<Props> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ position: 'fixed', top: 12, left: 16, zIndex: theme.zIndex.drawer + 2 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          width: { md: `calc(100% - 260px)` },
          mt: 8, // Offset for Navbar
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
