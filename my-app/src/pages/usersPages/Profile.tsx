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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import CellRenderer from "../../components/MaterialUI/Table/CellRenderer";
import CustomTooltip from "../../components/MaterialUI/CustomTooltip";
import { useLanguageContext } from "../../context/LanguageContext";
import { useAuthedContext } from "../../context/AuthContext";
import { Gym } from "./userTypes";
import { useCustomThemeProviderContext } from "../../context/ThemeContext";
import PlanCard from "./PlanCard";

const ProfilePage = () => {
  const { t } = useLanguageContext();
  const [editMode, setEditMode] = useState(false);
  const { themeMode, setThemeMode, setPrimaryColor, primaryColor } =
    useCustomThemeProviderContext();
  const { authedUser } = useAuthedContext();
  const info: any = [
    { label: t("Username"), field: "username" },
    { label: t("Email"), field: "email" },
    { label: t("City"), field: "city" },
    { label: t("Phone"), field: "phone" },
  ];

  // Available colors
  const colorOptions = [
    { name: "purple", color: "#a250fa" },
    { name: "sky", color: "#0EA5E9" }, // clean sky blue
    { name: "emerald", color: "#10B981" }, // soft emerald green
    { name: "amber", color: "#F59E0B" }, // warm amber yellow-orange
    { name: "rose", color: "#F43F5E" }, // bright rose red
  ];

  const handleToggleDarkMode = () => {
    setThemeMode((prevThemeMode: PaletteMode) =>
      prevThemeMode === "light" ? "dark" : "light"
    );
  };

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
            <IconButton onClick={() => setEditMode((prev: any) => !prev)}>
              {editMode ? (
                <SaveIcon fontSize="small" />
              ) : (
                <EditIcon fontSize="small" />
              )}
            </IconButton>
          </CustomTooltip>
        </Box>
        {editMode ? (
          <Grid container spacing={2} height={"7em"}>
            {info.map((col: any) => (
              <Grid size={6} key={col.field}>
                <TextField
                  fullWidth
                  label={col.label}
                  value={authedUser ? authedUser[col.field as keyof Gym] : ""}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={2} height={"7em"}>
            {info.map((col: any) => (
              <Grid size={6} key={col.field}>
                <Typography variant="subtitle2" color="text.secondary">
                  {col.label}
                </Typography>
                <CellRenderer
                  fontWeight={400}
                  key={col.field}
                  value={authedUser ? authedUser[col.field as keyof Gym] : ""}
                  dataType={col.type}
                  table={false}
                />
              </Grid>
            ))}
          </Grid>
        )}
        <Grid container spacing={2}>
          <Grid size={12}>
            <Grid container spacing={2} mt={4}>
              <Grid size={12}>
                <Typography variant="h4" gutterBottom>
                  Account Preferences
                </Typography>
              </Grid>
              <Grid size={12}>
                <Box
                  display="flex"
                  alignItems="start"
                  gap={2}
                  flexDirection={"column"}
                >
                  <Box
                    component={"div"}
                    display={"flex"}
                    alignItems={"center"}
                    gap={3}
                  >
                    <Typography variant="body1" sx={{ minWidth: 50 }}>
                      Theme
                    </Typography>

                    <FormControlLabel
                      control={
                        <Switch
                          onChange={() => handleToggleDarkMode()}
                          checked={themeMode === "light" ? false : true}
                        />
                      }
                      label={themeMode === "dark" ? "Dark Mode" : "Light Mode"}
                    />
                  </Box>

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
      <Grid size={6} mt={4}>
        <PlanCard plan={"primary"} />
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
