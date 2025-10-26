import { Query } from "../../../../API/callApi";

export const getNews = (): Query => ({
  endpoint: `news`,
  method: "GET",
});
