import { User } from '@modules/users/domain/User';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';

import { ICreateUserRequestDTO } from './ICreateUserDTO';

export class CreateUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    const user = new User(data);

    await this.usersRepository.save(user);
  }
}
