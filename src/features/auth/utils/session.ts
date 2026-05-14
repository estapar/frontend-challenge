export const TOKEN_STORAGE_KEY = "token";
export const TOKEN_EXPIRED_STORAGE_KEY = "tokenExpiredIn";
export const USERNAME_STORAGE_KEY = "username";

type SessionData = {
  token: string;
  expiredIn: string;
  userName?: string;
};

export function saveSession({ token, expiredIn, userName }: SessionData) {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  localStorage.setItem(TOKEN_EXPIRED_STORAGE_KEY, expiredIn);

  if (userName) {
    localStorage.setItem(USERNAME_STORAGE_KEY, userName);
  }
}

export function clearSession() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(TOKEN_EXPIRED_STORAGE_KEY);
  localStorage.removeItem(USERNAME_STORAGE_KEY);
}

export function getSessionUserName() {
  return localStorage.getItem(USERNAME_STORAGE_KEY) ?? "Roberto Freitas";
}

export function hasValidSession() {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  const expiredIn = localStorage.getItem(TOKEN_EXPIRED_STORAGE_KEY);

  if (!token) {
    return false;
  }

  if (!expiredIn) {
    return true;
  }

  const expirationDate = new Date(expiredIn);

  if (Number.isNaN(expirationDate.getTime())) {
    clearSession();
    return false;
  }

  const isExpired = expirationDate.getTime() <= Date.now();

  if (isExpired) {
    clearSession();
    return false;
  }

  return true;
}
