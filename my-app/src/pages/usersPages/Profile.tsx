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
import PlanCard from "./PlanCard";
import AccountDetails from "../../components/pageComponents/UserComponents/AccountDetails";
import PreferencesDetails from "../../components/pageComponents/UserComponents/PreferencesDetails";
import BusinessDetails from "../../components/pageComponents/UserComponents/BusinessDetails";
const ProfilePage = () => {
  const { t } = useLanguageContext();
  const theme = useTheme();
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
    <Grid container spacing={4} p={2} alignSelf={"center"}>
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
            src="/profile.jpeg"
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
      <Grid size={{ xs: 12, sm: 12, lg: 6 }} p={2} overflow={"scroll"}>
        <Tabs value={selectedTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label={t("Account Details")} />
          <Tab label={t("Preferences")} />
          {!authedUser?.roles?.includes("Facility Member") && (
            <Tab label={t("Business Details")} />
          )}
        </Tabs>
        <Slide
          direction={"right"}
          in={slideIn}
          timeout={600}
          mountOnEnter
          unmountOnExit
        >
          <Box key={selectedTab}>
            {selectedTab === 0 && <AccountDetails />}
            {selectedTab === 1 && <PreferencesDetails />}
            {selectedTab === 2 && <BusinessDetails />}
          </Box>
        </Slide>
      </Grid>
      <Grid
        size={{ xs: 12, sm: 12, lg: 6 }}
        justifyContent={"center"}
        display={"flex"}
      >
        <Box minWidth={{ xs: "90%", sm: "60%" }} maxHeight={"30em"}>
          <PlanCard
            plan={{
              name: "Standart",
              price: "$15",
              priceYear: "$165",
              description: "Ideal for individual creators.",
              color: theme.palette.primary.main,
              features: [
                "Everything in Basic",
                "250GB of song storage",
                "250GB of asset storage",
                "2 collaborators",
                "Password protection",
              ],
              buttonText: "Standart",
              active: true,
            }}
            period="monthly"
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
