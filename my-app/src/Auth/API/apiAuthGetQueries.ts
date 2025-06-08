import { Query } from "../../API/callApi";

export const getQueryUsersGetCurrentUser = (): Query => ({
  endpoint: "gym/me",
  method: "GET",
});

export const postQueryTokenRefresh = (): Query => ({
  endpoint: "users/token/refresh",
  method: "POST",
});
