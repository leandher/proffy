import { IConnectionRepository } from '@modules/connections/repositories/IConnectionRepository';

export class CreateConnectionUseCase {
  constructor(private connectionsRepository: IConnectionRepository) {}

  async execute(userId: number) {
    await this.connectionsRepository.save(userId);
  }
}
