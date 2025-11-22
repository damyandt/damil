import { Query } from "../../../API/callApi";
import { SubscriptionPlan } from "../../../components/pageComponents/Configurations/MemberSubscription/AddNewPlanPaper";

export const postPlans = (plans: SubscriptionPlan[]): Query => ({
  endpoint: `membership-plans`,
  method: "POST",
  variables: plans,
});
