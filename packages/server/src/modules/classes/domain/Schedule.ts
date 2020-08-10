import { Class } from './Class';

export class Schedule {
  public readonly id!: number;

  public week_day!: number;

  public from!: number;

  public to!: number;

  public class?: Class;

  constructor(props: Omit<Schedule, 'id'>, id?: number) {
    Object.assign(this, props);
    if (id) {
      this.id = id;
    }
  }
}
