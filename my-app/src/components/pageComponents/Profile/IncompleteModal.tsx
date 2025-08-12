import { Box, Typography } from "@mui/material";
import { useAuthedContext } from "../../../context/AuthContext";
import CustomModal from "../../MaterialUI/Modal";
import Button from "../../MaterialUI/Button";
import TextField from "../../MaterialUI/FormFields/TextField";
import { useState } from "react";
import { completeProfile } from "../../../pages/usersPages/api/postQuery";
import callApi from "../../../API/callApi";
import { useLanguageContext } from "../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Gym } from "../../../pages/usersPages/userTypes";

const IncompleteProfileModal = () => {
  const { showIncompleteModal, snoozeModal, authedUser, setAuthedUser } =
    useAuthedContext();
  const { t } = useLanguageContext();
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState<Gym>({
    city: authedUser?.city || "",
    phone: authedUser?.phone || "",
    address: authedUser?.address || "",
    email: authedUser?.email || "",
    username: authedUser?.username || "",
    gymName: authedUser?.gymName || "",
  });
  const [preferances, setPreferences] = useState({
    currency: "",
    language: "",
  });
  const navigate = useNavigate();
  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleChangePreferences = (
    field: keyof typeof preferances,
    value: string
  ) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = async () => {
    try {
      if (step === 0) {
        const isFormDataIncomplete = Object.values(formData).some(
          (val) => !val || val === "" || val === null || val === undefined
        );

        if (isFormDataIncomplete) {
          setStep(2);
        } else {
          setStep(1);
        }
      } else if (step === 1) {
        console.log("Updated profile data:", formData);
        const gymInfo = await callApi<any>({
          query: completeProfile(formData),
          auth: { setAuthedUser },
        });
        gymInfo.success === true && setStep(2);
      } else if (step === 2) {
        setStep(3);
      } else {
        navigate("DAMIL-Configurations/Subscription-Plans");
      }
    } catch (err) {
      console.log(err);
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
            {t(
              "Some of your profile information is missing. Please take a moment to complete it."
            )}
          </Typography>
        )}

        {step === 1 && (
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              disabled={true}
              label={t("Email")}
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              fullWidth
            />
            <TextField
              label={t("Username")}
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
              fullWidth
            />

            <TextField
              label={t("City")}
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              fullWidth
            />
            <TextField
              label={t("Address")}
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              fullWidth
            />
            <TextField
              label={t("Phone")}
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              fullWidth
            />
          </Box>
        )}
        {step === 2 && (
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label={t("Currency")}
              type="currency"
              value={preferances.currency}
              onChange={(e) =>
                handleChangePreferences("currency", e.target.value)
              }
              fullWidth
            />
            <TextField
              label={t("Language")}
              type="language"
              value={preferances.language}
              onChange={(e) =>
                handleChangePreferences("language", e.target.value)
              }
              fullWidth
            />
          </Box>
        )}
        {step === 3 && (
          <Box
            display="flex"
            flexDirection="column"
            gap={3}
            alignItems="center"
            textAlign="center"
            sx={{
              p: 4,
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            <Typography variant="h4" fontWeight="bold" color="primary">
              {t("Almost there!")}
            </Typography>

            <Typography variant="body1" sx={{ maxWidth: 500 }}>
              {t(
                "Your profile and preferences are set. The last step is to set up your subscription plans so members can start joining!"
              )}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {t(
                "Choose the types of passes, prices, and details that will best fit your members’ needs."
              )}
            </Typography>
          </Box>
        )}

        <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
          {step === 0 && (
            <Button onClick={() => snoozeModal(60)} color="error">
              {t("Remind Me Later")}
            </Button>
          )}
          <Button onClick={handleNext} color="primary">
            {step === 0
              ? t("Next")
              : step === 1 || step === 2
                ? t("Save & Next")
                : t("Set Plans")}
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default IncompleteProfileModal;
