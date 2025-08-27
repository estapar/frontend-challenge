import { ApiClient } from "./apiClient";
import { PlansRoot } from "@/domain/plansList.entity";
import { PlansIdListRepository } from "@/domain/plansList.repository";

export class PlansIdListApiRepostiroy implements PlansIdListRepository {
    constructor(private apiClient: ApiClient) {}

    async getPlansIdList(garageId: string): Promise<PlansRoot> {
        return this.apiClient.get<PlansRoot>(`/plans?garageId=${garageId}`)
    }
}