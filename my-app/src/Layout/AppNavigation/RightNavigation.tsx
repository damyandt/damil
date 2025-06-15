import { Box, Theme, Stack } from "@mui/material";
import { css, SerializedStyles } from "@emotion/react";
import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  TOP_RIGHT_NAV_HEIGHT,
  RIGHT_NAV_PADDING,
  TOP_NAV_SPACING_WITH_SITE_CONTENT,
} from "../layoutVariables";

const cssStyles = (theme: Theme, isVisible: boolean) => ({
  rightNavContainer: css({
    position: "fixed",
    top: TOP_NAV_SPACING_WITH_SITE_CONTENT,
    right: 0,
    width: TOP_RIGHT_NAV_HEIGHT,
    height: `calc(100vh - ${TOP_NAV_SPACING_WITH_SITE_CONTENT})`,
    background: theme.palette.common.white,
    zIndex: theme.zIndex.drawer + 1,
    padding: RIGHT_NAV_PADDING,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: theme.spacing(2),
    opacity: isVisible ? 1 : 0,
    transition: theme.transitions.create("opacity", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),
});

interface RightNavigationProps {
  css?: SerializedStyles[] | SerializedStyles;
  extraMenu?: React.ReactNode | null;
  isRightNavVisible: boolean;
}

const RightNavigation: React.FC<RightNavigationProps> = ({
  extraMenu,
  isRightNavVisible,
}) => {
  const theme = useTheme();
  const styles = cssStyles(theme, isRightNavVisible);

  if (!extraMenu) return null;

  return (
    <Box component="div" sx={styles.rightNavContainer}>
      <Stack direction="column">{extraMenu}</Stack>
    </Box>
  );
};

export default RightNavigation;
