import { Query } from "../../../API/callApi";
import { DataForCardLinkStripe } from "./userTypes";

export const getPreferences = (): Query => ({
  endpoint: `users/settings/me`,
  method: "GET",
});

export const getGyms = (): Query => ({
  endpoint: "tenant/all/short",
  method: "GET",
});

export const getLink = (data: DataForCardLinkStripe): Query => ({
  endpoint: "stripe/account_link",
  method: "POST",
  variables: data,
});
