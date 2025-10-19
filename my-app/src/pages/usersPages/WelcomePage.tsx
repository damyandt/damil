import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  IconButton,
  InputAdornment,
  Typography,
  useTheme,
} from "@mui/material";
import { Grid } from "@mui/system";
import Button from "../../components/MaterialUI/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { hexToVec3 } from "./Login";
import Orb from "../../components/ogl/background";
import { useLanguageContext } from "../../context/LanguageContext";
import CustomTooltip from "../../components/MaterialUI/CustomTooltip";
import { LanguageOutlined } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import TextField from "../../components/MaterialUI/FormFields/TextField";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import callApi from "../../API/callApi";
import { Response } from "../../Global/Types/commonTypes";
import { useAuthedContext } from "../../context/AuthContext";
import { Business } from "./api/userTypes";
import { getGyms } from "./api/getQueries";
const WelcomePage = () => {
  const theme = useTheme();
  const { t, language, setLanguage } = useLanguageContext();
  const MemoizedOrb = React.memo(Orb);
  const primaryColor = hexToVec3(theme.palette.primary.main);

  return (
    <>
      <CustomTooltip
        title={
          language === "bg" ? "Превключи на Английски" : "Switch to Bulgarian"
        }
        placement="left"
        sx={{ zIndex: 1000, position: "absolute", top: 0, right: 0, m: 3 }}
      >
        <IconButton
          onClick={() => setLanguage(language === "bg" ? "en" : "bg")}
        >
          <LanguageOutlined />
        </IconButton>
      </CustomTooltip>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          display: { xs: "none", sm: "block" },
          transform: {
            sm: "scale(1.2)",
            md: "scale(1)",
          },
          transformOrigin: "center",
          width: "100vw",
          height: "100dvh",
          backgroundColor: theme.palette.customColors?.darkBackgroundColor,
        }}
      >
        <MemoizedOrb
          primaryColor={primaryColor}
          hoverIntensity={1}
          rotateOnHover={true}
          hue={0.8}
          forceHoverState={false}
        />
      </Box>
      <Form />
      <Typography
        variant="body2"
        color="text.secondary"
        mt={8}
        zIndex={1000}
        width={"100%"}
        textAlign={"center"}
        position={"absolute"}
        bottom={16}
      >
        © {new Date().getFullYear()}{" "}
        {t("DamilSoft — Empowering Fitness Businesses")}
      </Typography>
    </>
  );
};

export default WelcomePage;

const Form = () => {
  const { setAuthedUser } = useAuthedContext();
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useLanguageContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [gyms, setGyms] = useState<Partial<Business>[]>([]);
  const fetchGyms = async () => {
    const gymsRes = await callApi<Response<Business[]>>({
      query: getGyms(),
      auth: { setAuthedUser },
    });
    setGyms(gymsRes.data);
  };

  useEffect(() => {
    fetchGyms();
  }, []);

  const [step, setStep] = useState<number>(
    parseInt(searchParams.get("step") || "1")
  );
  const [search, setSearch] = useState<any>(null);
  useEffect(() => {
    const stepParam = parseInt(searchParams.get("step") || "1");
    setStep(stepParam);
  }, [searchParams]);

  const handleSetStep = (newStep: number) => {
    setStep(newStep);
    const params = new URLSearchParams(searchParams);
    params.set("step", newStep.toString());
    setSearchParams(params, { replace: true });
  };

  return (
    <Box
      sx={{
        zIndex: 1000,
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 3,
        backgroundColor: theme.palette.customColors?.darkBackgroundColor,
        color: theme.palette.text.primary,
      }}
    >
      <img
        src="/damil-logo.png"
        alt="DamilSoft Logo"
        style={{
          zIndex: 1000,
          width: 120,
          height: "auto",
          marginBottom: 24,
        }}
      />
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            style={{
              zIndex: 1000,
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              zIndex={1000}
              sx={{
                zIndex: 1000,
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h3" fontWeight={700} mb={1} zIndex={1000}>
                {t("Welcome to DamilSoft")}
              </Typography>

              <Typography
                variant="h6"
                color="text.secondary"
                maxWidth={600}
                mb={6}
                zIndex={1000}
              >
                {t(
                  "Manage your gym, studio, or fitness journey — all in one platform."
                )}
              </Typography>

              <Grid
                alignSelf={"center"}
                container
                spacing={2}
                justifyContent="center"
                width={"100%"}
                maxWidth={400}
              >
                <Grid size={6} zIndex={1000}>
                  <Button
                    fullWidth
                    onClick={() => navigate("/login")}
                    sx={{
                      zIndex: 1000,
                    }}
                  >
                    {t("Login")}
                  </Button>
                </Grid>
                <Grid size={6} zIndex={1000}>
                  <Button
                    fullWidth
                    onClick={() => handleSetStep(2)}
                    sx={{
                      zIndex: 1000,
                    }}
                  >
                    {t("Get Started")}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            style={{
              zIndex: 1000,
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            key="step2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Box sx={{ zIndex: 1000 }}>
              <Typography variant="h3" fontWeight={700} mb={2} zIndex={1000}>
                {t("Get Started")}
              </Typography>

              <Typography
                variant="h6"
                color="text.secondary"
                maxWidth={600}
                mb={4}
                zIndex={1000}
              >
                {t("Choose how you want to get started with DamilSoft.")}
              </Typography>

              {/* 👤 Join as a member */}
              <Grid
                container
                spacing={2}
                justifyContent="center"
                maxWidth={400}
              >
                <Grid size={6} zIndex={1000}>
                  <Button
                    fullWidth
                    onClick={() => handleSetStep(3)}
                    sx={{
                      zIndex: 1000,
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      color: "#fff",
                      "&:hover": {
                        transform: "scale(0.98)",
                        background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    {t("Client to Gym")}
                  </Button>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    zIndex={1000}
                  >
                    {t("Request access and become a member.")}
                  </Typography>{" "}
                </Grid>

                {/* 🏢 Create a business profile */}
                <Grid size={6} zIndex={1000}>
                  <Button
                    fullWidth
                    onClick={() => navigate("/register")}
                    sx={{
                      zIndex: 1000,
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      color: theme.palette.primary.main,
                      borderColor: theme.palette.primary.main,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.main,
                        color: "#fff",
                      },
                    }}
                  >
                    {t("Business Account")}
                  </Button>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    zIndex={1000}
                  >
                    {t("Register your business with DamilSoft.")}
                  </Typography>
                </Grid>
              </Grid>

              {/* 🔙 Back button */}
              <Button
                variant="text"
                onClick={() => handleSetStep(1)}
                sx={{
                  zIndex: 1000,
                  mt: 6,
                }}
              >
                ← {t("Back to Welcome")}
              </Button>
            </Box>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            style={{
              zIndex: 1000,
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            key="step3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                zIndex: 1000,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="h4" fontWeight={600} mb={3} zIndex={1000}>
                {t("Choose your Gym or Studio")}
              </Typography>

              <Grid
                container
                spacing={2}
                justifyContent="center"
                width={"100%"}
                maxWidth={400}
                zIndex={1000}
              >
                <Grid size={12}>
                  <Autocomplete
                    fullWidth
                    sx={{ width: "100%", zIndex: 1000 }}
                    freeSolo={false} // disable free typing if you only want existing gyms
                    options={gyms} // pass the full gym objects instead of just names
                    getOptionLabel={(option) => option.name || ""} // what appears in the input
                    onChange={(_, selectedGym) => {
                      setSearch(selectedGym);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label={t("Search...")}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              {params.InputProps.endAdornment}

                              <InputAdornment position="end">
                                <IconButton
                                  edge="end"
                                  onClick={() =>
                                    navigate(`/add-yourself/${search?.name}`, {
                                      state: {
                                        tenantId: search?.tenantId, // ✅ pass the ID here
                                      },
                                    })
                                  }
                                  size="small"
                                  disabled={!search} // prevent navigation if none selected
                                >
                                  <ArrowForwardIcon />
                                </IconButton>
                              </InputAdornment>
                            </Box>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Button
                variant="text"
                onClick={() => navigate("/?step=2")}
                sx={{
                  zIndex: 1000,
                  mt: 6,
                }}
              >
                ← {t("Back to Get Started")}
              </Button>
            </Box>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            style={{
              zIndex: 1000,
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            key="step4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                zIndex: 1000,
                display: "flex",
                flexDirection: "column",
                gap: 3,
                textAlign: "center",
                alignItems: "center",
                maxWidth: 500,
                px: 3,
              }}
            >
              <Typography variant="h4" fontWeight={700}>
                {t("Request Sent Successfully!")}
              </Typography>

              <Typography variant="body1" color="text.secondary">
                {t(
                  "Your request to join the gym has been submitted. Once the gym owner approves your request,"
                )}
                <br />
                {t(
                  "you will receive an email with your login credentials or a password link."
                )}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {t(
                  "Please check your email regularly. You will then be able to login, purchase a membership and fully access the gym features."
                )}
              </Typography>

              <Button
                onClick={() => navigate("/")}
                sx={{ px: 4, py: 1.5, mt: 2 }}
              >
                {t("Return to Home")}
              </Button>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};
