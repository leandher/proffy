import { Request, Response } from 'express';

import { ILoginRequestDTO } from './ILoginDTO';
import { LoginUseCase } from './LoginUseCase';

export class LoginController {
  constructor(private useCase: LoginUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const dto = request.body as ILoginRequestDTO;

    try {
      const result = await this.useCase.execute(dto);

      return response.json(result);
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error while creating user!',
      });
    }
  }
}
