import express, { Response, Request, NextFunction } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';

import router from './routes';
import { login, createUser } from './controllers/users';
import { auth } from './middlewares/auth';
import errorHandler from './middlewares/error-handler';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(helmet());

app.use(express.json());

app.post('/signin', login);

app.post('/signup', createUser);

app.use(auth);

app.use('/', router);

app.use(errorHandler);

app.listen(PORT);
