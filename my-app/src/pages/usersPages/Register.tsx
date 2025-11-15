import { Typography, Box, IconButton, useTheme } from "@mui/material";
import MuiLink from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import LanguageOutlined from "@mui/icons-material/LanguageOutlined";
import { useLanguageContext } from "../../context/LanguageContext";
import Orb from "../../components/ogl/background";
import { hexToVec3 } from "./Login";
import TextType from "../../components/ogl/textTyping";
import CustomTooltip from "../../components/MaterialUI/CustomTooltip";
import { useState } from "react";
import RegisterForm from "../../components/pageComponents/UserComponents/RegisterForm";

const RegisterPage = () => {
  const { t, setLanguage, language } = useLanguageContext();
  const theme = useTheme();
  const [step, setStep] = useState<number>(0);
  const primaryColor = hexToVec3(theme.palette.primary.main);

  return (
    <>
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
          pt: { xs: "10dvh", sm: 0 },
          p: 4,
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: theme.palette.customColors?.darkBackgroundColor,
        }}
      >
        <Box
          sx={{
            width: "100%",
            alignContent: "center",
            textAlign: "center",
            display: { xs: "block", sm: "none" },
          }}
        >
          <img
            src="/damil-logo.png"
            alt="Damil Logo"
            style={{
              width: 100,
              height: "auto",
              margin: 16,
            }}
          />
        </Box>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            display: { xs: "none", sm: "block" },
            transform: {
              xs: "scale(1.8)", // mobile
              sm: "scale(1.2)", // tablets
              md: "scale(1)", // desktop and up
            },
            transformOrigin: "center",
            zIndex: 2,
            width: "100vw",
            height: "100dvh",
            backgroundColor: theme.palette.customColors?.darkBackgroundColor,
          }}
        >
          <Orb
            primaryColor={primaryColor}
            hoverIntensity={1}
            rotateOnHover={true}
            hue={0.8}
            forceHoverState={false}
          />
        </Box>
        <Typography variant="h2" fontWeight={600} mb={1} sx={{ zIndex: 10 }}>
          <TextType
            text={
              step === 0
                ? [t("Business"), t("Business"), t("Business")]
                : step === 1
                ? [
                    t("Bisiness Location"),
                    t("Bisiness Location"),
                    t("Bisiness Location"),
                  ]
                : step === 2
                ? [t("Admin Details"), t("Admin Details"), t("Admin Details")]
                : [t("Verify Email"), t("Verify Email"), t("Verify Email")]
            }
            typingSpeed={75}
            pauseDuration={3000}
            showCursor={true}
            cursorCharacter="|"
          />
        </Typography>
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            fontWeight={500}
            sx={{
              color: theme.palette.primary.main,
              zIndex: 10,
              width: "fit-content",
              alignSelf: "center",
            }}
          >
            {t("Sign up")}
          </Typography>
          <RegisterForm step={step} setStep={setStep} />
          <Typography variant="body2" zIndex={10}>
            {t("You already have an Account?")}{" "}
            <MuiLink component={RouterLink} to="/login" underline="hover">
              {t("Login Here")}
            </MuiLink>
          </Typography>
        </Box>
      </Box>
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

export default RegisterPage;
