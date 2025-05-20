import React, { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import cssLayoutStyles from "../Global/Styles/layout";
import { Theme } from "@mui/material";
import { css, keyframes } from "@emotion/react";
import {
  AUTH_LAYOUT_BACKGROUND_COLOR,
  AUTH_LAYOUT_DARK_BACKGROUND_COLOR,
  AUTH_LAYOUT_PADDING,
  LEFT_NAV_WIDTH,
  TOP_NAV_SPACING_WITH_SITE_CONTENT,
} from "../Layout/layoutVariables";
import { useLanguageContext } from "../context/LanguageContext";

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const cssStyles = (theme: Theme, leftNavIsOpen: boolean, mobileLeftNav: boolean) => ({
  pageNotFoundContent: css({
    flexGrow: 1,
    padding: AUTH_LAYOUT_PADDING,
    backgroundColor:
      theme.palette.mode === "light"
        ? AUTH_LAYOUT_BACKGROUND_COLOR
        : AUTH_LAYOUT_DARK_BACKGROUND_COLOR,
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

const ComingSoonPage: React.FC = () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lgMediaQuery]);

  return (
    <Box
      component="div"
      sx={[styles.flexCenter, styles.pageNotFoundContent]}
      flexDirection="column"
    >
      <Box component="div" sx={styles.floating}>
        <img src="/coming-soon.png" alt="Coming-Soon" width="360" />
      </Box>
      <Typography variant="h1" mt={3} sx={{ color: theme.palette.customColors.greyText }}>
        {t("Coming Soon!")}
      </Typography>
    </Box>
  );
};

export default ComingSoonPage;
