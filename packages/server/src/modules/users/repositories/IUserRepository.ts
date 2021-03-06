import { User } from '../domain/User';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findByToken(token: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  save(user: User): Promise<void>;
}
