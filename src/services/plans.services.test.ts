import { beforeEach, describe, expect, it, vi } from "vitest";

import { api } from "./api";
import { createPlan, listPlans } from "./plans.services";

vi.mock("./api", () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

const mockedApi = vi.mocked(api);

describe("plans services", () => {
  beforeEach(() => {
    mockedApi.get.mockReset();
    mockedApi.post.mockReset();
  });

  it("lists plans mapped to the view model", async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: [
        {
          idPlan: 1,
          description: "Mensalista Carro",
          startValidity: "2026-01-01",
          endValidity: "2026-12-31",
          priceInCents: "38500",
          active: "true",
          descriptionAvailable: "Mensalista Carro",
          totalVacancies: 50,
          occupiedVacancies: "10",
        },
        {
          id: "plan-2",
          description: "Mensalista Moto",
          startValidity: "2026-01-01",
          endValidity: null,
          priceInCents: 15000,
          active: "inactive",
          descriptionAvailable: "Mensalista Moto",
          totalVacancies: 10,
          availableVacancies: 7,
        },
      ],
    });

    const result = await listPlans("57");

    expect(mockedApi.get).toHaveBeenCalledWith("/plans", {
      params: {
        garageId: "57",
      },
    });
    expect(result).toEqual([
      {
        id: "1",
        description: "Mensalista Carro",
        value: 385,
        vacancies: 50,
        occupied: 10,
        available: 40,
        status: "active",
      },
      {
        id: "plan-2",
        description: "Mensalista Moto",
        value: 150,
        vacancies: 10,
        occupied: undefined,
        available: 7,
        status: "inactive",
      },
    ]);
  });

  it("creates a plan using the API payload", async () => {
    const payload = {
      id: "plan-1",
      garageId: "57",
      description: "Mensalista Carro",
      startValidity: "2026-01-01",
      endValidity: "2026-12-31",
      priceInCents: "38500",
      active: "true",
      descriptionAvailable: "Mensalista Carro",
      amountDailyCancellationInCents: "1000",
      vehicleType: "car",
      totalVacancies: 50,
    };

    mockedApi.post.mockResolvedValueOnce({ data: { id: "plan-1" } });

    await expect(createPlan(payload)).resolves.toEqual({ id: "plan-1" });
    expect(mockedApi.post).toHaveBeenCalledWith("/plan", payload);
  });
});
