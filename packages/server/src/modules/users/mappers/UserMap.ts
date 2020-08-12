import { User as PersistenceUser, UserCreateInput } from '@prisma/client';

import { User } from '../domain/User';

export class UserMap {
  public static toDomain(raw: PersistenceUser): User {
    const user = new User(
      {
        ...raw,
        avatar: raw.avatar || undefined,
        whatsapp: raw.whatsapp || undefined,
        bio: raw.bio || undefined,
        passwordResetExpires: raw.passwordResetExpires || undefined,
        passwordResetToken: raw.passwordResetToken || undefined,
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
      passwordResetExpires: user.passwordResetExpires || null,
      passwordResetToken: user.passwordResetToken || null,
    };
  }

  public static toPersistenceInput(user: User): UserCreateInput {
    return {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      avatar: user.avatar || null,
      whatsapp: user.whatsapp || null,
      bio: user.bio || null,
      passwordResetExpires: user.passwordResetExpires || null,
      passwordResetToken: user.passwordResetToken || null,
    };
  }
}
