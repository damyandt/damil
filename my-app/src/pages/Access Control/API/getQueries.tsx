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
