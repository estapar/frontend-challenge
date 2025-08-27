import { ApiClient } from "./apiClient";
import { dataPlanSubmit } from "@/domain/planCreated.entity";
import { PlanCreatedRepository } from "@/domain/planCreated.repository";

export class PlanCreatedApiRepository implements PlanCreatedRepository {
  constructor(private apiClient: ApiClient) {}

  async getPaginatedList(data: dataPlanSubmit): Promise<void> {
    return this.apiClient.post("/plan", data);
  }
}