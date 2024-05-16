import express, { Response, Request, NextFunction } from 'express';
import mongoose from 'mongoose';

import router from 'routes';

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  req.user = {
    _id: '...' // вставить сюда _id созданного пользователя
  };

  next();
});

app.use('/', router); 

app.listen(PORT);
