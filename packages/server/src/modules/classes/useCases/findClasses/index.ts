import { PrismaClassRepository } from '@modules/classes/infra/prisma/PrismaClassRepository';

import { FindClassesUseCase } from './FindClassesUseCase';
import { FindClassesController } from './FindClassesController';

const prismaClassRepository = new PrismaClassRepository();

const findClassesUseCase = new FindClassesUseCase(prismaClassRepository);
const findClassesController = new FindClassesController(findClassesUseCase);

export { findClassesController, findClassesUseCase };
