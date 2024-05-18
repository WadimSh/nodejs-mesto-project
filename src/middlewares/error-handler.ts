import { Response, Request, NextFunction } from 'express';
import { Error } from '../type/error';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;

  res.status(statusCode).send({ status: 'error', message });
  next();
};

export default errorHandler;
