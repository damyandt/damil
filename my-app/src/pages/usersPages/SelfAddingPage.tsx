import { Box, useTheme, Typography, IconButton, MenuItem } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguageContext } from "../../context/LanguageContext";
import { useState } from "react";
import { Dayjs } from "dayjs";
import DatePickerComponent from "../../components/MaterialUI/FormFields/DatePicker";
import TextField from "../../components/MaterialUI/FormFields/TextField";
import Button from "../../components/MaterialUI/Button";
import CustomTooltip from "../../components/MaterialUI/CustomTooltip";
import { LanguageOutlined } from "@mui/icons-material";
import { Grid } from "@mui/system";

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
      {/* 🌐 Language Switch */}
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
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: theme.palette.customColors?.darkBackgroundColor,
          p: { xs: 2, sm: 4 },
        }}
      >
        {/* 🧩 Card Container */}
        <Box
          sx={{
            width: "100%",
            p: { xs: 3, sm: 4 },
            textAlign: "center",
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <img
              src="/damil-logo.png"
              alt="Damil Logo"
              style={{
                width: 80,
                height: "auto",
              }}
            />
          </Box>

          {/* Title */}
          <Typography variant="h5" fontWeight={600} color="primary" mb={1}>
            {t("Request Access")}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" mb={3}>
            {t("to")} {id}
          </Typography>

          {/* 🧾 Form Fields */}
          <Grid container spacing={2}>
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
                sx={{ width: "100%" }}
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
                {[
                  { title: t("Male"), value: "MALE" },
                  { title: t("Female"), value: "FEMALE" },
                ].map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.title}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {/* 📩 Actions */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 4,
            }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={() => navigate("/?step=3")}
            >
              {t("Back")}
            </Button>
            <Button
              color="primary"
              onClick={() => console.warn("soon", formData)}
            >
              {t("Send")}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SelfAddingPage;
