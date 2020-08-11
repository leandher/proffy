import AppError from '@infra/http/AppError';
import { User } from '@modules/users/domain/User';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeMailProvider from '@providers/MailProvider/fakes/FakeMailProvider';

import { ForgotPasswordUseCase } from './ForgotPasswordUseCase';

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let forgotPasswordUseCase: ForgotPasswordUseCase;

describe('ForgotPassword', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    forgotPasswordUseCase = new ForgotPasswordUseCase(fakeUserRepository, fakeMailProvider);
  });

  it('should generate a reset token with a deadline', async () => {
    await fakeUserRepository.save({
      name: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: '123123',
    } as User);

    await forgotPasswordUseCase.execute('john@example.com');

    const response = await fakeUserRepository.findByEmail('john@example.com');

    expect(response).toHaveProperty('passwordResetToken');
    expect(response).toHaveProperty('passwordResetExpires');
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.save({
      name: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: '123123',
    } as User);

    await forgotPasswordUseCase.execute('john@example.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover the password using a not registered email', async () => {
    expect(forgotPasswordUseCase.execute('john@example.com')).rejects.toBeInstanceOf(AppError);
  });
});
