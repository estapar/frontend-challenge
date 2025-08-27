import { GaragePaginatedListRoot } from "./garageList.entity";

export interface GaragePaginatedRepository {
  getPaginatedList(): Promise<GaragePaginatedListRoot>;
}