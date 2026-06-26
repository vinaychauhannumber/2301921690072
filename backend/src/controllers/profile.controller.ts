import { Request, Response, NextFunction } from 'express';
import * as profileService from '../services/profile.service';
import { Log } from 'logging-package';

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const profile = await profileService.getProfileByUserId(userId);
    
    await Log('backend', 'info', 'controller', `Fetched profile for user: ${userId}`);
    
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const { firstName, lastName } = req.body;
    
    const updatedProfile = await profileService.updateProfile(userId, firstName, lastName);
    
    await Log('backend', 'info', 'controller', `Updated profile for user: ${userId}`);
    
    res.status(200).json({ success: true, data: updatedProfile });
  } catch (error) {
    next(error);
  }
};
