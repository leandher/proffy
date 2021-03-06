import { IConnectionRepository } from '@modules/connections/repositories/IConnectionRepository';

export class GetTotalConnectionsUseCase {
  constructor(private connectionsRepository: IConnectionRepository) {}

  async execute(): Promise<number> {
    return this.connectionsRepository.getTotalConnections();
  }
}
