import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Grid,
  TextField,
  Checkbox,
  FormGroup,
  FormControl,
  IconButton,
  FormLabel,
  useTheme,
  Tabs,
  Tab,
  Slide,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DoneIcon from "@mui/icons-material/Done";
import CellRenderer from "../../components/MaterialUI/Table/CellRenderer";
import CustomTooltip from "../../components/MaterialUI/CustomTooltip";
import { useLanguageContext } from "../../context/LanguageContext";
import { useAuthedContext } from "../../context/AuthContext";
import { User } from "./userTypes";
import { useCustomThemeProviderContext } from "../../context/ThemeContext";
import PlanCard from "./PlanCard";
import callApi from "../../API/callApi";
import { PreferencesType, Response } from "../../Global/Types/commonTypes";
import { savePreferences, updateProfile } from "./api/postQuery";
import { Fade } from "../../components/MaterialUI/FormFields/Fade";
const ProfilePage = () => {
  const { t, setLanguage } = useLanguageContext();
  const theme = useTheme();
  const { authedUser, setAuthedUser, preferences } = useAuthedContext();
  const { themeMode, setThemeMode, setPrimaryColor, primaryColor } =
    useCustomThemeProviderContext();
  const [editModeAccountInfo, setEditModeAccountInfo] =
    useState<boolean>(false);
  const [editModeAccount, setEditModeAccount] = useState<boolean>(false);
  const [formData, setFormData] = useState<User>(authedUser);
  const [preferencesData, setPreferencesData] =
    useState<PreferencesType>(preferences);
  const [hovered, setHovered] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [slideIn, setSlideIn] = useState<boolean>(true);
  const [saved, setSaved] = useState(false);

  const info: { label: string; field: string }[] = [
    { label: t("Email"), field: "email" },
    { label: t("Username"), field: "username" },
    { label: t("City"), field: "city" },
    { label: t("Phone"), field: "phone" },
    { label: t("Address"), field: "address" },
  ];

  const preferencesInfo: { label: string; field: string | number }[] = [
    { label: t("Currency"), field: "currency" },
    { label: t("Language"), field: "language" },
  ];

  const colorOptions: { name: string; color: string }[] = [
    { name: "purple", color: "#a250fa" },
    { name: "sky", color: "#0EA5E9" },
    { name: "emerald", color: "#10B981" },
    { name: "amber", color: "#F59E0B" },
    { name: "rose", color: "#F43F5E" },
  ];

  const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
    e.preventDefault();
    setSlideIn(false);

    setTimeout(() => {
      setSelectedTab(newValue);
      setSlideIn(true);
    }, 200);
  };

  const handleSaveChanges = async () => {
    const changes: Record<
      string,
      string | number | boolean | Date | undefined
    > = {};

    // Compare formData and authedUser to get only changed fields
    for (const key in formData) {
      if (formData[key as keyof User] !== authedUser[key as keyof User]) {
        changes[key] = formData[key as keyof User];
      }
    }

    if (Object.keys(changes).length === 0) {
      console.log("No changes to update.");
      setEditModeAccountInfo(false);
      return;
    }

    await callApi<Response<any>>({
      query: updateProfile(changes, authedUser.id || ""), // ✅ only send changed fields
      auth: { setAuthedUser },
    });

    setEditModeAccountInfo(false);
  };

  const handleSaveChangesTheme = async () => {
    const themeData = {
      themeColor: preferencesData.themeColor,
      mode: preferencesData.mode,
    };

    await callApi<Response<any>>({
      query: savePreferences(themeData),
      auth: { setAuthedUser },
    });
    localStorage.setItem("themeMode", preferencesData.mode);
    localStorage.setItem("themeColor", preferencesData.themeColor);
    setSaved(true);

    setTimeout(() => setSaved(false), 2000);
  };
  const handleSaveChangesAccount = async () => {
    const accountData = {
      language: preferencesData.language,
      currency: preferencesData.currency,
    };

    await callApi<Response<any>>({
      query: savePreferences(accountData),
      auth: { setAuthedUser },
    });

    setEditModeAccount(false);
  };

  const handleChange = (
    field: string | number,
    value: string | number
  ): void => {
    setFormData((prev: User) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleChangePreferences = (
    field: string | number,
    value: string
  ): void => {
    field === "language" && setLanguage(value);
    setPreferencesData((prev: PreferencesType) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <Grid container spacing={4} p={2} alignSelf={"center"}>
      <Grid
        size={12}
        display="flex"
        flexDirection="column"
        alignItems="center"
        height={"11em"}
        overflow={"hidden"}
      >
        <Box
          position="relative"
          sx={{ width: 100, height: 100 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Avatar
            src=""
            sx={{
              width: "100%",
              height: "100%",
              filter: hovered ? "blur(1.5px)" : "none",
              transition: "filter 0.3s ease",
            }}
          >
            M
          </Avatar>
          {hovered && (
            <Box
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                bgcolor: "rgba(36, 36, 36, 0.85)",
                borderRadius: "50%",
                transition: "all 0.3s ease",
              }}
            >
              <Box display="flex" gap={1}>
                <IconButton size="small" sx={{ color: "#fff" }}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>
        <Typography variant="h4" sx={{ mt: 2 }}>
          {authedUser?.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {authedUser?.email}
        </Typography>
      </Grid>
      <Grid size={6} p={2} overflow={"scroll"}>
        <Tabs value={selectedTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label={t("Account Details")} />
          <Tab label={t("Preferences")} />
          <Tab label={t("Bussiness Details")} />
        </Tabs>
        <Slide
          direction={selectedTab === 0 ? "right" : "left"}
          in={slideIn}
          timeout={600}
          mountOnEnter
          unmountOnExit
        >
          <Box key={selectedTab}>
            {selectedTab === 0 && (
              <Box>
                <Box component={"div"} display={"flex"} gap={2} mb={2}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    alignSelf={"center"}
                    margin={0}
                  >
                    {t("Account Info")}
                  </Typography>
                  <CustomTooltip
                    title={editModeAccountInfo ? t("Save") : t("Edit")}
                    placement="right"
                  >
                    {editModeAccountInfo ? (
                      <IconButton onClick={() => handleSaveChanges()}>
                        <SaveIcon fontSize="small" />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() =>
                          setEditModeAccountInfo((prev: boolean) => !prev)
                        }
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    )}
                  </CustomTooltip>
                </Box>

                <Box
                  sx={{
                    minHeight: 200,
                  }}
                >
                  {editModeAccountInfo ? (
                    <Grid container spacing={2}>
                      {info.map((col: { label: string; field: string }) => (
                        <Grid size={6} key={col.field}>
                          <TextField
                            disabled={col.label === "Email"}
                            fullWidth
                            label={col.label}
                            onChange={(e: any) =>
                              handleChange(col.field, e.target.value)
                            }
                            value={
                              formData ? formData[col.field as keyof User] : ""
                            }
                          />
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Grid container spacing={3}>
                      {info.map((col: { label: string; field: string }) => (
                        <Grid size={6} key={col.field}>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            {col.label}
                          </Typography>
                          <CellRenderer
                            fontWeight={400}
                            key={col.field}
                            value={
                              formData ? formData[col.field as keyof User] : ""
                            }
                            dataType={"string"}
                            table={false}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Box>
              </Box>
            )}
            {selectedTab === 1 && (
              <Box>
                <Box component={"div"} display={"flex"} gap={2} mb={2}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    alignSelf={"center"}
                    margin={0}
                  >
                    Account Preferences
                  </Typography>
                  <CustomTooltip
                    title={editModeAccount ? t("Save") : t("Edit")}
                    placement="right"
                  >
                    {editModeAccount ? (
                      <IconButton onClick={() => handleSaveChangesAccount()}>
                        <SaveIcon fontSize="small" />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() =>
                          setEditModeAccount((prev: boolean) => !prev)
                        }
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    )}
                  </CustomTooltip>
                </Box>
                <Box sx={{ minHeight: 66 }}>
                  {editModeAccount ? (
                    <Grid container spacing={2}>
                      <Grid size={6}>
                        <TextField
                          fullWidth
                          label={t("Currency")}
                          onChange={(e: any) =>
                            handleChangePreferences("currency", e.target.value)
                          }
                          value={
                            preferencesData ? preferencesData["currency"] : ""
                          }
                        />
                      </Grid>
                      <Grid size={6}>
                        <TextField
                          select
                          fullWidth
                          label={t("Language")}
                          onChange={(e: any) =>
                            handleChangePreferences("language", e.target.value)
                          }
                          value={
                            preferencesData ? preferencesData["language"] : ""
                          }
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
                    </Grid>
                  ) : (
                    <Grid container spacing={3}>
                      {preferencesInfo.map(
                        (col: { label: string; field: string | number }) => (
                          <Grid size={6} key={col.field}>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                            >
                              {col.label}
                            </Typography>
                            <CellRenderer
                              fontWeight={400}
                              key={col.field}
                              value={
                                preferencesData
                                  ? preferencesData[
                                      col.field as keyof PreferencesType
                                    ]
                                  : ""
                              }
                              dataType={"string"}
                              table={false}
                            />
                          </Grid>
                        )
                      )}
                    </Grid>
                  )}
                </Box>
                <Grid container spacing={2}>
                  <Grid size={12}>
                    <Grid container spacing={2} mt={4}>
                      <Grid
                        size={12}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Box
                          component={"div"}
                          display={"flex"}
                          mb={2.8}
                          sx={{ alignItems: "center", cursor: "default" }}
                          gap={2}
                        >
                          <Typography variant="h4">
                            Color Preferences
                          </Typography>

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
                        </Box>
                      </Grid>
                      <Grid size={12}>
                        <Box display="flex" justifyContent={"space-between"}>
                          <FormControl component="fieldset">
                            <FormLabel component="legend">
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
                                      handleChangePreferences(
                                        "mode",
                                        option.mode
                                      );
                                    }}
                                    sx={{ mt: 1 }}
                                  />
                                </Box>
                              ))}
                            </FormGroup>
                          </FormControl>

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
                                      setPrimaryColor(option.color);
                                      handleChangePreferences(
                                        "themeColor",
                                        option.color
                                      );
                                    }}
                                    sx={{ mt: 1 }}
                                  />
                                </Box>
                              ))}
                            </FormGroup>
                          </FormControl>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        </Slide>
      </Grid>
      <Grid size={6} justifyContent={"center"} display={"flex"}>
        <Box minWidth={"60%"}>
          <PlanCard
            plan={{
              name: "Standart",
              price: "$15",
              priceYear: "$165",
              description: "Ideal for individual creators.",
              color: theme.palette.primary.main,
              features: [
                "Everything in Basic",
                "250GB of song storage",
                "250GB of asset storage",
                "2 collaborators",
                "Password protection",
              ],
              buttonText: "Standart",
              active: true,
            }}
            period="monthly"
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
