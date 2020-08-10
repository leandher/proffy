import { UserMap } from '@modules/users/mappers/UserMap';
import {
  ClassCreateInput,
  Class as ClassPersistence,
  User as UserPersistence,
  Schedule as SchedulePersistence,
} from '@prisma/client';

import { Class } from '../domain/Class';

interface ClassQuery extends Omit<ClassPersistence, 'user_id'> {
  user: UserPersistence;
  schedules: SchedulePersistence[];
}

export class ClassMap {
  public static toClassCreateInput(classDomain: Class): ClassCreateInput {
    return {
      cost: classDomain.cost,
      subject: classDomain.subject,
      user: { connect: { id: classDomain.teacher.id } },
      schedules: { create: classDomain.schedules },
    };
  }

  public static toDomain(classPersistence: ClassQuery): Class {
    return {
      id: classPersistence.id,
      cost: classPersistence.cost,
      subject: classPersistence.subject,
      schedules: classPersistence.schedules,
      teacher: classPersistence.user && UserMap.toDomain(classPersistence.user),
    };
  }
}
