import { Query } from "../../../API/callApi";

export const getPreferences = (): Query => ({
  endpoint: `users/settings/me`,
  method: "GET",
});

export const getGyms = (): Query => ({
  endpoint: "tenant/all/short",
  method: "GET",
});
