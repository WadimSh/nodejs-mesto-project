import { Router } from 'express';

import userRoutes from './users';
import cardRoutes from './cards';

const router = Router();

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

export default router;
