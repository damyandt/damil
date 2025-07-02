import { Query } from "../../../API/callApi";

export const getClientsTable = (): Query => ({
  endpoint: `gym/gym_members_table`,
  method: "GET",
});
