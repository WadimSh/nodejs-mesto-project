import express, { Response, Request, NextFunction } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';

import router from './routes';

import errorHandler from './middlewares/error-handler';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(helmet());

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '627e7e22e42ed434685bcedf' 
  };
  next();
});

app.use('/', router); 

app.use(errorHandler);

app.listen(PORT);
