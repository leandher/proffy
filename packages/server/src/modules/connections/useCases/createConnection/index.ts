import { PrismaConnectionRepository } from '@modules/connections/infra/prisma/PrismaConnectionRepository';

import { CreateConnectionController } from './CreateConnectionController';
import { CreateConnectionUseCase } from './CreateConnectionUseCase';

const prismaConnectionRepository = new PrismaConnectionRepository();

const createConnectionUseCase = new CreateConnectionUseCase(prismaConnectionRepository);
const createConnectionController = new CreateConnectionController(createConnectionUseCase);

export { createConnectionUseCase, createConnectionController };
