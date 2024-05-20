import { Router, Response, Request, NextFunction } from 'express';

import userRoutes from './users';
import cardRoutes from './cards';

import { NotFound } from '../errors/not-found';

const router = Router();

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFound('Страница с таким url не найдена.'));
});

export default router;
