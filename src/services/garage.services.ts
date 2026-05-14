import { Garage, GaragePaginatedList } from "@/src/features/garages/types/garage";
import {
  GarageDetails,
  GarageDetailsApiResponse,
} from "@/src/features/garages/types/garage.details";

import { api } from "./api";

type ListGaragesParams = {
  currentPage?: number;
  pageSize?: number;
  garageName?: string;
};

function mapGarageToViewModel(garage: GaragePaginatedList["data"][number]): Garage {
  return {
    code: garage.code,
    name: garage.name,
    address: garage.address,
    cityUf: `${garage.city}/${garage.state}`,
    regional: garage.region,
  };
}

function mapGarageDetailsToViewModel(garage: GarageDetailsApiResponse): GarageDetails {
  return {
    id: garage.code,
    code: garage.code,
    name: garage.name,
    address: `${garage.address}, ${garage.city}/${garage.state}`,
    branch: garage.subsidiary,
    regional: garage.region,
    totalVacancies: garage.countSpaces,
    occupiedVacancies: garage.occupiedSpaces,
    availableVacancies: garage.countSpaces - garage.occupiedSpaces,
  };
}

export async function listGarages({
  currentPage = 1,
  pageSize = 25,
  garageName,
}: ListGaragesParams = {}) {
  const response = await api.get<GaragePaginatedList>("/GetGaragesPaginatedList", {
    params: {
      currentPage,
      pageSize,
      ...(garageName ? { garageName } : {}),
    },
  });

  return {
    ...response.data,
    data: response.data.data.map(mapGarageToViewModel),
  };
}

export async function getGarageDetails(garageId: string) {
  const response = await api.get<GarageDetailsApiResponse>("/garage", {
    params: {
      garageId,
    },
  });

  return mapGarageDetailsToViewModel(response.data);
}
