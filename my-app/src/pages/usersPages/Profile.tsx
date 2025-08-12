import { useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Grid,
  TextField,
  Switch,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormControl,
  IconButton,
  FormLabel,
  PaletteMode,
  useTheme,
  // keyframes,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CellRenderer from "../../components/MaterialUI/Table/CellRenderer";
import CustomTooltip from "../../components/MaterialUI/CustomTooltip";
import { useLanguageContext } from "../../context/LanguageContext";
import { useAuthedContext } from "../../context/AuthContext";
import { Gym } from "./userTypes";
import { useCustomThemeProviderContext } from "../../context/ThemeContext";
import PlanCard from "./PlanCard";
import { useNavigate } from "react-router-dom";
import callApi from "../../API/callApi";
import { Response } from "../../Global/Types/commonTypes";
import { completeProfile } from "./api/postQuery";
// const animatedGradient = keyframes`
//   0% {
//     background-position: 0% 50%;
//   }
//   50% {
//     background-position: 100% 50%;
//   }
//   100% {
//     background-position: 0% 50%;
//   }
// `;
const ProfilePage = () => {
  const { t } = useLanguageContext();
  const { authedUser, setAuthedUser } = useAuthedContext();
  const { themeMode, setThemeMode, setPrimaryColor, primaryColor } =
    useCustomThemeProviderContext();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState<Gym | null>(authedUser);
  const info: { label: string; field: string }[] = [
    { label: t("Gym Name"), field: "gymName" },
    { label: t("Email"), field: "email" },
    { label: t("Username"), field: "username" },
    { label: t("City"), field: "city" },
    { label: t("Phone"), field: "phone" },
    { label: t("Address"), field: "address" },
  ];

  const colorOptions: { name: string; color: string }[] = [
    { name: "purple", color: "#a250fa" },
    { name: "sky", color: "#0EA5E9" },
    { name: "emerald", color: "#10B981" },
    { name: "amber", color: "#F59E0B" },
    { name: "rose", color: "#F43F5E" },
  ];

  const handleSaveChanges = async () => {
    await callApi<Response<any>>({
      query: completeProfile(formData),
      auth: { setAuthedUser },
    });
    setEditMode(false);
  };

  const handleChange = (field: string, value: string): void => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };
  const theme = useTheme();
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <Grid container spacing={4} p={4} alignSelf={"center"}>
      <Grid size={12} display="flex" flexDirection="column" alignItems="center">
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
      <Grid size={6}>
        <Box component={"div"} display={"flex"} gap={2} mb={2}>
          <Typography variant="h4" gutterBottom alignSelf={"center"} margin={0}>
            Account Details
          </Typography>
          <CustomTooltip
            title={editMode ? t("Save") : t("Edit")}
            placement="right"
          >
            {editMode ? (
              <IconButton onClick={() => handleSaveChanges()}>
                <SaveIcon fontSize="small" />
              </IconButton>
            ) : (
              <IconButton onClick={() => setEditMode((prev: boolean) => !prev)}>
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          </CustomTooltip>
        </Box>
        <Box sx={{ minHeight: 200 }}>
          {editMode ? (
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
                    value={formData ? formData[col.field as keyof Gym] : ""}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={3}>
              {info.map((col: { label: string; field: string }) => (
                <Grid size={6} key={col.field}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {col.label}
                  </Typography>
                  <CellRenderer
                    fontWeight={400}
                    key={col.field}
                    value={formData ? formData[col.field as keyof Gym] : ""}
                    dataType={"string"}
                    table={false}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Grid container spacing={2} mt={4}>
              <Grid size={12} display={"flex"} justifyContent={"space-between"}>
                <Typography variant="h4">Account Preferences</Typography>
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
                            onChange={() => setThemeMode(option.mode)}
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
                            onChange={() => setPrimaryColor(option.color)}
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
      </Grid>
      <Grid size={6} justifyContent={"center"} display={"flex"}>
        {/* <Typography
          variant="body1"
          sx={{
            width: "40%",
            alignSelf: "center",
            justifyContent: "center",
            cursor: "pointer",
            // position: "absolute",
            // marginTop: "-40px",
            fontWeight: 700,
            display: "flex",
            // alignItems: "center",
            background: `linear-gradient(90deg, #a250fa, #0EA5E9, #10B981, #F59E0B, #F43F5E)`,
            backgroundSize: "300% 300%",
            animation: `${animatedGradient} 3s ease infinite`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "translateX(4px)",
            },
          }}
          onClick={() => navigate("/Plans")}
        >
          See all plans <ArrowForwardIcon sx={{ ml: 1, fontSize: 20 }} />
        </Typography> */}
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
