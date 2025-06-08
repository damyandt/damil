import { Query } from "../../../API/callApi";

export const postLogin = (input: any): Query => ({
  endpoint: `auth/login`,
  method: "POST",
  variables: input,
  //   endpointBase: "https://fitmanage-b0bb9372ef38.herokuapp.com/api/v1/",
});
