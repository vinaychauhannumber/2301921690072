import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { Log } from 'logging-package';

export const validateRequest = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    try {
      await Log('backend', 'warn', 'middleware', `Validation failed for ${req.originalUrl}: ${JSON.stringify(errors.array())}`);
    } catch (e) {
      // Fail silently
    }
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};
