import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, Grid, Typography } from "@mui/material";
import CustomModal from "../../components/MaterialUI/Modal"; // Use your own modal component
import TextField from "../../components/MaterialUI/FormFields/TextField";
import Button from "../../components/MaterialUI/Button";
import callApi from "../../API/callApi";
import { checkInMember, getMember } from "../Access Control/API/getQueries";
import { useAuthedContext } from "../../context/AuthContext";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Alert from "../../components/MaterialUI/Alert";
import { useLanguageContext } from "../../context/LanguageContext";
import CellRenderer from "../../components/MaterialUI/Table/CellRenderer";
interface CheckInModalProps {
  open: boolean;
  onClose: () => void;
}

const CheckInModal: React.FC<CheckInModalProps> = ({ open, onClose }) => {
  const { t } = useLanguageContext();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchInput, setSearchInput] = useState<string>("");
  const [userDetails, setUserDetails] = useState<any>(null);
  const { setAuthedUser, authedUser } = useAuthedContext();
  const steps = [
    t("Search Member"),
    t("Confirm Details"),
    t("Check-In Complete"),
  ];
  const handleNext = async () => {
    try {
      const userDetails = await callApi<any>({
        query: getMember(authedUser?.id || "", searchInput),
        auth: { setAuthedUser },
      });
      if (activeStep === 0) {
        setUserDetails(userDetails.data);
      }
      userDetails.success === true && setErrors({});
      userDetails.success === true && setActiveStep((prev) => prev + 1);
    } catch (error) {
      console.log(error);
      setErrors({ search: t("Can't find user with this information!") });
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleFinish = async () => {
    const checkIn = await callApi<any>({
      query: checkInMember(authedUser?.id || "", searchInput),
      auth: { setAuthedUser },
    });

    checkIn.success === true
      ? setActiveStep((prev) => prev + 1)
      : setErrors({ noVisits: checkIn.message });
  };

  const handleReset = (closeModal: boolean) => {
    setSearchInput("");
    setUserDetails(null);
    setActiveStep(0);
    setErrors({});
    closeModal && onClose();
  };

  return (
    <CustomModal
      title={t("Member Check-In")}
      titleIcon="login"
      open={open}
      onClose={() => handleReset(true)}
      width="lg"
    >
      <Box sx={{ width: "100%", mb: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, idx) => (
            <Step key={idx}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Step 1 */}
      {activeStep === 0 && (
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography mb={2}>{t("Enter Member Name or ID")}</Typography>
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label={t("Search")}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNext()}
            />
          </Grid>

          <Grid size={12}>
            <Alert
              message={errors["search"]}
              showAlert={!!errors["search"]}
              severity="error"
            />
          </Grid>
          <Grid size={12} textAlign="right" mt={2}>
            <Button disabled={!searchInput.trim()} onClick={handleNext}>
              Next
            </Button>
          </Grid>
        </Grid>
      )}

      {/* Step 3 */}
      {activeStep === 1 && userDetails && (
        <Box>
          <Typography variant="h6" mb={2}>
            {t("Member Details")}
          </Typography>
          <Grid container spacing={2}>
            <Grid size={4}>
              <Typography variant="subtitle2">{t("Name")}</Typography>
              <Typography>
                <CellRenderer
                  key={t("Name")}
                  value={`${userDetails.firstName} ${userDetails.lastName}`}
                  dataType={"string"}
                  table={false}
                />
              </Typography>
            </Grid>
            <Grid size={4}>
              <Typography variant="subtitle2">{t("Email")}</Typography>

              <CellRenderer
                key={t("Email")}
                value={userDetails.email}
                dataType={"string"}
                table={false}
              />
            </Grid>
            <Grid size={4}>
              <Typography variant="subtitle2">{t("Phone")}</Typography>
              <CellRenderer
                key={t("Phone")}
                value={userDetails.phone || "-"}
                dataType={"string"}
                table={false}
              />
            </Grid>
            <Grid size={4}>
              <Typography variant="subtitle2">{t("Gender")}</Typography>
              <CellRenderer
                key={t("Gender")}
                value={userDetails.gender}
                dataType={"enum"}
                table={false}
              />
            </Grid>
            <Grid size={4}>
              <Typography variant="subtitle2">
                {t("Subscription Plan")}
              </Typography>

              <CellRenderer
                key={t("Subscription Plan")}
                value={userDetails.subscriptionPlan}
                dataType={"enum"}
                table={false}
              />
            </Grid>
            <Grid size={4}>
              <Typography variant="subtitle2">
                {t("Subscription Status")}
              </Typography>
              <CellRenderer
                key={t("Subscription Status")}
                value={userDetails.subscriptionStatus}
                dataType={"enum"}
                table={false}
              />
            </Grid>
            <Grid size={4}>
              <Typography variant="subtitle2">{t("Start Date")}</Typography>
              <CellRenderer
                key={t("Start Date")}
                value={userDetails.subscriptionStartDate}
                dataType={"date"}
                table={false}
              />
            </Grid>
            <Grid size={4}>
              <Typography variant="subtitle2">{t("End Date")}</Typography>
              <CellRenderer
                key={t("Start Date")}
                value={userDetails.subscriptionEndDate}
                dataType={"date"}
                table={false}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={3} justifyContent="space-between">
            <Grid>
              <Button variant="outlined" onClick={handleBack}>
                {t("Back")}
              </Button>
            </Grid>
            <Grid>
              <Button variant="contained" onClick={handleFinish}>
                {t("Check In")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Step 3 */}
      {activeStep === 2 && (
        <>
          <Box
            display="flex"
            flexDirection={"column"}
            justifyContent="center"
            width={"100%"}
          >
            <CheckCircleOutlineIcon
              sx={{ fontSize: 60, color: "success.main", mb: 2, width: "100%" }}
            />
            <Typography
              variant="h5"
              fontWeight={600}
              gutterBottom
              color="success.main"
              width="100%"
              textAlign={"center"}
            >
              {t("Check-In Successful!")}
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              width="100%"
              textAlign={"center"}
            >
              {userDetails?.firstName} {userDetails?.lastName}{" "}
              {t("has been checked in.")}
            </Typography>
          </Box>

          <Grid
            container
            spacing={2}
            mt={4}
            display="flex"
            justifyContent="flex-end"
          >
            <Grid>
              <Button onClick={() => handleReset(true)} color="error">
                {t("Close")}
              </Button>
            </Grid>
            <Grid>
              <Button onClick={() => handleReset(false)}>
                {t("Next Check-In")}
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </CustomModal>
  );
};

export default CheckInModal;
