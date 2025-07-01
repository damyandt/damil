import { Box, IconButton, Theme, useMediaQuery } from "@mui/material";
import TopNavigation from "./AppNavigation/TopNavigation";
import { useEffect, useState } from "react";
import LeftNavigation from "./AppNavigation/LeftNavigation";
import { css, SerializedStyles } from "@emotion/react";
import {
  AUTH_LAYOUT_BACKGROUND_COLOR,
  AUTH_LAYOUT_PADDING,
  LEFT_NAV_WIDTH,
  TOP_NAV_SPACING_WITH_SITE_CONTENT,
  AUTH_LAYOUT_DARK_BACKGROUND_COLOR,
  TOP_RIGHT_NAV_HEIGHT,
} from "./layoutVariables";
import { alpha, useTheme } from "@mui/material/styles";
import cssLayoutStyles from "../Global/Styles/layout";
import { Outlet } from "react-router-dom";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import RightNavigation from "./AppNavigation/RightNavigation";

interface AuthLayoutProps {
  css?: SerializedStyles[] | SerializedStyles;
  className?: string;
}

const cssStyles = (
  theme: Theme,
  leftNavIsOpen: boolean,
  mobileLeftNav: boolean,
  isRightNavVisible: React.ReactNode | null,
  extraRightNavMenu: React.ReactNode | null
) => ({
  contentContainer: css({
    background:
      theme.palette.mode === "light"
        ? AUTH_LAYOUT_BACKGROUND_COLOR
        : AUTH_LAYOUT_DARK_BACKGROUND_COLOR,
  }),
  floatingArrowButton: css({
    position: "fixed",
    right: isRightNavVisible ? theme.spacing(8) : theme.spacing(1),
    top: "50%",
    transform: "translateY(-50%)",
    transition: "transform 0.4s ease, right 0.4s ease",
    backgroundColor:
      theme.palette.mode === "light"
        ? alpha(theme.palette.grey[100], 0.6)
        : alpha(theme.palette.grey[900], 0.3),
    borderRadius: "50%",
    zIndex: theme.zIndex.drawer + 2,
  }),
  arrowToggleRightMenu: css({
    transform: isRightNavVisible ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.4s ease",
  }),
  new: css({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    zIndex: 1,
  }),
  outletContainer: css({
    marginTop: `calc(${TOP_NAV_SPACING_WITH_SITE_CONTENT} + 1em)`,
    marginRight: leftNavIsOpen
      ? isRightNavVisible && extraRightNavMenu
        ? TOP_RIGHT_NAV_HEIGHT
        : 0
      : isRightNavVisible && extraRightNavMenu
        ? `calc(${TOP_RIGHT_NAV_HEIGHT} + 1em)`
        : 0,
    height: `calc(100vh - ${TOP_NAV_SPACING_WITH_SITE_CONTENT} - 1em)`,
    flexGrow: 1,
    position: "relative",
    padding: AUTH_LAYOUT_PADDING,
    backgroundColor:
      theme.palette.mode === "light"
        ? AUTH_LAYOUT_BACKGROUND_COLOR
        : AUTH_LAYOUT_DARK_BACKGROUND_COLOR,
    // if mobile view -> don't have transition
    ...(!mobileLeftNav && {
      transition: "margin 0.4s ease",
      marginLeft: "6.5em",
      ...(leftNavIsOpen && {
        transition: "margin 0.4s ease",
        marginLeft: LEFT_NAV_WIDTH,
      }),
    }),
  }),
});

const Layout: React.FC<AuthLayoutProps> = ({ className }) => {
  const theme = useTheme();
  const lgMediaQuery = useMediaQuery("(max-width:1199px)");
  const smMediaQuery = useMediaQuery("(max-width:599px)");
  const [isRightNavVisible, setIsRightNavVisible] = useState<boolean>(true);
  const [extraRightNavMenu, setExtraRightNavMenu] =
    useState<React.ReactNode | null>(null);
  const [openLeftNav, setOpenLeftNav] = useState<boolean>(!lgMediaQuery);
  const styles = {
    ...cssStyles(
      theme,
      openLeftNav,
      lgMediaQuery,
      isRightNavVisible,
      extraRightNavMenu
    ),
    ...cssLayoutStyles,
  };
  useEffect(() => {
    if (extraRightNavMenu && !isRightNavVisible) {
      setIsRightNavVisible(true);
    }
  }, [location]);

  return (
    <Box
      component="div"
      className={className}
      sx={[styles.flexColumn, styles.contentContainer]}
    >
      <TopNavigation
        setOpenLeftNav={setOpenLeftNav}
        openLeftNav={openLeftNav}
      />
      <LeftNavigation
        openLeftNav={openLeftNav}
        setOpenLeftNav={setOpenLeftNav}
        mobileLeftNav={lgMediaQuery}
      />
      {extraRightNavMenu ? (
        <IconButton
          onClick={() => setIsRightNavVisible((state) => !state)}
          sx={styles.floatingArrowButton}
        >
          <NavigateBeforeOutlinedIcon sx={styles.arrowToggleRightMenu} />
        </IconButton>
      ) : null}

      <RightNavigation
        extraMenu={extraRightNavMenu}
        isRightNavVisible={isRightNavVisible}
        openLeftNav={openLeftNav}
      />

      <Box sx={styles.outletContainer} component="main">
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            overflow: "scroll",
            height: openLeftNav
              ? `calc(100vh - ${TOP_NAV_SPACING_WITH_SITE_CONTENT} - 4em)`
              : `calc(100vh - ${TOP_NAV_SPACING_WITH_SITE_CONTENT} - 3em)`,
            borderRadius: "20px",
          }}
        >
          <Outlet
            context={{ openLeftNav, setExtraRightNavMenu, smMediaQuery }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
