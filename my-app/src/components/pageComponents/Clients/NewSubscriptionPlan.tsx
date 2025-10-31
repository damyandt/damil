import {
  Box,
  Grid,
  ListItemIcon,
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
  Enum,
  EnumMap,
  Response,
  Row,
} from "../../../Global/Types/commonTypes";
import { useEffect, useState } from "react";
import Button from "../../MaterialUI/Button";
import callApi from "../../../API/callApi";
import {
  getMember,
  getPrice,
  getQueryOptions,
} from "../../../pages/Access Control/API/getQueries";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { useAuthedContext } from "../../../context/AuthContext";
import Alert from "../../MaterialUI/Alert";
import CellRenderer from "../../MaterialUI/Table/CellRenderer";
import { postSubscription } from "../../../pages/Access Control/API/postQueries";
import { User } from "../../../pages/usersPages/api/userTypes";
import { useNavigate } from "react-router-dom";

interface NewSubscriptionPlanProps {
  rowData: Row;
  enumEndpoints: string[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refreshFunc?: () => void;
}

const NewSubscriptionPlan: React.FC<NewSubscriptionPlanProps> = ({
  rowData,
  setOpen,
  refreshFunc,
  enumEndpoints,
}) => {
  const { t } = useLanguageContext();
  const { setAuthedUser, preferences } = useAuthedContext();
  const [price, setPrice] = useState<number>(0);
  const [subscriptionData, setSubscriptionData] = useState<any>({});
  const [options, setOptions] = useState<EnumMap>({});
  const [renew, setRenew] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [paymentMethod, setPaymentMethod] = useState<"CARD" | "CASH">("CASH");
  const steps = ["New Plan", "Payment", "Confirm Info"];
  const navigate = useNavigate();
  const handlePaymentMethodChange = (
    _: React.MouseEvent<HTMLElement>,
    newMethod: "CARD" | "CASH" | null
  ) => {
    if (newMethod !== null) {
      setPaymentMethod(newMethod);
    }
  };

  const fetchUser = async () => {
    const responseUser: Response<Array<Partial<User>>> = await callApi<any>({
      query: getMember(rowData.id, "id"),
      auth: { setAuthedUser },
    });

    responseUser.success && setDetails(responseUser.data[0]);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChangSubscription = (field: string, value: string): void => {
    setSubscriptionData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (step === 0) {
      const newErrors: any = {}; // keep previous errors

      if (!subscriptionData.subscriptionPlan) {
        newErrors.subscriptionPlan = t("Please select a subscription plan!");
      }

      if (!subscriptionData.employment) {
        newErrors.employment = t("Please select employment status!");
      }
      if (
        !subscriptionData.allowedVisits &&
        subscriptionData.subscriptionPlan === "VISIT_PASS"
      ) {
        newErrors.employment = t("Please select allowed visits!");
      }

      if (Object.keys(newErrors).length !== 0) {
        setErrors(newErrors);
        setLoading(false);
        return;
      }
      const response = await callApi<Response<any>>({
        query: getPrice(
          subscriptionData.subscriptionPlan,
          subscriptionData.employment
        ),
        auth: { setAuthedUser },
      });
      response.success && setPrice(response.data.price);
      setStep((prev: number) => (prev += 1));
    } else if (step === 1) {
      setStep((prev: number) => (prev += 1));
    } else if (step === 2) {
      await callApi<Response<any>>({
        query: postSubscription(subscriptionData, rowData.id),
        auth: { setAuthedUser },
      });
      setOpen(false);
      refreshFunc?.();
    }

    setLoading(false);
  };

  useEffect(() => {
    const fetchAllOptions = async () => {
      if (!enumEndpoints) return;

      const optionsMap: EnumMap = {};
      // const enumEndpoints: string[] = ["subscriptionPlan", "employment"];
      for (const url of enumEndpoints) {
        try {
          const options = await callApi<Response<Enum[]>>({
            query: getQueryOptions(url ?? ""),
            auth: { setAuthedUser },
          });
          options.success && (optionsMap[url] = options.data);
          !options.success &&
            console.error("Error fetching options for: ", url);
        } catch (error) {
          console.error("Error fetching options for", url, error);
        }
      }

      setOptions(optionsMap);
    };

    fetchAllOptions();
  }, []);

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
                error={!!errors["subscriptionPlan"]}
                helperText={errors["subscriptionPlan"]}
                onChange={(e) =>
                  handleChangSubscription("subscriptionPlan", e.target.value)
                }
                fullWidth
              >
                {!options?.["users/membership/plans/options"] ||
                options?.["users/membership/plans/options"]?.length < 1 ? (
                  <MenuItem
                    onClick={() =>
                      navigate("/DAMIL-Configurations/Member-Plans")
                    }
                  >
                    <ListItemIcon>
                      <SettingsSuggestIcon fontSize="small" />
                    </ListItemIcon>
                    {t("Set Up PLans")}
                  </MenuItem>
                ) : (
                  options["users/membership/plans/options"].map(
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
                error={!!errors["employment"]}
                helperText={errors["employment"]}
                onChange={(e) =>
                  handleChangSubscription("employment", e.target.value)
                }
                fullWidth
              >
                {!options["admin/Employment"] ? (
                  <MenuItem value="loading">{t("Loading...")}</MenuItem>
                ) : (
                  options["admin/Employment"].map(
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
                  error={!!errors["allowedVisits"]}
                  helperText={errors["allowedVisits"]}
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
              {`${price.toFixed(2)} ${preferences.currency || "EUR"}`}
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
              <ToggleButton value="CARD" sx={{ width: 150, height: 80 }}>
                {t("Pay by Card")}
              </ToggleButton>
              <ToggleButton value="CASH" sx={{ width: 150, height: 80 }}>
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
                background: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.success.contrastText,
                borderRadius: 1,
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                {t("Total Price")}: {price.toFixed() || "0.00"}{" "}
                {preferences.currency || "EUR"}
              </Typography>
            </Paper>

            {/* Confirmation Text */}
            <Typography
              variant="body1"
              sx={{ mb: 2, textAlign: "center", width: "100%" }}
            >
              {t("Are you sure you want to add this subscription to")}{" "}
              {rowData.firstName || "this user"} {rowData.lastName || ""}?
            </Typography>

            {/* Subscription Details */}
            <Grid container spacing={2}>
              {/* Plan */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box
                  sx={{
                    p: 2,
                    textAlign: "center",
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.default",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    {t("Plan")}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {subscriptionData.subscriptionPlan}
                  </Typography>
                </Box>
              </Grid>

              {/* Employment */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box
                  sx={{
                    p: 2,
                    textAlign: "center",
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.default",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    {t("Employment")}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {subscriptionData.employment}
                  </Typography>
                </Box>
              </Grid>

              {/* Payment Method */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box
                  sx={{
                    p: 2,
                    textAlign: "center",
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.default",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    {t("Payment Method")}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {paymentMethod}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </>
        )}

        <Grid size={12}>
          <Alert
            message={t("Loading...")}
            showAlert={loading}
            severity="loading"
          />
        </Grid>
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button
            disabled={loading}
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
            onClick={handleSubmit}
            color="primary"
            variant="outlined"
            disabled={loading}
          >
            {step == 2 ? t("Finish") : t("Next")}
          </Button>
        </Box>
      </>
    );
  };

  const [details, setDetails] = useState<any>();

  const ActiveForm = () => {
    return (
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} py={4}>
          <Grid size={12}>
            <Typography variant="h5" gutterBottom>
              {t("Current Subscription")}
            </Typography>
          </Grid>

          <Grid size={3}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {t("Plan")}:
            </Typography>
            <CellRenderer
              key={t("Status")}
              value={details?.subscriptionPlan || t("Inactive")}
              dataType={"enum"}
              table={false}
            />
          </Grid>

          <Grid size={3}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {t("Status")}:{/* {details?.subscriptionStatus || t("Active")} */}
            </Typography>{" "}
            <CellRenderer
              key={t("Status")}
              value={details?.subscriptionStatus || t("Inactive")}
              dataType={"enum"}
              table={false}
            />
          </Grid>

          <Grid size={3}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {t("Buy Date")}:
            </Typography>{" "}
            <CellRenderer
              key={t("Buy Date")}
              value={details?.subscriptionStartDate}
              dataType={"date"}
              table={false}
            />
          </Grid>

          <Grid size={3}>
            {details?.subscriptionPlan === "Flexible Visit Plan" ? (
              <>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  {t("Remaining Visits")}:
                  {`${details?.remainingVisits} from ${details?.allowedVisits}`}
                </Typography>
                <CellRenderer
                  key={t("Remaining Visits")}
                  value={`${details?.remainingVisits} from ${details?.allowedVisits}`}
                  dataType={"string"}
                  table={false}
                />
              </>
            ) : (
              <>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  {t("Expires On")}:
                </Typography>
                <CellRenderer
                  key={t("Expires On")}
                  value={details?.subscriptionEndDate}
                  dataType={"date"}
                  table={false}
                />
              </>
            )}
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="flex-end" gap={2}>
          {/* <Button
            variant="outlined"
            color="primary"
            onClick={() => setStep(0)} // Allow upgrade flow
          >
            {t("Upgrade Plan")}
          </Button> */}
          <Button
            variant="outlined"
            color="warning"
            onClick={() => setRenew(true)}
          >
            {t("Renew")}
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpen(false)}
          >
            {t("Cancel")}
          </Button>
        </Box>
      </Box>
    );
  };

  return rowData.subscriptionStatus.toLowerCase() === "inactive" || renew ? (
    <InactiveForm />
  ) : (
    <ActiveForm />
  );
};

export default NewSubscriptionPlan;
