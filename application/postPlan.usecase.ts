import { dataPlanSubmit } from "@/domain/planCreated.entity";
import { PlanCreatedRepository } from "@/domain/planCreated.repository";

export class CreatePlanUseCase {
  constructor(private planCreatedRepository: PlanCreatedRepository) {}

  async execute(data: dataPlanSubmit): Promise<void> {
    return this.planCreatedRepository.getPaginatedList(data);
  }
}