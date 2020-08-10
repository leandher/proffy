import { PrismaClassRepository } from '@modules/classes/infra/prisma/PrismaClassRepository';

import { CreateClassController } from './CreateClassController';
import { CreateClassUseCase } from './CreateClassUseCase';

const prismaClassRepository = new PrismaClassRepository();

const createClassUseCase = new CreateClassUseCase(prismaClassRepository);
const createClassController = new CreateClassController(createClassUseCase);

export { createClassController, createClassUseCase };
