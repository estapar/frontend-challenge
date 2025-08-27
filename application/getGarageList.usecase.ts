import { GaragePaginatedListRoot } from "@/domain/garageList.entity";
import { GaragePaginatedRepository } from "@/domain/garageList.repository";


export class GetGarageListUseCase {
  constructor(private garageListRepository: GaragePaginatedRepository) {}

  async execute(): Promise<GaragePaginatedListRoot> {
    return this.garageListRepository.getPaginatedList();
  }
}