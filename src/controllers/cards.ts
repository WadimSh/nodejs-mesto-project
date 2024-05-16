import { Response, Request, NextFunction } from 'express';

import Card from '../models/card';

export const getAllCards = (req: Request, res: Response, next: NextFunction) => {
  return Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const createCard = (req: Request, res: Response, next: NextFunction) => {

};

export const deleteCardById = (req: Request, res: Response, next: NextFunction) => {

};

export const likeCardById = (req: Request, res: Response, next: NextFunction) => {

};

export const dislikeCardById = (req: Request, res: Response, next: NextFunction) => {

};
