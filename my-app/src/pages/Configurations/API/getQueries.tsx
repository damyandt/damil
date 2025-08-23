import { Query } from "../../../API/callApi";
import { SubscriptionPlan } from "../../../components/pageComponents/Configurations/SubscriptionPlans/AddNewPlanPaper";

export const getSubscriptionPlansTable = (): Query => ({
  endpoint: `membership-plans`,
  method: "GET",
});

export const postPlans = (plans: SubscriptionPlan[]): Query => ({
  endpoint: `membership-plans`,
  method: "POST",
  variables: plans,
});

export const getSubscriptionPlans = (): Query => ({
  endpoint: `SubscriptionPlan/values`,
  method: "GET",
});

export const getCurrentSubscriptionPlans = (): Query => ({
  endpoint: `users/membership/subscription-plans/customized-fields`,
  method: "GET",
});
