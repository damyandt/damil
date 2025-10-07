import {
  Box,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import { useAuthedContext } from "../../../context/AuthContext";
import CustomModal from "../../MaterialUI/Modal";
import Button from "../../MaterialUI/Button";
import TextField from "../../MaterialUI/FormFields/TextField";
import { useState } from "react";
import {
  savePreferences,
  updateProfile,
} from "../../../pages/usersPages/api/postQuery";
import callApi from "../../../API/callApi";
import { useLanguageContext } from "../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { User } from "../../../pages/usersPages/userTypes";
import Checkbox from "../../MaterialUI/FormFields/Checkbox";
import { useCustomThemeProviderContext } from "../../../context/ThemeContext";
import { PreferencesType, Response } from "../../../Global/Types/commonTypes";
import DatePickerComponent from "../../MaterialUI/FormFields/DatePicker";
import dayjs from "dayjs";
import Alert from "../../MaterialUI/Alert";

const IncompleteProfileModal = () => {
  const {
    showIncompleteModal,
    snoozeModal,
    authedUser,
    setAuthedUser,
    preferences,
    setRefreshUserData,
  } = useAuthedContext();
  const { themeMode, setThemeMode, setPrimaryColor, primaryColor } =
    useCustomThemeProviderContext();
  const { t } = useLanguageContext();
  const [step, setStep] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Partial<User>>(
    // authedUser
    {
      username: authedUser?.username || "",
      firstName: authedUser?.firstName || "",
      lastName: authedUser?.lastName || "",
      city: authedUser?.city || "",
      phone: authedUser?.phone || "",
      address: authedUser?.address || "",
      email: authedUser?.email || "",
      gender: authedUser?.gender || "",
      birthDate: authedUser?.birthDate ? dayjs(authedUser.birthDate) : dayjs(),
    }
  );
  const [preferancesData, setPreferencesData] = useState<PreferencesType>(
    preferences
    //   {
    //   currency: preferences.currency || "",
    //   language: preferences.language || "",
    //   mode: preferences.mode || "",
    //   themeColor: preferences.themeColor || "",
    //   homeFilters: preferences.homeFilters || [],
    // }
  );
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
        Object.values(formData).map(
          (val) => (!val || val === "") && console.error(val)
        );
        console.error(isFormDataIncomplete);

        if (!isFormDataIncomplete) {
          setStep(2);
        } else {
          setStep(1);
        }
      } else if (step === 1) {
        const changes: Record<string, any> = {};

        // Compare formData and authedUser to get only changed fields
        for (const key in formData) {
          if (formData[key as keyof User] !== authedUser[key as keyof User]) {
            changes[key] = formData[key as keyof User];
          }
        }

        if (Object.keys(changes).length === 0) {
          return;
        }

        const info = await callApi<Response<any>>({
          query: updateProfile(changes),
          auth: { setAuthedUser },
        });
        info.success === true && setStep(2);
        info.success === true && setErrors({});
        info.success === true && setRefreshUserData(true);
        info.success === false && setErrors(info.validationErrors || {});
      } else if (step === 2) {
        const preferencesInfo = await callApi<any>({
          query: savePreferences(preferancesData),
          auth: { setAuthedUser },
        });

        preferencesInfo.mode &&
          localStorage.setItem("themeMode", preferancesData.mode);
        preferencesInfo.themeColor &&
          localStorage.setItem("themeColor", preferancesData.themeColor);
        preferencesInfo.success === true && setStep(3);
        preferencesInfo.success === true && setRefreshUserData(true);
      } else {
        navigate("DAMIL-Configurations/Member-Plans");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CustomModal
      open={showIncompleteModal}
      onClose={() => snoozeModal(60)}
      title="👋 Complete Your Profile"
      // width={"lg"}
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
          <Grid container spacing={2}>
            {/* Email */}

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                disabled
                label={t("Email")}
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                fullWidth
              />
            </Grid>

            {/* First Name */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                label={t("First Name")}
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                fullWidth
              />
            </Grid>

            {/* Last Name */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                label={t("Last Name")}
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                fullWidth
              />
            </Grid>

            {/* Username */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                label={t("Username")}
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
                fullWidth
              />
            </Grid>

            {/* City */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                label={t("City")}
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                fullWidth
              />
            </Grid>

            {/* Address */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                label={t("Address")}
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                fullWidth
              />
            </Grid>

            {/* Phone */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                label={t("Phone")}
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <DatePickerComponent
                sx={{ width: "100%", margin: 0 }}
                label={t("Birthday")}
                value={dayjs(formData.birthDate)}
                onChange={(newValue: any) =>
                  handleChange("birthDate", newValue)
                }
              />
            </Grid>

            {/* Gender */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                select
                fullWidth
                label={t("Gender")}
                onChange={(e) => handleChange("gender", e.target.value)}
                value={formData.gender}
              >
                {[
                  { title: "Male", value: "MALE" },
                  { title: "Female", value: "FEMALE" },
                ].map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.title}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        )}
        {step === 2 && (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <TextField
                select
                label={t("Currency")}
                type="currency"
                value={preferancesData.currency}
                onChange={(e) =>
                  handleChangePreferences("currency", e.target.value)
                }
                fullWidth
              >
                {[
                  { title: "BGN", value: "BGN" },
                  { title: "EUR", value: "EUR" },
                ].map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.title}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <TextField
                select
                label={t("Language")}
                type="language"
                value={preferancesData.language}
                onChange={(e) =>
                  handleChangePreferences("language", e.target.value)
                }
                fullWidth
              >
                {[
                  { title: "BG", value: "bg" },
                  { title: "EN", value: "en" },
                ].map((lang) => (
                  <MenuItem key={lang.value} value={lang.value}>
                    {lang.title}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
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
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  {t("Primary App Color")}
                </FormLabel>
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
            </Grid>
          </Grid>
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
        <Box sx={{ mt: 2 }}>
          <Alert
            message={Object.values(errors)[0]}
            showAlert={errors && Object.keys(errors).length > 0}
            severity="error"
          />
        </Box>

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
