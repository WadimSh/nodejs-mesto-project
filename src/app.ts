import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import { errors, celebrate, Joi } from 'celebrate';

import router from './routes';
import { login, createUser } from './controllers/users';
import { reqLogger, errLogger } from './middlewares/logger';
import errorHandler from './middlewares/error-handler';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(helmet());

app.use(express.json());

app.use(reqLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().required().pattern(/^(https?:\/\/)(w{3}.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*)?(#)?$/),
  }),
}), createUser);

app.use('/', router);

app.use(errLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
