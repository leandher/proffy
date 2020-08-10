import { User as PersistenceUser } from '@prisma/client';

import { User } from '../domain/User';

export class UserMap {
  public static toDomain(raw: PersistenceUser): User {
    const user = new User(
      {
        ...raw,
        avatar: raw.avatar || undefined,
        whatsapp: raw.whatsapp || undefined,
        bio: raw.bio || undefined,
      },
      raw.id,
    );

    return user;
  }

  public static toPersistence(user: User): PersistenceUser {
    return {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      avatar: user.avatar || null,
      whatsapp: user.whatsapp || null,
      bio: user.bio || null,
    };
  }
}
