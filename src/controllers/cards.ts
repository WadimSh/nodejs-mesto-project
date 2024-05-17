import { Response, Request, NextFunction } from 'express';

import Card from '../models/card';

import { InvalidRequest } from 'errors/invalid-request';
import { NotFound } from 'errors/not-found';

export const getAllCards = (req: Request, res: Response, next: NextFunction) => {
  return Card.find({})
  .populate('owner')
  .then((card) => res.send({ card }))
  .catch(next);
};

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  if (!name || !link) {
    throw new InvalidRequest('Переданы некорректные данные при создании карточки.')
  }
  // @ts-ignore
  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

export const deleteCardById = (req: Request, res: Response, next: NextFunction) => {
  return Card.findByIdAndDelete(req.params.id)
    .orFail(() => {
      throw new NotFound('Карточка с указанным _id не найдена.');
    })
    .then((card) => res.send({ card }))
    .catch(next);
};

export const likeCardById = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  return Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new NotFound('Передан несуществующий _id карточки.');
    })
    .then((card) => res.send({ card }))
    .catch(next);
};

export const dislikeCardById = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  return Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new NotFound('Передан несуществующий _id карточки.');
    })
  .then((card) => res.send({ card }))
  .catch(next);
};
