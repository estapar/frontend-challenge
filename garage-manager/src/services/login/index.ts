import { post } from "../api";
import { AxiosError } from "axios";

export interface LoginBody {
  username: string;
  password: string;
}

export interface LoginResponse {
  data: Data;
  message: string;
  notification: string[];
  originReturn: string;
}

export interface Data {
  expiredIn: Date;
  token: string;
}

export interface LoginErrorResponse {
  codigo: string;
  mensagem: string;
  complemento: string;
}

export async function authenticate(payload: LoginBody) {
  try {
    const apiRes = await post("/Authenticate", payload);
    const data = apiRes.data.data;

    return { data, error: null };
  } catch (err) {
    const error = err as AxiosError<LoginErrorResponse[]>;
    const catchErrors = error?.response?.data;

    return { data: null, error: catchErrors };
  }
}
