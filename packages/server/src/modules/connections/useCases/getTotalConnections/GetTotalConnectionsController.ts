import { Request, Response } from 'express';
import { GetTotalConnectionsUseCase } from './GetTotalConnectionsUseCase';

export class GetTotalConnectionsController {
  constructor(private getTotalConnectionsUseCase: GetTotalConnectionsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const total = await this.getTotalConnectionsUseCase.execute();

      return response.json({ total });
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error!',
      });
    }
  }
}
