import { Query } from "../../../../API/callApi";

export const getNews = (): Query => ({
  endpoint: `news`,
  method: "GET",
});

export const getMembersEnums = (): Query => ({
  endpoint: `user/users/roles?roleNames=MEMBER`,
  method: "GET",
});

export const getStaffEnums = (): Query => ({
  endpoint: `user/users/roles?roleNames=STAFF`,
  method: "GET",
});
