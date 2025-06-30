import { Box, Theme, Stack } from "@mui/material";
import { css, SerializedStyles } from "@emotion/react";
import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  TOP_RIGHT_NAV_HEIGHT,
  RIGHT_NAV_PADDING,
  TOP_NAV_SPACING_WITH_SITE_CONTENT,
} from "../layoutVariables";

const cssStyles = (
  theme: Theme,
  isVisible: boolean,
  extraMenu: any,
  openLeftNav: boolean
) => ({
  rightNavContainer: css({
    borderRadius: !openLeftNav ? "20px" : 0,
    margin: !openLeftNav ? "1em" : 0,
    marginTop: !openLeftNav ? "2em" : "0",
    position: "fixed",
    top: TOP_NAV_SPACING_WITH_SITE_CONTENT,
    right: 0,
    width: extraMenu && isVisible ? TOP_RIGHT_NAV_HEIGHT : 0,
    background: theme.palette.common.white,
    zIndex: theme.zIndex.drawer + 1,
    padding: extraMenu && isVisible ? RIGHT_NAV_PADDING : 0,
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: theme.spacing(2),
    height: "-webkit-fill-available",
    transition:
      "box-shadow 0.4s ease, margin 0.4s ease, width 0.4s ease, padding 0.4s ease, border-radius 0.4s ease",
    boxShadow: !openLeftNav ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "none",
  }),
});

interface RightNavigationProps {
  css?: SerializedStyles[] | SerializedStyles;
  extraMenu?: React.ReactNode | null;
  isRightNavVisible: boolean;
  openLeftNav: boolean;
}

const RightNavigation: React.FC<RightNavigationProps> = ({
  extraMenu,
  isRightNavVisible,
  openLeftNav,
}) => {
  const theme = useTheme();
  const styles = cssStyles(theme, isRightNavVisible, extraMenu, openLeftNav);

  // if (!extraMenu) return null;

  return (
    <Box component="div" sx={styles.rightNavContainer}>
      <Stack
        direction="column"
        sx={!isRightNavVisible ? { display: "none" } : {}}
      >
        {extraMenu}
      </Stack>
    </Box>
  );
};

export default RightNavigation;
