import { PrismaUserRepository } from '@modules/users/infra/prisma/PrismaUserRepository';
import { mailTrapMailProvider } from '@providers/MailProvider';

import { ForgotPasswordController } from './ForgotPasswordController';
import { ForgotPasswordUseCase } from './ForgotPasswordUseCase';

const prismaUserRepository = new PrismaUserRepository();

const forgotPasswordUseCase = new ForgotPasswordUseCase(prismaUserRepository, mailTrapMailProvider);
const forgotPasswordController = new ForgotPasswordController(forgotPasswordUseCase);

export { forgotPasswordUseCase, forgotPasswordController };
