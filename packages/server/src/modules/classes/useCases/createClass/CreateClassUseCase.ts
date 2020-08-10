import { Class } from '@modules/classes/domain/Class';
import { Schedule } from '@modules/classes/domain/Schedule';
import { IClassRepository } from '@modules/classes/repositories/IClassRepository';
import convertHourToMinutes from '@utils/convertHourToMinutes';

import { ICreateClassDTO } from './ICreateClassDTO';

export class CreateClassUseCase {
  constructor(private classRepository: IClassRepository) {}

  async execute(data: ICreateClassDTO): Promise<void> {
    const { schedule, userId, cost, subject } = data;

    const classSchedule = schedule.map(
      (scheduleItem) =>
        new Schedule({
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        }),
    );

    const newClass = new Class({
      subject,
      cost,
      teacher: { id: userId },
      schedules: classSchedule,
    });

    this.classRepository.save(newClass);
  }
}
