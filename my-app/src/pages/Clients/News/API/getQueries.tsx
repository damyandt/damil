import { Query } from "../../../../API/callApi";

export const getNews = (): Query => ({
  endpoint: `news`,
  method: "GET",
});

export const getMembersEnums = (): Query => ({
  endpoint: `users/lookup?roleNames=MEMBER`,
  method: "GET",
});

export const getStaffEnums = (): Query => ({
  endpoint: `user/lookup/roles?roleNames=STAFF`,
  method: "GET",
});
