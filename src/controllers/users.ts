import { Response, Request, NextFunction } from 'express';

import User from '../models/user';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  return User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {

};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {

};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {

};

export const updateUserAvatar = async (req: Request, res: Response, next: NextFunction) => {

};
 