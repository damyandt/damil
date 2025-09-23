import { Query } from "../../../API/callApi";

export const getStaffMembers = (): Query => ({
  endpoint: `users/employee`,
  method: "GET",
});

export const getStaffRoles = (): Query => ({
  // endpoint: `staff-members/roles`,
  endpoint: `staff-members/table`,
  method: "GET",
});
