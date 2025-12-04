import { useEffect, useState } from "react";
import { Box, Typography, MenuItem, useTheme, Divider } from "@mui/material";
import Button from "../../components/MaterialUI/Button";
import { useLanguageContext } from "../../context/LanguageContext";
import { useAuthedContext } from "../../context/AuthContext";
import callApi from "../../API/callApi";
import { Enum, EnumMap, Response } from "../../Global/Types/commonTypes";
import { getBuyMemberSubscription } from "./API/getQueries";
import TextField from "../../components/MaterialUI/FormFields/TextField";
import { useSnackbarContext } from "../../context/SnackbarContext";
import { getPrice, getQueryOptions } from "../Access Control/API/getQueries";

const MemberSubscription = () => {
  const theme = useTheme();
  const { authedUser, setAuthedUser, tenant, preferences } = useAuthedContext();
  const { addMessage } = useSnackbarContext();
  const { t } = useLanguageContext();
  const [currentSubscription, setCurrentSubscription] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [employmentStatus, setEmploymentStatus] = useState<string>("");
  const [options, setOptions] = useState<EnumMap>({});
  const enumEndpoints = ["memberships", "enums/Employment"];
  useEffect(() => {
    const fetchAllOptions = async () => {
      if (!enumEndpoints) return;

      const optionsMap: EnumMap = {};
      for (const url of enumEndpoints) {
        try {
          const response = await callApi<Response<Enum[]>>({
            query: getQueryOptions(url ?? ""),
            auth: { setAuthedUser },
          });
          optionsMap[url] = response.data;
        } catch (error) {
          console.error("Error fetching options for", url, error);
        }
      }

      setOptions(optionsMap);
    };

    fetchAllOptions();
  }, []);

  const handlePurchase = async () => {
    if (!selectedPlan || !employmentStatus) {
      return;
    }
    let price;
    try {
      const response = await callApi<Response<any>>({
        query: getPrice(selectedPlan, employmentStatus),
        auth: { setAuthedUser },
      });
      price = response.data.price;
    } catch (error) {
      console.error("Error purchasing subscription:", error);
      addMessage(error.message, "error");
    }

    const payload = {
      userId: authedUser.id,
      email: authedUser.email,
      name: `${authedUser.firstName} ${authedUser.lastName}`,
      subscriptionPlan: selectedPlan,
      amount: price * 100,
      currency: preferences.currency || "EUR",
      employment: employmentStatus,
    };
    try {
      const response = await callApi<Response<any>>({
        query: getBuyMemberSubscription(payload, tenant.stripeAccountId),
        auth: { setAuthedUser },
      });
      window.location.href = response.data;
      // console.log(response);
    } catch (error: any) {
      console.error("Subscription purchase failed:", error.message);
      addMessage(error.message, "error");
    }

    // setCurrentSubscription({
    //   type: selectedPlan,
    //   employment: employmentStatus,
    //   startDate: new Date().toISOString(),
    //   expiresOn:
    //     selectedPlan === "Monthly"
    //       ? "2025-11-10"
    //       : selectedPlan === "Annual"
    //       ? "2026-10-10"
    //       : "2025-12-10",
    // });
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
        // textAlign: "center",
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
              fullWidth
              value={selectedPlan}
              label={t("Plan Type")}
              onChange={(e) => {
                setSelectedPlan(e.target.value);
              }}
            >
              {!options["memberships"] ? (
                <MenuItem value="loading">{t("Loading...")}</MenuItem>
              ) : (
                options["memberships"].map(
                  (option: { title: string; value: string | number }) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.title}
                    </MenuItem>
                  )
                )
              )}
            </TextField>
            <TextField
              select
              fullWidth
              value={employmentStatus}
              label={t("Employment Status")}
              onChange={(e) => {
                setEmploymentStatus(e.target.value);
              }}
            >
              {!options["enums/Employment"] ? (
                <MenuItem value="loading">{t("Loading...")}</MenuItem>
              ) : (
                options["enums/Employment"].map(
                  (option: { title: string; value: string | number }) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.title}
                    </MenuItem>
                  )
                )
              )}
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
