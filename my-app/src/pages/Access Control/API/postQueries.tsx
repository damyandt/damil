import { Query } from "../../../API/callApi";
import { User } from "../../usersPages/api/userTypes";

export const checkInMember = (searchQuery: string | number): Query => ({
  endpoint: `members/${searchQuery}/check-in`,
  method: "POST",
});

export const postMember = (formData: Partial<User>): Query => ({
  endpoint: `members`,
  method: "POST",
  variables: formData,
});

export const postSubscription = (formData: any, id: any): Query => ({
  endpoint: `memberships/${id}`,
  method: "PUT",
  variables: formData,
});

export const acceptClient = (id: string): Query => ({
  endpoint: `access-requests/${id}/approve`,
  method: "PATCH",
});

export const rejectClient = (id: string): Query => ({
  endpoint: `access-requests/${id}/reject`,
  method: "PATCH",
});
