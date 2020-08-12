import { PrismaUserRepository } from '@modules/users/infra/prisma/PrismaUserRepository';
import BCryptHashProvider from '@modules/users/providers/implementations/BCryptHashProvider';

import { ResetPasswordController } from './ResetPasswordController';
import { ResetPasswordUseCase } from './ResetPasswordUseCase';

const prismaUserRepository = new PrismaUserRepository();
const hashProvider = new BCryptHashProvider();

const resetPasswordUseCase = new ResetPasswordUseCase(prismaUserRepository, hashProvider);
const resetPasswordController = new ResetPasswordController(resetPasswordUseCase);

export { resetPasswordUseCase, resetPasswordController };
