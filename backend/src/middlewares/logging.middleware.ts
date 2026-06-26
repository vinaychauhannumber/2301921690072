import { Request, Response, NextFunction } from 'express';
import { Log } from 'logging-package';

export const loggingMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // Intercept response finish
  res.on('finish', async () => {
    const duration = Date.now() - start;
    const level = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info';
    
    const message = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip
    };

    try {
      await Log('backend', level, 'middleware', message);
    } catch (err) {
      // Fail silently
    }
  });

  next();
};
