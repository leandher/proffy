import { IClassRepository } from '@modules/classes/repositories/IClassRepository';
import { IFilterDTO } from './IFilterDTO';
import convertHourToMinutes from '@utils/convertHourToMinutes';

export class FindClassesUseCase {
  constructor(private classRepository: IClassRepository) {}

  async execute(filters: IFilterDTO) {
    if (!filters.week_day || !filters.subject || !filters.time) {
      throw new Error('Missing filters to search classes.');
    }

    const { time, subject, week_day } = filters;

    const timeInMinutes = convertHourToMinutes(time as string);

    return this.classRepository.filter(subject, week_day, timeInMinutes);
  }
}
