import { Request, Response } from 'express';

import { CreateConnectionUseCase } from './CreateConnectionUseCase';

export class CreateConnectionController {
  constructor(private createConnectionUseCase: CreateConnectionUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.body;

    try {
      await this.createConnectionUseCase.execute(Number(user_id));

      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error while creating connection!',
      });
    }
  }
}
