import { Router } from 'express';

import {
  getAllUsers,
  getUserMe,
  getUserById,
  updateUser,
  updateUserAvatar,
} from '../controllers/users';

const router = Router();

router.get('/', getAllUsers);
router.get('/me', getUserMe);
router.get('/:userId', getUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

export default router;
