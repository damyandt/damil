import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Grid,
  IconButton,
  useTheme,
  Tabs,
  Tab,
  Slide,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useLanguageContext } from "../../context/LanguageContext";
import { useAuthedContext } from "../../context/AuthContext";
import AccountDetails from "../../components/pageComponents/UserComponents/AccountDetails";
import PreferencesDetails from "../../components/pageComponents/UserComponents/PreferencesDetails";
import BusinessDetails from "../../components/pageComponents/UserComponents/BusinessDetails";
import { useNavigate } from "react-router-dom";
import Button from "../../components/MaterialUI/Button";

const ProfilePage = () => {
  const { t } = useLanguageContext();
  const theme = useTheme();
  const navigate = useNavigate();
  const { authedUser } = useAuthedContext();
  const [hovered, setHovered] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [slideIn, setSlideIn] = useState(true);

  const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
    e.preventDefault();
    setSlideIn(false);

    setTimeout(() => {
      setSelectedTab(newValue);
      setSlideIn(true);
    }, 200);
  };

  return (
    <Grid container spacing={1} p={2} alignSelf={"center"}>
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
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbdebOgP53gHBxhUq8q1aorTto0oZGDQUt-QePP2ZCpobec1kW-hS0u-TEIne27gTxhrI&usqp=CAU"
            alt={authedUser?.firstName}
            sx={{
              width: "100%",
              height: "100%",
              filter: hovered ? "blur(1.5px)" : "none",
              transition: "filter 0.3s ease",
            }}
          >
            {authedUser?.firstName?.charAt(0)}
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
          {authedUser?.firstName} {authedUser?.lastName}
        </Typography>
      </Grid>
      <Grid
        size={{ xs: 12, sm: 12, lg: 12 }}
        gap={3}
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          p: 2,
          alignItems: "center",
          overflow: "scroll",
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Chrome, Safari
          },
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            mb: 3,
            justifySelf: "center",
            "& .MuiTabs-flexContainer": {
              justifyContent: { xs: "flex-start", sm: "center" },
            },
          }}
        >
          <Tab label={t("Account Details")} />
          <Tab label={t("Preferences")} />
          {!authedUser?.roles?.includes("Facility Member") && (
            <Tab label={t("Business Details")} />
          )}
          <Tab label={t("Subscription")} />
        </Tabs>
        <Grid
          size={{ xs: 12, sm: 10, lg: 8 }}
          alignSelf={"center"}
          width={"100%"}
        >
          <Slide
            direction={"right"}
            in={slideIn}
            timeout={600}
            mountOnEnter
            unmountOnExit
          >
            <Box key={selectedTab} justifyContent={"center"} display={"flex"}>
              {selectedTab === 0 && <AccountDetails />}
              {selectedTab === 1 && <PreferencesDetails />}
              {selectedTab === 2 && <BusinessDetails />}
              {selectedTab === 3 && (
                <Grid size={{ xs: 12 }} width={"100%"}>
                  <Box
                    p={4}
                    width="100%"
                    maxWidth={500}
                    borderRadius={1}
                    boxShadow={2}
                    bgcolor={theme.palette.background.paper}
                    display="flex"
                    justifySelf={"center"}
                    flexDirection="column"
                    gap={2}
                  >
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                      {t("Current Subscription")}
                    </Typography>

                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography color="text.secondary">
                        {t("Plan")}
                      </Typography>
                      <Typography fontWeight={500} color="primary">
                        Free
                      </Typography>
                    </Box>

                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography color="text.secondary">
                        {t("Billing Period")}
                      </Typography>
                      <Typography fontWeight={500}>Monthly</Typography>
                    </Box>

                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography color="text.secondary">
                        {t("Next Payment")}
                      </Typography>
                      <Typography fontWeight={500}>29/10/2025</Typography>
                    </Box>

                    <Box mt={3} display="flex" justifyContent="center">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          navigate("/DAMIL-Configurations/Subscription-Plans");
                        }}
                      >
                        {t("Upgrade Plan")}
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              )}
            </Box>
          </Slide>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
