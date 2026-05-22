import { post, get } from "../api";
import { AxiosError } from "axios";
import { getToken } from "@utils/handleToken";

export interface GetPlansParams {
  garageId?: string;
}

export interface PlanItem {
  active: boolean;
  amountDailyCancellationInCents: number;
  description: string;
  descriptionAvailable: string;
  endValidity: string;
  garageId: string;
  idPlan: string;
  priceInCents: number;
  startValidity: string;
  totalVacancies: number;
  vehicleType: string;
}

export interface CreatePlanResponse {
  message: string;
  originReturn: string;
  notification: string[];
  data: PlanItem;
}

export async function createPlan(payload: PlanItem) {
  try {
    const auth = getToken();
    const apiRes: CreatePlanResponse = await post("/plan", payload, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    });
    const createdPlan: PlanItem = apiRes.data;

    return { data: createdPlan, message: apiRes.message, error: null };
  } catch (err) {
    const error = err as AxiosError;
    const catchErrors = error?.response?.data;

    return { data: null, message: null, error: catchErrors };
  }
}

export async function getPlans(params: GetPlansParams) {
  try {
    const auth = getToken();

    const apiRes = await get("/plans", {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
      params,
    });
    const data: PlanItem[] = apiRes.data;

    return { data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    const catchErrors = error?.response?.data;

    return { data: null, error: catchErrors };
  }
}
