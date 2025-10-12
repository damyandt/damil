import { Box, Grid, useTheme } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "../../components/MaterialUI/FormFields/TextField";
import { useLanguageContext } from "../../context/LanguageContext";
import { useState } from "react";
import { Dayjs } from "dayjs";
import { IconButton, MenuItem } from "@mui/material";
import DatePickerComponent from "../../components/MaterialUI/FormFields/DatePicker";
import Button from "../../components/MaterialUI/Button";
import CustomTooltip from "../../components/MaterialUI/CustomTooltip";
import { LanguageOutlined } from "@mui/icons-material";

const SelfAddingPage = () => {
  const { id } = useParams();
  const theme = useTheme();
  const { t, language, setLanguage } = useLanguageContext();
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const handleChange = (
    field: string,
    value: string | number | Dayjs | null
  ): void => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev: any) => ({
      ...prev,
      [field]: "",
    }));
  };
  return (
    <>
      <CustomTooltip
        title={
          language === "bg" ? "Превключи на Английски" : "Switch to Bulgarian"
        }
        placement="left"
        sx={{ zIndex: 100, position: "absolute", top: 0, right: 0, m: 3 }}
      >
        <IconButton
          onClick={() => setLanguage(language === "bg" ? "en" : "bg")}
        >
          <LanguageOutlined />
        </IconButton>
      </CustomTooltip>
      <Box
        sx={{
          p: 4,
          overflow: "hidden",
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: theme.palette.customColors?.darkBackgroundColor,
        }}
      >
        <Box
          sx={{
            width: "100%",
            alignContent: "center",
            textAlign: "center",
            display: { xs: "block", sm: "none" },
          }}
        >
          <img
            src="/damil-logo.png"
            alt="Damil Logo"
            style={{
              width: 100,
              height: "auto",
              margin: 16,
            }}
          />
        </Box>
        {t("Request Access to")} {id}
        <Grid container spacing={2} p={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label={t("First Name")}
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              error={!!errors["firstName"]}
              helperText={errors["firstName"]}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label={t("Last Name")}
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              error={!!errors["lastName"]}
              helperText={errors["lastName"]}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label={t("Email")}
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={!!errors["email"]}
              helperText={errors["email"]}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label={t("Phone")}
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              error={!!errors["phone"]}
              helperText={errors["phone"]}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <DatePickerComponent
              sx={{ width: "100%", margin: 0 }}
              label={t("Birth Date")}
              value={formData.birthDate}
              onChange={(newValue: Dayjs | null) =>
                handleChange("birthDate", newValue)
              }
              error={!!errors["birthDate"]}
              helperText={errors["birthDate"]}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              label={t("Gender")}
              value={formData.gender || ""}
              onChange={(e) => handleChange("gender", e.target.value)}
              error={!!errors["gender"]}
              helperText={errors["gender"]}
              fullWidth
            >
              {/* {!options["gender"] ? (
              <MenuItem value="loading">{t("Loading...")}</MenuItem>
            ) : ( */}
              {[
                { title: t("Male"), value: "MALE" },
                { title: t("Female"), value: "FEMALE" },
              ].map((option: { title: string; value: string | number }) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.title}
                </MenuItem>
              ))}
              {/* )} */}
            </TextField>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          p={2}
          display={"flex"}
          width={"100%"}
          justifyContent={"flex-end"}
          alignItems={"flex-end"}
        >
          <Grid>
            <Button color="error" onClick={() => navigate("/?step=3")}>
              {t("Back")}
            </Button>
          </Grid>
          <Grid>
            <Button
              color="primary"
              onClick={() => console.warn("soon", formData)}
            >
              {t("Send")}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SelfAddingPage;
