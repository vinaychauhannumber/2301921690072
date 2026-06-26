import { Request, Response, NextFunction } from 'express';
import { Log } from 'logging-package';

export interface AppError extends Error {
  statusCode?: number;
}

export const errorMiddleware = async (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log to evaluation server
  try {
    await Log('backend', 'error', 'middleware', {
      statusCode,
      message,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method
    });
  } catch (logErr) {
    // Fail silently per zero-console policy
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
