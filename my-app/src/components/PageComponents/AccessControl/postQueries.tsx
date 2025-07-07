import { Query } from "../../../API/callApi";

export const postQueryAddClient = (input: any): Query => ({
  endpoint: `gym/members`,
  method: "POST",
  variables: input,
});
