import { Query } from "../../../API/callApi";

export const getBuyMemberSubscription = (
  payload: any,
  connectedAccountId: string
): Query => ({
  endpoint: `stripe/create-checkout-session/connectedAccounts?connectedAccountId=${connectedAccountId}`,
  method: "POST",
  variables: payload,
});
