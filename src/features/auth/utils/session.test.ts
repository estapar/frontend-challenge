import { describe, expect, it } from "vitest";

import {
  clearSession,
  getSessionUserName,
  hasValidSession,
  saveSession,
  TOKEN_EXPIRED_STORAGE_KEY,
  TOKEN_STORAGE_KEY,
  USERNAME_STORAGE_KEY,
} from "./session";

describe("session utils", () => {
  it("saves token, expiration date and user name", () => {
    saveSession({
      token: "token-123",
      expiredIn: "2099-01-01T00:00:00.000Z",
      userName: "Roberto Freitas",
    });

    expect(localStorage.getItem(TOKEN_STORAGE_KEY)).toBe("token-123");
    expect(localStorage.getItem(TOKEN_EXPIRED_STORAGE_KEY)).toBe(
      "2099-01-01T00:00:00.000Z"
    );
    expect(localStorage.getItem(USERNAME_STORAGE_KEY)).toBe("Roberto Freitas");
  });

  it("clears all session values", () => {
    saveSession({
      token: "token-123",
      expiredIn: "2099-01-01T00:00:00.000Z",
      userName: "Roberto Freitas",
    });

    clearSession();

    expect(localStorage.getItem(TOKEN_STORAGE_KEY)).toBeNull();
    expect(localStorage.getItem(TOKEN_EXPIRED_STORAGE_KEY)).toBeNull();
    expect(localStorage.getItem(USERNAME_STORAGE_KEY)).toBeNull();
  });

  it("returns the stored user name or the default user", () => {
    expect(getSessionUserName()).toBe("Roberto Freitas");

    saveSession({
      token: "token-123",
      expiredIn: "2099-01-01T00:00:00.000Z",
      userName: "Ana Luiza Reis",
    });

    expect(getSessionUserName()).toBe("Ana Luiza Reis");
  });

  it("validates sessions based on token and expiration date", () => {
    expect(hasValidSession()).toBe(false);

    saveSession({
      token: "token-123",
      expiredIn: "2099-01-01T00:00:00.000Z",
    });
    expect(hasValidSession()).toBe(true);

    saveSession({
      token: "expired-token",
      expiredIn: "2000-01-01T00:00:00.000Z",
    });
    expect(hasValidSession()).toBe(false);
    expect(localStorage.getItem(TOKEN_STORAGE_KEY)).toBeNull();
  });
});
