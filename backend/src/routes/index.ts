import { Router } from 'express';
import authRoutes from './auth.routes';
import logRoutes from './log.routes';
import profileRoutes from './profile.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/logs', logRoutes);

export default router;
