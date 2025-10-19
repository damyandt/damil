import { useState } from "react";
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
import { Enum } from "../../../../Global/Types/commonTypes";

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
  withoutThis?: Enum[];
  onNext?: (plans: string[]) => void;
};

const AddNewPlansPaper = ({
  plansOptions,
  withoutThis,
  onNext,
}: AddNewPlansPaperProps) => {
  const finalOptions =
    withoutThis?.length !== 0
      ? plansOptions.filter(
          (option: Enum) =>
            !withoutThis?.some((plan: Enum) => plan.value === option.value)
        )
      : plansOptions;
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  const { t } = useLanguageContext();
  const handlePlanToggle = (planId: string) => {
    setSelectedPlans((prev) =>
      prev.includes(planId)
        ? prev.filter((id) => id !== planId)
        : [...prev, planId]
    );
  };
  const handleSavePlans = async () => {
    onNext?.(selectedPlans);
    // try {
    //   const plans: SubscriptionPlan[] = selectedPlans.map((planType) => ({
    //     subscriptionPlan: planType,
    //   }));

    //   await callApi<Response<any>>({
    //     query: postPlans(plans),
    //     auth: { setAuthedUser },
    //   });

    //   console.log("Plans saved:", plans);

    // } catch (error) {
    //   console.error("Error saving plans:", error);
    // }
  };

  return (
    <Box
      width={"100%"}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <FormGroup sx={{ pl: 1 }}>
        <Grid container spacing={1}>
          {finalOptions.map((plan: Enum) => (
            <Grid size={4} key={plan.value}>
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
        </Grid>
      </FormGroup>

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
