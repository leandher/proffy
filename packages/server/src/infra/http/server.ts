import express, { Request, Response, NextFunction } from 'express';

import cors from 'cors';

import 'express-async-errors';
import AppError from './AppError';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.use(routes);

app.listen(3333, () => console.log('server up 🚀'));
