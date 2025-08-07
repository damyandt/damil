import { Box, Theme, Stack } from "@mui/material";
import { css, SerializedStyles } from "@emotion/react";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { TOP_RIGHT_NAV_HEIGHT, RIGHT_NAV_PADDING } from "../layoutVariables";

const cssStyles = (
  theme: Theme,
  isVisible: boolean,
  extraMenu: any,
  openLeftNav: boolean
) => ({
  rightNavContainer: css({
    borderRadius: !openLeftNav ? "20px" : "20px 0 0 20px",
    margin: !openLeftNav ? "1em" : "1em 0 1em 1em ",
    position: "fixed",
    right: 0,
    overflow: 'auto',
    scrollbarWidth: "none", // for Firefox
    "&::-webkit-scrollbar": {
      display: "none", // for Chrome, Safari, and Edge
    },
    width: extraMenu && isVisible ? TOP_RIGHT_NAV_HEIGHT : 0,
    backgroundColor: theme!.palette!.customColors!.sectionBackgroundColor,
    zIndex: theme.zIndex.drawer + 1,
    padding: extraMenu && isVisible ? RIGHT_NAV_PADDING : 0,
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: theme.spacing(2),
    height: "-webkit-fill-available",
    transition:
      "margin 0.4s ease, width 0.4s ease, padding 0.4s ease, border-radius 0.4s ease",
    boxShadow: theme!.palette!.customColors!.shodow,
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
