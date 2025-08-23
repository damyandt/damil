import { Query } from "../../../API/callApi";
import { SubscriptionPlan } from "../../../components/pageComponents/Configurations/SubscriptionPlans/AddNewPlanPaper";

export const getSubscriptionPlansTable = (): Query => ({
  endpoint: `pricing/table`,
  method: "GET",
});

export const postPlans = (plans: SubscriptionPlan[]): Query => ({
  endpoint: `pricing/plans`,
  method: "POST",
  variables: plans,
});

export const getSubscriptionPlans = (): Query => ({
  endpoint: `SubscriptionPlan/values`,
  method: "GET",
});

export const getCurrentSubscriptionPlans = (): Query => ({
  endpoint: `users/members/subscription_plans/customized_fields`,
  method: "GET",
});
