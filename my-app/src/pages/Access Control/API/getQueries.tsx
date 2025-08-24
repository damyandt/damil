import { Dayjs } from "dayjs";
import { Query } from "../../../API/callApi";

export const getClientsTable = (filter?: string): Query => {
  let endpoint = "users/members";

  filter && (endpoint += `?${filter}`);

  return {
    endpoint,
    method: "GET",
  };
};
export const getMember = (searchQuery: string | number): Query => ({
  endpoint: `users/members/search?id=${searchQuery}`,
  method: "GET",
});

export const checkInMember = (
  gymID: string,
  searchQuery: string | number
): Query => ({
  endpoint: `users/members/${gymID}/check-in?query=${searchQuery}`,
  method: "POST",
});

export const postMember = (formData: any): Query => ({
  endpoint: `users/members`,
  method: "POST",
  variables: formData,
});

export const postSubscription = (formData: any, id: any): Query => ({
  endpoint: `users/members/${id}`,
  method: "PATCH",
  variables: formData,
});

export const getQueryOptions = (url: string): Query => ({
  endpoint: `${url}`,
  method: "GET",
});

export const getPeriodVisitors = (
  id: string,
  startDate: string,
  endDate: string
): Query => ({
  endpoint: `visits/period/${id}/${startDate}/${endDate}`,
  method: "GET",
});

export const getClientVisits = (id: string): Query => ({
  endpoint: `visits/member/${id}`,
  method: "GET",
});
