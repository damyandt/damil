import { useState } from "react";
import { useAuthedContext } from "../../../../context/AuthContext";
import callApi from "../../../../API/callApi";
import { postPlans } from "../../../../pages/Configurations/API/getQueries";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import Button from "../../../MaterialUI/Button";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { Enum, Response } from "../../../../Global/Types/commonTypes";

export interface SubscriptionPlan {
  subscriptionPlan: string;
  price: number;
  studentPrice: number;
  seniorPrice: number;
  handicapPrice: number;
  currency: string;
}

type AddNewPlansPaperProps = {
  plansOptions: Enum[];
  setRefreshTable: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddNewPlansPaper = ({
  plansOptions,
  setRefreshTable,
}: AddNewPlansPaperProps) => {
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  const { setAuthedUser } = useAuthedContext();
  const { t } = useLanguageContext();
  const handlePlanToggle = (planId: string) => {
    setSelectedPlans((prev) =>
      prev.includes(planId)
        ? prev.filter((id) => id !== planId)
        : [...prev, planId]
    );
  };
  const handleSavePlans = async () => {
    try {
      const plans: SubscriptionPlan[] = selectedPlans.map((planType) => ({
        subscriptionPlan: planType,
        price: 0,
        studentPrice: 0,
        seniorPrice: 0,
        handicapPrice: 0,
        currency: "EUR",
      }));

      await callApi<Response<any>>({
        query: postPlans(plans),
        auth: { setAuthedUser },
      });

      console.log("Plans saved:", plans);
      setRefreshTable((prev: boolean) => !prev);
    } catch (error) {
      console.error("Error saving plans:", error);
    }
  };

  return (
    <>
      <FormGroup sx={{ pl: 1 }}>
        {plansOptions.map((plan: Enum) => (
          <FormControlLabel
            key={plan.value}
            control={
              <Checkbox
                checked={selectedPlans.includes(plan.value)}
                onChange={() => handlePlanToggle(plan.value)}
              />
            }
            label={
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {plan.title}
              </Typography>
            }
          />
        ))}
      </FormGroup>
      <Button
        variant="outlined"
        color="primary"
        sx={{ mt: 3, alignSelf: "flex-end" }}
        onClick={handleSavePlans}
        disabled={selectedPlans.length === 0}
      >
        {t("Continue")}
      </Button>
    </>
  );
};

export default AddNewPlansPaper;
