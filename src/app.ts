import express, { Response, Request, NextFunction } from 'express';
import mongoose from 'mongoose';

import router from './routes';

import { Error } from './type/error';
import { InternalServer } from 'errors/internal-server';

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  req.user = {
    _id: '627e7e22e42ed434685bcedf' 
  };
  next();
});

app.use('/', router); 

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.statusCode !== 500) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  } else {
    throw new InternalServer('Ошибка по умолчанию.')
  }
});

app.listen(PORT);
