import { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Button from "../../components/MaterialUI/Button";
import TextField from "../../components/MaterialUI/FormFields/TextField";
import { SubscriptionPlan } from "../../components/pageComponents/Configurations/SubscriptionPlans/AddNewPlanPaper";

type PlanPrices = {
  price: string;
  studentPrice: string;
  handicapPrice: string;
  seniorPrice: string;
};

type PricesState = Record<string, PlanPrices>;

interface DefinePricesFormProps {
  plans: string[]; // 👈 array of strings
  onBack: () => void;
  onSubmit: (prices: SubscriptionPlan[]) => void | Promise<void>;
  inModal?: boolean;
}

const DefinePricesForm: React.FC<DefinePricesFormProps> = ({
  plans,
  onBack,
  onSubmit,
  inModal = false,
}) => {
  const [prices, setPrices] = useState<PricesState>(
    plans.reduce((acc, plan) => {
      acc[plan] = {
        price: "",
        studentPrice: "",
        handicapPrice: "",
        seniorPrice: "",
      };
      return acc;
    }, {} as PricesState)
  );

  const handleChange = (
    plan: string,
    field: keyof PlanPrices,
    value: string
  ) => {
    setPrices((prev) => ({
      ...prev,
      [plan]: { ...prev[plan], [field]: value },
    }));
  };

  const handleSubmit = () => {
    const payload: SubscriptionPlan[] = Object.entries(prices).map(
      ([planName, planPrices]) => ({
        subscriptionPlan: planName,
        price: Number(planPrices.price) || 0,
        studentPrice: Number(planPrices.studentPrice) || 0,
        seniorPrice: Number(planPrices.seniorPrice) || 0,
        handicapPrice: Number(planPrices.handicapPrice) || 0,
      })
    );

    onSubmit(payload);
  };

  return (
    <>
      <Grid container spacing={2} justifyContent="center" width={"100%"}>
        {plans.map((plan) => (
          <Grid
            size={inModal ? { xs: 12, md: 6, lg: 6 } : { xs: 12, md: 6, lg: 3 }}
            key={plan}
            sx={{
              mb: 3,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="h6">{plan}</Typography>
            <TextField
              label="Price"
              type="number"
              value={prices[plan].price}
              onChange={(e) => handleChange(plan, "price", e.target.value)}
              fullWidth
            />
            <TextField
              label="Student Price"
              type="number"
              value={prices[plan].studentPrice}
              onChange={(e) =>
                handleChange(plan, "studentPrice", e.target.value)
              }
              fullWidth
            />
            <TextField
              label="Handicap Price"
              type="number"
              value={prices[plan].handicapPrice}
              onChange={(e) =>
                handleChange(plan, "handicapPrice", e.target.value)
              }
              fullWidth
            />
            <TextField
              label="Senior Price"
              type="number"
              value={prices[plan].seniorPrice}
              onChange={(e) =>
                handleChange(plan, "seniorPrice", e.target.value)
              }
              fullWidth
            />
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          width: "100%",
        }}
      >
        <Button onClick={onBack} color="error">
          Back
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </Box>
    </>
  );
};

export default DefinePricesForm;
