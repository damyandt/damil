import { SetCookieParams } from "../../Auth/authTypes";

export const setCookie = (cookie: SetCookieParams) => {
  const { name, value, exp, path, sameSite, secure } = cookie;
  const expDate = new Date(exp * 1000);
  const expUtcString = expDate.toUTCString();

  const cookieSecure = secure ? " Secure;" : "";
  let cookieValue = `${name}=${encodeURIComponent(
    value
  )}; expires=${expUtcString}; path=${path || "/"};`;

  if (!isLocalHostEnv()) {
    cookieValue += `${cookieSecure} SameSite=${sameSite};`;
  }

  document.cookie = cookieValue;
};

export const getCookie = (name: string): string | null => {
  const cookieValue = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`));

  if (cookieValue) {
    return cookieValue.split("=")[1];
  }

  return null;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const isLocalHostEnv = (): boolean => {
  const isLocalHost =
    typeof window !== "undefined"
      ? Boolean(
          window?.location.hostname === "localhost" ||
            // [::1] is the IPv6 localhost address.
            window?.location.hostname === "[::1]" ||
            // 127.0.0.1/8 is considered localhost for IPv4.
            window?.location.hostname.match(
              /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
            )
        )
      : false;

  return isLocalHost;
};

export const isObject = (value: any) => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

export const isArray = (value: any) => {
  return value instanceof Array;
};
