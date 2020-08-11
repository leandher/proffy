import crypto from 'crypto';
import path from 'path';

import AppError from '@infra/http/AppError';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import IMailProvider from '@providers/MailProvider/models/IMailProvider';

export class ForgotPasswordUseCase {
  constructor(private userRepository: IUserRepository, private mailProvider: IMailProvider) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();

    now.setHours(now.getHours() + 1);

    this.userRepository.save({ ...user, passwordResetToken: token, passwordResetExpires: now });

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Proffy] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    });
  }
}
