export type DecodedJWTToken = {
  sub: string;
  exp: number;
};

export type SetCookieParams = {
  name: string;
  value: string;
  exp: number;
  path?: string;
  sameSite: "none" | "lax" | "strict";
  secure: boolean;
};
