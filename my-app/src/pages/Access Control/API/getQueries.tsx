import { Query } from "../../../API/callApi";

export const getClientsTable = (): Query => ({
  endpoint: `gym-members/table`,
  method: "GET",
});

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
