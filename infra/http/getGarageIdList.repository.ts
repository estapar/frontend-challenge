import { ApiClient } from "./apiClient";
import { GarageIdListRepository } from "@/domain/garageIdList.repository";
import { GarageIdList } from "@/domain/garageIdList.entity";

export class GarageIdListApiRepostiroy implements GarageIdListRepository {
    constructor(private apiClient: ApiClient) {}

    async getGarageIdList(garageId: string): Promise<GarageIdList> {
        return this.apiClient.get<GarageIdList>(`/garage?garageId=${garageId}`)
    }
}