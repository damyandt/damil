import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import LoginIcon from "@mui/icons-material/Login";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAuthedContext } from "../../context/AuthContext";
import ChartDisplay from "./ChartsDisplayed";
import CheckInModal from "./CheckInModal";
import IncompleteProfileModal from "../../components/Profile/IncompleteModal";
import SearchModal from "./SearchModal";

const analytics = [
  {
    title: "Total Members",
    value: 120,
    redirect: "/DAMIL-Access-Control/All-Clients",
    icon: <GroupIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />,
  },
  {
    title: "Active Subscriptions",
    value: 90,
    redirect: "/DAMIL-Access-Control/All-Clients/subscriptionStatus=ACTIVE",
    icon: <FitnessCenterIcon color="success" sx={{ fontSize: 40, mb: 1 }} />,
  },
  {
    title: "New Signups - July",
    value: 15,
    redirect: "/DAMIL-Access-Control/All-Clients",
    icon: <PersonAddAltIcon color="info" sx={{ fontSize: 40, mb: 1 }} />,
  },
  {
    title: "Expired Subscriptions",
    value: 12,
    redirect: "/DAMIL-Access-Control/All-Clients/subscriptionStatus=INACTIVE",
    icon: <CancelIcon color="error" sx={{ fontSize: 40, mb: 1 }} />,
  },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { authedUser } = useAuthedContext();
  const [openCheckIn, setOpenCheckIn] = useState(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  const handleSearchMember = () => {
    setOpenSearch(true);
  };

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            textAlign: "center",
            py: 3,
            mb: 3,
            borderRadius: "16px",
            background: "linear-gradient(90deg, #e3f2fd, #fce4ec)",
            boxShadow: "0 3px 12px rgba(0,0,0,0.06)",
          }}
        >
          <Typography variant="h4" fontWeight={700} color="primary">
            📋 Dashboard – {authedUser?.username}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" mt={1}>
            {authedUser?.email}
            {authedUser?.city && ` · ${authedUser.city}`}
            {authedUser?.phone && ` · ${authedUser.phone}`}
          </Typography>

          <Typography variant="body2" color="text.secondary" mt={1}>
            {authedUser?.subscriptionActive
              ? `✅ Active Subscription · ${authedUser.membersCount} Member(s)`
              : `🚫 No Active Subscription`}
          </Typography>
        </Box>
        <Grid
          container
          spacing={2}
          sx={{
            p: 3,
            border: `1px solid #bcbcbcb0`,
            borderRadius: "20px",
            justifyContent: "flex-start",
          }}
        >
          <Grid size={12}>
            <Typography variant="h6" gutterBottom textAlign={"center"}>
              Quick Actions
            </Typography>
          </Grid>
          <Grid size={4}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              startIcon={<LoginIcon />}
              onClick={() => setOpenCheckIn(true)}
            >
              Check In
            </Button>
          </Grid>
          <Grid size={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<PersonAddIcon />}
              onClick={() => navigate("/DAMIL-Access-Control/All-Clients")}
            >
              Add New Member
            </Button>
          </Grid>

          <Grid size={4}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<SearchIcon />}
              onClick={handleSearchMember}
            >
              Search Member
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={3} pt={3}>
          <Grid size={12}>
            <Grid container spacing={3}>
              {analytics.map((stat, index) => (
                <Grid size={3} key={index} sx={{ cursor: "pointer" }}>
                  <Box
                    sx={{
                      border: `1px solid #bcbcbcb0`,
                      p: 3,
                      borderRadius: "20px",
                      textAlign: "center",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => navigate(stat.redirect)}
                  >
                    {stat.icon}
                    <Typography variant="h5" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Grid>
              ))}
              <Grid size={12}>
                <Box
                  sx={{
                    p: 2,
                    border: `1px solid #bcbcbcb0`,
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
    </>
  );
};

export default HomePage;
