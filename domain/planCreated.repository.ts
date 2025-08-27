import { dataPlanSubmit } from "./planCreated.entity";

export interface PlanCreatedRepository {
  getPaginatedList(data: dataPlanSubmit): Promise<void>;
}