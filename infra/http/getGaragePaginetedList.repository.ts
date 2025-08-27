import { GaragePaginatedRepository } from "@/domain/garageList.repository";
import { ApiClient } from "./apiClient";
import { GaragePaginatedListRoot } from "@/domain/garageList.entity";

export class GaragePaginatedListApiRepostiroy implements GaragePaginatedRepository {
    constructor(private apiClient: ApiClient) {}

    async getPaginatedList(): Promise<GaragePaginatedListRoot> {
        return this.apiClient.get<GaragePaginatedListRoot>(`/GetGaragesPaginatedList`)
    }

}