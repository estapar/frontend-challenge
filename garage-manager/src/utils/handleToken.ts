import Cookies from "js-cookie";

export const setToken = (value: string, expiredIn: string) => {
  const timeMinutesExpired = new Date(expiredIn);

  return Cookies.set("token", value, {
    expires: timeMinutesExpired,
  });
};

export const getToken = () => Cookies.get("token");

export const removeToken = () => {
  Cookies.remove("token");
};
