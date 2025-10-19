import { Query } from "../../../API/callApi";

export const checkInMember = (searchQuery: string | number): Query => ({
  endpoint: `users/members/${searchQuery}/check-in`,
  method: "POST",
});

export const postMember = (formData: any): Query => ({
  endpoint: `users/members`,
  method: "POST",
  variables: formData,
});

export const postSubscription = (formData: any, id: any): Query => ({
  endpoint: `users/membership/${id}`,
  method: "PUT",
  variables: formData,
});

export const acceptClient = (id: any): Query => ({
  endpoint: `admin/access-requests/${id}/approve`,
  method: "PATCH",
});

export const rejectClient = (id: any): Query => ({
  endpoint: `admin/access-requests/${id}/reject`,
  method: "PATCH",
});
