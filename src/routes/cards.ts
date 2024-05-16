import { Router } from 'express';

import { getAllCards, createCard, deleteCardById, likeCardById, dislikeCardById } from '../controllers/cards';

const router = Router();

router.get('/cards', getAllCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCardById);
router.put('/cards/:cardId/likes', likeCardById);
router.delete('/cards/:cardId/likes', dislikeCardById);

export default router;
