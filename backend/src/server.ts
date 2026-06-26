import app from './app';
import dotenv from 'dotenv';
import { Log } from 'logging-package';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await Log('backend', 'info', 'service', `Server started successfully on port ${PORT}`);
  } catch (error) {
    // Silently fail if logger fails, per zero-console policy
  }
});
// Nodemon trigger
