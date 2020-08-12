import { Request, Response } from 'express';

import { ResetPasswordUseCase } from './ResetPasswordUseCase';

export class ResetPasswordController {
  constructor(private useCase: ResetPasswordUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    try {
      await this.useCase.execute({ token, password });

      return response.sendStatus(200);
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error while creating user!',
      });
    }
  }
}
