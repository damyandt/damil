import { useState } from "react";
import { useAuthedContext } from "../../../../context/AuthContext";
import callApi from "../../../../API/callApi";
import { postPlans } from "../../../../pages/Configurations/API/getQueries";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@mui/material";
import Button from "../../../MaterialUI/Button";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { Enum, Response } from "../../../../Global/Types/commonTypes";

export interface SubscriptionPlan {
  subscriptionPlan: string;
  price?: number;
  studentPrice?: number;
  seniorPrice?: number;
  handicapPrice?: number;
  currency?: string;
}

type AddNewPlansPaperProps = {
  plansOptions: Enum[];
  setRefreshTable: React.Dispatch<React.SetStateAction<boolean>>;
  withoutThis?: SubscriptionPlan[];
};

const AddNewPlansPaper = ({
  plansOptions,
  setRefreshTable,
  withoutThis,
}: AddNewPlansPaperProps) => {
  console.log(plansOptions);
  console.log(withoutThis);
  const finalOptions =
    withoutThis?.length !== 0
      ? plansOptions.filter(
          (option: Enum) =>
            !withoutThis?.some(
              (plan: SubscriptionPlan) => plan.subscriptionPlan === option.value
            )
        )
      : plansOptions;
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
    <Box width={"100%"} sx={{ display: "flex", flexDirection: "column" }}>
      <Grid container spacing={1}>
        <FormGroup sx={{ pl: 1 }}>
          {finalOptions.map((plan: Enum) => (
            <Grid size={12}>
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
            </Grid>
          ))}
        </FormGroup>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 3, alignSelf: "flex-end", width: "fit-content" }}
          onClick={handleSavePlans}
          disabled={selectedPlans.length === 0}
        >
          {t("Continue")}
        </Button>
      </Box>
    </Box>
  );
};

export default AddNewPlansPaper;
