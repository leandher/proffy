import AppError from '@infra/http/AppError';
import IHashProvider from '@modules/users/providers/IHashProvider';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';

import { IResetPasswordRequestDTO } from './IResetPasswordDTO';

export class ResetPasswordUseCase {
  constructor(private usersRepository: IUserRepository, private hashProvider: IHashProvider) {}

  async execute({ token, password }: IResetPasswordRequestDTO): Promise<void> {
    const user = await this.usersRepository.findByToken(token);

    if (!user) {
      throw new AppError('User token does not exists');
    }

    const { passwordResetExpires } = user;

    let tokenCreatedAt = null;

    if (passwordResetExpires) {
      tokenCreatedAt = new Date(passwordResetExpires);
    }

    if (!passwordResetExpires || !tokenCreatedAt || tokenCreatedAt.getTime() < Date.now()) {
      throw new AppError('Token expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}
