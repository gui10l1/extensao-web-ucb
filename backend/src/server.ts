import 'reflect-metadata';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';

import 'express-async-errors';

import './database/connection';
import routes from './routes';
import AppError from './errors/AppError';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(routes);
app.use((err: any, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    const { code, message } = err;

    return res.status(code).json({ type: 'error', message });
  }

  console.error(err);

  return res.status(500).json({ type: 'error', message: 'Internal server error!' });
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Server started on port ${process.env.APP_PORT}`);
});