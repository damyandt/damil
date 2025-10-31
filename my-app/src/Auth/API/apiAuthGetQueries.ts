import { Query } from "../../API/callApi";

export const getQueryUsersGetCurrentUser = (): Query => ({
  endpoint: "users/current",
  method: "GET",
});

export const getQueryUserTenant = (): Query => ({
  endpoint: "tenants",
  method: "GET",
});

export const postQueryTokenRefresh = (input: any): Query => ({
  endpoint: "auth/refresh_token",
  method: "POST",
  variables: input,
});

export const updateCredentials = (input: any): Query => ({
  endpoint: "api/v1/auth/change-password",
  method: "PUT",
  variables: input,
});
