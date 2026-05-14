import {
  CreatePlanRequest,
  GaragePlan,
  PlanApiResponse,
} from "@/src/features/garages/types/garage.details";

import { api } from "./api";

function parseNumber(value: string | number | undefined) {
  if (value === undefined) {
    return 0;
  }

  return Number(value);
}

function parseOptionalNumber(value: string | number | undefined) {
  if (value === undefined) {
    return undefined;
  }

  return Number(value);
}

function parseActive(value: string | boolean) {
  if (typeof value === "boolean") {
    return value;
  }

  return value.toLowerCase() === "true" || value === "1" || value === "active";
}

function mapPlanToViewModel(plan: PlanApiResponse): GaragePlan {
  const vacancies = Number(plan.totalVacancies);
  const occupied = parseOptionalNumber(plan.occupiedVacancies ?? plan.occupied);
  const available =
    parseOptionalNumber(plan.availableVacancies ?? plan.available) ??
    (occupied === undefined ? undefined : vacancies - occupied);

  return {
    id: String(plan.id ?? plan.idPlan),
    description: plan.description,
    value: parseNumber(plan.priceInCents) / 100,
    vacancies,
    occupied,
    available,
    status: parseActive(plan.active) ? "active" : "inactive",
  };
}

export async function listPlans(garageId: string) {
  const response = await api.get<PlanApiResponse[]>("/plans", {
    params: {
      garageId,
    },
  });

  return response.data.map(mapPlanToViewModel);
}

export async function createPlan(data: CreatePlanRequest) {
  const response = await api.post("/plan", data);

  return response.data;
}
