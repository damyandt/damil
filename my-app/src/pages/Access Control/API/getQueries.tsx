import { Query } from "../../../API/callApi";

export const getClientsTable = (filter?: string): Query => {
  let endpoint = "gym-members/table";

  filter && (endpoint += `?${filter}`);

  return {
    endpoint,
    method: "GET",
  };
};
export const getMember = (
  gymID: string,
  searchQuery: string | number
): Query => ({
  endpoint: `gym-members/${gymID}/search?query=${searchQuery}`,
  method: "GET",
});

export const checkInMember = (
  gymID: string,
  searchQuery: string | number
): Query => ({
  endpoint: `gym-members/${gymID}/check-in?query=${searchQuery}`,
  method: "POST",
});

export const postMember = (formData: any): Query => ({
  endpoint: `gym-members/members`,
  method: "POST",
  variables: formData,
});

export const postSubscription = (formData: any, id: any): Query => ({
  endpoint: `gym-members/${id}/subscription`,
  method: "PATCH",
  variables: formData,
});

export const getQueryOptions = (url: string): Query => ({
  endpoint: `${url}`,
  method: "GET",
});
