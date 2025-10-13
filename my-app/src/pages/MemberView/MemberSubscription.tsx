import { useState } from "react";
import { Box, Typography, MenuItem, useTheme, Divider } from "@mui/material";
import Button from "../../components/MaterialUI/Button";
import TextField from "../../components/MaterialUI/FormFields/TextField";
import { useLanguageContext } from "../../context/LanguageContext";

const MemberSubscription = () => {
  const theme = useTheme();

  const { t } = useLanguageContext();
  const [currentSubscription, setCurrentSubscription] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [employmentStatus, setEmploymentStatus] = useState<string>("");

  const handlePurchase = () => {
    if (!selectedPlan || !employmentStatus) {
      alert("Please select both a plan and your employment status.");
      return;
    }

    setCurrentSubscription({
      type: selectedPlan,
      employment: employmentStatus,
      startDate: new Date().toISOString(),
      expiresOn:
        selectedPlan === "Monthly"
          ? "2025-11-10"
          : selectedPlan === "Annual"
          ? "2026-10-10"
          : "2025-12-10",
    });
  };

  return (
    <Box
      sx={{
        height: "100dvh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: theme.palette.text.primary,
        p: { xs: 2, sm: 4 },
      }}
    >
      {currentSubscription ? (
        <>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
            {t("Your Current Subscription")}
          </Typography>
          <Box
            sx={{
              px: 4,
              py: 3,
              maxWidth: 600,
              width: "100%",
              textAlign: "left",
            }}
          >
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>{t("Type")}:</strong> {currentSubscription.type}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>{t("Employment")}:</strong>{" "}
              {currentSubscription.employment}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>{t("Start Date")}:</strong>{" "}
              {new Date(currentSubscription.startDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">
              <strong>{t("Expires On")}:</strong>{" "}
              {currentSubscription.expiresOn}
            </Typography>
            <Divider sx={{ my: 3 }} />
            <Button color="error" onClick={() => setCurrentSubscription(null)}>
              {t("Cancel Subscription")}
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography
            variant="h4"
            sx={{ mb: 2, fontWeight: 600, color: theme.palette.primary.main }}
          >
            {t("Purchase a Subscription")}
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, maxWidth: 600, color: theme.palette.text.secondary }}
          >
            {t("Choose your plan type and employment status to continue.")}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: "100%",
              maxWidth: 400,
            }}
          >
            <TextField
              select
              label={t("Plan Type")}
              onChange={(e) => {
                setSelectedPlan(e.target.value);
              }}
            >
              {["Monthly", "Quarterly", "Annual"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label={t("Employment Status")}
              onChange={(e) => {
                setEmploymentStatus(e.target.value);
              }}
            >
              {["Regular", "Student", "Handicap", "Senior"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <Button
              color="primary"
              size="large"
              sx={{
                borderRadius: 2,
                py: 1.2,
                fontWeight: 600,
                fontSize: "1rem",
              }}
              onClick={handlePurchase}
            >
              {t("Confirm & Buy")}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default MemberSubscription;
