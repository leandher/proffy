import AppError from '@infra/http/AppError';
import { User } from '@modules/users/domain/User';
import FakeHashProvider from '@modules/users/providers/fakes/FakeHashProvider';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';

import { LoginUseCase } from './LoginUseCase';

describe('Login', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const hashProvider = new FakeHashProvider();
    const loginUseCase = new LoginUseCase(fakeUserRepository, hashProvider);

    const user = new User({
      name: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: '123123',
    });

    await fakeUserRepository.save(user);

    const response = await loginUseCase.execute({
      email: 'john@example.com',
      password: '123123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toHaveProperty('id');
  });

  it('should not be able to authenticate with a non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const hashProvider = new FakeHashProvider();
    const loginUseCase = new LoginUseCase(fakeUserRepository, hashProvider);

    expect(
      loginUseCase.execute({
        email: 'john@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with a wrong password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const hashProvider = new FakeHashProvider();
    const loginUseCase = new LoginUseCase(fakeUserRepository, hashProvider);

    const user = new User({
      name: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: '123123',
    });

    await fakeUserRepository.save(user);

    expect(
      loginUseCase.execute({
        email: 'john@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
