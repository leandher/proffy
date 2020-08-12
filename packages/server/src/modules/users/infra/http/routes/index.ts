import express from 'express';

import { createUserController } from '@modules/users/useCases/createUser';
import { forgotPasswordController } from '@modules/users/useCases/forgotPassword';
import { loginController } from '@modules/users/useCases/login';
import { resetPasswordController } from '@modules/users/useCases/resetPassword';

const userRouter = express.Router();

userRouter.post('/', (request, response) => createUserController.handle(request, response));

userRouter.post('/login', (request, response) => loginController.handle(request, response));

userRouter.post('/forgot-password', (request, response) =>
  forgotPasswordController.handle(request, response),
);

userRouter.post('/reset-password', (request, response) =>
  resetPasswordController.handle(request, response),
);

export default userRouter;
