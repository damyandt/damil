import { Query } from "../../API/callApi";

export const getQueryUsersGetCurrentUser = (): Query => ({
  endpoint: "users/current",
  method: "GET",
});

export const getQueryUserTenant = (): Query => ({
  endpoint: "tenants",
  method: "GET",
});

export const postQueryTokenRefresh = (input: { token: string }): Query => ({
  endpoint: "auth/refresh_token",
  method: "POST",
  variables: input,
});

export const updateCredentials = (input: {
  newPassword: string;
  oldPassword: string;
  confirmPassword: string;
}): Query => ({
  endpoint: "auth/change-password",
  method: "PUT",
  variables: input,
});
