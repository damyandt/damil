import { Query } from "../../../API/callApi";
import { Client } from "../../../pages/Access Control/Clients";

export const postQueryAddClient = (input: Client): Query => ({
  endpoint: `gym/members`,
  method: "POST",
  variables: input,
});
