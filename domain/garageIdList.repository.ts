import { GarageIdList } from "./garageIdList.entity";

export interface GarageIdListRepository {
  getGarageIdList(
    garageId: string
  ): Promise<GarageIdList>;
}