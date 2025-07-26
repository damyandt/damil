import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import TextField from "../../components/MaterialUI/FormFields/TextField";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import LoginIcon from "@mui/icons-material/Login";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAuthedContext } from "../../context/AuthContext";
import CustomModal from "../../components/MaterialUI/Modal";
import { useLanguageContext } from "../../context/LanguageContext";
import ChartDisplay from "./ChartsDisplayed";
import CheckInModal from "./CheckInModal";

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
    redirect: "/DAMIL-Access-Control/All-Clients",
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
    redirect: "/DAMIL-Access-Control/All-Clients",
    icon: <CancelIcon color="error" sx={{ fontSize: 40, mb: 1 }} />,
  },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguageContext();
  const { authedUser } = useAuthedContext();
  const [openCheckIn, setOpenCheckIn] = useState(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [userDetails, setUserDetails] = useState<any>(null);
  const steps = [t("Search Member"), t("View Details")];

  const handleClose = () => {
    setActiveStep(0);
    setSearchInput("");
    setUserDetails(null);
    setOpenSearch(false);
  };

  const handleNext = () => {
    const mockUser = {
      name: "Jane Smith",
      email: "jane@example.com",
      age: 28,
      membership: "Gold",
    };

    setUserDetails(mockUser);
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };
  const handleAddMember = () => {
    navigate("/DAMIL-Access-Control/All-Clients");
  };

  const handleSearchMember = () => {
    setOpenSearch(true);
  };

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom textAlign={"center"}>
          🏋️‍♂️ {authedUser?.username} Dashboard
        </Typography>
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
              onClick={handleAddMember}
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
      <CustomModal
        title={t("Search User")}
        open={openSearch}
        onClose={handleClose}
        width={"md"}
        titleIcon="search"
      >
        <Box sx={{ width: "100%", mb: 3 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Step Content */}
        {activeStep === 0 && (
          <Box>
            <Typography variant="subtitle1" mb={2}>
              {t("Enter Member ID or Name")}
            </Typography>
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label={t("Search")}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </Grid>
              <Grid size={12} display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={!searchInput.trim()}
                >
                  {t("Next")}
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        {activeStep === 1 && userDetails && (
          <Box>
            <Typography variant="h6" mb={2}>
              {t("Member Details")}
            </Typography>
            <Grid container spacing={2}>
              <Grid size={6}>
                <Typography variant="subtitle2">{t("Name")}</Typography>
                <Typography>{userDetails.name}</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="subtitle2">{t("Email")}</Typography>
                <Typography>{userDetails.email}</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="subtitle2">{t("Age")}</Typography>
                <Typography>{userDetails.age}</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="subtitle2">{t("Membership")}</Typography>
                <Typography>{userDetails.membership}</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={3} justifyContent="space-between">
              <Grid>
                <Button variant="outlined" onClick={handleBack}>
                  {t("Back")}
                </Button>
              </Grid>
              <Grid>
                <Button variant="contained" onClick={handleClose}>
                  {t("Close")}
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </CustomModal>
      <CheckInModal open={openCheckIn} onClose={() => setOpenCheckIn(false)} />
    </>
  );
};

export default HomePage;
