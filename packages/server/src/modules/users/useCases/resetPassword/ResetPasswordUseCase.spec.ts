import AppError from '@infra/http/AppError';
import { User } from '@modules/users/domain/User';
import FakeHashProvider from '@modules/users/providers/fakes/FakeHashProvider';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeMailProvider from '@providers/MailProvider/fakes/FakeMailProvider';

import { ForgotPasswordUseCase } from '../forgotPassword/ForgotPasswordUseCase';
import { ResetPasswordUseCase } from './ResetPasswordUseCase';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let fakeMailProvider: FakeMailProvider;
let forgotPasswordUseCase: ForgotPasswordUseCase;
let resetPasswordUseCase: ResetPasswordUseCase;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeMailProvider = new FakeMailProvider();
    resetPasswordUseCase = new ResetPasswordUseCase(fakeUserRepository, fakeHashProvider);
    forgotPasswordUseCase = new ForgotPasswordUseCase(fakeUserRepository, fakeMailProvider);
  });

  it('should be able to reset the password', async () => {
    const user = new User({
      name: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: '123456',
    });

    await fakeUserRepository.save(user);

    await forgotPasswordUseCase.execute('john@example.com');

    const createdUser = await fakeUserRepository.findByEmail(user.email);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordUseCase.execute({
      password: '123123',
      token: createdUser?.passwordResetToken,
    });

    const updatedUser = await fakeUserRepository.findByEmail(user.email);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser?.password).toBe('123123');
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPasswordUseCase.execute({
        token: 'non-existing-token',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password if passed more than two hours', async () => {
    const user = new User({
      name: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: '123456',
    });

    await fakeUserRepository.save(user);

    await forgotPasswordUseCase.execute('john@example.com');

    const createdUser = await fakeUserRepository.findByEmail(user.email);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordUseCase.execute({
        password: '123123',
        token: createdUser?.passwordResetToken,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
