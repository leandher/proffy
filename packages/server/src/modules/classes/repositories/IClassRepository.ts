import { Class } from '../domain/Class';

export interface IClassRepository {
  save(newClass: Class): Promise<void>;
  filter(
    subject: string,
    week_day: number,
    timeInMinutes: number
  ): Promise<Class[]>;
}
