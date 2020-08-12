import { prisma } from '@infra/prisma/client';
import { Class } from '@modules/classes/domain/Class';
import { ClassMap } from '@modules/classes/mappers/ClassMap';
import { IClassRepository } from '@modules/classes/repositories/IClassRepository';

export class PrismaClassRepository implements IClassRepository {
  async filter(subject: string, week_day: number, timeInMinutes: number): Promise<Class[]> {
    const raw = await prisma.class.findMany({
      where: {
        subject: {
          equals: subject,
        },
      },
      select: {
        id: true,
        cost: true,
        subject: true,
        user: true,
        schedules: {
          where: {
            week_day,
            to: {
              gte: timeInMinutes,
            },
            from: {
              lte: timeInMinutes,
            },
          },
        },
      },
    });

    const classes = raw.map((rawClass) => ClassMap.toDomain(rawClass));

    return classes;
  }

  async save(newClass: Class): Promise<void> {
    const data = ClassMap.toClassCreateInput(newClass);

    await prisma.class.create({ data });
  }
}
