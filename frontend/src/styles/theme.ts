import { createTheme, type ThemeOptions } from '@mui/material/styles';

const glassmorphismOverrides = {
  root: {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
  },
};

const baseOptions: ThemeOptions = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.03em' },
    h2: { fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontWeight: 600, letterSpacing: '-0.01em' },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #8d6e63 0%, #5d4037 100%)',
          color: '#ffffff',
          '&:hover': {
            background: 'linear-gradient(135deg, #bcaaa4 0%, #8d6e63 100%)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          ...glassmorphismOverrides.root,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          ...glassmorphismOverrides.root,
          borderRadius: 20,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          ...glassmorphismOverrides.root,
          borderRight: '1px solid rgba(255, 255, 255, 0.05)',
          backgroundColor: 'rgba(10, 10, 10, 0.7)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          ...glassmorphismOverrides.root,
          backgroundColor: 'rgba(10, 10, 10, 0.7)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            },
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#8d6e63',
            },
          },
        },
      },
    },
  },
};

export const darkTheme = createTheme({
  ...baseOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: '#8d6e63',
      light: '#bcaaa4',
      dark: '#5d4037',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ec4899',
      light: '#f472b6',
      dark: '#db2777',
      contrastText: '#ffffff',
    },
    background: {
      default: '#050505', // Very deep dark background to make glass pop
      paper: '#111111',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
    divider: 'rgba(255, 255, 255, 0.05)',
  },
});
