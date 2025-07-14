import { Query } from "../../../API/callApi";

export const getEmployees = (): Query => ({
  endpoint: `staff-members/table`,
  method: "GET",
});
