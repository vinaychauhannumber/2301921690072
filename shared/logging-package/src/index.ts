import axios, { AxiosError } from 'axios';
import { getToken, refreshToken } from './auth';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';
export type LogStack = 'backend' | 'frontend';

// Packages defined in requirements
export type BackendPackage = 'cache' | 'controller' | 'cron_job' | 'db' | 'domain' | 'handler' | 'repository' | 'route' | 'service';
export type FrontendPackage = 'api' | 'component' | 'hook' | 'page' | 'state' | 'style';
export type SharedPackage = 'auth' | 'config' | 'middleware' | 'utils';
export type LogPackage = BackendPackage | FrontendPackage | SharedPackage;

const API_BASE = 'http://4.224.186.213/evaluation-service';

/**
 * Log function to send logs to the evaluation server.
 * Automatically handles authentication and token refresh.
 */
export const Log = async (
  stack: LogStack,
  level: LogLevel,
  pkg: LogPackage,
  message: string | object
): Promise<void> => {
  
  let token: string;
  try {
    token = await getToken();
  } catch (error) {
    // Fail silently or handle internally without console logging
    return;
  }

  const payload = {
    stack,
    level,
    package: pkg,
    message: typeof message === 'string' ? message : JSON.stringify(message)
  };

  const sendRequest = async (authToken: string) => {
    return axios.post(`${API_BASE}/logs`, payload, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
  };

  try {
    await sendRequest(token);
  } catch (error) {
    const err = error as AxiosError;
    // If token is expired or unauthorized, try to refresh and retry once
    if (err.response?.status === 401 || err.response?.status === 403) {
      try {
        const newToken = await refreshToken();
        await sendRequest(newToken);
        return;
      } catch (retryError) {
        // Fail silently
      }
    } else {
      // Fail silently
    }
  }
};
