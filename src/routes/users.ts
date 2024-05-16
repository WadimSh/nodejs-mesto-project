import { Router } from 'express';

import { getAllUsers, getUserById, createUser, updateUser, updateUserAvatar } from '../controllers/users';

const router = Router();

router.get('/users', getAllUsers);
router.get('/users/:userId', getUserById);
router.post('/users', createUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateUserAvatar);

export default router;
