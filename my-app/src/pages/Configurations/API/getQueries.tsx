import { Query } from "../../../API/callApi";
import { SubscriptionPlan } from "../../../components/pageComponents/Configurations/MemberSubscription/AddNewPlanPaper";

export const getSubscriptionPlansTable = (): Query => ({
  endpoint: `membership-plans/table`,
  method: "GET",
});

export const postPlans = (plans: SubscriptionPlan[]): Query => ({
  endpoint: `membership-plans`,
  method: "POST",
  variables: plans,
});

export const getSubscriptionPlans = (): Query => ({
  endpoint: `enums/SubscriptionPlan`,
  method: "GET",
});

export const getCurrentSubscriptionPlans = (): Query => ({
  endpoint: "memberships",
  method: "GET",
});
