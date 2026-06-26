import { Router } from 'express';
import { body } from 'express-validator';
import { signup, login, logout } from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validate.middleware';

const router = Router();

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
  ],
  validateRequest,
  signup
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validateRequest,
  login
);

router.post('/logout', logout);

export default router;
