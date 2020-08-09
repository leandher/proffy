import { Request, Response } from 'express';

import { CreateClassUseCase } from './CreateClassUseCase';

export class CreateClassController {
  constructor(private createClassUseCase: CreateClassUseCase) {}

  async handle(request: Request, response: Response) {
    const { user_id, subject, cost, schedule } = request.body;

    try {
      this.createClassUseCase.execute({ subject, userId: user_id, cost, schedule });

      return response.sendStatus(201);
    } catch (error) {
      return response
        .status(400)
        .json({ message: 'Unexpected error while creating new class' });
    }
  }
}
