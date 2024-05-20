import { Response, Request, NextFunction } from 'express';
import { Error } from 'mongoose';

import Card from '../models/card';

import InvalidRequest from '../errors/invalid-request';
import NotFound from '../errors/not-found';
import Forbidden from '../errors/forbidden-error';

export const getAllCards = (req: Request, res: Response, next: NextFunction) => Card.find({})
  .populate('owner')
  .then((card) => res.send({ card }))
  .catch(next);

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  return Card.create({ name, link, owner: req.user?._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidRequest('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

export const deleteCardById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Card.findById(req.params.cardId)
  .orFail(() => {
    throw new NotFound('Карточка с указанным id не найдена.');
  })
  .then((card) => {
    if (card.owner.toString() !== req.user?._id) {
      throw new Forbidden('Попытка удалить чужую карточку.');
    }
  })
  .then(() => Card.findByIdAndDelete(req.params.cardId)
    .then((card) => res.send({ card })))
  .catch((err) => {
    if (err instanceof Error.CastError) {
      next(new InvalidRequest('Некорректный формат идентификатора.'));
    } else {
      next(err);
    }
  });

export const likeCardById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user?._id } },
  { new: true },
)
  .orFail(() => {
    throw new NotFound('Передан несуществующий id карточки.');
  })
  .then((card) => res.send({ card }))
  .catch((err) => {
    if (err instanceof Error.CastError) {
      next(new InvalidRequest('Некорректный формат идентификатора.'));
    } else {
      next(err);
    }
  });

export const dislikeCardById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user?._id } },
  { new: true },
)
  .orFail(() => {
    throw new NotFound('Передан несуществующий id карточки.');
  })
  .then((card) => res.send({ card }))
  .catch((err) => {
    if (err instanceof Error.CastError) {
      next(new InvalidRequest('Некорректный формат идентификатора.'));
    } else {
      next(err);
    }
  });
