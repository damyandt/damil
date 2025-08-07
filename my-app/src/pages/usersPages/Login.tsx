import React from "react";
import {
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  useTheme,
  hexToRgb,
} from "@mui/material";
import MuiLink from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Orb from "../../components/ogl/background";
import { useLanguageContext } from "../../context/LanguageContext";
import TextType from "../../components/ogl/textTyping";
import LoginForm from "../../components/pageComponents/UserComponents/LoginForm";

export const hexToVec3 = (hex: string): [number, number, number] => {
  const [r, g, b] = hexToRgb(hex)
    .match(/\d+/g)!
    .map((v: any) => parseInt(v) / 255);
  return [r, g, b];
};

export const errorMessages = (t: (key: string) => string) => {
  return {
    invalidEmail: t("Account with this email does not exists."),
    invalidPassword: t("Wrong password. Please double-check and try again."),
    unverified: t("Account not verified. Please verify your account"),
    invalidCode: t("Invalid code."),
    internalServerError: t(
      "Oops, something happpend! Please try again in 5 min."
    ),
  };
};
const LoginPage = () => {
  const { t } = useLanguageContext();
  const theme = useTheme();
  const MemoizedOrb = React.memo(Orb);

  const primaryColor = hexToVec3(theme.palette.primary.main);
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 2,
            width: "100vw",
            height: "100vh",
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

        <Typography variant="h2" fontWeight={600} mb={4} zIndex={10}>
          <TextType
            text={[
              t("Sign in to your Gym."),
              t("Sign in to your Gym."),
              t("Sign in to your Gym."),
            ]}
            typingSpeed={75}
            pauseDuration={1500}
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
            {t("Sign in")}
          </Typography>
          <LoginForm />
          <FormControlLabel
            control={<Checkbox />}
            label="Remember me"
            sx={{
              alignSelf: "flex-center",
              mt: 1,
              zIndex: 10,
              width: "fit-content",
            }}
          />
          <Typography
            variant="body2"
            fontWeight={500}
            zIndex={10}
            width={"fit-content"}
            alignSelf={"center"}
          >
            {t("You don't have an Account?")}{" "}
            <MuiLink component={RouterLink} to="/register" underline="hover">
              {t("Register Here")}
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
