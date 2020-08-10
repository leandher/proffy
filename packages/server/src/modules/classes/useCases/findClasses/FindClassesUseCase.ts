import { IClassRepository } from '@modules/classes/repositories/IClassRepository';
import convertHourToMinutes from '@utils/convertHourToMinutes';

import { IFilterDTO } from './IFilterDTO';

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
