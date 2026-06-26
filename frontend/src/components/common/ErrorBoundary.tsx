import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';
import { logFrontendEvent } from '../../utils/logger';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, _errorInfo: ErrorInfo) {
    // Zero console policy; rely on backend logging only
    // Log fatal error to our evaluation server
    logFrontendEvent('error', 'boundary', `Frontend crash: ${error.message}`);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          minHeight="100vh" 
          p={3}
        >
          <Paper 
            elevation={0} 
            sx={{ 
              p: 5, 
              textAlign: 'center', 
              maxWidth: 500,
              borderRadius: 4,
              border: '1px solid rgba(239, 68, 68, 0.2)',
              bgcolor: 'rgba(239, 68, 68, 0.05)'
            }}
          >
            <WarningIcon color="error" sx={{ fontSize: 64, mb: 2 }} />
            <Typography variant="h5" color="text.primary" gutterBottom fontWeight="bold">
              Something went wrong
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              The application encountered an unexpected error. Our team has been notified.
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}
