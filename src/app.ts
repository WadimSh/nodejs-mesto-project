import express, { Request, Response } from 'express';

const { PORT = 3000 } = process.env;

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('<h1>Cервер запущен</h1>');
}); 

app.listen(PORT);