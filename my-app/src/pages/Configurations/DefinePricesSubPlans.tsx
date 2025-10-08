import { useEffect, useRef, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Button from "../../components/MaterialUI/Button";
import TextField from "../../components/MaterialUI/FormFields/TextField";
import { SubscriptionPlan } from "../../components/pageComponents/Configurations/SubscriptionPlans/AddNewPlanPaper";
import { useLanguageContext } from "../../context/LanguageContext";

type PlanPrices = {
  price: string;
  studentPrice: string;
  handicapPrice: string;
  seniorPrice: string;
};

type PricesState = Record<string, PlanPrices>;

interface DefinePricesFormProps {
  plans: string[];
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
  const { t } = useLanguageContext();
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

  // Refs to all inputs
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Clear and reassign refs based on plan count
    inputRefs.current = inputRefs.current.slice(0, plans.length * 4);
  }, [plans]);

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

  const handleKeyDown = (index: number) => {
    const nextIndex = index + 1;
    const totalFields = inputRefs.current.length;

    if (nextIndex < totalFields) {
      inputRefs.current[nextIndex]?.focus();
    } else {
      handleSubmit();
    }
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

  const priceFields = [
    "price",
    "studentPrice",
    "handicapPrice",
    "seniorPrice",
  ] as const;

  return (
    <>
      <Grid container spacing={2} justifyContent="center" width={"100%"}>
        {plans.map((plan, planIndex) => (
          <Grid
            key={plan}
            size={{ xs: 12, md: 6, lg: inModal ? 6 : 3 }}
            sx={{
              mb: 3,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="h6">{plan}</Typography>
            {priceFields.map((field, fieldIndex) => {
              const refIndex = planIndex * priceFields.length + fieldIndex;
              return (
                <TextField
                  key={`${plan}-${fieldIndex}-${field}`}
                  label={field
                    .replace("Price", " Price")
                    .replace(/^./, (c) => c.toUpperCase())}
                  type="number"
                  value={prices[plan][field]}
                  inputRef={(el) => {
                    inputRefs.current[refIndex] = el;
                  }}
                  onChange={(e) => handleChange(plan, field, e.target.value)}
                  // onKeyDown={(e: any) => {
                  //   if (e.key === "Enter") {
                  //     e.preventDefault(); // ✅ Prevent form submission or unwanted action
                  //     e.stopPropagation(); // ✅ Optional: block global handlers
                  //     handleKeyDown(e, refIndex);
                  //   }
                  // }}
                  onEnterFunc={() => {
                    handleKeyDown(refIndex);
                  }}
                  fullWidth
                />
              );
            })}
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
          {t("Back")}
        </Button>
        <Button onClick={handleSubmit}>{t("Submit")}</Button>
      </Box>
    </>
  );
};

export default DefinePricesForm;
