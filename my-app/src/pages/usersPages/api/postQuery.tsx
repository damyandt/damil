import { Query } from "../../../API/callApi";

export const postLogin = (input: any): Query => ({
  endpoint: `auth/login`,
  method: "POST",
  variables: input,
});

export const validateEmail = (input: any): Query => ({
  endpoint: `auth/validate-email`,
  method: "POST",
  variables: input,
});
