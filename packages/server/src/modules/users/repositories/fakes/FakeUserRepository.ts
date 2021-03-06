import { User } from '@modules/users/domain/User';

import { IUserRepository } from '../IUserRepository';

export default class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async findByToken(token: string): Promise<User | null> {
    return this.users.find((user) => user.passwordResetToken === token) || null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  public async findById(id: number): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  public async save(user: User): Promise<void> {
    if (!user.id) {
      this.users.push({ ...user, id: Math.random() });
    } else {
      const newUsersArray = this.users.filter((u) => u.id !== user.id);

      newUsersArray.push(user);

      this.users = [...newUsersArray];
    }
  }
}
