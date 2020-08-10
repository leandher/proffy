import { PrismaUserRepository } from '@modules/users/infra/prisma/PrismaUserRepository';
import BCryptHashProvider from '@modules/users/providers/implementations/BCryptHashProvider';

import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';

const prismaUserRepository = new PrismaUserRepository();
const hashProvider = new BCryptHashProvider();

const createUserUseCase = new CreateUserUseCase(prismaUserRepository, hashProvider);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
