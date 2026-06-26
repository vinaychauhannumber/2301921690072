import { Router } from 'express';
import * as profileController from '../controllers/profile.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', profileController.getProfile);
router.put('/', profileController.updateProfile);

export default router;
