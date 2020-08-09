export interface ICreateClassDTO {
  userId: number;
  subject: string;
  cost: number;
  schedule: {
    week_day: number;
    from: string;
    to: string;
  }[];
}
