import AppError from '@infra/http/AppError';
import { User } from '@modules/users/domain/User';
import IHashProvider from '@modules/users/providers/IHashProvider';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';

import { ICreateUserRequestDTO } from './ICreateUserDTO';

export class CreateUserUseCase {
  constructor(private usersRepository: IUserRepository, private hashProvider: IHashProvider) {}

  async execute(data: ICreateUserRequestDTO): Promise<User | null> {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new AppError('User already exists.');
    }

    const hashedPassword = await this.hashProvider.generateHash(data.password);

    const user = new User({ ...data, password: hashedPassword });

    await this.usersRepository.save(user);

    return this.usersRepository.findByEmail(data.email);
  }
}
