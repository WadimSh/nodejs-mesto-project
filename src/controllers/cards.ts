import { Response, Request, NextFunction } from 'express';

export interface Card {
  name: string;
  link: string;
  createdAt: Date;
  //owner: Schema.Types.ObjectId;
  //likes: Schema.Types.ObjectId[];
};

export const getAllCards = async (req: Request, res: Response, next: NextFunction) => {

};

export const createCard = async (req: Request, res: Response, next: NextFunction) => {

};

export const deleteCardById = async (req: Request, res: Response, next: NextFunction) => {

};

export const likeCardById = async (req: Request, res: Response, next: NextFunction) => {

};

export const dislikeCardById = async (req: Request, res: Response, next: NextFunction) => {

};
