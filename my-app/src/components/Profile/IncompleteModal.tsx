import { Box, Typography } from "@mui/material";
import { useAuthedContext } from "../../context/AuthContext";
import CustomModal from "../MaterialUI/Modal";
import Button from "../MaterialUI/Button";
import TextField from "../MaterialUI/FormFields/TextField";
import { useState } from "react";
import { completeProfile } from "../../pages/usersPages/api/postQuery";
import callApi from "../../API/callApi";

const IncompleteProfileModal = () => {
  const { showIncompleteModal, snoozeModal, authedUser, setAuthedUser } =
    useAuthedContext();

  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    city: authedUser?.city || "",
    phone: authedUser?.phone || "",
    address: authedUser?.address || "",
    email: authedUser?.email || "",
    username: authedUser?.username || "",
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = async () => {
    if (step === 0) {
      setStep(1);
    } else {
      console.log("Updated profile data:", formData);
      await callApi<any>({
        query: completeProfile(formData),
        auth: { setAuthedUser },
      });
      snoozeModal(60);
    }
  };

  return (
    <CustomModal
      open={showIncompleteModal}
      onClose={() => snoozeModal(60)}
      title="👋 Complete Your Profile"
      width={"md"}
    >
      <Box>
        {step === 0 && (
          <Typography variant="body1" gutterBottom>
            Some of your profile information is missing. Please take a moment to
            complete it.
          </Typography>
        )}

        {step === 1 && (
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              disabled={true}
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              fullWidth
            />
            <TextField
              label="Username"
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
              fullWidth
            />

            <TextField
              label="City"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              fullWidth
            />
            <TextField
              label="Address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              fullWidth
            />
            <TextField
              label="Phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              fullWidth
            />
          </Box>
        )}

        <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={() => snoozeModal(60)} color="error">
            Remind Me Later
          </Button>
          <Button onClick={handleNext} color="primary">
            {step === 0 ? "Next" : "Save & Close"}
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default IncompleteProfileModal;
