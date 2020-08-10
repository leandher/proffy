import { User } from '@modules/users/domain/User';

import { Schedule } from './Schedule';

export class Class {
  public readonly id!: number;

  public subject!: string;

  public cost!: number;

  public teacher!: User | { id: number };

  public schedules!: Schedule[];

  constructor(props: Omit<Class, 'id'>, id?: number) {
    Object.assign(this, props);
    if (id) {
      this.id = id;
    }
  }
}
