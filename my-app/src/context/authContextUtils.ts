import { jwtDecode } from "jwt-decode";
import callApi, {
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
} from "../API/callApi";
import { deleteCookie, setCookie, SetCookieParams } from "../Global/Utils/commonFunctions";
import { DecodedJWTToken } from "../pages/usersPages/Login";
import { postQueryTokenRefresh } from "../Auth/API/apiAuthGetQueries";

// signs out the user
export const handleUserSignOut = () => {
  deleteCookie(COOKIE_ACCESS_TOKEN);
  deleteCookie(COOKIE_REFRESH_TOKEN);
  window.location.reload();
};

// if refreshToken, fetch and save the accessToken
export const handleFetchUserAccessToken = async (
  refreshToken: string | null
) => {
  // if (refreshToken) {
  //   const accessCookieResponse = await callApi<any>({
  //     query: postQueryTokenRefresh(),
  //     auth: null,
  //   });
  const accessToken = refreshToken;

  if (accessToken) {
    const decodedToken: DecodedJWTToken = jwtDecode(accessToken);
    const cookie: SetCookieParams = {
      name: COOKIE_ACCESS_TOKEN,
      value: accessToken,
      exp: decodedToken.exp,
      sameSite: "strict",
      secure: true,
    };
    setCookie(cookie);
    return accessToken;
  }

}

