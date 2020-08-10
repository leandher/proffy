import { PrismaClassRepository } from '@modules/classes/infra/prisma/PrismaClassRepository';

import { FindClassesController } from './FindClassesController';
import { FindClassesUseCase } from './FindClassesUseCase';

const prismaClassRepository = new PrismaClassRepository();

const findClassesUseCase = new FindClassesUseCase(prismaClassRepository);
const findClassesController = new FindClassesController(findClassesUseCase);

export { findClassesController, findClassesUseCase };
