import { get } from "../api";
import { AxiosError } from "axios";
import { getToken } from "@utils/handleToken";

export interface GetGaragesParams {
  currentPage: number;
  pageSize: number;
  garageName?: string;
}

export interface GaragePaginatedList {
  countRecords: number;
  currentPage: number;
  data: GarageItem[];
  hasNextPage: number;
  hasPreviousPage: number;
  pageSize: number;
}

export interface GarageItem {
  address: string;
  city: string;
  code: string;
  name: string;
  region: string;
  state: string;
  subsidiary: string;
}

export interface GarageItemExtended extends GarageItem {
  countSpaces: number;
  occupiedSpaces: number;
  maxDiscountPercent: number;
}

export async function getGarages(params: GetGaragesParams) {
  try {
    const auth = getToken();

    const apiRes = await get("/GetGaragesPaginatedList", {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
      params,
    });
    const data: GaragePaginatedList = apiRes.data;

    return { data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    const catchErrors = error?.response?.data;

    return { data: null, error: catchErrors };
  }
}

export async function getGarageByCode(code: string) {
  try {
    const auth = getToken();
    const apiRes = await get("/garage", {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
      params: { code },
    });
    const data: GarageItemExtended = apiRes.data;

    return { data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    const catchErrors = error?.response?.data;

    return { data: null, error: catchErrors };
  }
}
