import { Response, Request, NextFunction } from 'express';

import User from '../models/user';

import { InvalidRequest } from 'errors/invalid-request';
import { NotFound } from 'errors/not-found';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  return User.find({})
    .then((user) => res.send({ user }))
    .catch(next);
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  return  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFound('Пользователь по указанному _id не найден.');
    })
    .then((user) => res.send({ user }))
    .catch(next);
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  if (!name || !about || !avatar) {
    throw new InvalidRequest('Переданы некорректные данные при создании пользователя.')
  }
  return User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch(next);
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  if (!name || !about) {
    throw new InvalidRequest('Переданы некорректные данные при обновлении профиля. ')
  }
  // @ts-ignore
  return User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail(() => {
      throw new NotFound('Пользователь с указанным _id не найден.');
    })
    .then((user) => res.send({ user }))
    .catch(next);
};

export const updateUserAvatar = async (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  if (!avatar) {
    throw new InvalidRequest('Переданы некорректные данные при обновлении аватара.')
  }
  // @ts-ignore
  return User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail(() => {
      throw new NotFound('Пользователь с указанным _id не найден.');
    })
    .then((user) => res.send({ user }))
    .catch(next);
};
 