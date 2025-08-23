import React, { useState } from "react";
import {
  alpha,
  Box,
  Button,
  darken,
  Grid,
  lighten,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAuthedContext } from "../../context/AuthContext";
import ChartDisplay from "./ChartsDisplayed";
import CheckInModal from "./CheckInModal";
import IncompleteProfileModal from "../../components/pageComponents/UserComponents/IncompleteModal";
import SearchModal from "./SearchModal";
import tinycolor from "tinycolor2";
import { useLanguageContext } from "../../context/LanguageContext";
import FiltersModal from "./FiltersModal";
import GaugeChartHome from "../Analystics/GuageChart";

export const descriptionMap = (type: string, word: string, t: any) => {
  let final = "";
  switch (type) {
    case "Gender":
      final = `${word} ${t("Members")}`;
      break;
    case "Employment":
      final = `${word} ${t("Members")}`;
      break;
    case "SubscriptionPlan":
      final = `${word} ${t("Plans")}`;
      break;
    case "SubscriptionStatus":
      final = `${word} ${t("Members")}`;
      break;
  }
  return final;
};

export const shiftHue = (color: string, amount: number) =>
  tinycolor(color).spin(amount).toHexString();

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { authedUser, preferences } = useAuthedContext();
  const [openCheckIn, setOpenCheckIn] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<any>(
    preferences.homeFilters ?? [
      "Gender - MALE",
      "SubscriptionStatus - ACTIVE",
      "Employment - REGULAR",
      "SubscriptionPlan - MONTHLY",
    ]
  );
  const [openFilterConfig, setOpenFilterConfig] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const { t } = useLanguageContext();
  const handleSearchMember = () => {
    setOpenSearch(true);
  };
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;

  const colorStart = isDark
    ? shiftHue(lighten(primary, 0.1), -20)
    : shiftHue(lighten(primary, 0.1), -20);
  const colorEnd = isDark
    ? shiftHue(darken(primary, 0.2), 20)
    : shiftHue(lighten(primary, 0.3), 20);
  console.log(selectedFilters);
  type FlatDataKeys =
    | "MALE"
    | "FEMALE"
    | "REGULAR"
    | "STUDENT"
    | "SENIOR"
    | "HANDICAP"
    | "ACTIVE"
    | "INACTIVE"
    | "PENDING"
    | "CANCELLED"
    | "VISIT_PASS"
    | "MONTHLY"
    | "DAY_PASS"
    | "WEEKLY_PASS"
    | "BIANNUAL"
    | "ANNUAL";

  type FlatData = {
    [key in FlatDataKeys]: number;
  };
  const flatData: FlatData = {
    MALE: 90,
    FEMALE: 10,

    REGULAR: 50,
    STUDENT: 20,
    SENIOR: 20,
    HANDICAP: 10,

    ACTIVE: 20,
    INACTIVE: 80,
    PENDING: 5,
    CANCELLED: 5,

    VISIT_PASS: 10,
    MONTHLY: 25,
    DAY_PASS: 15,
    WEEKLY_PASS: 10,
    BIANNUAL: 20,
    ANNUAL: 20,
  };
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Box sx={isMobile ? { p: 0 } : { p: 2 }}>
        <Box
          sx={{
            textAlign: "center",
            py: 3,
            mb: 3,
            borderRadius: "16px",
            background: `linear-gradient(90deg, ${colorStart}, ${colorEnd})`,
            boxShadow: isDark
              ? `0 3px 12px ${alpha(primary, 0.3)}`
              : `0 3px 12px ${alpha("#000", 0.06)}`,
          }}
        >
          <Typography variant="h2" fontWeight={700} color="#fff">
            📋 {t("Dashboard")} – {authedUser?.username}
          </Typography>

          <Typography variant="subtitle1" color="#fff" mt={1}>
            {authedUser?.email}
            {authedUser?.city && ` · ${authedUser.city}`}
            {authedUser?.phone && ` · ${authedUser.phone}`}
          </Typography>

          <Typography variant="body2" color="#fff" mt={1}>
            {authedUser?.subscriptionActive
              ? `✅ ${t("Active Subscription")} · ${authedUser.membersCount} ${t("Member(s)")}`
              : `🚫 ${t("No Active Subscription")}`}
          </Typography>
        </Box>
        <Grid
          container
          spacing={2}
          sx={{
            p: 3,
            borderRadius: "20px",
            justifyContent: "flex-start",
            // backgroundColor: theme.palette.customColors?.darkBackgroundColor,
            boxShadow: `inset ${theme.palette.customColors?.shodow}`,
          }}
        >
          <Grid size={12}>
            <Typography variant="h6" gutterBottom textAlign={"center"}>
              {t("Quick Actions")}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                backgroundColor: "#fff",
                boxShadow: theme.palette.customColors?.shodow,
                border: "none",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(0.97)",
                },
              }}
              color="primary"
              startIcon={<LoginIcon />}
              onClick={() => setOpenCheckIn(true)}
            >
              {t("Check In")}
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                background: `linear-gradient(90deg, ${colorStart}, ${colorEnd})`,
                boxShadow: theme.palette.customColors?.shodow,
                border: "none",
                color: "#fff",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(0.97)",
                },
              }}
              startIcon={<PersonAddIcon />}
              onClick={() => navigate("/DAMIL-Access-Control/All-Clients")}
            >
              {t("Add New Member")}
            </Button>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<SearchIcon />}
              sx={{
                backgroundColor: "#fff",
                boxShadow: theme.palette.customColors?.shodow,
                border: "none",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(0.97)",
                },
              }}
              onClick={handleSearchMember}
            >
              {t("Search Member")}
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={3} pt={3}>
          <Grid size={12}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              sx={{
                border: "none",
                background: `linear-gradient(90deg, ${colorStart}, ${colorEnd})`,
                color: "#fff",
                boxShadow: `${theme.palette.customColors?.shodow}`,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(0.97)",
                  cursor: "pointer",
                },
              }}
              startIcon={<SettingsIcon />}
              onClick={() => setOpenFilterConfig(true)}
            >
              {t("Customize Analytics")}
            </Button>
          </Grid>
          <Grid size={12}>
            <Grid container spacing={2}>
              {selectedFilters.map((filter: string, index: number) => {
                const [field, value] = filter.split(" - ");

                return (
                  <Grid
                    size={{ xs: 12, sm: 6, md: 3 }}
                    key={index}
                    sx={{ cursor: "pointer", aspectRatio: 1 / 1 }}
                  >
                    <Box
                      sx={{
                        px: 0,
                        borderRadius: "50%",
                        textAlign: "center",
                        transition: "transform 0.3s ease",
                        alignContent: "center",
                        cursor: "pointer",
                        height: "100%",
                        "&:hover": {
                          transform: "scale(0.97)",
                        },
                      }}
                      onClick={() =>
                        navigate(
                          `/DAMIL-Access-Control/All-Clients/${field}=${value}`
                        )
                      }
                    >
                      <GaugeChartHome
                        data={[
                          {
                            value: flatData[value as keyof FlatData],
                            name: descriptionMap(field, value, t),
                          },
                        ]}
                      />
                    </Box>
                  </Grid>
                );
              })}
              <Grid size={12}>
                <Box
                  sx={{
                    p: 2,

                    boxShadow: `inset ${theme.palette.customColors?.shodow}`,
                    borderRadius: "20px",
                  }}
                >
                  <ChartDisplay />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <SearchModal openSearch={openSearch} setOpenSearch={setOpenSearch} />
      <CheckInModal open={openCheckIn} onClose={() => setOpenCheckIn(false)} />
      <IncompleteProfileModal />

      <FiltersModal
        openFilterConfig={openFilterConfig}
        onClose={() => setOpenFilterConfig(false)}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
    </>
  );
};

export default HomePage;
