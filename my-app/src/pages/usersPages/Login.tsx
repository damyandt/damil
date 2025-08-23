import React from "react";
import {
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  useTheme,
  hexToRgb,
  IconButton,
} from "@mui/material";
import LanguageOutlined from "@mui/icons-material/LanguageOutlined";
import MuiLink from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Orb from "../../components/ogl/background";
import { useLanguageContext } from "../../context/LanguageContext";
import LoginForm from "../../components/pageComponents/UserComponents/LoginForm";
import TextType from "../../components/ogl/textTyping";
import CustomTooltip from "../../components/MaterialUI/CustomTooltip";

export const hexToVec3 = (hex: string): [number, number, number] => {
  const [r, g, b] = hexToRgb(hex)
    .match(/\d+/g)!
    .map((v: any) => parseInt(v) / 255);
  return [r, g, b];
};

const LoginPage = () => {
  const { t, setLanguage, language } = useLanguageContext();
  const theme = useTheme();
  const MemoizedOrb = React.memo(Orb);

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
          p: 4,
          overflow: "hidden",
          height: "100dvh",
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
