import { Query } from "../../../API/callApi";

export const postLogin = (input: any): Query => ({
  endpoint: `auth/login`,
  method: "POST",
  variables: input,
});

export const postRegister = (input: any): Query => ({
  endpoint: `auth/register`,
  method: "POST",
  variables: input,
});

export const validateEmail = (input: any): Query => ({
  endpoint: `auth/validate_email`,
  method: "POST",
  variables: input,
});

export const codeVerification = (input: any): Query => ({
  endpoint: `auth/verify`,
  method: "POST",
  variables: input,
});
