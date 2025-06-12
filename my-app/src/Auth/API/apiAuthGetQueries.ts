import { Query } from "../../API/callApi";

export const getQueryUsersGetCurrentUser = (): Query => ({
  endpoint: "gym/me",
  method: "GET",
});

export const postQueryTokenRefresh = (input: any): Query => ({
  endpoint: "auth/refreshToken",
  method: "POST",
  variables: input,
});
