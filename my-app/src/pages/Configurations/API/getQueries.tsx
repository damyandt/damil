import { Query } from "../../../API/callApi";

export const getSubscriptionPlansTable = (): Query => ({
  endpoint: `membership-plans/table`,
  method: "GET",
});

export const getSubscriptionPlans = (): Query => ({
  endpoint: `enums/SubscriptionPlan`,
  method: "GET",
});

export const getCurrentSubscriptionPlans = (): Query => ({
  endpoint: "memberships",
  method: "GET",
});
