import { SerializedStyles, css } from "@emotion/react";
import { Box, Divider, Drawer, IconButton } from "@mui/material";
import {
  LEFT_NAV_WIDTH,
  TOP_NAV_SPACING_WITH_SITE_CONTENT,
} from "../layoutVariables";
import LeftNavListMenu from "./LeftNavListMenu";
import { useTranslatedNav } from "../../Global/Hooks/useTranslatedNav";
import { NAV_DAMIL_ACCESS_CONTROL, NAV_DAMIL_GYMS } from "./leftNavData";
import MenuIcon from "@mui/icons-material/Menu";

const cssStyles = (openLeftNav: boolean) => ({
  drawer: css({
    width: openLeftNav ? LEFT_NAV_WIDTH : "5em",
    flexShrink: 0,
    whiteSpace: "nowrap",
    transition: "width 0.3s ease",
    "& .MuiDrawer-paper": {
      width: openLeftNav ? LEFT_NAV_WIDTH : "5em",
      boxSizing: "border-box",
      border: "none",
      overflowX: "hidden",
      transition: "width 0.3s ease",
    },
  }),
  leftNavContent: css({
    // marginTop: TOP_NAV_SPACING_WITH_SITE_CONTENT,
    overflow: "auto",
    height: "100%",
  }),
  toggleButtonBox: css({
    display: "flex",
    justifyContent: "flex-start",
    padding: "3em 2em 1em 1.6em",
  }),
});

interface LeftNavigationProps {
  css?: SerializedStyles[] | SerializedStyles;
  className?: string;
  openLeftNav: boolean;
  setOpenLeftNav: React.Dispatch<React.SetStateAction<boolean>>;
  mobileLeftNav: boolean;
}

const LeftNavigation: React.FC<LeftNavigationProps> = ({
  className,
  openLeftNav,
  setOpenLeftNav,
  mobileLeftNav,
}) => {
  const styles = { ...cssStyles(openLeftNav) };
  const { NAV_DAMIL_HOME, NAV_DAMIL_ANALYTICS } = useTranslatedNav();

  const handleClose = () => {
    setOpenLeftNav((prev) => !prev);
    window.dispatchEvent(new Event("resize"));
    console.log("dada");
  };

  return (
    <Drawer
      className={className}
      sx={styles.drawer}
      anchor="left"
      open={true}
      onClose={handleClose}
      variant={mobileLeftNav ? "temporary" : "persistent"}
    >
      <Box component="div" sx={styles.leftNavContent}>
        <Box sx={styles.toggleButtonBox}>
          <IconButton onClick={handleClose} aria-label="close menu">
            <MenuIcon />
          </IconButton>
        </Box>
        <>
          <LeftNavListMenu navList={NAV_DAMIL_HOME.list} listTitle="Home" />
          <Divider variant="middle" />
          <LeftNavListMenu
            navList={NAV_DAMIL_ACCESS_CONTROL.list}
            listTitle={NAV_DAMIL_ACCESS_CONTROL.title}
          />
          <Divider variant="middle" />
          <LeftNavListMenu
            navList={NAV_DAMIL_ANALYTICS.list}
            listTitle={NAV_DAMIL_ANALYTICS.title}
          />
          <Divider variant="middle" />
          <LeftNavListMenu
            navList={NAV_DAMIL_GYMS.list}
            listTitle={NAV_DAMIL_GYMS.title}
          />
        </>
      </Box>
    </Drawer>
  );
};

export default LeftNavigation;
