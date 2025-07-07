import { Query } from "../../../API/callApi";

export const getClientsTable = (): Query => ({
  endpoint: `gym-members/table`,
  method: "GET",
});
