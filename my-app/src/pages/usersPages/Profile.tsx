import { useState } from "react";
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
import Button from "../../components/MaterialUI/Button";
import { useNavigationGuard } from "../../context/UnsavedChangesProvider";

const ProfilePage = () => {
  const { t } = useLanguageContext();
  const theme = useTheme();
  const { authedUser, tenant } = useAuthedContext();
  const [hovered, setHovered] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [slideIn, setSlideIn] = useState(true);
  const { requestActionConfirmation, requestNavigation } = useNavigationGuard();

  const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
    e.preventDefault();

    const performTabChange = () => {
      setSlideIn(false);
      setTimeout(() => {
        setSelectedTab(newValue);
        setSlideIn(true);
      }, 200);
    };
    const isAllowed = requestActionConfirmation(performTabChange);

    if (isAllowed) {
      performTabChange();
    }
  };

  return (
    <>
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
              src=""
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
          size={{ xs: 12 }}
          gap={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            height: "100%", // allow full height within parent
            p: { xs: 1, sm: 2 }, // smaller padding on mobile
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {/* ✅ Make Tabs scrollable horizontally on small screens */}
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              mb: { xs: 1, sm: 3 },
              maxWidth: "80dvw",
              "& .MuiTabs-flexContainer": {
                justifyContent: { xs: "flex-start", sm: "center" },
              },
              "& .MuiTab-root": {
                minWidth: { xs: "auto", sm: 120 }, // shrink tabs on small devices
                fontSize: { xs: "0.8rem", sm: "1rem" },
                paddingX: { xs: 1.2, sm: 2 },
              },
            }}
          >
            <Tab label={t("Account Details")} />
            <Tab label={t("Preferences")} />
            {!authedUser?.roles?.includes("Facility Member") && (
              <Tab label={t("Subscription")} />
            )}
            {!authedUser?.roles?.includes("Facility Member") && (
              <Tab label={t("Business Details")} />
            )}
          </Tabs>

          {/* ✅ Responsive content area */}
          <Grid
            size={{ xs: 12, sm: 10, lg: 8 }}
            alignSelf="center"
            width="100%"
            sx={{
              flexGrow: 1,
              overflow: "visible",
            }}
          >
            <Slide
              direction={"right"}
              in={slideIn}
              timeout={600}
              mountOnEnter
              unmountOnExit
            >
              <Box key={selectedTab} justifyContent={"center"} display={"flex"}>
                {selectedTab === 0 && (
                  <AccountDetails />
                  // <AccountDetails />
                )}
                {selectedTab === 1 && <PreferencesDetails />}
                {selectedTab === 2 && (
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
                          {t(tenant?.abonnement || "Free")}
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
                        <Typography fontWeight={500}>
                          {tenant?.abonnementDuration || "-"}
                        </Typography>
                      </Box>

                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography color="text.secondary">
                          {t("Next Payment")}
                        </Typography>
                        <Typography fontWeight={500}>
                          {tenant?.subscriptionValidUntil || "-"}
                        </Typography>
                      </Box>

                      <Box mt={3} display="flex" justifyContent="center">
                        <Button
                          variant="outlined"
                          onClick={() => {
                            requestNavigation(
                              "/DAMIL-Configurations/Subscription-Plans"
                            );
                          }}
                        >
                          {t("Upgrade Plan")}
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                )}
                {selectedTab === 3 && <BusinessDetails />}
              </Box>
            </Slide>
          </Grid>
        </Grid>
      </Grid>
      {/* <CustomModal
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        title="Unsaved Changes"
        width={"md"}
      >
        {" "}
        <Typography>
          {t(
            "You have unsaved changes. If you leave this page, your changes will be lost."
          )}
        </Typography>
        <Stack
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: 2,
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={() => setShowConfirmDialog(false)}>
            {t("Cancel")}
          </Button>
          <Button onClick={handleConfirmLeave} color="error">
            {t("Leave")}
          </Button>
        </Stack>
      </CustomModal> */}
    </>
  );
};

export default ProfilePage;
