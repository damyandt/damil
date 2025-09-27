import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
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
import callApi, { Query } from "../../../API/callApi";
import { useAuthedContext } from "../../../context/AuthContext";
import Button from "../../MaterialUI/Button";
import {
  getPrice,
  getQueryOptions,
  postMember,
  postSubscription,
} from "../../../pages/Access Control/API/getQueries";
import Alert from "../../MaterialUI/Alert";
import DatePickerComponent from "../../MaterialUI/FormFields/DatePicker";
import CustomModal from "../../MaterialUI/Modal";
import {
  Column,
  Enum,
  EnumMap,
  Response,
} from "../../../Global/Types/commonTypes";
import { Dayjs } from "dayjs";

interface ClientsCreateFormProps {
  setRefreshTable: React.Dispatch<React.SetStateAction<boolean>>;
  columns: Column[];
  setModalTitle: React.Dispatch<React.SetStateAction<string | null>>;
  // loading: boolean;
  // setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const steps = ["Person Info", "Plan", "Payment", "Confirm Info"];

const ClientsCreateForm: React.FC<ClientsCreateFormProps> = ({
  setRefreshTable,
  setModalTitle,
  columns,
  // loading,
  // setLoading,
}) => {
  const { setAuthedUser, preferences } = useAuthedContext();
  const { t } = useLanguageContext();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [options, setOptions] = useState<EnumMap>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [subscriptionData, setSubscriptionData] = useState<any>({});
  const [id, setId] = useState<any>({});
  const [paymentMethod, setPaymentMethod] = useState<"CARD" | "CASH">("CASH");
  const [price, setPrice] = useState<number>(0);

  const handlePaymentMethodChange = (
    event: React.MouseEvent<HTMLElement>,
    newMethod: "CARD" | "CASH"
  ) => {
    setPaymentMethod(newMethod);
  };

  const handleNext = async () => {
    setLoading(true);
    if (activeStep === 0) {
      const response = await callApi<any>({
        query: postMember(formData),
        auth: { setAuthedUser },
      });
      response.success === false && setErrors(response.validationErrors);
      response.success === true && setId(response.data.id);
      response.success === true &&
        setActiveStep((prevActiveStep) =>
          Math.min(prevActiveStep + 1, steps.length - 1)
        );
    } else if (activeStep === 1) {
      const response = await callApi<Response<any>>({
        query: getPrice(
          subscriptionData.subscriptionPlan,
          subscriptionData.employment
        ),
        auth: { setAuthedUser },
      });
      response.success && setPrice(response.data.price);
      setActiveStep((prevActiveStep) =>
        Math.min(prevActiveStep + 1, steps.length - 1)
      );
    } else if (activeStep === 2) {
      setActiveStep((prevActiveStep) =>
        Math.min(prevActiveStep + 1, steps.length - 1)
      );
    } else if (activeStep === 3) {
      await callApi<Response<any>>({
        query: postSubscription(subscriptionData, id),
        auth: { setAuthedUser },
      });
      setOpenConfirm(false);
      setModalTitle(null);
      setRefreshTable && setRefreshTable((prev: boolean) => !prev);
    }

    setLoading(false);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  const handleChange = (
    field: string,
    value: string | number | Dayjs | null
  ): void => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev: any) => ({
      ...prev,
      [field]: "",
    }));
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

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2} p={2}>
            <Grid size={6}>
              <TextField
                label={t("First Name")}
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                error={!!errors["firstName"]}
                helperText={errors["firstName"]}
                fullWidth
              />
            </Grid>
            <Grid size={6}>
              <TextField
                label={t("Last Name")}
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                error={!!errors["lastName"]}
                helperText={errors["lastName"]}
                fullWidth
              />
            </Grid>
            <Grid size={6}>
              <TextField
                label={t("Email")}
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                error={!!errors["email"]}
                helperText={errors["email"]}
                fullWidth
              />
            </Grid>
            <Grid size={6}>
              <TextField
                label={t("Phone")}
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                error={!!errors["phone"]}
                helperText={errors["phone"]}
                fullWidth
              />
            </Grid>
            <Grid size={6}>
              <DatePickerComponent
                sx={{ width: "100%", margin: 0 }}
                label={t("Birth Date")}
                value={formData.birthDate}
                onChange={(newValue: Dayjs | null) =>
                  handleChange("birthDate", newValue)
                }
                error={!!errors["birthDate"]}
                helperText={errors["birthDate"]}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                select
                label={t("Gender")}
                value={formData.gender || ""}
                onChange={(e) => handleChange("gender", e.target.value)}
                error={!!errors["gender"]}
                helperText={errors["gender"]}
                fullWidth
              >
                {!options["gender"] ? (
                  <MenuItem value="loading">{t("Loading...")}</MenuItem>
                ) : (
                  options["gender"].map(
                    (option: { title: string; value: string | number }) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.title}
                      </MenuItem>
                    )
                  )
                )}
              </TextField>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2} p={2}>
            <Grid size={6}>
              <TextField
                select
                label={t("Subcription Plan")}
                value={formData.subscriptionPlan}
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
                value={formData.subscriptionPlan}
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
                  value={formData.allowedVisits}
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
        );
      case 2:
        return (
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
        );
      case 3:
        return (
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
              {formData.firstName || "this user"} {formData.lastName || ""}?
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
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 2, mb: 1 }}>{getStepContent(activeStep)}</Box>

        <Grid size={12}>
          <Alert
            message={t("Loading...")}
            showAlert={loading}
            severity="loading"
          />
        </Grid>
        <Grid size={12}>
          <Alert
            message={t("Succcessfuly created new member! Now choose a plan")}
            showAlert={activeStep === 1}
            severity="success"
            autoClose
          />
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
          }}
        >
          {(activeStep === 2 || activeStep === 3) && (
            <Grid>
              <Button
                color="error"
                onClick={() => handleBack()}
                loading={loading}
              >
                {t("Back")}
              </Button>
            </Grid>
          )}
          {activeStep === 1 && (
            <Grid>
              <Button
                color="error"
                onClick={() => {
                  setModalTitle(null);
                  setRefreshTable && setRefreshTable((prev: boolean) => !prev);
                }}
                loading={loading}
              >
                {t("Add Plan Later")}
              </Button>
            </Grid>
          )}

          <Grid>
            <Button onClick={() => handleNext()} loading={loading}>
              {t("Next")}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ClientsCreateForm;
