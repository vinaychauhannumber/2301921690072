import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { Log } from 'logging-package';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const result = await authService.signupUser(email, password, firstName, lastName);
    
    await Log('backend', 'info', 'controller', `User signup successful: ${email}`);
    
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    
    await Log('backend', 'info', 'controller', `User login successful: ${email}`);
    
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      await authService.logoutUser(token);
    }
    
    await Log('backend', 'info', 'controller', `User logout successful`);
    
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};
