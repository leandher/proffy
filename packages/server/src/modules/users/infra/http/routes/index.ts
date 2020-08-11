import express from 'express';

import { createUserController } from '@modules/users/useCases/createUser';
import { forgotPasswordController } from '@modules/users/useCases/forgotPassword';
import { loginController } from '@modules/users/useCases/login';

const userRouter = express.Router();

userRouter.post('/', (request, response) => createUserController.handle(request, response));

userRouter.post('/login', (request, response) => loginController.handle(request, response));

userRouter.post('/forgot-password', (request, response) =>
  forgotPasswordController.handle(request, response),
);

export default userRouter;
