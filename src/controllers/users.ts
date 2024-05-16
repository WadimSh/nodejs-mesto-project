import { Response, Request, NextFunction } from 'express';

export interface User {
  name: string;
  about: string;
  avatar: string;
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {

};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {

};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {

};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {

};

export const updateUserAvatar = async (req: Request, res: Response, next: NextFunction) => {

};
 