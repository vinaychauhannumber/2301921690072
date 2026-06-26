import api from '../api/axios';

export const logFrontendEvent = async (level: 'info' | 'warn' | 'error', pkg: string, message: any) => {
  try {
    // Here we can either send it directly to the test server if allowed (CORS),
    // or proxy it through our backend. We'll send it directly if possible, or build a backend proxy endpoint.
    // For now, let's assume we can send it to our own backend which uses logging-package.
    // Let's implement a backend route for frontend logging to avoid browser 'fs' issues.
    await api.post('/logs', { level, package: pkg, message });
  } catch (error) {
    // Fail silently
  }
};
