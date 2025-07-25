import React, { useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Typography,
} from "@mui/material";
import CustomModal from "../../components/MaterialUI/Modal"; // Use your own modal component
import TextField from "../../components/MaterialUI/FormFields/TextField";

interface CheckInModalProps {
  open: boolean;
  onClose: () => void;
}

const CheckInModal: React.FC<CheckInModalProps> = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [userDetails, setUserDetails] = useState<any>(null);

  const steps = ["Search Member", "Confirm Details", "Check-In Complete"];

  const handleNext = () => {
    if (activeStep === 0) {
      // Simulate member search result
      const mockUser = {
        name: "John Doe",
        membership: "Gold",
        lastCheckIn: "2025-07-24",
      };
      setUserDetails(mockUser);
    }

    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleFinish = () => {
    // You can call check-in API here
    setActiveStep((prev) => prev + 1);
  };

  const handleReset = () => {
    setSearchInput("");
    setUserDetails(null);
    setActiveStep(0);
    onClose();
  };

  return (
    <CustomModal
      title="Member Check-In"
      titleIcon="login"
      open={open}
      onClose={handleReset}
      width="md"
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
        <Box>
          <Typography mb={2}>Enter Member Name or ID</Typography>
          <TextField
            fullWidth
            label="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Box textAlign="right" mt={2}>
            <Button
              variant="contained"
              disabled={!searchInput.trim()}
              onClick={handleNext}
            >
              Next
            </Button>
          </Box>
        </Box>
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
              <Typography>{userDetails.name}</Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="subtitle2">Membership</Typography>
              <Typography>{userDetails.membership}</Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="subtitle2">Last Check-In</Typography>
              <Typography>{userDetails.lastCheckIn}</Typography>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button variant="outlined" onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" onClick={handleFinish}>
              Check-In
            </Button>
          </Box>
        </Box>
      )}

      {/* Step 3 */}
      {activeStep === 2 && (
        <Box textAlign="center" py={3}>
          <Typography variant="h5" gutterBottom>
            ✅ Check-In Successful!
          </Typography>
          <Typography variant="body1">
            {userDetails?.name} has been checked in.
          </Typography>
          <Box mt={3}>
            <Button variant="contained" onClick={handleReset}>
              Close
            </Button>
          </Box>
        </Box>
      )}
    </CustomModal>
  );
};

export default CheckInModal;
