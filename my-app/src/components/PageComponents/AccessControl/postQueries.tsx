import { Query } from "../../../API/callApi";

export const postQueryAddClient = (input: any): Query => ({
  endpoint: `gym/add_member`,
  method: "POST",
  variables: input,
});
