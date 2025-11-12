import { Query } from "../../../../API/callApi";

export const getNews = (): Query => ({
  endpoint: `news`,
  method: "GET",
});
export const getClasses = (): Query => ({
  endpoint: `trainings`,
  method: "GET",
});
