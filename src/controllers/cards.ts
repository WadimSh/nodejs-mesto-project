import { Response, Request, NextFunction } from 'express';

import Card from '../models/card';

export const getAllCards = (req: Request, res: Response, next: NextFunction) => {
  return Card.find({})
  .populate('owner')
  .then((card) => res.send({ card }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const createCard = (req: any, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const deleteCardById = (req: Request, res: Response, next: NextFunction) => {
  return Card.findByIdAndDelete(req.params.id)
    .then((card) => res.send({ card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const likeCardById = (req: any, res: Response, next: NextFunction) => {
  return Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => res.send({ card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const dislikeCardById = (req: any, res: Response, next: NextFunction) => {
  return Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
  .then((card) => res.send({ card }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
