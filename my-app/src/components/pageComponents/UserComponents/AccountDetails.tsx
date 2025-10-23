import { Box, Grid, IconButton, MenuItem, Typography } from "@mui/material";
import CustomTooltip from "../../MaterialUI/CustomTooltip";
import TextField from "../../MaterialUI/FormFields/TextField";
import { useLanguageContext } from "../../../context/LanguageContext";
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import callApi from "../../../API/callApi";
import { updateProfile } from "../../../pages/usersPages/api/postQueries";
import { Response } from "../../../Global/Types/commonTypes";
import { useAuthedContext } from "../../../context/AuthContext";
import { Fade } from "../../MaterialUI/FormFields/Fade";
import { useNavigate } from "react-router-dom";
import { useNavigationGuard } from "../../../context/UnsavedChangesProvider";
import { User } from "../../../pages/usersPages/api/userTypes";

const AccountDetails = () => {
  const { t } = useLanguageContext();
  const { setAuthedUser, authedUser, setRefreshUserData } = useAuthedContext();
  const [saved, setSaved] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<User>>(authedUser);
  const navigate = useNavigate();
  const { setHasUnsavedChanges } = useNavigationGuard();
  const info: { label: string; field: string }[] = [
    { label: t("First Name"), field: "firstName" },
    { label: t("Last Name"), field: "lastName" },
    { label: t("Email and Password"), field: "email" },
    { label: t("Username"), field: "username" },
    { label: t("City"), field: "city" },
    { label: t("Phone"), field: "phone" },
    { label: t("Address"), field: "address" },
    { label: t("Gender"), field: "gender" },
  ];
  const handleSaveChanges = async () => {
    const changes: Record<string, any> = {};

    for (const key in formData) {
      if (key === "roles") continue;
      if (formData[key as keyof User] !== authedUser[key as keyof User]) {
        changes[key] = formData[key as keyof User];
      }
    }

    if (Object.keys(changes).length === 0) {
      setEditMode(false);
      return;
    }

    await callApi<Response<any>>({
      query: updateProfile(changes),
      auth: { setAuthedUser },
    });

    setEditMode(false);
    setHasUnsavedChanges(false);
    setSaved(true);
    setRefreshUserData((prev: boolean) => !prev);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleChange = (field: any, value: any): void => {
    setFormData((prev: Partial<User>) => ({
      ...prev,
      [field]: value,
    }));
    setHasUnsavedChanges(true);
  };

  return (
    <Box>
      <Box
        component={"div"}
        display={"flex"}
        mb={2.8}
        sx={{ alignItems: "center", cursor: "default" }}
        gap={2}
      >
        <Typography variant="h4" gutterBottom alignSelf={"center"} margin={0}>
          {t("Account Info")}
        </Typography>
        <CustomTooltip title={editMode ? t("Save") : t("Edit")} placement="top">
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
        <Fade in={saved}>
          <IconButton sx={{ cursor: "default" }}>
            <DoneIcon fontSize="small" color="success" />
          </IconButton>
        </Fade>
      </Box>

      <Box
        sx={{
          minHeight: 200,
        }}
      >
        {/* {editMode ? ( */}
        <Grid container spacing={2}>
          {info.map((col) => (
            <Grid size={{ xs: 12, sm: 6 }} key={col.field}>
              {col.label === "Email and Password" ? (
                <Box display="flex" alignItems="center" gap={1}>
                  <TextField
                    disabled
                    fullWidth
                    label={t("Email and Password")}
                    value={`${formData?.email || ""} - ********`}
                  />
                  <CustomTooltip
                    title={t("Change Email/Password")}
                    placement="top"
                  >
                    <IconButton
                      onClick={() => navigate("/account/change-credentials")}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </CustomTooltip>
                </Box>
              ) : col.label === t("Gender") ? (
                <TextField
                  select
                  fullWidth
                  label={col.label}
                  disabled={!editMode}
                  onChange={(e: any) => handleChange(col.field, e.target.value)}
                  value={formData ? formData[col.field as keyof User] : ""}
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
              ) : (
                <TextField
                  fullWidth
                  label={col.label}
                  disabled={!editMode}
                  onChange={(e: any) => handleChange(col.field, e.target.value)}
                  value={formData ? formData[col.field as keyof User] : ""}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AccountDetails;
