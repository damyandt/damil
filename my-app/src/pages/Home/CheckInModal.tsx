import React, { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import CustomModal from "../../components/MaterialUI/Modal"; // Use your own modal component
import TextField from "../../components/MaterialUI/FormFields/TextField";
import Button from "../../components/MaterialUI/Button";
import callApi from "../../API/callApi";
import { checkInMember, getMember } from "../Access Control/API/getQueries";
import { useAuthedContext } from "../../context/AuthContext";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Alert from "../../components/MaterialUI/Alert";
interface CheckInModalProps {
  open: boolean;
  onClose: () => void;
}

const CheckInModal: React.FC<CheckInModalProps> = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchInput, setSearchInput] = useState<string>("");
  const [userDetails, setUserDetails] = useState<any>(null);
  const { setAuthedUser, authedUser } = useAuthedContext();
  const steps = ["Search Member", "Confirm Details", "Check-In Complete"];

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
      setErrors({ search: "Can't find user with this information!" });
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
      : setErrors(checkIn.validationErrors);
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
      title="Member Check-In"
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
            <Typography mb={2}>Enter Member Name or ID</Typography>
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </Grid>

          <Grid size={12}>
            <Alert
              message={errors["search"]}
              showAlert={!!errors["search"]}
              severity="error"
              autoClose
            />
          </Grid>
          <Grid size={12} textAlign="right" mt={2}>
            <Button disabled={!searchInput.trim()} onClick={handleNext}>
              Next
            </Button>
          </Grid>
        </Grid>
      )}

      {/* Step 2 */}
      {activeStep === 1 && userDetails && (
        <Box>
          <Typography variant="h6" mb={2}>
            Confirm Member Details
          </Typography>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Typography variant="subtitle2">Name</Typography>
              <Typography>
                {`${userDetails.firstName} ${userDetails.lastName}`}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="subtitle2">Subscription PLan</Typography>
              <Typography>{userDetails.subscriptionPlan}</Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="subtitle2">Remaining Visits</Typography>
              <Typography>{userDetails.remainingVisits}</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            mt={3}
            display={"flex"}
            justifyContent={"flex-end"}
          >
            <Grid>
              <Button color={"error"} onClick={handleBack}>
                Back
              </Button>
            </Grid>
            <Grid>
              <Button onClick={handleFinish}>Check-In</Button>
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
              Check-In Successful!
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              width="100%"
              textAlign={"center"}
            >
              {userDetails?.firstName} {userDetails?.lastName} has been checked
              in.
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
                Close
              </Button>
            </Grid>
            <Grid>
              <Button onClick={() => handleReset(false)}>Next Check-In</Button>
            </Grid>
          </Grid>
        </>
      )}
    </CustomModal>
  );
};

export default CheckInModal;
