import AppError from '@infra/http/AppError';
import FakeHashProvider from '@modules/users/providers/fakes/FakeHashProvider';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';

import { CreateUserUseCase } from './CreateUserUseCase';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const hashProvider = new FakeHashProvider();
    const createUserUseCase = new CreateUserUseCase(fakeUserRepository, hashProvider);

    const user = await createUserUseCase.execute({
      name: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with the same email as another', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const hashProvider = new FakeHashProvider();
    const createUserUseCase = new CreateUserUseCase(fakeUserRepository, hashProvider);

    await createUserUseCase.execute({
      name: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: '123123',
    });

    expect(
      createUserUseCase.execute({
        name: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
