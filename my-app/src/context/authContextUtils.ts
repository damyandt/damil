import { jwtDecode } from "jwt-decode";
import callApi, {
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
} from "../API/callApi";
import { deleteCookie, setCookie } from "../Global/Utils/commonFunctions";
import { postQueryTokenRefresh } from "../Auth/API/apiAuthGetQueries";
import { DecodedJWTToken, SetCookieParams } from "../Auth/authTypes";
import { useState } from "react";

export const handleUserSignOut = (navigate: (path: string) => void) => {
  deleteCookie(COOKIE_ACCESS_TOKEN);
  deleteCookie(COOKIE_REFRESH_TOKEN);
  navigate("/");
  window.location.reload();
};

export const handleFetchUserAccessToken = async (
  refreshToken: string | null
) => {
  if (refreshToken) {
    const response = await callApi<any>({
      query: postQueryTokenRefresh({ token: refreshToken }),
      auth: null,
    });

    const accessToken = response.accessToken;
    const decodedToken: DecodedJWTToken = jwtDecode(accessToken);
    const accessCookie: SetCookieParams = {
      name: COOKIE_ACCESS_TOKEN,
      value: accessToken,
      exp: decodedToken.exp,
      sameSite: "strict",
      secure: true,
    };

    setCookie(accessCookie);

    return accessToken;
  } else {
    window.location.href = "/login";
    return;
  }
};
