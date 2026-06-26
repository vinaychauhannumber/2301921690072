import axios, { AxiosError } from 'axios';
import fs from 'fs';
import path from 'path';

const API_BASE = 'http://4.224.186.213/evaluation-service';

export interface CandidateCredentials {
  clientID: string;
  clientSecret: string;
}

export interface AuthTokens {
  accessToken: string;
}

const CREDENTIALS_FILE = path.resolve(process.cwd(), '.candidate_credentials.json');
const TOKENS_FILE = path.resolve(process.cwd(), '.candidate_tokens.json');

const CANDIDATE_DETAILS = {
  email: 'csh23012+1@glbitm.ac.in',
  name: 'Vinay Chauhan',
  mobileNo: '7017217707',
  githubUsername: 'vinaychauhannumber',
  rollNo: '2301921690072',
  accessCode: 'xxkJnk'
};

/**
 * Ensures we have client credentials by registering if necessary.
 */
export const getCredentials = async (): Promise<CandidateCredentials> => {
  if (fs.existsSync(CREDENTIALS_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(CREDENTIALS_FILE, 'utf-8'));
      if (data.clientID && data.clientSecret) {
        return data as CandidateCredentials;
      }
    } catch (e) {
      // JSON parse error, ignore and re-register
    }
  }

  // Register
  try {
    const response = await axios.post(`${API_BASE}/register`, CANDIDATE_DETAILS);
    const credentials = {
      clientID: response.data.clientID || response.data.clientId,
      clientSecret: response.data.clientSecret
    };
    
    // In case the API uses different casing or nested objects, let's just log and save it all
    const toSave = { ...response.data, ...credentials };
    fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(toSave, null, 2));
    
    // Safety fallback if the API returns 400 because already registered and we lost the credentials
    // Note: If this happens in a real test scenario without a way to retrieve lost credentials, 
    // we would be blocked. Assuming the test server allows re-registration or returns it.
    
    return credentials;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400 && error.response.data?.message?.includes('registered')) {
      console.warn('[LoggingAuth] Already registered but missing credentials locally. Make sure you have the credentials.');
      // If we are already registered and we lost the file, we might be stuck unless the API returns them again on conflict.
      // Assuming for this evaluation we will succeed on first try.
      throw new Error('Already registered, but local credentials file is missing.');
    }
    throw error;
  }
};

/**
 * Authenticates to obtain a token, or returns cached valid token.
 * Note: Since there's no expiration provided in the prompt, we'll assume we get a new one if it fails,
 * or we'll just request a new one every startup for simplicity.
 */
export const getToken = async (): Promise<string> => {
  if (fs.existsSync(TOKENS_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(TOKENS_FILE, 'utf-8'));
      if (data.accessToken) {
        // Here we could check expiration if available
        return data.accessToken;
      }
    } catch (e) {
      // Ignore and re-auth
    }
  }

  const creds = await getCredentials();

  try {
    const authPayload = {
      email: CANDIDATE_DETAILS.email,
      name: CANDIDATE_DETAILS.name,
      rollNo: CANDIDATE_DETAILS.rollNo,
      accessCode: CANDIDATE_DETAILS.accessCode,
      clientID: creds.clientID,
      clientSecret: creds.clientSecret
    };
    const response = await axios.post(`${API_BASE}/auth`, authPayload);
    const token = response.data.token || response.data.accessToken || response.data.Authorization;
    
    if (!token) {
      throw new Error(`Failed to extract token from response: ${JSON.stringify(response.data)}`);
    }

    fs.writeFileSync(TOKENS_FILE, JSON.stringify({ accessToken: token }, null, 2));
    return token;
  } catch (error) {
    console.error('[LoggingAuth] Failed to authenticate:', (error as AxiosError).response?.data || (error as Error).message);
    throw error;
  }
};

/**
 * Forces a token refresh by deleting the token file and getting a new one.
 */
export const refreshToken = async (): Promise<string> => {
  if (fs.existsSync(TOKENS_FILE)) {
    fs.unlinkSync(TOKENS_FILE);
  }
  return getToken();
};
