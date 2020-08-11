import { Request, Response } from 'express';

import { ForgotPasswordUseCase } from './ForgotPasswordUseCase';

export class ForgotPasswordController {
  constructor(private useCase: ForgotPasswordUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    try {
      await this.useCase.execute(email);

      return response.sendStatus(200);
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error while creating user!',
      });
    }
  }
}
