import React, { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Theme } from "@mui/material";
import { css, keyframes } from "@emotion/react";
import { AUTH_LAYOUT_PADDING, LEFT_NAV_WIDTH, TOP_NAV_SPACING_WITH_SITE_CONTENT } from "../../Layout/layoutVariables";
import { useLanguageContext } from "../../context/LanguageContext";
import LetterGlitch from "../ogl/hacker";
import cssLayoutStyles from "../../Global/Styles/layout";


const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const cssStyles = (
  theme: Theme,
  leftNavIsOpen: boolean,
  mobileLeftNav: boolean
) => ({
  pageNotFoundContent: css({
    flexGrow: 1,
    padding: AUTH_LAYOUT_PADDING,
    backgroundColor: theme.palette.customColors?.sectionBackgroundColor,
    minHeight: `calc(100vh - ${TOP_NAV_SPACING_WITH_SITE_CONTENT} - 50px)`,
  }),
  ...(!mobileLeftNav && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(leftNavIsOpen && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: LEFT_NAV_WIDTH,
    }),
  }),
  floating: css({
    animation: `${float} 3s ease-in-out infinite`,
  }),
});

const PageNotFound: React.FC = () => {
  const { t } = useLanguageContext();
  const theme = useTheme();
  const lgMediaQuery = useMediaQuery("(max-width:1199px)");
  const [openLeftNav, setOpenLeftNav] = useState<boolean>(!lgMediaQuery);
  const styles = {
    ...cssLayoutStyles,
    ...cssStyles(theme, openLeftNav, lgMediaQuery),
  };

  useEffect(() => {
    if (lgMediaQuery && openLeftNav) {
      setOpenLeftNav(false);
    }
  }, [lgMediaQuery]);

  return (
    <Box
      component="div"
      sx={[styles.flexCenter, styles.pageNotFoundContent]}
      flexDirection="column"
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: theme.palette.customColors?.darkBackgroundColor,
        }}
      >
        <LetterGlitch
          glitchColors={[
            theme.palette.mode === "dark" ? "#fff" : "#333", // First color: white in dark mode, dark gray in light mode
            theme.palette.primary.main, // Middle color (always primary color)
            theme.palette.mode === "dark" ? "#000" : "#666", // Last color: black in dark mode, medium gray in light mode
          ]}
          glitchSpeed={50}
          centerVignette={false}
          outerVignette={false}
          smooth={true}
        />
      </Box>
      <Box
        zIndex={10}
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          top: 0,
          right: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          background:
            theme.palette.mode === "dark"
              ? "radial-gradient(circle, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0) 50%)"
              : "radial-gradient(circle, rgba(255, 255, 255, 0.8) 20%, rgba(255, 255, 255, 0) 50%)",
        }}
      >
        {/* <Typography
          variant="h2"
          color={theme.palette.text.primary}
          mt={4}
          zIndex={10}
          alignSelf={"center"}
        >
          404
        </Typography> */}
        <Typography
          variant="h4"
          mt={1}
          zIndex={10}
          color={theme.palette.text.primary}
          alignSelf={"center"}
        >
          {t("Page Not Found")}.
        </Typography>
      </Box>
    </Box>
  );
};

export default PageNotFound;
