import { FindClassesUseCase } from './FindClassesUseCase';
import { Request, Response } from 'express';

export class FindClassesController {
  constructor(private findClassesUseCase: FindClassesUseCase) {}

  async handle(request: Request, response: Response) {
    const { time, subject, week_day } = request.query;

    try {
      const classes = await this.findClassesUseCase.execute({
        time: String(time),
        subject: String(subject),
        week_day: Number(week_day),
      });
      return response.json(classes);
    } catch (error) {
      return response.status(400).json({
        message: error.message || 'Unexpected error!',
      });
    }
  }
}
