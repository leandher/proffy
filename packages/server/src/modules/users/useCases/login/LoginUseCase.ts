import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@infra/http/AppError';
import IHashProvider from '@modules/users/providers/IHashProvider';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';

import { ILoginRequestDTO, ILoginResponseDTO } from './ILoginDTO';

export class LoginUseCase {
  constructor(private userRepository: IUserRepository, private hashProvider: IHashProvider) {}

  async execute(request: ILoginRequestDTO): Promise<ILoginResponseDTO> {
    const user = await this.userRepository.findByEmail(request.email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(request.password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig;

    const token = sign({}, secret, { subject: String(user.id), expiresIn });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        avatar: user.avatar,
        bio: user.bio,
        whatsapp: user.whatsapp,
      },
    };
  }
}
