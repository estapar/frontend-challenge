import { GarageIdList } from "@/domain/garageIdList.entity";
import { GarageIdListRepository } from "@/domain/garageIdList.repository";


export class GetGarageListIdUseCase {
  constructor(private garageListIdRepository: GarageIdListRepository) {}

  async execute(
    garageId: string
  ): Promise<GarageIdList> {
    return this.garageListIdRepository.getGarageIdList(
        garageId
    );
  }
}