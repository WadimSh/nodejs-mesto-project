import { Router } from 'express';

import { getAllCards, createCard, deleteCardById, likeCardById, dislikeCardById } from '../controllers/cards';

const router = Router();

router.get('/', getAllCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCardById);
router.put('/:cardId/likes', likeCardById);
router.delete('/:cardId/likes', dislikeCardById);

export default router;
