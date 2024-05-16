import express, { Response, Request, NextFunction } from 'express';

import router from 'routes';

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  req.user = {
    _id: '...' // вставить сюда _id созданного пользователя
  };

  next();
});

app.use('/', router); 

app.listen(PORT);
