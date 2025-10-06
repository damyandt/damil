import {
  Box,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Typography,
} from "@mui/material";
import CustomTooltip from "../../MaterialUI/CustomTooltip";
import SaveIcon from "@mui/icons-material/Save";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "../../MaterialUI/FormFields/TextField";
import { useLanguageContext } from "../../../context/LanguageContext";
import { useState } from "react";
import { Fade } from "../../MaterialUI/FormFields/Fade";
import Checkbox from "../../MaterialUI/FormFields/Checkbox";
import callApi from "../../../API/callApi";
import { savePreferences } from "../../../pages/usersPages/api/postQuery";
import { PreferencesType, Response } from "../../../Global/Types/commonTypes";
import { useAuthedContext } from "../../../context/AuthContext";
import { useCustomThemeProviderContext } from "../../../context/ThemeContext";
const PreferencesDetails = () => {
  const { setAuthedUser, preferences, setRefreshUserData } = useAuthedContext();
  const { t, setLanguage } = useLanguageContext();
  const { themeMode, setThemeMode, setPrimaryColor, primaryColor } =
    useCustomThemeProviderContext();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>(preferences);

  const colorOptions: { name: string; color: string }[] = [
    { name: "purple", color: "#a250fa" },
    { name: "sky", color: "#0EA5E9" },
    { name: "emerald", color: "#10B981" },
    { name: "amber", color: "#F59E0B" },
    { name: "rose", color: "#F43F5E" },
  ];

  const handleSaveChangesAccount = async () => {
    const accountData = {
      language: formData.language,
      currency: formData.currency,
    };

    await callApi<Response<any>>({
      query: savePreferences(accountData),
      auth: { setAuthedUser },
    });
    setRefreshUserData((prev: boolean) => !prev);
    setEditMode(false);
  };

  const handleChange = (field: string | number, value: string): void => {
    field === "language" && setLanguage(value);
    setFormData((prev: PreferencesType) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChangesTheme = async () => {
    const themeData = {
      themeColor: formData.themeColor,
      mode: formData.mode,
    };

    await callApi<Response<any>>({
      query: savePreferences(themeData),
      auth: { setAuthedUser },
    });
    localStorage.setItem("themeMode", formData.mode);
    localStorage.setItem("themeColor", formData.themeColor);
    setRefreshUserData((prev: boolean) => !prev);
    setSaved(true);

    setTimeout(() => setSaved(false), 2000);
  };
  return (
    <Grid container spacing={2} width={"100%"}>
      <Grid size={12} display={"flex"} gap={2}>
        <Typography variant="h4" gutterBottom alignSelf={"center"}>
          {t("Account Preferences")}
        </Typography>
        <CustomTooltip
          title={editMode ? t("Save") : t("Edit")}
          placement="right"
        >
          {editMode ? (
            <IconButton onClick={() => handleSaveChangesAccount()}>
              <SaveIcon fontSize="small" />
            </IconButton>
          ) : (
            <IconButton onClick={() => setEditMode((prev: boolean) => !prev)}>
              <EditIcon fontSize="small" />
            </IconButton>
          )}
        </CustomTooltip>
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          select
          disabled={!editMode}
          fullWidth
          label={t("Currency")}
          onChange={(e: any) => handleChange("currency", e.target.value)}
          value={formData ? formData["currency"] : ""}
        >
          {[
            { title: "BGN", value: "BGN" },
            { title: "EUR", value: "EUR" },
          ].map((lang) => (
            <MenuItem key={lang.value} value={lang.value}>
              {lang.title}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          select
          disabled={!editMode}
          fullWidth
          label={t("Language")}
          onChange={(e: any) => handleChange("language", e.target.value)}
          value={formData ? formData["language"] : ""}
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

      <Grid size={12} display={"flex"} gap={2}>
        <Typography variant="h4">{t("Color Preferences")}</Typography>

        <CustomTooltip title={t("Save")} placement="left">
          <IconButton onClick={handleSaveChangesTheme}>
            <SaveIcon fontSize="small" />
          </IconButton>
        </CustomTooltip>

        <Fade in={saved}>
          <IconButton sx={{ cursor: "default" }}>
            <DoneIcon fontSize="small" color="success" />
          </IconButton>
        </Fade>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ height: "2em" }}>
            {t("Dark/Light Mode")}
          </FormLabel>
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
                  onChange={() => {
                    setThemeMode(option.mode);
                    handleChange("mode", option.mode);
                  }}
                  sx={{ mt: 1 }}
                />
              </Box>
            ))}
          </FormGroup>
        </FormControl>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ height: "2em" }}>
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
                    setPrimaryColor(option.color);
                    handleChange("themeColor", option.color);
                  }}
                  sx={{ mt: 1 }}
                />
              </Box>
            ))}
          </FormGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default PreferencesDetails;
