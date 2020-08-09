import { prisma } from '@infra/prisma/client';
import { IConnectionRepository } from '@modules/connections/repositories/IConnectionRepository';

export class PrismaConnectionRepository implements IConnectionRepository {
  async getTotalConnections(): Promise<number> {
    const raw = await prisma.connection.count();

    return raw;
  }

  async save(userId: number): Promise<void> {
    await prisma.connection.create({
      data: { user: { connect: { id: userId } } },
    });
  }
}
