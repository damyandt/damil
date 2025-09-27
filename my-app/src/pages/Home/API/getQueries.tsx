import { Query } from "../../../API/callApi";

export const getAnalyticsForHomePage = (): Query => ({
  endpoint: `analytics/user-ratio`,
  method: "GET",
});
