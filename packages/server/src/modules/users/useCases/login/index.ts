import { PrismaUserRepository } from '@modules/users/infra/prisma/PrismaUserRepository';
import BCryptHashProvider from '@modules/users/providers/implementations/BCryptHashProvider';

import { LoginController } from './LoginController';
import { LoginUseCase } from './LoginUseCase';

const prismaUserRepository = new PrismaUserRepository();
const hashProvider = new BCryptHashProvider();

const loginUseCase = new LoginUseCase(prismaUserRepository, hashProvider);
const loginController = new LoginController(loginUseCase);

export { loginUseCase, loginController };
