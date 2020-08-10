import { User } from '@modules/users/domain/User';

export interface ILoginRequestDTO {
  email: string;
  password: string;
}

export interface ILoginResponseDTO {
  user: Omit<User, 'password'>;
  token: string;
}
