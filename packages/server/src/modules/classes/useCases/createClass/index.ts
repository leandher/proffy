import { PrismaClassRepository } from '@modules/classes/infra/prisma/PrismaClassRepository';

import { CreateClassUseCase } from './CreateClassUseCase';
import { CreateClassController } from './CreateClassController';

const prismaClassRepository = new PrismaClassRepository();

const createClassUseCase = new CreateClassUseCase(prismaClassRepository);
const createClassController = new CreateClassController(createClassUseCase);

export { createClassController, createClassUseCase };
