export class User {
  public readonly id!: number;

  public name!: string;

  public lastName!: string;

  public email!: string;

  public password!: string;

  public avatar?: string;

  public whatsapp?: string;

  public bio?: string;

  constructor(props: Omit<User, 'id'>, id?: number) {
    Object.assign(this, props);
    if (id) {
      this.id = id;
    }
  }
}
