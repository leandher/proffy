import { PrismaConnectionRepository } from '@modules/connections/infra/prisma/PrismaConnectionRepository';

import { GetTotalConnectionsController } from './GetTotalConnectionsController';
import { GetTotalConnectionsUseCase } from './GetTotalConnectionsUseCase';

const prismaConnectionRepository = new PrismaConnectionRepository();

const getTotalConnectionsUseCase = new GetTotalConnectionsUseCase(prismaConnectionRepository);
const getTotalConnectionsController = new GetTotalConnectionsController(getTotalConnectionsUseCase);

export { getTotalConnectionsUseCase, getTotalConnectionsController };
