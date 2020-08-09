export interface IConnectionRepository {
  getTotalConnections(): Promise<number>;
  save(userId: number): Promise<void>;
}
