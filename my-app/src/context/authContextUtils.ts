import { jwtDecode } from "jwt-decode";
import callApi, {
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
} from "../API/callApi";
import {
  deleteCookie,
  setCookie,
  SetCookieParams,
} from "../Global/Utils/commonFunctions";
import { DecodedJWTToken } from "../pages/usersPages/Login";
import { postQueryTokenRefresh } from "../Auth/API/apiAuthGetQueries";

export const handleUserSignOut = () => {
  deleteCookie(COOKIE_ACCESS_TOKEN);
  deleteCookie(COOKIE_REFRESH_TOKEN);
  window.location.reload();
};

export const handleFetchUserAccessToken = async (
  refreshToken: string | null
) => {
  if (refreshToken) {
    const response = await callApi<any>({
      query: postQueryTokenRefresh(refreshToken),
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
  }
};
