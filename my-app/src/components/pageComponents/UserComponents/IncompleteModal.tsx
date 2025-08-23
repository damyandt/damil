import {
  Box,
  FormControl,
  FormGroup,
  FormLabel,
  Typography,
} from "@mui/material";
import { useAuthedContext } from "../../../context/AuthContext";
import CustomModal from "../../MaterialUI/Modal";
import Button from "../../MaterialUI/Button";
import TextField from "../../MaterialUI/FormFields/TextField";
import { useState } from "react";
import {
  completeProfile,
  savePreferences,
} from "../../../pages/usersPages/api/postQuery";
import callApi from "../../../API/callApi";
import { useLanguageContext } from "../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Business } from "../../../pages/usersPages/userTypes";
import Checkbox from "../../MaterialUI/FormFields/Checkbox";
import { useCustomThemeProviderContext } from "../../../context/ThemeContext";
import { PreferencesType, Response } from "../../../Global/Types/commonTypes";

const IncompleteProfileModal = () => {
  const {
    showIncompleteModal,
    snoozeModal,
    authedUser,
    setAuthedUser,
    preferences,
  } = useAuthedContext();
  const { themeMode, setThemeMode, setPrimaryColor, primaryColor } =
    useCustomThemeProviderContext();
  const { t } = useLanguageContext();
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState<Partial<Business>>({
    username: authedUser?.username || "",
    city: authedUser?.city || "",
    phone: authedUser?.phone || "",
    address: authedUser?.address || "",
    email: authedUser?.email || "",
  });
  const [preferancesData, setPreferencesData] = useState<PreferencesType>({
    currency: preferences.currency || "",
    language: preferences.language || "",
    mode: preferences.mode || "",
    themeColor: preferences.themeColor || "",
    homeFilters: preferences.homeFilters || [],
  });
  const navigate = useNavigate();
  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleChangePreferences = (
    field: keyof typeof preferancesData,
    value: string
  ) => {
    setPreferencesData((prev) => ({ ...prev, [field]: value }));
  };
  const colorOptions: { name: string; color: string }[] = [
    { name: "purple", color: "#a250fa" },
    { name: "sky", color: "#0EA5E9" },
    { name: "emerald", color: "#10B981" },
    { name: "amber", color: "#F59E0B" },
    { name: "rose", color: "#F43F5E" },
  ];

  const handleNext = async () => {
    try {
      if (step === 0) {
        const isFormDataIncomplete = Object.values(formData).some(
          (val) => !val || val === ""
        );

        if (!isFormDataIncomplete) {
          setStep(2);
        } else {
          setStep(1);
        }
      } else if (step === 1) {
        console.log("Updated profile data:", formData);
        const info = await callApi<Response<any>>({
          query: completeProfile(formData),
          auth: { setAuthedUser },
        });
        info.success === true && setStep(2);
      } else if (step === 2) {
        const preferencesInfo = await callApi<Response<any>>({
          query: savePreferences(preferancesData),
          auth: { setAuthedUser },
        });

        localStorage.setItem("themeMode", preferancesData.mode);
        localStorage.setItem("themeColor", preferancesData.themeColor);
        preferencesInfo.success === true && setStep(3);
      } else {
        navigate("DAMIL-Configurations/Member-Plans");
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
            {/* <TextField
              label={t("Gym Name")}
              value={formData.gymName}
              onChange={(e) => handleChange("gymName", e.target.value)}
              fullWidth
            /> */}

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
              value={preferancesData.currency}
              onChange={(e) =>
                handleChangePreferences("currency", e.target.value)
              }
              fullWidth
            />
            <TextField
              label={t("Language")}
              type="language"
              value={preferancesData.language}
              onChange={(e) =>
                handleChangePreferences("language", e.target.value)
              }
              fullWidth
            />
            <FormControl component="fieldset">
              <FormLabel component="legend">{t("Dark/Light Mode")}</FormLabel>
              <FormGroup row>
                {[
                  {
                    name: "Light",
                    color: "#f5f5f5",
                    mode: "light",
                  },
                  {
                    name: "Dark",
                    color: "#1e1e1e",
                    mode: "dark",
                  },
                ].map((option: any) => (
                  <Box
                    key={option.name}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    mr={2}
                    mt={2}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "10%",
                        backgroundColor: option.color,
                        border: "2px solid #ccc",
                      }}
                    />
                    <Checkbox
                      checked={themeMode === option.mode}
                      // onChange={() => setThemeMode(option.mode)}
                      onChange={() => {
                        handleChangePreferences("mode", option.mode);
                        setThemeMode(option.mode);
                      }}
                      sx={{ mt: 1 }}
                    />
                  </Box>
                ))}
              </FormGroup>
            </FormControl>

            <FormControl component="fieldset">
              <FormLabel component="legend">{t("Primary App Color")}</FormLabel>
              <FormGroup row>
                {colorOptions.map((option) => (
                  <Box
                    key={option.name}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    mr={2}
                    mt={2}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "10%",
                        backgroundColor: option.color,
                        border: "2px solid #ccc",
                      }}
                    />
                    <Checkbox
                      checked={primaryColor === option.color}
                      onChange={() => {
                        handleChangePreferences("themeColor", option.color);
                        setPrimaryColor(option.color);
                      }}
                      sx={{ mt: 1 }}
                    />
                  </Box>
                ))}
              </FormGroup>
            </FormControl>
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
