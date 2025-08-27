import { PlansRoot } from "@/domain/plansList.entity";
import { PlansIdListRepository } from "@/domain/plansList.repository";


export class GetPlansListIdUseCase {
  constructor(private plansListIdRepository: PlansIdListRepository) {}

  async execute(
    garageId: string
  ): Promise<PlansRoot> {
    return this.plansListIdRepository.getPlansIdList(
        garageId
    );
  }
}