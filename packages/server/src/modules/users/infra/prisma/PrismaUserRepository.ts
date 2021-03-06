import { prisma } from '@infra/prisma/client';
import { User } from '@modules/users/domain/User';
import { UserMap } from '@modules/users/mappers/UserMap';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';

export class PrismaUserRepository implements IUserRepository {
  async findByToken(token: string): Promise<User | null> {
    const rawUsers = await prisma.user.findMany({
      where: { passwordResetToken: token },
      take: 1,
    });

    if (!rawUsers || !rawUsers.length) {
      return null;
    }

    const [rawUser] = rawUsers;

    return UserMap.toDomain(rawUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    const rawUser = await prisma.user.findOne({
      where: {
        email,
      },
    });

    if (!rawUser) {
      return null;
    }

    return UserMap.toDomain(rawUser);
  }

  async findById(id: number): Promise<User | null> {
    const rawUser = await prisma.user.findOne({
      where: { id },
    });

    if (!rawUser) {
      return null;
    }

    return UserMap.toDomain(rawUser);
  }

  async save(user: User): Promise<void> {
    const data = UserMap.toPersistenceInput(user);

    await prisma.user.upsert({
      where: { email: user.email },
      update: data,
      create: data,
    });
  }
}
