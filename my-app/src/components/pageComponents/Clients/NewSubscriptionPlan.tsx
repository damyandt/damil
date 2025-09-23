import {
  Box,
  Grid,
  MenuItem,
  Paper,
  Step,
  StepLabel,
  Stepper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import TextField from "../../MaterialUI/FormFields/TextField";
import { useLanguageContext } from "../../../context/LanguageContext";
import {
  Column,
  Enum,
  EnumMap,
  Response,
  Row,
} from "../../../Global/Types/commonTypes";
import { useEffect, useState } from "react";
import Button from "../../MaterialUI/Button";
import callApi from "../../../API/callApi";
import {
  getQueryOptions,
  postSubscription,
} from "../../../pages/Access Control/API/getQueries";
import { useAuthedContext } from "../../../context/AuthContext";

interface NewSubscriptionPlanProps {
  rowData: Row;
  columns: Column[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshTable?: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewSubscriptionPlan: React.FC<NewSubscriptionPlanProps> = ({
  rowData,
  setOpen,
  columns,
  setRefreshTable,
}) => {
  const { t } = useLanguageContext();
  const { setAuthedUser } = useAuthedContext();
  const [subscriptionData, setSubscriptionData] = useState<any>({});
  const [options, setOptions] = useState<EnumMap>({});
  const [step, setStep] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash" | null>(
    null
  );
  const steps = ["New Plan", "Payment", "Confirm Info"];
  const handlePaymentMethodChange = (
    event: React.MouseEvent<HTMLElement>,
    newMethod: "card" | "cash" | null
  ) => {
    if (newMethod !== null) {
      setPaymentMethod(newMethod);
    }
  };

  const handleChangSubscription = (field: string, value: string): void => {
    setSubscriptionData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    const fetchAllOptions = async () => {
      if (!columns) return;

      const optionsMap: EnumMap = {};

      for (const col of columns) {
        const isDropdown = col.dropDownConfig?.url;
        const isEnum = col.enumConfig?.url;

        if (isDropdown || isEnum) {
          const rawUrl = col.dropDownConfig?.url || col.enumConfig?.url;
          const url = rawUrl?.startsWith("/v1/") ? rawUrl.slice(4) : rawUrl;

          try {
            const options = await callApi<Response<Enum[]>>({
              query: getQueryOptions(url ?? ""),
              auth: { setAuthedUser },
            });
            options.success && (optionsMap[col.field] = options.data);
            !options.success &&
              console.error("Error fetching options for: ", col.field);
          } catch (error) {
            console.error("Error fetching options for", col.field, error);
          }
        }
      }

      setOptions(optionsMap);
    };

    fetchAllOptions();
  }, [columns]);

  const InactiveForm = () => {
    return (
      <>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {step === 0 && (
          <Grid container spacing={2} p={2}>
            <Grid size={12}>
              <Typography variant="h5" gutterBottom>
                {t("Update Subscription for")} {rowData.firstName}{" "}
                {rowData.lastName}
              </Typography>
            </Grid>

            <Grid size={6}>
              <TextField
                select
                label={t("Subcription Plan")}
                value={subscriptionData.subscriptionPlan}
                onChange={(e) =>
                  handleChangSubscription("subscriptionPlan", e.target.value)
                }
                fullWidth
              >
                {!options["subscriptionPlan"] ? (
                  <MenuItem value="loading">{t("Loading...")}</MenuItem>
                ) : (
                  options["subscriptionPlan"].map(
                    (option: { title: string; value: string | number }) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.title}
                      </MenuItem>
                    )
                  )
                )}
              </TextField>
            </Grid>
            <Grid size={6}>
              <TextField
                select
                label={t("Employment")}
                value={subscriptionData.employment}
                onChange={(e) =>
                  handleChangSubscription("employment", e.target.value)
                }
                fullWidth
              >
                {!options["employment"] ? (
                  <MenuItem value="loading">{t("Loading...")}</MenuItem>
                ) : (
                  options["employment"].map(
                    (option: { title: string; value: string | number }) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.title}
                      </MenuItem>
                    )
                  )
                )}
              </TextField>
            </Grid>
            {subscriptionData.subscriptionPlan === "VISIT_PASS" && (
              <Grid size={6}>
                <TextField
                  select
                  label={t("Allowed Visits")}
                  value={subscriptionData.allowedVisits}
                  type="number"
                  onChange={(e) =>
                    handleChangSubscription("allowedVisits", e.target.value)
                  }
                  inputProps={{ min: 1 }}
                  fullWidth
                >
                  {[3, 6, 12, 24].map((count) => (
                    <MenuItem key={count} value={count}>
                      {count}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}
          </Grid>
        )}
        {step === 1 && (
          <Box
            sx={{ maxWidth: 500, margin: "0 auto", textAlign: "center", p: 2 }}
          >
            <Typography variant="h5" gutterBottom>
              {t("Total Price")}
            </Typography>
            <Typography variant="h3" color="primary" gutterBottom>
              {t("$29.99")}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              {t("Choose your payment method:")}
            </Typography>

            <ToggleButtonGroup
              color="primary"
              value={paymentMethod}
              exclusive
              onChange={handlePaymentMethodChange}
              aria-label="Payment Method"
              sx={{ mt: 2 }}
            >
              <ToggleButton value="card" sx={{ width: 150, height: 80 }}>
                {t("Pay by Card")}
              </ToggleButton>
              <ToggleButton value="cash" sx={{ width: 150, height: 80 }}>
                {t("Pay by Cash")}
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        )}
        {step === 2 && (
          <>
            {/* Price Highlight */}
            <Paper
              elevation={3}
              sx={{
                p: 2,
                mb: 3,
                textAlign: "center",
                background: (theme) => theme.palette.success.light,
                color: (theme) => theme.palette.success.contrastText,
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                {t("Total Price")}: ${subscriptionData.price || "0.00"}
              </Typography>
            </Paper>

            {/* Confirmation Text */}
            <Typography variant="body1" sx={{ mb: 2 }}>
              {t("Are you sure you want to add this subscription to")}{" "}
              {rowData.firstName || "this user"} {rowData.lastName || ""}?
            </Typography>

            {/* Subscription Details */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {t("Plan")}:{" "}
                <Typography component="span" fontWeight="normal">
                  {subscriptionData.subscriptionPlan}
                </Typography>
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {t("Employment")}:{" "}
                <Typography component="span" fontWeight="normal">
                  {subscriptionData.employment}
                </Typography>
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {t("Payment Method")}:{" "}
                <Typography component="span" fontWeight="normal">
                  {paymentMethod}
                </Typography>
              </Typography>
            </Paper>
          </>
        )}
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button
            onClick={() => {
              step === 0 && setOpen(false);
              step !== 0 && setStep((prev: number) => (prev -= 1));
            }}
            color="error"
            variant="outlined"
          >
            {step === 0 ? t("Cancel") : t("Back")}
          </Button>
          <Button
            onClick={async () => {
              step !== 2 && setStep((prev: number) => (prev += 1));

              step == 2 &&
                (await callApi<Response<any>>({
                  query: postSubscription(subscriptionData, rowData.id),
                  auth: { setAuthedUser },
                }));
              step == 2 && setOpen(false);
              step == 2 && setRefreshTable?.((prev: boolean) => !prev);
            }}
            color="primary"
            variant="outlined"
          >
            {t("Next")}
          </Button>
        </Box>
      </>
    );
  };
  console.log(rowData);
  const ActiveForm = () => {
    return (
      <Box sx={{ p: 2 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 2,
            backgroundColor: (theme) => theme.palette.grey[100],
          }}
        >
          <Typography variant="h5" gutterBottom>
            {t("Current Subscription")}
          </Typography>

          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            <strong>{t("Plan")}:</strong> {rowData.subscriptionPlan}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            <strong>{t("Status")}:</strong>{" "}
            {rowData.subscriptionStatus || t("Active")}
          </Typography>
          {rowData.subscriptionPlan === "Flexible Visit Plan" ? (
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              <strong>{t("Remaining Visits")}:</strong>{" "}
              {`${rowData.remainingVisits} from ${rowData.allowedVisits}`}
            </Typography>
          ) : (
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              <strong>{t("Expires On")}:</strong>{" "}
              {rowData.expiryDate
                ? new Date(rowData.expiryDate).toLocaleDateString()
                : t("No Expiry")}
            </Typography>
          )}
        </Paper>

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setStep(0)} // Allow upgrade flow
          >
            {t("Upgrade Plan")}
          </Button>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => console.log("Renew Plan")}
          >
            {t("Renew")}
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => console.log("Cancel Plan")}
          >
            {t("Cancel")}
          </Button>
        </Box>
      </Box>
    );
  };

  return rowData.subscriptionStatus.toLowerCase() === "inactive" ? (
    <InactiveForm />
  ) : (
    <ActiveForm />
  );
};

export default NewSubscriptionPlan;
