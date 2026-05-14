import { beforeEach, describe, expect, it, vi } from "vitest";

import { api } from "./api";
import { getGarageDetails, listGarages } from "./garage.services";

vi.mock("./api", () => ({
  api: {
    get: vi.fn(),
  },
}));

const mockedApi = vi.mocked(api);

describe("garage services", () => {
  beforeEach(() => {
    mockedApi.get.mockReset();
  });

  it("lists garages mapped to the view model", async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: {
        countRecords: 1,
        currentPage: 1,
        pageSize: 25,
        hasNextPage: 0,
        hasPreviousPage: 0,
        data: [
          {
            code: "57",
            name: "Ana Luiza Reis",
            address: "Rua Central",
            city: "Manaus",
            state: "AM",
            region: "Norte",
            subsidiary: "Filial Norte",
          },
        ],
      },
    });

    const result = await listGarages({ currentPage: 2, pageSize: 10 });

    expect(mockedApi.get).toHaveBeenCalledWith("/GetGaragesPaginatedList", {
      params: {
        currentPage: 2,
        pageSize: 10,
      },
    });
    expect(result.data).toEqual([
      {
        code: "57",
        name: "Ana Luiza Reis",
        address: "Rua Central",
        cityUf: "Manaus/AM",
        regional: "Norte",
      },
    ]);
  });

  it("maps garage details and calculates available vacancies", async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: {
        code: "57",
        name: "Ana Luiza Reis",
        address: "Rua Central",
        city: "Manaus",
        state: "AM",
        region: "Norte",
        subsidiary: "Filial Norte",
        countSpaces: 100,
        occupiedSpaces: 23,
        maxDiscountPercent: 10,
      },
    });

    const result = await getGarageDetails("57");

    expect(mockedApi.get).toHaveBeenCalledWith("/garage", {
      params: {
        garageId: "57",
      },
    });
    expect(result).toEqual({
      id: "57",
      code: "57",
      name: "Ana Luiza Reis",
      address: "Rua Central, Manaus/AM",
      branch: "Filial Norte",
      regional: "Norte",
      totalVacancies: 100,
      occupiedVacancies: 23,
      availableVacancies: 77,
    });
  });
});
