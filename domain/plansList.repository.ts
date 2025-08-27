import { PlansRoot } from "./plansList.entity";

export interface PlansIdListRepository {
  getPlansIdList(
    garageId: string
  ): Promise<PlansRoot>;
}