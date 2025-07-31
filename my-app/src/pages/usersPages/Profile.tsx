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
import CellRenderer from "../../components/MaterialUI/Table/CellRenderer";
import CustomTooltip from "../../components/MaterialUI/CustomTooltip";
import { useLanguageContext } from "../../context/LanguageContext";
import { useAuthedContext } from "../../context/AuthContext";
import { Gym } from "./userTypes";
import { useCustomThemeProviderContext } from "../../context/ThemeContext";

const ProfilePage = () => {
  const { t } = useLanguageContext();
  const [editMode, setEditMode] = useState(false);
  const { themeColor, setThemeColor } = useCustomThemeProviderContext();
  const { authedUser } = useAuthedContext();
  console.log(themeColor);
  //   const data: any = {
  //     username: "Mama",
  //     email: "mama@abv.bg",
  //     city: "Dobrich",
  //     phone: "0899240177",
  //     membersCount: 0,
  //     subscriptionActive: false,
  //   };
  const info: any = [
    { label: "City", field: "city" },
    { label: "Phone", field: "phone" },
    { label: "Email", field: "email" },
    { label: "Subscription", field: "subscriptionActive" },
  ];

  const [selectedColor, setSelectedColor] = useState("green");

  // Available colors
  const colorOptions = [
    { name: "green", color: "#2e7d32" },
    { name: "yellow", color: "#fdd835" },
    { name: "orange", color: "#ef6c00" },
    { name: "red", color: "#d32f2f" },
  ];

  const handleToggleDarkMode = () => {
    setThemeColor((prevThemeColor: PaletteMode) =>
      prevThemeColor === "light" ? "dark" : "light"
    );
  };
  return (
    <Grid container spacing={4} p={4} alignSelf={"center"}>
      <Grid size={12} display="flex" flexDirection="column" alignItems="center">
        <Box position="relative">
          <Avatar src="" sx={{ width: 100, height: 100 }}>
            M
          </Avatar>
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              borderRadius: "50%",
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography variant="h6" sx={{ mt: 2 }}>
          {authedUser?.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {authedUser?.email}
        </Typography>
      </Grid>

      {/* Account Details */}
      <Grid size={12}>
        <Box
          component={"div"}
          display={"flex"}
          //   justifyContent={"center"}
          gap={2}
          mb={2}
        >
          <Typography variant="h6" gutterBottom alignSelf={"center"} margin={0}>
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
          <Grid container spacing={2} height="3em">
            <Grid size={3}>
              <TextField fullWidth label="City" value={authedUser?.city} />
            </Grid>
            <Grid size={3}>
              <TextField fullWidth label="Phone" value={authedUser?.phone} />
            </Grid>
            <Grid size={3}>
              <TextField fullWidth label="Email" value={authedUser?.email} />
            </Grid>
            <Grid size={3}>
              <TextField
                fullWidth
                label="Subscription"
                value={authedUser?.subscriptionActive ? "Active" : "Inactive"}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={2} height="3em">
            {info.map((col: any) => (
              <Grid size={3} key={col.field}>
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

        <Grid container spacing={2} mt={4}>
          <Grid size={12}>
            <Typography variant="h6" gutterBottom>
              Account Preferences
            </Typography>
          </Grid>
          <Grid size={6}>
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
                      checked={themeColor === "light" ? false : true}
                    />
                  }
                  label={themeColor === "dark" ? "Dark Mode" : "Light Mode"}
                />
              </Box>

              <FormControl component="fieldset">
                <FormLabel component="legend">Primary App Color</FormLabel>
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
                        checked={selectedColor === option.name}
                        onChange={() => setSelectedColor(option.name)}
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
  );
};

export default ProfilePage;
