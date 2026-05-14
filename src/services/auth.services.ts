import { AxiosError } from "axios";

import { api } from "./api";

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  data: {
    token: string;
    expiredIn: string;
  };
  message: string;
  originReturn: string;
  notification: string[];
};

type ApiNotification = {
  codigo?: string;
  mensagem?: string;
  complemento?: string;
};

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

function getAuthErrorMessage(error: unknown) {
  if (!(error instanceof AxiosError)) {
    return "Não foi possível autenticar. Tente novamente.";
  }

  const notifications = error.response?.data as ApiNotification[] | undefined;
  const firstNotification = Array.isArray(notifications)
    ? notifications[0]
    : undefined;

  return (
    firstNotification?.mensagem ??
    firstNotification?.complemento ??
    "Usuário ou senha inválidos."
  );
}

export async function authenticate(data: LoginRequest) {
  try {
    const response = await api.post<LoginResponse>("/Authenticate", data);

    return {
      ...response.data.data,
      userName: response.data.originReturn,
    };
  } catch (error) {
    throw new AuthError(getAuthErrorMessage(error));
  }
}
