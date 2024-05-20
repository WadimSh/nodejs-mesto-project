import { Router, Response, Request, NextFunction } from 'express';

import userRoutes from './users';
import cardRoutes from './cards';
import { auth } from '../middlewares/auth';
import { NotFound } from '../errors/not-found';

const router = Router();

router.use('/users', auth, userRoutes);
router.use('/cards', auth, cardRoutes);

router.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFound('Страница с таким url не найдена.'));
});

export default router;
